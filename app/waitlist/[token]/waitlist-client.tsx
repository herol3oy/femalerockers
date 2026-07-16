"use client";

import {
  CheckCircleIcon,
  EnvelopeSimpleOpenIcon,
  WarningIcon,
} from "@phosphor-icons/react/ssr";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ConfirmForm } from "./confirm-form";
import { ReferralForm } from "./referral-form";

type Props = {
  token: string;
  email: string;
  isConfirmed: boolean;
  entryId: string | null;
  referralCode: string | null;
  sentReferralEmails: string[];
};

export function WaitlistClient({
  token,
  email,
  isConfirmed,
  entryId,
  referralCode: initialReferralCode,
  sentReferralEmails,
}: Props) {
  const [confirmed, setConfirmed] = useState(isConfirmed);
  const [currentEntryId, setCurrentEntryId] = useState(entryId);
  const [referralCode, setReferralCode] = useState(initialReferralCode);
  const [allSent, setAllSent] = useState(false);

  function handleConfirm(newEntryId: string, code: string) {
    setConfirmed(true);
    setCurrentEntryId(newEntryId);
    setReferralCode(code);
  }

  return (
    <main className="mx-auto w-full max-w-2xl px-6 py-14 sm:px-8 sm:py-20">
      <header className="space-y-4">
        <Badge variant="secondary" className="w-fit gap-2">
          <EnvelopeSimpleOpenIcon className="h-3.5 w-3.5" />
          Early bird invitation
        </Badge>
        <p className="text-sm text-muted-foreground">{email}</p>
        <h1 className="font-heading text-4xl font-semibold tracking-tight sm:text-5xl">
          Join Female Rockers
        </h1>
        <p className="text-base text-muted-foreground sm:text-lg">
          You&apos;ve been invited to join as an early bird member.
        </p>
      </header>

      <div className="mt-10 space-y-8">
        <Card className="overflow-hidden border-border/70 bg-background/95 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl">What is Female Rockers?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              Female Rockers is a platform built for women who rock. Create a
              standout artist profile, share your music, and connect with fans
              and collaborators.
            </p>
            <p>
              We&apos;re building a community that amplifies women in music — on
              and off stage. As an early bird member, you&apos;ll get priority
              access before we open to the public.
            </p>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-border/70 bg-background/95 shadow-sm">
          <CardHeader>
            {confirmed ? (
              <>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <CheckCircleIcon className="h-5 w-5 text-emerald-500" />
                  You&apos;re on the waitlist!
                </CardTitle>
                <CardDescription>
                  Your spot is secured. Invite your friends below to build the
                  community together.
                </CardDescription>
              </>
            ) : (
              <>
                <CardTitle className="text-xl">Confirm your spot</CardTitle>
                <CardDescription>
                  Accept the terms below to secure your early bird position on
                  the waitlist.
                </CardDescription>
              </>
            )}
          </CardHeader>
          <CardContent>
            <ConfirmForm
              token={token}
              disabled={confirmed}
              onConfirm={handleConfirm}
            />
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-border/70 bg-background/95 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl">Invite your friends</CardTitle>
            <CardDescription>
              {confirmed
                ? "Each friend will receive a personalized invitation to join the waitlist."
                : "Confirm your spot first to unlock friend invitations."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {referralCode && currentEntryId ? (
              <>
                <ReferralForm
                  entryId={currentEntryId}
                  referralCode={referralCode}
                  enabled={confirmed}
                  onAllSent={() => setAllSent(true)}
                  sentReferralEmails={sentReferralEmails}
                />
                {allSent && (
                  <div className="mt-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 px-4 py-3 text-sm text-emerald-200">
                    <p className="font-medium">
                      Thank you for spreading the word! Your invitations have
                      been sent.
                    </p>
                  </div>
                )}
              </>
            ) : (
              <div className="rounded-2xl border border-dashed bg-muted/20 px-4 py-8 text-center text-sm text-muted-foreground">
                Confirm your spot to unlock friend invitations.
              </div>
            )}
          </CardContent>
        </Card>

        <div className="flex items-start gap-2 rounded-2xl border border-amber-500/20 bg-amber-500/5 px-4 py-3 text-sm text-amber-200">
          <WarningIcon className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
          <p>
            This invitation is personal and single-use. Share it with friends
            after you confirm — you&apos;ll be able to invite up to 3 people.
          </p>
        </div>
      </div>
    </main>
  );
}
