import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { db } from "@/app/db";
import { usersTable } from "@/app/db/schema";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getInvitationPageState } from "@/lib/invitations/redemption";
import { normalizeEmail } from "@/lib/invitations/validation";
import { createClient } from "@/lib/supabase/server";
import { OnboardingForm } from "./onboarding-form";

async function OnboardingContent({
  searchParams,
}: {
  searchParams: Promise<{ invite?: string | string[] }>;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) {
    redirect("/auth/login");
  }

  const [existingMember] = await db
    .select({ id: usersTable.id })
    .from(usersTable)
    .where(eq(usersTable.id, user.id))
    .limit(1);

  if (existingMember) {
    redirect("/profile");
  }

  const params = await searchParams;
  const invitationToken = Array.isArray(params.invite) ? params.invite[0] : params.invite;
  const state = await getInvitationPageState(invitationToken);

  if (state.state === "disabled") {
    return (
      <main className="flex min-h-screen items-center justify-center p-6">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Registration is unavailable</CardTitle>
            <CardDescription>
              Invitation redemption has been paused. Your profile cannot be created right now.
            </CardDescription>
          </CardHeader>
        </Card>
      </main>
    );
  }

  if (
    state.state !== "available" ||
    state.invitation.recipientEmail !== normalizeEmail(user.email)
  ) {
    redirect(
      `/auth/error?error=${encodeURIComponent(
        "This invitation is invalid or belongs to another email address.",
      )}`,
    );
  }

  return <OnboardingForm invitationToken={invitationToken!} />;
}

export default function OnboardingPage({
  searchParams,
}: {
  searchParams: Promise<{ invite?: string | string[] }>;
}) {
  return (
    <Suspense>
      <OnboardingContent searchParams={searchParams} />
    </Suspense>
  );
}
