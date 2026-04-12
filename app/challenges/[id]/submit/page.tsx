import { getChallengeById, getUserParticipation } from "@/app/challenge/actions";
import { redirect } from "next/navigation";
import { SubmitEntryForm } from "./submit-entry-form";

export default async function SubmitEntryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const challenge = await getChallengeById(id);

  if (!challenge || challenge.status === "ended") {
    redirect(`/challenges/${id}`);
  }

  const userParticipation = await getUserParticipation(challenge.id);

  if (!userParticipation || userParticipation.status !== "committed") {
    redirect(`/challenges/${id}`);
  }

  return (
    <div className="container mx-auto max-w-2xl space-y-8 p-6">
      <div>
        <h1 className="text-3xl font-bold">Submit Your Entry</h1>
        <p className="mt-2 text-muted-foreground">
          Challenge: {challenge.title}
        </p>
      </div>

      <SubmitEntryForm challengeId={challenge.id} />
    </div>
  );
}
