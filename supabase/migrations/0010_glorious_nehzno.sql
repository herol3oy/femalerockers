CREATE TABLE "referrals_table" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"referrer_id" uuid NOT NULL,
	"referred_user_id" uuid NOT NULL,
	"completed_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "referrals_table_referred_user_id_unique" UNIQUE("referred_user_id")
);
--> statement-breakpoint
ALTER TABLE "referrals_table" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "users_table" ADD COLUMN "referral_code" varchar(10) DEFAULT upper(substr(replace(gen_random_uuid()::text, '-', ''), 1, 10)) NOT NULL;--> statement-breakpoint
ALTER TABLE "referrals_table" ADD CONSTRAINT "referrals_table_referrer_id_users_table_id_fk" FOREIGN KEY ("referrer_id") REFERENCES "public"."users_table"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "referrals_table" ADD CONSTRAINT "referrals_table_referred_user_id_users_table_id_fk" FOREIGN KEY ("referred_user_id") REFERENCES "public"."users_table"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "referrals_referrer_id_idx" ON "referrals_table" USING btree ("referrer_id");--> statement-breakpoint
ALTER TABLE "users_table" ADD CONSTRAINT "users_table_referral_code_unique" UNIQUE("referral_code");--> statement-breakpoint
CREATE POLICY "referrals_select_admin" ON "referrals_table" AS PERMISSIVE FOR SELECT TO public USING (public.is_admin());