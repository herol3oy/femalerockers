import { notFound } from "next/navigation";
import { Suspense } from "react";

import {
  getChallengeBySlug,
  getChallengeParticipations,
  getUserParticipation,
} from "@/app/challenge/actions";
import { Skeleton } from "@/components/ui/skeleton";
import { ChallengeView } from "./challenge-view";

async function ChallengeContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const challenge = await getChallengeBySlug(slug);

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
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-4 w-1/4" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </div>
    </div>
  );
}

export default function ChallengePage({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <Suspense fallback={<ChallengeSkeleton />}>
      <ChallengeContent params={params} />
    </Suspense>
  );
}
