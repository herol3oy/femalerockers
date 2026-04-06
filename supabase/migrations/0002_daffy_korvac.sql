CREATE TABLE "collaborations_table" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"status" varchar(20) DEFAULT 'pending' NOT NULL,
	"bio" text NOT NULL,
	"piece_type" varchar(20) NOT NULL,
	"song_title" varchar(200) NOT NULL,
	"band_name" varchar(200),
	"video_url" varchar(500) NOT NULL,
	"cover_photo_url" varchar(500),
	"upcoming_news" text,
	"admin_notes" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "collaborations_table" ADD CONSTRAINT "collaborations_table_user_id_users_table_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users_table"("id") ON DELETE no action ON UPDATE no action;