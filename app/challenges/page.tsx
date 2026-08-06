import Link from "next/link";
import { Suspense } from "react";
import { getAllChallenges } from "@/app/challenge/actions";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

async function ChallengesContent() {
  const challenges = await getAllChallenges();

  if (challenges.length === 0) {
    return (
      <div className="rounded-xl border border-border/70 bg-card p-12 text-center">
        <h2 className="text-2xl font-bold">No Challenges Yet</h2>
        <p className="mt-2 text-muted-foreground">Check back soon for upcoming challenges!</p>
      </div>
    );
  }

  const liveChallenges = challenges.filter((c) => c.status === "live");
  const pastChallenges = challenges.filter((c) => c.status === "ended");

  return (
    <div className="space-y-8">
      {/* Live Challenges */}
      {liveChallenges.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Live Challenges</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {liveChallenges.map((challenge) => (
              <Link
                key={challenge.id}
                href={`/challenges/${challenge.slug}`}
                className="group rounded-xl border border-border/70 bg-card p-6 transition-all hover:border-border hover:shadow-md"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <h3 className="font-bold text-lg group-hover:text-primary transition-colors line-clamp-2">
                      {challenge.title}
                    </h3>
                    <Badge variant="default">Live</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {challenge.description}
                  </p>
                  <div className="text-sm text-muted-foreground">
                    Ends: {new Date(challenge.endsAt).toLocaleDateString()}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Past Challenges */}
      {pastChallenges.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Past Challenges</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {pastChallenges.map((challenge) => (
              <Link
                key={challenge.id}
                href={`/challenges/${challenge.slug}`}
                className="group rounded-xl border border-border/70 bg-card p-6 transition-all hover:border-border hover:shadow-md"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <h3 className="font-bold text-lg group-hover:text-primary transition-colors line-clamp-2">
                      {challenge.title}
                    </h3>
                    <Badge variant="secondary">Ended</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {challenge.description}
                  </p>
                  <div className="text-sm text-muted-foreground">
                    Ended: {new Date(challenge.endsAt).toLocaleDateString()}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function ChallengesSkeleton() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <Skeleton className="h-8 w-48" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-xl border border-border/70 bg-card p-6 space-y-3">
              <Skeleton className="h-6 w-3/4" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
              <Skeleton className="h-4 w-1/3" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ChallengesPage() {
  return (
    <div className="container mx-auto max-w-7xl space-y-8 p-6">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold">Challenges</h1>
        <p className="text-muted-foreground">
          Join our community challenges and showcase your talent
        </p>
      </div>

      <Suspense fallback={<ChallengesSkeleton />}>
        <ChallengesContent />
      </Suspense>
    </div>
  );
}
