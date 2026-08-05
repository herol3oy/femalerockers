ALTER TABLE "registration_invitations" DROP CONSTRAINT "registration_invitations_inviter_id_users_table_id_fk";
--> statement-breakpoint
ALTER TABLE "registration_invitations" DROP CONSTRAINT "registration_invitations_accepted_user_id_users_table_id_fk";
--> statement-breakpoint
ALTER TABLE "registration_invitations" ADD CONSTRAINT "registration_invitations_inviter_id_users_table_id_fk" FOREIGN KEY ("inviter_id") REFERENCES "public"."users_table"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "registration_invitations" ADD CONSTRAINT "registration_invitations_accepted_user_id_users_table_id_fk" FOREIGN KEY ("accepted_user_id") REFERENCES "public"."users_table"("id") ON DELETE cascade ON UPDATE no action;