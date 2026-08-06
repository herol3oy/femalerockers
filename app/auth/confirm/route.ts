import type { EmailOtpType } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import type { NextRequest } from "next/server";
import { InvitationError } from "@/lib/invitations/errors";
import { assertInvitationMatchesEmail } from "@/lib/invitations/redemption";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const requestedNext = searchParams.get("next") ?? "/";
  const next =
    requestedNext.startsWith("/") && !requestedNext.startsWith("//") ? requestedNext : "/";

  if (token_hash && type) {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });
    if (!error) {
      const nextUrl = new URL(next, request.nextUrl.origin);
      const invitationToken =
        nextUrl.pathname === "/onboarding" ? nextUrl.searchParams.get("invite") : null;

      if (invitationToken) {
        const email = data.user?.email;
        try {
          if (!email) throw new InvitationError("No verified email was returned.");
          await assertInvitationMatchesEmail(invitationToken, email);
        } catch (invitationError) {
          await supabase.auth.signOut();
          const message =
            invitationError instanceof InvitationError
              ? invitationError.message
              : "Could not verify this invitation.";
          redirect(`/auth/error?error=${encodeURIComponent(message)}`);
        }
      }

      // redirect user to specified redirect URL or root of app
      redirect(next);
    } else {
      // redirect the user to an error page with some instructions
      redirect(`/auth/error?error=${error?.message}`);
    }
  }

  // redirect the user to an error page with some instructions
  redirect(`/auth/error?error=No token hash or type`);
}
