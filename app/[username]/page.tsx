import {
  ArrowLeftIcon,
  ArrowUpRightIcon,
  CheckCircleIcon,
  GlobeIcon,
  MapPinIcon,
  PencilIcon,
  PlayCircleIcon,
  SparkleIcon,
  UsersIcon,
} from "@phosphor-icons/react/ssr";
import { and, eq, isNull } from "drizzle-orm";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { db } from "@/app/db";
import { usersTable } from "@/app/db/schema";
import { formatJoinedDate, getInitials } from "@/app/discover/discover-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getRoleLabel } from "@/lib/roles";
import { createClient } from "@/lib/supabase/server";

type DiscoverProfilePageProps = {
  params: Promise<{
    username: string;
  }>;
};

function parseTags(value: string | null | undefined) {
  if (!value) return [];

  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function DiscoverProfileSkeleton() {
  return (
    <section className="min-h-screen bg-[radial-gradient(circle_at_top,_hsl(var(--secondary))_0%,_transparent_45%),linear-gradient(to_bottom,_hsl(var(--background)),_hsl(var(--muted)/0.35))]">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Skeleton className="h-10 w-40" />
          <Skeleton className="h-8 w-32" />
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.35fr)_320px] lg:items-start">
          <Card className="overflow-hidden border-border/70 bg-background/95 shadow-sm">
            <CardHeader className="gap-6 border-b border-border/60 pb-8 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex items-start gap-5">
                <Skeleton className="h-20 w-20 rounded-3xl" />
                <div className="space-y-3">
                  <Skeleton className="h-10 w-56" />
                  <Skeleton className="h-5 w-32" />
                  <div className="flex flex-wrap gap-2">
                    <Skeleton className="h-6 w-24" />
                    <Skeleton className="h-6 w-28" />
                    <Skeleton className="h-6 w-32" />
                  </div>
                </div>
              </div>

              <Skeleton className="h-28 w-full sm:w-56" />
            </CardHeader>

            <CardContent className="grid gap-6 pt-6 lg:grid-cols-[minmax(0,1fr)_240px]">
              <div className="space-y-4">
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-11/12" />
                <Skeleton className="h-4 w-4/5" />
                <div className="flex gap-3 pt-2">
                  <Skeleton className="h-10 w-32" />
                  <Skeleton className="h-10 w-32" />
                </div>
              </div>

              <Card className="border-border/60 bg-muted/25 shadow-none">
                <CardHeader className="pb-3">
                  <Skeleton className="h-5 w-28" />
                </CardHeader>
                <CardContent className="space-y-4">
                  <Skeleton className="h-12" />
                  <Skeleton className="h-12" />
                </CardContent>
              </Card>
            </CardContent>
          </Card>

          <Card className="border-border/70 bg-background/90 shadow-sm">
            <CardHeader>
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-8 w-48" />
            </CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-10 w-full" />
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

async function DiscoverProfileContent({ params }: DiscoverProfilePageProps) {
  const { username } = await params;
  const supabase = await createClient();

  const [user, { data: authData }] = await Promise.all([
    db
      .select()
      .from(usersTable)
      .where(
        and(
          eq(usersTable.username, decodeURIComponent(username)),
          isNull(usersTable.deactivatedAt),
        ),
      )
      .limit(1)
      .then((r) => r[0] ?? null),
    supabase.auth.getUser(),
  ]);

  if (!user) {
    notFound();
  }

  const authUser = authData.user;
  const isOwner = authUser?.id === user.id;
  const displayName = user.artistName || user.username;
  const hasExternalLinks = Boolean(user.instagramUrl || user.websiteUrl || user.videoLink);
  const isCollabRelevant = user.role === "musician" || user.role === "band";

  return (
    <section className="min-h-screen bg-[radial-gradient(circle_at_top,_hsl(var(--secondary))_0%,_transparent_45%),linear-gradient(to_bottom,_hsl(var(--background)),_hsl(var(--muted)/0.35))]">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Button asChild variant="outline" className="w-fit">
            <Link href="/discover">
              <ArrowLeftIcon className="h-4 w-4" />
              Back to discover
            </Link>
          </Button>
          <div className="flex items-center gap-3">
            {isOwner ? (
              <Button asChild variant="outline" className="w-fit">
                <Link href="/profile/edit">
                  <PencilIcon className="h-4 w-4" />
                  Edit profile
                </Link>
              </Button>
            ) : null}
            <Badge variant="secondary" className="w-fit gap-2">
              <SparkleIcon className="h-3.5 w-3.5" />
              {getRoleLabel(user.role)}
            </Badge>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.35fr)_320px] lg:items-start">
          <Card className="overflow-hidden border-border/70 bg-background/95 shadow-sm">
            <CardHeader className="gap-6 border-b border-border/60 bg-[linear-gradient(135deg,_hsl(var(--background))_0%,_hsl(var(--secondary)/0.35)_100%)] pb-8 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex items-start gap-5">
                {user.avatarUrl ? (
                  <Image
                    src={user.avatarUrl}
                    alt={displayName}
                    width={80}
                    height={80}
                    className="h-20 w-20 rounded-3xl object-cover shadow-sm"
                  />
                ) : (
                  <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-primary text-2xl font-semibold text-primary-foreground shadow-sm">
                    {getInitials(displayName)}
                  </div>
                )}
                <div className="space-y-3">
                  <div className="space-y-2">
                    <CardTitle className="text-3xl sm:text-4xl">{displayName}</CardTitle>
                    <CardDescription className="text-base">@{user.username}</CardDescription>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {parseTags(user.mainInstrument).map((value) => (
                      <Badge key={value} variant="secondary">
                        {value}
                      </Badge>
                    ))}
                    {parseTags(user.genre).map((value) => (
                      <Badge key={value} variant="outline">
                        {value}
                      </Badge>
                    ))}
                    {isCollabRelevant ? (
                      <Badge variant={user.collabStatus ? "default" : "outline"}>
                        {user.collabStatus ? "Open to collab" : "Profile live"}
                      </Badge>
                    ) : null}
                    {user.isApproved ? (
                      <Badge variant="outline" className="gap-1.5">
                        <CheckCircleIcon className="h-3.5 w-3.5" />
                        Approved profile
                      </Badge>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border bg-background/80 p-4 text-sm text-muted-foreground backdrop-blur sm:min-w-56">
                <p className="font-medium text-foreground">Member since</p>
                <p className="mt-2 text-lg font-semibold text-foreground">
                  {formatJoinedDate(user.createdAt as unknown as string)}
                </p>
                <p className="mt-1">
                  {isCollabRelevant
                    ? user.collabStatus
                      ? "Currently looking for new musical collaborations."
                      : "Visible in the directory and available to discover."
                    : "Member of the Female Rockers community."}
                </p>
              </div>
            </CardHeader>

            <CardContent className="grid gap-6 pt-6 lg:grid-cols-[minmax(0,1fr)_240px]">
              <div className="space-y-6">
                <div className="space-y-3">
                  <h2 className="text-lg font-semibold">About</h2>
                  <p className="text-sm leading-7 text-foreground/80 sm:text-base">
                    {user.bio ?? "This profile has not added a bio yet."}
                  </p>
                </div>

                {hasExternalLinks ? (
                  <div className="flex flex-wrap gap-3">
                    {user.instagramUrl ? (
                      <Button asChild variant="outline">
                        <a href={user.instagramUrl} target="_blank" rel="noreferrer">
                          <GlobeIcon className="h-4 w-4" />
                          Instagram
                          <ArrowUpRightIcon className="h-4 w-4" />
                        </a>
                      </Button>
                    ) : null}
                    {user.websiteUrl && user.websiteUrl.match(/^https?:\/\//) ? (
                      <Button asChild variant="outline">
                        <a href={user.websiteUrl} target="_blank" rel="noreferrer">
                          <GlobeIcon className="h-4 w-4" />
                          Website
                          <ArrowUpRightIcon className="h-4 w-4" />
                        </a>
                      </Button>
                    ) : null}
                    {user.videoLink ? (
                      <Button asChild>
                        <a href={user.videoLink} target="_blank" rel="noreferrer">
                          <PlayCircleIcon className="h-4 w-4" />
                          Watch clip
                        </a>
                      </Button>
                    ) : null}
                  </div>
                ) : (
                  <div className="rounded-2xl border border-dashed bg-muted/30 p-4 text-sm text-muted-foreground">
                    No public links have been added yet.
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <Card className="border-border/60 bg-muted/25 shadow-none">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Profile details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 text-sm text-muted-foreground">
                    {user.cityCountry ? (
                      <div className="flex items-start gap-3">
                        <MapPinIcon className="mt-0.5 h-4 w-4 text-foreground" />
                        <div>
                          <p className="font-medium text-foreground">Location</p>
                          <p>{user.cityCountry}</p>
                        </div>
                      </div>
                    ) : null}
                    {isCollabRelevant ? (
                      <div className="flex items-start gap-3">
                        <UsersIcon className="mt-0.5 h-4 w-4 text-foreground" />
                        <div>
                          <p className="font-medium text-foreground">Collaboration status</p>
                          <p>
                            {user.collabStatus
                              ? "Open to new projects and active collaborations."
                              : "Listed in the directory for discovery."}
                          </p>
                        </div>
                      </div>
                    ) : null}
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/70 bg-background/90 shadow-sm">
            <CardHeader>
              <CardDescription>Explore more</CardDescription>
              <CardTitle className="text-2xl">Keep browsing the directory</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-muted-foreground">
              <p>
                Return to discover to keep scanning approved artists by instrument, genre, and
                collaboration status.
              </p>
              <Button asChild className="w-full">
                <Link href="/discover">Browse more artists</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

export default function DiscoverProfilePage({ params }: DiscoverProfilePageProps) {
  return (
    <Suspense fallback={<DiscoverProfileSkeleton />}>
      <DiscoverProfileContent params={params} />
    </Suspense>
  );
}
