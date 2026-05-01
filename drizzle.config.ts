import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

const isProd = process.env.DB_ENV === "prod";
config({ path: isProd ? ".env.local" : ".env.development.local", quiet: true });

export default defineConfig({
  schema: "./app/db/schema.ts",
  out: "./supabase/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
