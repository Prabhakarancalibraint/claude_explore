#!/bin/bash
# push_module01_task2.sh
# Run this on your local machine to copy files and push to GitHub

set -e

LOCAL_REPO="/home/xavier-praveen/Workspace/claude_exercise"
TARGET_DIR="$LOCAL_REPO/module01_task2"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

echo "📁 Ensuring target directory exists..."
mkdir -p "$TARGET_DIR"

echo "📋 Copying files..."
cp "$SCRIPT_DIR/README.md"                        "$TARGET_DIR/README.md"
cp "$SCRIPT_DIR/quality_delta_report.md"          "$TARGET_DIR/quality_delta_report.md"
cp "$SCRIPT_DIR/model_selection_cheatsheet.md"    "$TARGET_DIR/model_selection_cheatsheet.md"
cp "$SCRIPT_DIR/claude-session-logger.js"         "$TARGET_DIR/claude-session-logger.js"
cp "$SCRIPT_DIR/.claude-session-log.jsonl"        "$TARGET_DIR/.claude-session-log.jsonl"

echo "✅ Files copied:"
ls -la "$TARGET_DIR"

echo ""
echo "🔀 Committing and pushing..."
cd "$LOCAL_REPO"

git add module01_task2/
git status

git commit -m "feat(module01_task2): add model selection docs, quality delta report, and session logger

- quality_delta_report.md: Sonnet vs Opus on 5 tasks with detailed delta analysis
- model_selection_cheatsheet.md: task-type → model mapping cheat sheet
- claude-session-logger.js: Node.js script to log model used per Claude Code session
- .claude-session-log.jsonl: sample session log with 6 entries
- README.md: module overview and quick-start guide"

git push origin main

echo ""
echo "🎉 Done! Files pushed to origin/main under module01_task2/"
