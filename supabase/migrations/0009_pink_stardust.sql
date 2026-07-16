CREATE TABLE "waitlist_entries" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"referral_code" varchar(64) NOT NULL,
	"accepted_tos" boolean NOT NULL,
	"invitation_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "waitlist_entries_email_unique" UNIQUE("email"),
	CONSTRAINT "waitlist_entries_referral_code_unique" UNIQUE("referral_code")
);
--> statement-breakpoint
CREATE TABLE "waitlist_invitations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"token" varchar(64) NOT NULL,
	"source" varchar(20) NOT NULL,
	"referrer_id" uuid,
	"status" varchar(20) DEFAULT 'pending' NOT NULL,
	"sent_at" timestamp,
	"confirmed_at" timestamp,
	"error_message" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "waitlist_invitations_token_unique" UNIQUE("token")
);
--> statement-breakpoint
ALTER TABLE "waitlist_entries" ADD CONSTRAINT "waitlist_entries_invitation_id_waitlist_invitations_id_fk" FOREIGN KEY ("invitation_id") REFERENCES "public"."waitlist_invitations"("id") ON DELETE no action ON UPDATE no action;