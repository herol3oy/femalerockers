ALTER TABLE "challenges_table" ADD COLUMN "slug" varchar(100);--> statement-breakpoint
ALTER TABLE "challenges_table" ADD CONSTRAINT "challenges_table_slug_unique" UNIQUE("slug");