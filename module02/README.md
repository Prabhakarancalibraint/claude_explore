# Module 02 — Clean Prompt Engineering

## The 5-Part Prompt Formula

| Part | Description | Example |
|------|-------------|---------|
| Role | Who Claude is in this context | "You are a senior NestJS architect." |
| Context | Project/codebase background | "This is a multi-tenant SaaS using TypeORM + Postgres." |
| Task | Exactly what to do | "Refactor this service to use the repository pattern." |
| Constraints | What NOT to do | "Do not change the public API signature." |
| Output Format | How the result should look | "Return only the changed files with explanations." |

## Prompt Anti-Patterns to Avoid

- **Vague task**: "Fix this" → Better: "Fix the TypeScript type error on line 42 of auth.service.ts"
- **No context**: Asking about code without sharing the relevant files or CLAUDE.md
- **No constraints**: Letting Claude rewrite everything when you only want a targeted fix
- **Chain-of-thought sabotage**: Saying "don't explain" on complex tasks — Claude thinks better when it narrates

## Prompt Templates for Calibraint Stack

### # React Component

"Create a <DataTable> component using AntD with: sorting, pagination,
search, column config from props, TypeScript. Follow our existing
component conventions in src/components/. Return the file only."

### # NestJS Endpoint

"Add a POST /invoices/:id/approve endpoint to InvoicesController.
Use the existing ApproveInvoiceDto, guard with JwtAuthGuard,
emit an InvoiceApprovedEvent. Match the style of existing endpoints."

### # Debug

"The following test is failing. Explain why and fix the root cause
without changing the test itself: [paste test + error]"

---

**💡 The single highest-leverage prompt improvement**: always include the file path and function name you are referring to. This alone reduces back-and-forth by ~60%.

## Exercises

1. **Take 3 prompts you used last week and rewrite them using the 5-part formula**

2. **Create a personal prompt template library in .claude/prompts/**

3. **Time yourself**: compare first-attempt success rate before vs after adopting the formula over 2 weeks