import { Suspense } from "react";
import {
  getChallengeById,
  getChallengeParticipations,
  getUserParticipation,
} from "@/app/challenge/actions";
import { ChallengeView } from "./challenge-view";
import { notFound } from "next/navigation";

async function ChallengeContent({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const challenge = await getChallengeById(id);

  if (!challenge) {
    notFound();
  }

  const [participations, userParticipation] = await Promise.all([
    getChallengeParticipations(challenge.id),
    getUserParticipation(challenge.id),
  ]);

  return (
    <ChallengeView
      challenge={challenge}
      participations={participations}
      userParticipation={userParticipation}
    />
  );
}

function ChallengeSkeleton() {
  return (
    <div className="container mx-auto max-w-4xl space-y-8 p-6">
      <div className="space-y-4 rounded-xl border border-border/70 bg-card p-6">
        <div className="h-8 w-3/4 animate-pulse rounded bg-muted" />
        <div className="h-4 w-1/4 animate-pulse rounded bg-muted" />
        <div className="space-y-2">
          <div className="h-4 w-full animate-pulse rounded bg-muted" />
          <div className="h-4 w-full animate-pulse rounded bg-muted" />
          <div className="h-4 w-2/3 animate-pulse rounded bg-muted" />
        </div>
      </div>
    </div>
  );
}

export default function ChallengePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Suspense fallback={<ChallengeSkeleton />}>
      <ChallengeContent params={params} />
    </Suspense>
  );
}
