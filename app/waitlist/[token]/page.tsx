import { and, eq, sql } from "drizzle-orm";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { db } from "@/app/db";
import {
  waitlistEntriesTable,
  waitlistInvitationsTable,
} from "@/app/db/schema";
import { WaitlistClient } from "./waitlist-client";

type Props = {
  params: Promise<{ token: string }>;
};

function WaitlistSkeleton() {
  return (
    <main className="mx-auto w-full max-w-2xl px-6 py-14 sm:px-8 sm:py-20">
      <div className="space-y-4">
        <div className="h-6 w-32 animate-pulse rounded-md bg-muted" />
        <div className="h-12 w-72 animate-pulse rounded-xl bg-muted" />
        <div className="h-5 w-80 animate-pulse rounded-lg bg-muted" />
      </div>
      <div className="mt-10 space-y-8">
        <div className="h-48 animate-pulse rounded-3xl bg-muted" />
        <div className="h-40 animate-pulse rounded-3xl bg-muted" />
        <div className="h-40 animate-pulse rounded-3xl bg-muted" />
      </div>
    </main>
  );
}

async function WaitlistContent({ params }: Props) {
  const { token } = await params;

  const [invitation] = await db
    .select()
    .from(waitlistInvitationsTable)
    .where(eq(waitlistInvitationsTable.token, token))
    .limit(1);

  if (!invitation) {
    notFound();
  }

  const isConfirmed = invitation.status === "confirmed";

  let entryId: string | null = null;
  let referralCode: string | null = null;
  let sentReferralEmails: string[] = [];

  if (isConfirmed) {
    const [entry] = await db
      .select({
        id: waitlistEntriesTable.id,
        referralCode: waitlistEntriesTable.referralCode,
      })
      .from(waitlistEntriesTable)
      .where(eq(waitlistEntriesTable.email, invitation.email))
      .limit(1);

    if (entry) {
      entryId = entry.id;
      referralCode = entry.referralCode;

      const sentReferrals = await db
        .select({ email: waitlistInvitationsTable.email })
        .from(waitlistInvitationsTable)
        .where(
          and(
            eq(waitlistInvitationsTable.referrerId, entry.id),
            sql`${waitlistInvitationsTable.status} IN ('sent', 'confirmed')`,
          ),
        )
        .orderBy(waitlistInvitationsTable.createdAt);
      sentReferralEmails = sentReferrals.map((r) => r.email);
    }
  }

  return (
    <WaitlistClient
      token={token}
      email={invitation.email}
      isConfirmed={isConfirmed}
      entryId={entryId}
      referralCode={referralCode}
      sentReferralEmails={sentReferralEmails}
    />
  );
}

export default function WaitlistPage({ params }: Props) {
  return (
    <Suspense fallback={<WaitlistSkeleton />}>
      <WaitlistContent params={params} />
    </Suspense>
  );
}
