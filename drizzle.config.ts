import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({ path: ".env.development.local", quiet: true });
config({ path: ".env.local", quiet: true });

export default defineConfig({
  schema: "./app/db/schema.ts",
  out: "./supabase/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
