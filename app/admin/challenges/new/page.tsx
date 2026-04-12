import { ChallengeForm } from "../challenge-form";

export default function NewChallengePage() {
  return (
    <div className="container mx-auto max-w-3xl space-y-8 p-6">
      <div>
        <h1 className="text-3xl font-bold">Create New Challenge</h1>
        <p className="text-muted-foreground">
          Set up a new challenge for the community
        </p>
      </div>

      <ChallengeForm />
    </div>
  );
}
