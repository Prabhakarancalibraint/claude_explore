# Module 01 — Task 2: Model Selection & Quality Delta

> **Core Principle:** Using Opus for a simple regex task burns ~40× more tokens than Haiku for zero quality gain. Default to Sonnet. Escalate to Opus only when you hit Sonnet's ceiling.

---

## Deliverables

| File | Description |
|------|-------------|
| [`quality_delta_report.md`](./quality_delta_report.md) | 5 tasks run on Sonnet; hardest retried on Opus — quality delta documented |
| [`model_selection_cheatsheet.md`](./model_selection_cheatsheet.md) | Personal cheat sheet mapping task types → recommended model |
| [`claude-session-logger.js`](./claude-session-logger.js) | Node.js script to instrument and log model usage per session |
| [`.claude-session-log.jsonl`](./.claude-session-log.jsonl) | Sample log file showing session history |

---

## Quick Start — Session Logger

```bash
# Log a session (run before/after each Claude Code session)
node claude-session-logger.js --model sonnet --task "Write unit tests for auth module"
node claude-session-logger.js --model opus   --task "Design multi-tenant RBAC system"
node claude-session-logger.js --model haiku  --task "Generate regex for email extraction"

# View usage report
node claude-session-logger.js --report
```

### Sample Report Output
```
╔══════════════════════════════════════════╗
║       Claude Session Usage Report        ║
╚══════════════════════════════════════════╝

Total sessions logged : 6

── Model Distribution ──────────────────────
  haiku    :   1 sessions (16.7%) ███
  sonnet   :   4 sessions (66.7%) █████████████
  opus     :   1 sessions (16.7%) ███

── Cost Tier Analysis ──────────────────────
  Total cost units    : 61
  Optimal (all Sonnet): 30
  ⚠️  Potential waste : 31 units (Opus over-use)
```

---

## Model Selection Decision Tree

```
Mechanical task? (regex, format, transform)
    └── Haiku

Needs intent understanding / edge cases?
    └── Sonnet (default)

Sonnet output shallow? Architecture / security?
    └── Opus
```

---

## Cost Reference

| Model | Relative Cost | Best For |
|-------|:---:|---------|
| Haiku | 1× | Repetitive, mechanical tasks |
| Sonnet | ~5× | Most everyday dev work |
| Opus | ~40× | Complex architecture, security, edge cases |

---

*Calibraint Claude Exercise — Module 01, Task 2*
