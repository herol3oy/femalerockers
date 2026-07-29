import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import type { NextRequest } from "next/server";
import { db } from "@/app/db";
import { usersTable } from "@/app/db/schema";
import { InvitationError } from "@/lib/invitations/errors";
import { assertInvitationMatchesEmail } from "@/lib/invitations/redemption";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const requestedNext = searchParams.get("next") ?? "/profile";
  const next =
    requestedNext.startsWith("/") && !requestedNext.startsWith("//")
      ? requestedNext
      : "/profile";

  if (code) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      const nextUrl = new URL(next, request.nextUrl.origin);
      const invitationToken =
        nextUrl.pathname === "/onboarding"
          ? nextUrl.searchParams.get("invite")
          : null;

      if (invitationToken) {
        const email = data.user?.email;
        try {
          if (!email)
            throw new InvitationError("No verified email was returned.");
          await assertInvitationMatchesEmail(invitationToken, email);
        } catch (invitationError) {
          await supabase.auth.signOut();
          const message =
            invitationError instanceof InvitationError
              ? invitationError.message
              : "Could not verify this invitation.";
          redirect(`/auth/error?error=${encodeURIComponent(message)}`);
        }
      } else if (data.user) {
        const [member] = await db
          .select({ id: usersTable.id })
          .from(usersTable)
          .where(eq(usersTable.id, data.user.id))
          .limit(1);

        if (!member) {
          await supabase.auth.signOut();
          redirect(
            `/auth/error?error=${encodeURIComponent(
              "New accounts require a valid registration invitation.",
            )}`,
          );
        }
      }

      redirect(next);
    }
  }

  redirect(`/auth/error?error=Could not authenticate`);
}
