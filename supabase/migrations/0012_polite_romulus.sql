CREATE TABLE "registration_invitations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"recipient_email" text NOT NULL,
	"token_hash" varchar(64) NOT NULL,
	"source" varchar(20) NOT NULL,
	"inviter_id" uuid NOT NULL,
	"member_slot" integer,
	"status" varchar(20) DEFAULT 'pending' NOT NULL,
	"accepted_user_id" uuid,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"sent_at" timestamp,
	"expires_at" timestamp NOT NULL,
	"accepted_at" timestamp,
	"revoked_at" timestamp,
	"delivery_error" text,
	CONSTRAINT "registration_invitations_token_hash_unique" UNIQUE("token_hash"),
	CONSTRAINT "registration_invitations_recipient_email_normalized_check" CHECK ("registration_invitations"."recipient_email" = lower(btrim("registration_invitations"."recipient_email"))),
	CONSTRAINT "registration_invitations_token_hash_check" CHECK ("registration_invitations"."token_hash" ~ '^[0-9a-f]{64}$'),
	CONSTRAINT "registration_invitations_source_check" CHECK ("registration_invitations"."source" IN ('admin', 'member')),
	CONSTRAINT "registration_invitations_status_check" CHECK ("registration_invitations"."status" IN ('pending', 'accepted', 'expired', 'revoked', 'failed')),
	CONSTRAINT "registration_invitations_member_slot_check" CHECK ((
        ("registration_invitations"."source" = 'admin' AND "registration_invitations"."member_slot" IS NULL)
        OR
        ("registration_invitations"."source" = 'member' AND "registration_invitations"."member_slot" BETWEEN 1 AND 3)
      )),
	CONSTRAINT "registration_invitations_expiration_check" CHECK ("registration_invitations"."expires_at" > "registration_invitations"."created_at"),
	CONSTRAINT "registration_invitations_acceptance_check" CHECK ((
        ("registration_invitations"."status" = 'accepted' AND "registration_invitations"."accepted_user_id" IS NOT NULL AND "registration_invitations"."accepted_at" IS NOT NULL)
        OR
        ("registration_invitations"."status" <> 'accepted' AND "registration_invitations"."accepted_user_id" IS NULL AND "registration_invitations"."accepted_at" IS NULL)
      )),
	CONSTRAINT "registration_invitations_revocation_check" CHECK ((
        ("registration_invitations"."status" = 'revoked' AND "registration_invitations"."revoked_at" IS NOT NULL)
        OR
        ("registration_invitations"."status" <> 'revoked' AND "registration_invitations"."revoked_at" IS NULL)
      )),
	CONSTRAINT "registration_invitations_failure_check" CHECK ((
        ("registration_invitations"."status" = 'failed' AND "registration_invitations"."delivery_error" IS NOT NULL)
        OR
        ("registration_invitations"."status" <> 'failed' AND "registration_invitations"."delivery_error" IS NULL)
      ))
);
--> statement-breakpoint
ALTER TABLE "registration_invitations" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "registration_invitations" ADD CONSTRAINT "registration_invitations_inviter_id_users_table_id_fk" FOREIGN KEY ("inviter_id") REFERENCES "public"."users_table"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "registration_invitations" ADD CONSTRAINT "registration_invitations_accepted_user_id_users_table_id_fk" FOREIGN KEY ("accepted_user_id") REFERENCES "public"."users_table"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "registration_invitations_inviter_id_idx" ON "registration_invitations" USING btree ("inviter_id");--> statement-breakpoint
CREATE INDEX "registration_invitations_accepted_user_id_idx" ON "registration_invitations" USING btree ("accepted_user_id");--> statement-breakpoint
CREATE INDEX "registration_invitations_status_expires_at_idx" ON "registration_invitations" USING btree ("status","expires_at");--> statement-breakpoint
CREATE INDEX "registration_invitations_inviter_created_at_idx" ON "registration_invitations" USING btree ("inviter_id","created_at");--> statement-breakpoint
CREATE UNIQUE INDEX "registration_invitations_active_recipient_email_unique" ON "registration_invitations" USING btree ("recipient_email") WHERE "registration_invitations"."status" = 'pending';--> statement-breakpoint
CREATE UNIQUE INDEX "registration_invitations_member_slot_unique" ON "registration_invitations" USING btree ("inviter_id","member_slot") WHERE "registration_invitations"."source" = 'member' AND "registration_invitations"."member_slot" IS NOT NULL AND "registration_invitations"."status" <> 'failed';--> statement-breakpoint
CREATE UNIQUE INDEX "registration_invitations_accepted_user_unique" ON "registration_invitations" USING btree ("accepted_user_id") WHERE "registration_invitations"."accepted_user_id" IS NOT NULL;