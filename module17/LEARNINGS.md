# Module 17: Learnings & Insights

## Key Takeaways

### 1. Native Capabilities Outweigh External Tools

Claude's built-in features are often more efficient than external integrations:
- **Artifacts** persist across sessions - no need for third-party snippet managers
- **File Upload** handles code review better than copy-paste
- **Web Search** provides current docs without browser switching

### 2. Context is King

The more context you provide, the better results:
- Upload relevant files for analysis
- Describe the expected behavior clearly
- Include version numbers and stack details

### 3. Capability Selection Matters

| Task | Best Capability | Why |
|------|-----------------|-----|
| Generate component | Artifacts | Reusable, persists |
| Debug UI | Image Input | Visual context |
| Research library | Web Search | Fresh docs |
| Process data | File Upload | Direct analysis |
| Team work | Shared Projects | Shared context |

## Patterns Discovered

### Effective Artifact Usage

1. **Name descriptively**: `RwaMinter` not `Contract1`
2. **Include JSDoc**: Document props and usage
3. **Make composable**: Works with other components
4. **Version in comments**: Track changes

### Effective File Upload

1. **Specify goal**: "Analyze for security" not just "look at this"
2. **Limit size**: Under 10MB for optimal performance
3. **Follow up**: Ask for specific insights after upload

### Effective Image Input

1. **Crop to issue**: Don't upload full page
2. **Describe problem**: "Red button should be blue"
3. **Include console**: Errors + screenshot = faster fix

### Effective Web Search

1. **Be specific**: Include version numbers
2. **Search then code**: Research first, implement second
3. **Verify freshness**: Check dates

## RWA Workflow Integration

### Contract Development Flow

```
1. Web Search → Find latest patterns
2. Artifacts → Generate contract template
3. File Upload → Review existing code
4. Analysis → Check for patterns
5. Project → Maintain context
```

### Frontend Development Flow

```
1. Web Search → Find library docs
2. Image Input → Debug UI issues
3. Artifacts → Generate components
4. Project → Maintain component library
```

### Team Collaboration Flow

```
1. Shared Project → Set up team context
2. File Upload → Share code for review
3. Artifacts → Share common utilities
4. Projects → Individual work
```

## Common Mistakes to Avoid

1. **Don't over-use artifacts**: Not everything needs to be saved
2. **Don't skip context**: Always explain what you're trying to achieve
3. **Don't ignore projects**: Use them for ongoing work
4. **Don't forget shared projects**: Enable team collaboration early

## Best Practices Summary

- [x] Use Artifacts for reusable code
- [x] Upload files for analysis
- [x] Attach images for UI debugging
- [x] Search for unfamiliar areas
- [x] Maintain Projects for ongoing work
- [x] Use Shared Projects for teams
- [x] Provide clear context
- [x] Be specific with requests

---

*Last updated: 2026-04-04*