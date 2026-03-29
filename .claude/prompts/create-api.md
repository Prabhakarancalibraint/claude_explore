# Create API Endpoint Template

**Role**: You are a NestJS architect with expertise in RESTful API design.
**Context**: Project uses [ORM - e.g., TypeORM, Prisma] with [database - e.g., PostgreSQL, MySQL]. Auth uses [auth method - e.g., JWT, Passport].
**Task**: Add [HTTP method - e.g., POST] /[endpoint - e.g., invoices/:id/approve] endpoint to [ControllerName].

Use [existing DTO name if available, or describe new DTO].
Guard with [AuthGuard name].
Emit [EventName] event if applicable.
**Constraints**:
- Use existing DTOs if available
- Apply JwtAuthGuard or appropriate guard
- Follow RESTful conventions
- Do not change existing endpoint behavior
**Output Format**: Return the modified controller file and any new files (DTOs, services)