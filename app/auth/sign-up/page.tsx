import Link from "next/link";
import { Suspense } from "react";
import { SignUpForm } from "@/components/sign-up-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getInvitationPageState } from "@/lib/invitations/redemption";

async function SignUpContent({
  searchParams,
}: {
  searchParams: Promise<{ invite?: string | string[] }>;
}) {
  const params = await searchParams;
  const invitationToken = Array.isArray(params.invite) ? params.invite[0] : params.invite;
  const state = await getInvitationPageState(invitationToken);

  if (state.state !== "available") {
    const disabled = state.state === "disabled";
    return (
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <Card>
            <CardHeader>
              <CardTitle>
                {disabled ? "Registration is unavailable" : "Invitation unavailable"}
              </CardTitle>
              <CardDescription>
                {disabled
                  ? "Invitation registration has been paused."
                  : "This link is invalid, expired, revoked, failed, or already used."}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline">
                <Link href="/auth/login">Go to login</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <SignUpForm
          invitationToken={invitationToken!}
          recipientEmail={state.invitation.recipientEmail}
        />
      </div>
    </div>
  );
}

export default function Page({
  searchParams,
}: {
  searchParams: Promise<{ invite?: string | string[] }>;
}) {
  return (
    <Suspense>
      <SignUpContent searchParams={searchParams} />
    </Suspense>
  );
}
