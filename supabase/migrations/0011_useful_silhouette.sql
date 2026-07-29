CREATE TABLE "account_deletion_feedback" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"reason" varchar(50) NOT NULL,
	"details" varchar(500),
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "account_deletion_feedback" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "challenge_participations_table" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "collaborations_table" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "song_review_comments_table" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "song_review_likes_table" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "song_review_ratings_table" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "users_table" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "collaborations_table" DROP CONSTRAINT "collaborations_table_user_id_users_table_id_fk";
--> statement-breakpoint
ALTER TABLE "users_table" ADD COLUMN "deactivated_at" timestamp;--> statement-breakpoint
ALTER TABLE "collaborations_table" ADD CONSTRAINT "collaborations_table_user_id_users_table_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users_table"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE POLICY "challenge_participations_active_owner_select" ON "challenge_participations_table" AS RESTRICTIVE FOR SELECT TO public USING (
        EXISTS (
          SELECT 1 FROM users_table
          WHERE users_table.id = user_id
            AND users_table.deactivated_at IS NULL
        )
      );--> statement-breakpoint
CREATE POLICY "challenge_participations_active_owner_insert" ON "challenge_participations_table" AS RESTRICTIVE FOR INSERT TO public WITH CHECK (
        EXISTS (
          SELECT 1 FROM users_table
          WHERE users_table.id = user_id
            AND users_table.deactivated_at IS NULL
        )
      );--> statement-breakpoint
CREATE POLICY "challenge_participations_active_owner_update" ON "challenge_participations_table" AS RESTRICTIVE FOR UPDATE TO public USING (
        EXISTS (
          SELECT 1 FROM users_table
          WHERE users_table.id = user_id
            AND users_table.deactivated_at IS NULL
        )
      ) WITH CHECK (
        EXISTS (
          SELECT 1 FROM users_table
          WHERE users_table.id = user_id
            AND users_table.deactivated_at IS NULL
        )
      );--> statement-breakpoint
CREATE POLICY "challenge_participations_active_owner_delete" ON "challenge_participations_table" AS RESTRICTIVE FOR DELETE TO public USING (
        EXISTS (
          SELECT 1 FROM users_table
          WHERE users_table.id = user_id
            AND users_table.deactivated_at IS NULL
        )
      );--> statement-breakpoint
CREATE POLICY "collaborations_active_owner_select" ON "collaborations_table" AS RESTRICTIVE FOR SELECT TO public USING (
        EXISTS (
          SELECT 1 FROM users_table
          WHERE users_table.id = user_id
            AND users_table.deactivated_at IS NULL
        )
      );--> statement-breakpoint
CREATE POLICY "collaborations_active_owner_insert" ON "collaborations_table" AS RESTRICTIVE FOR INSERT TO public WITH CHECK (
        EXISTS (
          SELECT 1 FROM users_table
          WHERE users_table.id = user_id
            AND users_table.deactivated_at IS NULL
        )
      );--> statement-breakpoint
CREATE POLICY "collaborations_active_owner_update" ON "collaborations_table" AS RESTRICTIVE FOR UPDATE TO public USING (
        EXISTS (
          SELECT 1 FROM users_table
          WHERE users_table.id = user_id
            AND users_table.deactivated_at IS NULL
        )
      ) WITH CHECK (
        EXISTS (
          SELECT 1 FROM users_table
          WHERE users_table.id = user_id
            AND users_table.deactivated_at IS NULL
        )
      );--> statement-breakpoint
CREATE POLICY "collaborations_active_owner_delete" ON "collaborations_table" AS RESTRICTIVE FOR DELETE TO public USING (
        EXISTS (
          SELECT 1 FROM users_table
          WHERE users_table.id = user_id
            AND users_table.deactivated_at IS NULL
        )
      );--> statement-breakpoint
CREATE POLICY "song_review_comments_active_owner_select" ON "song_review_comments_table" AS RESTRICTIVE FOR SELECT TO public USING (
        EXISTS (
          SELECT 1 FROM users_table
          WHERE users_table.id = user_id
            AND users_table.deactivated_at IS NULL
        )
      );--> statement-breakpoint
CREATE POLICY "song_review_comments_active_owner_insert" ON "song_review_comments_table" AS RESTRICTIVE FOR INSERT TO public WITH CHECK (
        EXISTS (
          SELECT 1 FROM users_table
          WHERE users_table.id = user_id
            AND users_table.deactivated_at IS NULL
        )
      );--> statement-breakpoint
CREATE POLICY "song_review_comments_active_owner_update" ON "song_review_comments_table" AS RESTRICTIVE FOR UPDATE TO public USING (
        EXISTS (
          SELECT 1 FROM users_table
          WHERE users_table.id = user_id
            AND users_table.deactivated_at IS NULL
        )
      ) WITH CHECK (
        EXISTS (
          SELECT 1 FROM users_table
          WHERE users_table.id = user_id
            AND users_table.deactivated_at IS NULL
        )
      );--> statement-breakpoint
CREATE POLICY "song_review_comments_active_owner_delete" ON "song_review_comments_table" AS RESTRICTIVE FOR DELETE TO public USING (
        EXISTS (
          SELECT 1 FROM users_table
          WHERE users_table.id = user_id
            AND users_table.deactivated_at IS NULL
        )
      );--> statement-breakpoint
CREATE POLICY "song_review_likes_active_owner_select" ON "song_review_likes_table" AS RESTRICTIVE FOR SELECT TO public USING (
        EXISTS (
          SELECT 1 FROM users_table
          WHERE users_table.id = user_id
            AND users_table.deactivated_at IS NULL
        )
      );--> statement-breakpoint
CREATE POLICY "song_review_likes_active_owner_insert" ON "song_review_likes_table" AS RESTRICTIVE FOR INSERT TO public WITH CHECK (
        EXISTS (
          SELECT 1 FROM users_table
          WHERE users_table.id = user_id
            AND users_table.deactivated_at IS NULL
        )
      );--> statement-breakpoint
CREATE POLICY "song_review_likes_active_owner_delete" ON "song_review_likes_table" AS RESTRICTIVE FOR DELETE TO public USING (
        EXISTS (
          SELECT 1 FROM users_table
          WHERE users_table.id = user_id
            AND users_table.deactivated_at IS NULL
        )
      );--> statement-breakpoint
CREATE POLICY "song_review_ratings_active_owner_select" ON "song_review_ratings_table" AS RESTRICTIVE FOR SELECT TO public USING (
        EXISTS (
          SELECT 1 FROM users_table
          WHERE users_table.id = user_id
            AND users_table.deactivated_at IS NULL
        )
      );--> statement-breakpoint
CREATE POLICY "song_review_ratings_active_owner_insert" ON "song_review_ratings_table" AS RESTRICTIVE FOR INSERT TO public WITH CHECK (
        EXISTS (
          SELECT 1 FROM users_table
          WHERE users_table.id = user_id
            AND users_table.deactivated_at IS NULL
        )
      );--> statement-breakpoint
CREATE POLICY "song_review_ratings_active_owner_update" ON "song_review_ratings_table" AS RESTRICTIVE FOR UPDATE TO public USING (
        EXISTS (
          SELECT 1 FROM users_table
          WHERE users_table.id = user_id
            AND users_table.deactivated_at IS NULL
        )
      ) WITH CHECK (
        EXISTS (
          SELECT 1 FROM users_table
          WHERE users_table.id = user_id
            AND users_table.deactivated_at IS NULL
        )
      );--> statement-breakpoint
CREATE POLICY "song_review_ratings_active_owner_delete" ON "song_review_ratings_table" AS RESTRICTIVE FOR DELETE TO public USING (
        EXISTS (
          SELECT 1 FROM users_table
          WHERE users_table.id = user_id
            AND users_table.deactivated_at IS NULL
        )
      );--> statement-breakpoint
CREATE POLICY "users_active_public_select" ON "users_table" AS RESTRICTIVE FOR SELECT TO public USING (
        deactivated_at IS NULL
        OR (select auth.uid()) = id
      );--> statement-breakpoint
CREATE POLICY "users_active_owner_update" ON "users_table" AS RESTRICTIVE FOR UPDATE TO public USING (
        deactivated_at IS NULL
      ) WITH CHECK (
        deactivated_at IS NULL
      );--> statement-breakpoint
CREATE POLICY "users_active_owner_delete" ON "users_table" AS RESTRICTIVE FOR DELETE TO public USING (
        deactivated_at IS NULL
      );