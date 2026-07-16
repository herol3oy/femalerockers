import { notFound } from "next/navigation";
import { getChallengeById } from "@/app/challenge/actions";
import { ChallengeForm } from "../challenge-form";

export default async function EditChallengePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const challenge = await getChallengeById(id);

  if (!challenge) {
    notFound();
  }

  return (
    <div className="container mx-auto max-w-3xl space-y-8 p-6">
      <div>
        <h1 className="text-3xl font-bold">Edit Challenge</h1>
        <p className="text-muted-foreground">
          Update challenge details and settings
        </p>
      </div>

      <ChallengeForm challenge={challenge} />
    </div>
  );
}
