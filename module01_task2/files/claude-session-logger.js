#!/usr/bin/env node
/**
 * claude-session-logger.js
 *
 * Instruments a project to log which Claude model was used per Claude Code session.
 * Logs are written to `.claude-session-log.jsonl` in the project root.
 *
 * Usage:
 *   node claude-session-logger.js --model sonnet --task "Refactor auth service"
 *   node claude-session-logger.js --model opus   --task "Design RBAC system"
 *   node claude-session-logger.js --report
 *
 * Install as a git hook or wrap your `claude` invocations with this script.
 */

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

// ─── Config ──────────────────────────────────────────────────────────────────

const LOG_FILE = path.resolve(process.cwd(), ".claude-session-log.jsonl");
const VALID_MODELS = ["haiku", "sonnet", "opus"];

const MODEL_COST_TIER = {
  haiku: 1,
  sonnet: 5,
  opus: 40,
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getGitUser() {
  try {
    return execSync("git config user.name", { stdio: ["pipe", "pipe", "ignore"] })
      .toString()
      .trim();
  } catch {
    return process.env.USER || "unknown";
  }
}

function getGitBranch() {
  try {
    return execSync("git rev-parse --abbrev-ref HEAD", { stdio: ["pipe", "pipe", "ignore"] })
      .toString()
      .trim();
  } catch {
    return "unknown";
  }
}

function getProjectName() {
  try {
    const pkg = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), "package.json"), "utf8"));
    return pkg.name || path.basename(process.cwd());
  } catch {
    return path.basename(process.cwd());
  }
}

function parseArgs(argv) {
  const args = {};
  for (let i = 2; i < argv.length; i++) {
    if (argv[i].startsWith("--")) {
      const key = argv[i].slice(2);
      const val = argv[i + 1] && !argv[i + 1].startsWith("--") ? argv[++i] : true;
      args[key] = val;
    }
  }
  return args;
}

// ─── Log Session ──────────────────────────────────────────────────────────────

function logSession({ model, task, notes }) {
  if (!VALID_MODELS.includes(model)) {
    console.error(`❌ Invalid model "${model}". Must be one of: ${VALID_MODELS.join(", ")}`);
    process.exit(1);
  }

  const entry = {
    timestamp: new Date().toISOString(),
    project: getProjectName(),
    branch: getGitBranch(),
    user: getGitUser(),
    model,
    model_full: `claude-${model}-4-5`,
    cost_tier: MODEL_COST_TIER[model],
    task: task || "unspecified",
    notes: notes || "",
  };

  fs.appendFileSync(LOG_FILE, JSON.stringify(entry) + "\n", "utf8");
  console.log(`✅ Session logged`);
  console.log(`   Model  : ${entry.model_full}`);
  console.log(`   Task   : ${entry.task}`);
  console.log(`   Branch : ${entry.branch}`);
  console.log(`   User   : ${entry.user}`);
  console.log(`   Log    : ${LOG_FILE}`);
}

// ─── Report ───────────────────────────────────────────────────────────────────

function generateReport() {
  if (!fs.existsSync(LOG_FILE)) {
    console.log("No sessions logged yet. Run with --model and --task to start.");
    return;
  }

  const lines = fs.readFileSync(LOG_FILE, "utf8").trim().split("\n").filter(Boolean);
  const sessions = lines.map((l) => JSON.parse(l));

  const totalSessions = sessions.length;
  const modelCounts = {};
  const modelCostUnits = {};
  const userBreakdown = {};

  for (const s of sessions) {
    modelCounts[s.model] = (modelCounts[s.model] || 0) + 1;
    modelCostUnits[s.model] = (modelCostUnits[s.model] || 0) + s.cost_tier;
    userBreakdown[s.user] = userBreakdown[s.user] || {};
    userBreakdown[s.user][s.model] = (userBreakdown[s.user][s.model] || 0) + 1;
  }

  const totalCostUnits = Object.values(modelCostUnits).reduce((a, b) => a + b, 0);
  const optimalCostUnits = sessions.length * MODEL_COST_TIER["sonnet"];
  const wastedUnits = totalCostUnits - optimalCostUnits;

  console.log("\n╔══════════════════════════════════════════╗");
  console.log("║       Claude Session Usage Report        ║");
  console.log("╚══════════════════════════════════════════╝\n");
  console.log(`Total sessions logged : ${totalSessions}`);
  console.log(`Log file              : ${LOG_FILE}\n`);

  console.log("── Model Distribution ──────────────────────");
  for (const model of VALID_MODELS) {
    const count = modelCounts[model] || 0;
    const pct = totalSessions > 0 ? ((count / totalSessions) * 100).toFixed(1) : "0.0";
    const bar = "█".repeat(Math.round(parseFloat(pct) / 5));
    console.log(`  ${model.padEnd(8)} : ${String(count).padStart(3)} sessions (${pct}%) ${bar}`);
  }

  console.log("\n── Cost Tier Analysis ──────────────────────");
  console.log(`  Total cost units  : ${totalCostUnits}`);
  console.log(`  Optimal (all Sonnet): ${optimalCostUnits}`);
  if (wastedUnits > 0) {
    console.log(`  ⚠️  Potential waste : ${wastedUnits} units (Opus over-use)`);
  } else if (wastedUnits < 0) {
    console.log(`  ✅ Savings vs Sonnet: ${Math.abs(wastedUnits)} units (Haiku used efficiently)`);
  } else {
    console.log(`  ✅ Exactly on target (all Sonnet)`);
  }

  console.log("\n── Per-User Breakdown ──────────────────────");
  for (const [user, models] of Object.entries(userBreakdown)) {
    const summary = VALID_MODELS.map((m) => `${m}:${models[m] || 0}`).join(" | ");
    console.log(`  ${user.padEnd(20)} ${summary}`);
  }

  console.log("\n── Recent Sessions (last 5) ────────────────");
  const recent = sessions.slice(-5).reverse();
  for (const s of recent) {
    const date = new Date(s.timestamp).toLocaleString();
    console.log(`  [${date}] ${s.model.padEnd(8)} — ${s.task}`);
  }
  console.log("");
}

// ─── Entry Point ──────────────────────────────────────────────────────────────

const args = parseArgs(process.argv);

if (args.report) {
  generateReport();
} else if (args.model) {
  logSession({ model: args.model, task: args.task, notes: args.notes });
} else {
  console.log(`
Usage:
  node claude-session-logger.js --model <haiku|sonnet|opus> --task "your task description"
  node claude-session-logger.js --report

Options:
  --model   Required for logging. One of: haiku, sonnet, opus
  --task    Short description of the task (quoted string)
  --notes   Optional extra notes
  --report  Print usage report from the log file

Examples:
  node claude-session-logger.js --model sonnet --task "Write unit tests for auth module"
  node claude-session-logger.js --model opus   --task "Design multi-tenant RBAC system"
  node claude-session-logger.js --report
`);
}
