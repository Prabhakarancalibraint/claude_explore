# 🧠 Model Selection Cheat Sheet
## Personal Reference — Claude Model Tiers for Common Dev Tasks

> **Golden Rule:** Default to Sonnet. Escalate to Opus only when Sonnet's output leaves you unsatisfied. Never use Haiku for anything requiring judgment.

---

## Quick Reference Table

| Task Type | Recommended Model | Reason |
|-----------|------------------|--------|
| Regex / pattern matching | `haiku` | Pure pattern work. No reasoning needed. |
| String formatting / templating | `haiku` | Deterministic. Fast. |
| Boilerplate code generation | `sonnet` | Quality matters. Haiku skips edge cases. |
| Unit test writing | `sonnet` | Needs understanding of intent + edge cases. |
| API integration / SDK usage | `sonnet` | Needs to reason about docs + error handling. |
| Code refactoring | `sonnet` | Needs to understand structure, not just syntax. |
| Debugging a specific error | `sonnet` | Good at error pattern recognition. |
| Explaining a concept | `sonnet` | Clear, accurate, well-paced. Opus is overkill. |
| Writing documentation | `sonnet` | Solid. Opus adds minimal value here. |
| SQL query writing | `sonnet` | Reliable for standard queries + joins. |
| Complex SQL with window functions / CTEs | `opus` | Nuanced performance trade-offs matter. |
| System architecture design | `opus` | Trade-offs, edge cases, scalability need depth. |
| Security review / threat modeling | `opus` | Must not miss things. Stakes are high. |
| Multi-service data flow design | `opus` | Cross-cutting concerns need deep reasoning. |
| Debugging a subtle race condition | `opus` | Requires probabilistic reasoning across state. |
| Reviewing a PR for logic errors | `opus` | Non-obvious correctness issues need depth. |
| Generating seed/mock data | `haiku` | Repetitive, no judgment needed. |
| Converting between data formats (JSON/CSV) | `haiku` | Mechanical. Fast. |
| Git commit message generation | `haiku` | Simple summarization task. |
| Release notes drafting | `sonnet` | Needs to balance technical + human-readable. |
| Evaluating tech stack trade-offs | `opus` | Contextual, opinionated, multi-dimensional. |
| Performance optimization strategy | `opus` | Needs to reason about profiling, trade-offs. |
| Prompt engineering / meta-prompting | `opus` | Self-referential reasoning; Sonnet loops. |

---

## Decision Flowchart (Mental Model)

```
Is the task purely mechanical? (format, regex, transform)
    └── YES → Haiku

Does the task require understanding intent or context?
    └── YES → Start with Sonnet

Did Sonnet's output feel shallow / miss edge cases?
    └── YES → Escalate to Opus

Does the task involve security, architecture, or multi-party design?
    └── YES → Skip Sonnet, go straight to Opus
```

---

## Cost vs. Quality Calibration

| Model | Relative Cost | When It Pays Off |
|-------|--------------|-----------------|
| `haiku` | 1× | Mechanical, repetitive, bulk tasks |
| `sonnet` | ~5× | Most everyday dev tasks — sweet spot |
| `opus` | ~40× | High-stakes, complex, ambiguous tasks only |

> ⚠️ Using Opus for a regex task is like hiring a principal engineer to write a README. Don't do it.

---

## Calibraint-Specific Guidelines

- **Default model in all Claude Code sessions:** `sonnet`
- **CI/CD automation tasks:** `haiku` (fast + cheap)
- **Architecture review sessions with senior devs:** `opus`
- **Client-facing deliverables (reports, proposals):** `sonnet` unless complexity warrants opus
- **Pair programming / iterative coding:** `sonnet`

---

*Last updated: 2025 | Module 01, Task 2 — Calibraint Claude Exercise*
