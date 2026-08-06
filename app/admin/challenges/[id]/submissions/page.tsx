import Link from "next/link";
import { notFound } from "next/navigation";
import { getChallengeById, getChallengeParticipations } from "@/app/challenge/actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SubmissionsTable } from "./submissions-table";

export default async function ChallengeSubmissionsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const challenge = await getChallengeById(id);

  if (!challenge) {
    notFound();
  }

  const participations = await getChallengeParticipations(id, true);

  const committedCount = participations.filter((p) => p.status === "committed").length;
  const submittedCount = participations.filter((p) => p.status === "submitted").length;

  return (
    <div className="container mx-auto max-w-7xl space-y-8 p-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold">{challenge.title}</h1>
            <Badge variant={challenge.status === "live" ? "default" : "secondary"}>
              {challenge.status}
            </Badge>
          </div>
          <p className="text-muted-foreground">View all participants and submissions</p>
        </div>
        <Link href="/admin/challenges">
          <Button variant="outline">Back to Challenges</Button>
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-border/70 bg-card p-4">
          <div className="text-sm text-muted-foreground">Total Participants</div>
          <div className="text-3xl font-bold mt-1">{participations.length}</div>
        </div>
        <div className="rounded-xl border border-border/70 bg-card p-4">
          <div className="text-sm text-muted-foreground">Committed</div>
          <div className="text-3xl font-bold mt-1">{committedCount}</div>
        </div>
        <div className="rounded-xl border border-border/70 bg-card p-4">
          <div className="text-sm text-muted-foreground">Submitted</div>
          <div className="text-3xl font-bold mt-1">{submittedCount}</div>
        </div>
      </div>

      <SubmissionsTable participations={participations} />
    </div>
  );
}
