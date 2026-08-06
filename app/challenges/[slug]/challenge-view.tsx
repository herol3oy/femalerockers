"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import {
  type ChallengeWithStatus,
  joinChallenge,
  leaveChallenge,
  type ParticipationWithUser,
} from "@/app/challenge/actions";
import type { SelectChallengeParticipation } from "@/app/db/schema";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function ChallengeView({
  challenge,
  participations,
  userParticipation,
}: {
  challenge: ChallengeWithStatus;
  participations: ParticipationWithUser[];
  userParticipation: SelectChallengeParticipation | null | undefined;
}) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const isEnded = challenge.status === "ended";
  const isCommitted = userParticipation?.status === "committed";
  const isSubmitted = userParticipation?.status === "submitted";

  const handleJoin = () => {
    setError(null);
    startTransition(async () => {
      const result = await joinChallenge(challenge.id);
      if (result.error) {
        setError(result.error);
      }
    });
  };

  const handleLeave = () => {
    setError(null);
    startTransition(async () => {
      const result = await leaveChallenge(challenge.id);
      if (result.error) {
        setError(result.error);
      }
    });
  };

  const timeRemaining = () => {
    const now = new Date();
    const end = new Date(challenge.endsAt);
    const diff = end.getTime() - now.getTime();

    if (diff <= 0) return "Ended";

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    if (days > 0) return `${days} day${days > 1 ? "s" : ""} remaining`;
    if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} remaining`;
    return "Less than 1 hour remaining";
  };

  return (
    <div className="container mx-auto max-w-4xl space-y-8 p-6">
      {/* Back to challenges link */}
      <Link
        href="/challenges"
        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        ← Back to all challenges
      </Link>

      {/* Challenge Header */}
      <div className="space-y-4 rounded-xl border border-border/70 bg-card p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">{challenge.title}</h1>
            <div className="flex items-center gap-3">
              <Badge variant={isEnded ? "secondary" : "default"}>{challenge.status}</Badge>
              <span className="text-sm text-muted-foreground">{timeRemaining()}</span>
            </div>
          </div>
        </div>

        <p className="text-muted-foreground whitespace-pre-wrap">{challenge.description}</p>

        <div className="text-sm text-muted-foreground">
          <p>
            Ends: {new Date(challenge.endsAt).toLocaleDateString()} at{" "}
            {new Date(challenge.endsAt).toLocaleTimeString()}
          </p>
        </div>

        {error && (
          <div className="rounded-lg border border-red-500/50 bg-red-500/10 p-3 text-sm text-red-500">
            {error}
          </div>
        )}

        {/* Action Buttons - Only shown when challenge is live AND user is logged in */}
        {!isEnded && userParticipation !== undefined && (
          <div className="flex gap-3 pt-4">
            {!isCommitted && !isSubmitted && (
              <Button onClick={handleJoin} disabled={isPending}>
                {isPending ? "Joining..." : "Join Challenge"}
              </Button>
            )}

            {isCommitted && (
              <>
                <Link href={`/challenges/${challenge.slug}/submit`}>
                  <Button>Submit Entry</Button>
                </Link>
                <Button variant="outline" onClick={handleLeave} disabled={isPending}>
                  {isPending ? "Leaving..." : "Leave Challenge"}
                </Button>
              </>
            )}

            {isSubmitted && (
              <div className="rounded-lg border border-green-500/50 bg-green-500/10 p-3 text-sm text-green-500">
                ✓ You have submitted your entry
              </div>
            )}
          </div>
        )}

        {/* Login prompt for non-logged-in users on live challenges */}
        {!isEnded && userParticipation === undefined && (
          <div className="rounded-lg border border-border/70 bg-muted/30 p-4">
            <p className="text-sm text-muted-foreground">
              <Link href="/auth/login" className="text-primary hover:underline">
                Log in
              </Link>{" "}
              to join this challenge and submit your entry.
            </p>
          </div>
        )}

        {/* View-only message for ended challenges */}
        {isEnded && (
          <div className="rounded-lg border border-border/70 bg-muted/30 p-4">
            <p className="text-sm text-muted-foreground">
              This challenge has ended. You can view participants but cannot join or submit entries.
            </p>
          </div>
        )}
      </div>

      {/* Participants List */}
      <div className="space-y-4 rounded-xl border border-border/70 bg-card p-6">
        <h2 className="text-xl font-semibold">Participants ({participations.length})</h2>

        {participations.length === 0 ? (
          <p className="text-muted-foreground">No participants yet. Be the first to join!</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {participations.map((participation) => (
              <Link
                key={participation.id}
                href={`/${participation.user.username}`}
                className="flex items-center gap-3 rounded-lg border border-border/50 p-3 transition-colors hover:bg-muted/30"
              >
                <Avatar>
                  <AvatarImage src={participation.user.avatarUrl || undefined} />
                  <AvatarFallback>{participation.user.artistName[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-medium">{participation.user.artistName}</p>
                  <p className="text-sm text-muted-foreground">@{participation.user.username}</p>
                </div>
                {participation.status === "submitted" && (
                  <Badge variant="secondary" className="text-xs">
                    Submitted
                  </Badge>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
