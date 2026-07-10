<!-- BEGIN:nextjs-agent-rules -->
# AI Agent Instructions

## Next.js

This is NOT the Next.js you know.

## Database & Migrations

This project uses Drizzle ORM.

**Never manually create or edit generated migration files.**

Do not invent migration filenames.

The following files are generated and must not be created or edited manually:

- `migrations/*.sql`
- `migrations/meta/*.json`

If the CLI cannot be run in the current environment, do **not** fabricate migration files. Instead, explain which command should be executed.

<!-- END:nextjs-agent-rules -->