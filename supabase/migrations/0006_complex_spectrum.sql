CREATE TABLE "song_review_likes_table" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"review_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "song_review_likes_table_user_id_review_id_unique" UNIQUE("user_id","review_id")
);
--> statement-breakpoint
ALTER TABLE "song_review_likes_table" ADD CONSTRAINT "song_review_likes_table_user_id_users_table_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users_table"("id") ON DELETE cascade ON UPDATE no action;