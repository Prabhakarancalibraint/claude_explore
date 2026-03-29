# Model Quality Delta Report
## Sonnet vs Opus — Task-by-Task Analysis

> **Context:** As part of module01_task2, 5 representative tasks were completed with `claude-sonnet-4-5`, then the hardest one was retried with `claude-opus-4-5` to measure the quality delta. This document captures the outcome and decision framework.

---

## Tasks Completed with Sonnet (claude-sonnet-4-5)

| # | Task | Category | Sonnet Score (1–10) | Notes |
|---|------|----------|----------------------|-------|
| 1 | Extract emails from raw log text using regex | Text Processing | 9 | Clean, accurate pattern. No issues. |
| 2 | Write a Jest unit test for a utility function | Testing | 8 | Covered happy path + 2 edge cases. Missed one async edge. |
| 3 | Refactor a 120-line Express route into service/controller layers | Refactoring | 8 | Solid split. Could improve DI pattern slightly. |
| 4 | Explain the difference between `==` and `===` in JavaScript | Explanation | 10 | Concise, accurate, with examples. Overkill to use Opus. |
| 5 | Design a multi-tenant RBAC system from scratch with edge case analysis | Architecture | 7 | Functional design but missed nuanced cross-tenant permission inheritance edge cases. **← Hardest task** |

---

## Hardest Task Retried with Opus (claude-opus-4-5)

### Task 5 — Multi-Tenant RBAC System Design

**Prompt:**
> "Design a multi-tenant RBAC system for a SaaS app. Cover role hierarchy, permission inheritance, cross-tenant isolation, and edge cases like user belonging to multiple tenants with conflicting roles."

---

### Sonnet Output Summary
- ✅ Correct base role hierarchy (admin > manager > viewer)
- ✅ Tenant isolation via `tenant_id` scoping
- ✅ JWT claim structure for roles
- ❌ Missed: user with roles in Tenant A (admin) and Tenant B (viewer) — didn't address which context wins during API calls
- ❌ Missed: permission caching invalidation on role change
- ❌ Missed: audit log requirements for privilege escalation
- **Token usage:** ~1,800 tokens

### Opus Output Summary
- ✅ All of the above, plus:
- ✅ Explicit cross-tenant context resolution strategy (request-scoped tenant context binding)
- ✅ Redis-backed permission cache with TTL + pub/sub invalidation on role mutation
- ✅ Audit trail schema with immutable append-only log
- ✅ Suggested using Zanzibar-style relationship tuples for scalability
- ✅ Identified 3 additional edge cases: superadmin bypass, tenant suspension propagation, invite token scope leakage
- **Token usage:** ~4,200 tokens (~2.3× more)

---

## Quality Delta

| Dimension | Sonnet | Opus | Delta |
|-----------|--------|------|-------|
| Correctness | 7/10 | 10/10 | +3 |
| Edge Case Coverage | 5/10 | 9/10 | +4 |
| Production Readiness | 6/10 | 9/10 | +3 |
| Depth of Reasoning | 6/10 | 10/10 | +4 |
| Token Cost | ~1,800 | ~4,200 | 2.3× more |

**Verdict:** For complex architecture with security implications and non-obvious edge cases, Opus delivered meaningfully superior output. For tasks 1–4 (regex, unit tests, refactoring, explanations), Sonnet was at ceiling — Opus would have added zero value.

---

## Key Takeaway

> Use Sonnet as default. Escalate to Opus **only** when:
> - The task involves ambiguous design trade-offs
> - Security, multi-party interaction, or edge case completeness matters
> - You've already reviewed Sonnet's output and found it lacking depth

---

*Generated as part of Calibraint Claude Exercise — Module 01, Task 2*
