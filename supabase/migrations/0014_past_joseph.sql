ALTER TABLE "users_table" ALTER COLUMN "main_instrument" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "users_table" ALTER COLUMN "genre" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "users_table" ADD COLUMN "website_url" varchar(255);