import { redirect } from "next/navigation";
import { Suspense } from "react";
import { getActiveChallenge, getUserParticipation } from "../actions";
import { Skeleton } from "@/components/ui/skeleton";
import { SubmitEntryForm } from "./submit-entry-form";

async function SubmitEntryContent() {
  const challenge = await getActiveChallenge();

  if (!challenge || challenge.status === "ended") {
    redirect("/challenge");
  }

  const userParticipation = await getUserParticipation(challenge.id);

  if (userParticipation?.status !== "committed") {
    redirect("/challenge");
  }

  return (
    <div className="container mx-auto max-w-2xl space-y-8 p-6">
      <div>
        <h1 className="text-3xl font-bold">Submit Your Entry</h1>
        <p className="mt-2 text-muted-foreground">Challenge: {challenge.title}</p>
      </div>

      <SubmitEntryForm challengeId={challenge.id} challengeSlug={challenge.slug} />
    </div>
  );
}

function SubmitEntrySkeleton() {
  return (
    <div className="container mx-auto max-w-2xl space-y-8 p-6">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-32" />
    </div>
  );
}

export default function SubmitEntryPage() {
  return (
    <Suspense fallback={<SubmitEntrySkeleton />}>
      <SubmitEntryContent />
    </Suspense>
  );
}
