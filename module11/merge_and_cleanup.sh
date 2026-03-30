#!/bin/bash
# Module 11 - Merge and Cleanup Script
# Merges both branches into main, removes worktrees, and verifies tests

set -e

REPO_DIR="/home/xavier-praveen/Workspace/claude_exercise"
WORKTREE_FEATURE="$REPO_DIR/.claude/worktrees/feature-rwa-property-token"
WORKTREE_TESTS="$REPO_DIR/.claude/worktrees/feature-rwa-property-token-tests"

echo "=== Module 11: Merge and Cleanup ==="
echo ""

# Navigate to repository
cd "$REPO_DIR"

# Ensure we're on main and up to date
echo "Checking main branch status..."
git checkout main
git pull origin main

echo ""
echo "=== Step 1: Merge feature/rwa-property-token ==="
echo ""
git merge feature/rwa-property-token --no-edit || {
    echo "Merge conflict in feature branch. Please resolve manually."
    exit 1
}

echo ""
echo "=== Step 2: Merge feature/rwa-property-token-tests ==="
echo ""
git merge feature/rwa-property-token-tests --no-edit || {
    echo "Merge conflict in test branch. Please resolve manually."
    exit 1
}

echo ""
echo "=== Step 3: Verify test suite passes ==="
echo ""
# Run hardhat tests to verify
if [ -f "hardhat.config.ts" ] || [ -f "hardhat.config.js" ]; then
    npx hardhat test
else
    echo "WARNING: No Hardhat project detected. Please verify tests manually."
    echo "Expected test location: test/contracts/PropertyToken.test.ts"
fi

echo ""
echo "=== Step 4: Remove worktrees ==="
echo ""

# Remove worktrees
echo "Removing feature worktree..."
git worktree remove "$WORKTREE_FEATURE" --force

echo "Removing test worktree..."
git worktree remove "$WORKTREE_TESTS" --force

# Delete branches
echo ""
echo "Deleting feature branches..."
git branch -d feature/rwa-property-token
git branch -d feature/rwa-property-token-tests

echo ""
echo "=== Step 5: Show final worktree list ==="
echo ""
git worktree list

echo ""
echo "=== Module 11 Complete ==="
echo ""
echo "All done! The PropertyToken contract and tests are now on main branch."