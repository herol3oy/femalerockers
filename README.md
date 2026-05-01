This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

## Database

This project uses **Drizzle ORM** for schema management and **Supabase CLI** for storage/RLS migrations.

### Environment files

| File | Purpose |
|---|---|
| `.env.development.local` | Local Supabase database |
| `.env.local` | Production Supabase database |

> ⚠️ Note: `.env.local` is loaded in **all** environments including production. `.env.development.local` is only loaded when `NODE_ENV=development`. This follows Next.js conventions but is counterintuitive — `.env.local` here is intentionally used as the prod config.

### Available scripts

| Script | What it does |
|---|---|
| `npm run db:generate` | Generate a new Drizzle migration file from schema changes |
| `npm run db:migrate` | Apply Drizzle migrations to **local** DB |
| `npm run db:migrate:prod` | Apply Drizzle migrations to **prod** DB |
| `npm run db:push` | Apply Supabase SQL migrations (RLS/storage) to **local** DB |
| `npm run db:push:prod` | Apply Supabase SQL migrations (RLS/storage) to **prod** DB |

### Migration types

There are two separate migration systems:

**Drizzle migrations** (`supabase/migrations/0000_*.sql`, `0001_*.sql`, …)
Managed by `drizzle-kit`. Track table schema changes (columns, foreign keys, indexes).

**Supabase migrations** (`supabase/migrations/20260410*.sql`, `20260501*.sql`, …)
Managed by `supabase db push`. Track storage bucket setup and RLS policies.

### Workflows

#### Fresh production setup

```bash
# 1. Apply table schema
npm run db:migrate:prod

# 2. Apply storage buckets + RLS policies
npm run db:push:prod
```

#### Schema change (add/modify a table or column)

```bash
# 1. Edit app/db/schema.ts
# 2. Generate migration file
npm run db:generate

# 3. Test locally
npm run db:migrate

# 4. Apply to prod
npm run db:migrate:prod
```

#### New RLS policy or storage rule

```bash
# 1. Create a new timestamped migration file
npx supabase migration new <descriptive_name>

# 2. Write SQL into the generated file in supabase/migrations/

# 3. Test locally
npm run db:push

# 4. Apply to prod
npm run db:push:prod
```

> Note: If the table is already deployed, you do **not** need to repeat `ALTER TABLE ... ENABLE ROW LEVEL SECURITY` — just add the new `CREATE POLICY` statements.

### Rules

- Never create or modify tables directly in the Supabase dashboard — always go through `schema.ts` + Drizzle.
- Never use `drizzle-kit push` on prod — it skips writing migration history and breaks `migrate`.
- Always run `db:migrate` locally before `db:migrate:prod`.
- Drizzle and Supabase CLI each track which migrations have been applied — re-running any push/migrate command is safe.
