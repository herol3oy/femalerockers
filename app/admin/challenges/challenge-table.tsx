"use client";

import Link from "next/link";
import type { ChallengeWithStatus } from "@/app/challenge/actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function ChallengeTable({ challenges }: { challenges: ChallengeWithStatus[] }) {
  if (challenges.length === 0) {
    return (
      <div className="rounded-xl border border-border/70 p-8 text-center">
        <p className="text-muted-foreground">No challenges created yet.</p>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto rounded-xl border border-border/70">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b bg-muted/40 text-left">
            <th className="px-4 py-3 font-medium">Title</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 font-medium">Created</th>
            <th className="px-4 py-3 font-medium">Ends</th>
            <th className="px-4 py-3 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {challenges.map((challenge) => (
            <tr key={challenge.id} className="border-b last:border-b-0 hover:bg-muted/20">
              <td className="px-4 py-3">
                <div className="font-medium">{challenge.title}</div>
                <div className="text-xs text-muted-foreground line-clamp-1">
                  {challenge.description}
                </div>
              </td>
              <td className="px-4 py-3">
                <Badge variant={challenge.status === "live" ? "default" : "secondary"}>
                  {challenge.status}
                </Badge>
              </td>
              <td className="px-4 py-3 text-muted-foreground">
                {new Date(challenge.createdAt).toLocaleDateString()}
              </td>
              <td className="px-4 py-3 text-muted-foreground">
                {new Date(challenge.endsAt).toLocaleDateString()}
              </td>
              <td className="px-4 py-3">
                <div className="flex gap-2">
                  <Link href={`/admin/challenges/${challenge.id}/submissions`}>
                    <Button variant="default" size="sm">
                      Submissions
                    </Button>
                  </Link>
                  <Link href={`/admin/challenges/${challenge.id}`}>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </Link>
                  <Link href={`/challenges/${challenge.slug}`}>
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
