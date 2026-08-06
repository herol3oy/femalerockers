import Link from "next/link";
import { getAllChallenges } from "@/app/challenge/actions";
import { Button } from "@/components/ui/button";
import { ChallengeTable } from "./challenge-table";

export default async function AdminChallengesPage() {
  const challenges = await getAllChallenges();

  return (
    <div className="container mx-auto max-w-7xl space-y-8 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Challenge Management</h1>
          <p className="text-muted-foreground">Create and manage challenges for the community</p>
        </div>
        <Link href="/admin/challenges/new">
          <Button>Create Challenge</Button>
        </Link>
      </div>

      <ChallengeTable challenges={challenges} />
    </div>
  );
}
