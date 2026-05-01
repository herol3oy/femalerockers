ALTER TABLE "users_table" ADD COLUMN "newsletter_opt_in" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "users_table" ADD COLUMN "newsletter_opt_in_at" timestamp;