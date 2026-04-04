# LEARNINGS.md - Module 18: Custom Skills & Slash Commands

## Insights & Key Takeaways

### 1. Skill Triggering Mechanism

**Learning**: Skills are triggered based on the description field in frontmatter. Claude decides whether to consult a skill based on whether the user's task matches what the description describes.

**Insight**: Make descriptions "pushy" and specific. Include specific contexts and use cases where the skill should apply.

**Application**: When creating skills, spend extra time on the description to ensure proper triggering.

---

### 2. Progressive Disclosure

**Learning**: Skills use a three-level loading system:
1. Metadata (name + description) - always in context
2. SKILL.md body - in context when triggered
3. Bundled resources - loaded as needed

**Insight**: Keep SKILL.md body under 500 lines for optimal context loading. Use references for detailed documentation.

**Application**: Structure skills with clear sections and reference files for deep dives.

---

### 3. Skills vs Commands

**Learning**:
- Skills: Context-based activation, good for complex workflows
- Slash commands: Explicit activation, good for quick actions

**Insight**: Choose the right tool for the use case. Skills are better for domain expertise encapsulation; commands are better for specific task templates.

**Application**: Use skills for complex workflows; reserve slash commands for quick templates.

---

### 4. Testing Skills

**Learning**: Skills should be tested with realistic prompts to ensure they work correctly.

**Insight**: Create 2-3 test cases per skill and evaluate outputs. Iterate based on feedback.

**Application**: Always create test prompts when developing skills, especially for skills with objectively verifiable outputs.

---

### 5. Skill Writing Patterns

**Learning**:
- Use imperative form in instructions
- Explain the **why** behind requirements
- Include examples in a consistent format
- Define output formats explicitly

**Insight**: Today's LLMs respond better to explanations than rigid MUSTs. Use theory of mind to make skills generalizable.

**Application**: Write skills that explain reasoning, not just prescribe actions.

---

### 6. Bundled Resources

**Learning**: Skills can include:
- `scripts/`: Executable helper scripts
- `references/`: Documentation files
- `assets/`: Templates and static resources

**Insight**: If multiple test cases result in the same helper script being written, bundle it in scripts/ to save future invocations.

**Application**: Look for repeated work across test cases and bundle helpers.

---

### 7. Description Optimization

**Learning**: The description field is critical for skill triggering. Use 20 eval queries (10 should-trigger, 10 should-not-trigger) to optimize descriptions.

**Insight**: Near-miss queries (that share keywords but need something different) are the most valuable for testing triggering accuracy.

**Application**: When refining skills, pay special attention to the description field.

---

### 8. Skill Packaging

**Learning**: Skills can be packaged as `.skill` files for distribution.

**Insight**: Package skills when they're ready for sharing with others.

**Application**: Use `python -m scripts.package_skill` to create distributable skill files.

---

## Common Patterns

### Code Generation Skills

- Define clear templates for output
- Include required files (types, tests, styles)
- Specify naming conventions explicitly

### Domain Expertise Skills

- Structure by category/subject
- Include verification checklists
- Reference external documentation

### Workflow Automation Skills

- Break into clear steps
- Include error handling
- Define success criteria

### Analysis Skills

- Define metrics/criteria
- Include output format specifications
- Set thresholds for findings

---

## Mistakes to Avoid

1. **Vague descriptions**: "Does X" instead of specific use cases
2. **Overly rigid instructions**: MUST instead of explaining why
3. **Too much in SKILL.md**: Not using progressive disclosure
4. **No test cases**: Shipping skills without validation
5. **Missing examples**: Not showing expected input/output

---

## Success Criteria

A good skill should:
- [ ] Have a clear, specific description
- [ ] Trigger appropriately for intended use cases
- [ ] Not trigger for irrelevant queries
- [ ] Produce consistent, expected outputs
- [ ] Be well-documented with examples
- [ ] Be testable with realistic prompts

---

## Related Modules

- Module 12: Model Context Protocol (MCP)
- Module 13: Subagents & Multi-Agent Workflows
- Module 17: Native Support & Built-in Capabilities

---

*Last updated: 2026-04-04*