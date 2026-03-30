#!/bin/bash
# Module 11 - Git Worktree Setup Script
# Creates two worktrees for parallel RWA PropertyToken development

set -e

REPO_DIR="/home/xavier-praveen/Workspace/claude_exercise"
WORKTREE_BASE="$REPO_DIR/.claude/worktrees"

echo "=== Module 11: Setting up Git Worktrees ==="
echo ""

# Navigate to repository
cd "$REPO_DIR"

# Show current worktrees before
echo "Current worktrees:"
git worktree list
echo ""

# Create worktree base directory if needed
mkdir -p "$WORKTREE_BASE"

# Create feature branch worktree
echo "Creating feature/rwa-property-token worktree..."
git worktree add "$WORKTREE_BASE/feature-rwa-property-token" -b feature/rwa-property-token

# Create test branch worktree
echo "Creating feature/rwa-property-token-tests worktree..."
git worktree add "$WORKTREE_BASE/feature-rwa-property-token-tests" -b feature/rwa-property-token-tests

echo ""
echo "=== Worktrees created successfully ==="
echo ""

# Show all worktrees after creation
echo "Current worktrees:"
git worktree list

echo ""
echo "Worktree paths:"
echo "  - Feature: $WORKTREE_BASE/feature-rwa-property-token"
echo "  - Tests:   $WORKTREE_BASE/feature-rwa-property-token-tests"