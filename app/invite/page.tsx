import { EnvelopeIcon, LockKeyIcon, UsersThreeIcon } from "@phosphor-icons/react/ssr";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getMemberInvitationData } from "@/lib/invitations/queries";
import { MemberInvitationForm } from "./invitation-form";

async function InviteContent() {
  let data: Awaited<ReturnType<typeof getMemberInvitationData>>;

  try {
    data = await getMemberInvitationData();
  } catch {
    redirect("/");
  }

  if (!data.issuingEnabled) {
    return (
      <section className="min-h-screen">
        <div className="mx-auto max-w-4xl px-4 py-12">
          <Card>
            <CardHeader>
              <CardTitle>Invitations are currently unavailable</CardTitle>
              <CardDescription>New invitations have been paused.</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>
    );
  }

  const usedSlots = 3 - data.remainingSlots;

  return (
    <section className="min-h-screen bg-[radial-gradient(circle_at_top,_hsl(var(--secondary))_0%,_transparent_45%),linear-gradient(to_bottom,_hsl(var(--background)),_hsl(var(--muted)/0.35))]">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <Card>
          <CardHeader>
            <Badge variant="secondary" className="w-fit gap-2">
              <UsersThreeIcon className="h-3.5 w-3.5" />
              Member invitations
            </Badge>
            <CardTitle className="text-3xl">Invite friends</CardTitle>
            <CardDescription>Approved members can send three lifetime invitations.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-3">
            {[1, 2, 3].map((slot) => {
              const used = slot <= usedSlots;
              return (
                <div key={slot} className="rounded-2xl border border-border/60 bg-muted/20 p-5">
                  {used ? (
                    <LockKeyIcon className="mb-3 h-5 w-5 text-muted-foreground" />
                  ) : (
                    <EnvelopeIcon className="mb-3 h-5 w-5 text-muted-foreground" />
                  )}
                  <p className="font-medium">Slot {slot}</p>
                  <p className="text-sm text-muted-foreground">
                    {used ? "Used permanently" : "Available"}
                  </p>
                </div>
              );
            })}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              {data.remainingSlots} invitation {data.remainingSlots === 1 ? "slot" : "slots"}{" "}
              remaining
            </CardTitle>
            <CardDescription>
              Expired and revoked invitations still use their slot. A failed email delivery does
              not.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <MemberInvitationForm remainingSlots={data.remainingSlots} />
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

export default function InvitePage() {
  return (
    <Suspense
      fallback={
        <section className="min-h-screen">
          <div className="mx-auto max-w-6xl px-4 py-12 text-muted-foreground">
            Loading invitations…
          </div>
        </section>
      }
    >
      <InviteContent />
    </Suspense>
  );
}
