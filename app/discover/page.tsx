import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  CheckCircleIcon,
  GlobeIcon,
  MapPinIcon,
  PlayCircleIcon,
  SparkleIcon,
  UsersIcon,
} from "@phosphor-icons/react/ssr";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import {
  type DiscoverUser,
  discoverUserSelect,
  getDiscoverProfileHref,
  getInitials,
  getRecentCount,
} from "@/app/discover/discover-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getRoleLabel } from "@/lib/roles";
import { createClient } from "@/lib/supabase/server";

function DiscoverSkeleton() {
  return (
    <section className="min-h-screen bg-[radial-gradient(circle_at_top,_hsl(var(--secondary))_0%,_transparent_45%),linear-gradient(to_bottom,_hsl(var(--background)),_hsl(var(--muted)/0.35))]">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <div className="overflow-hidden rounded-3xl border bg-background/95 p-8 shadow-sm">
          <div className="flex flex-col gap-4 animate-pulse">
            <div className="h-6 w-32 rounded-md bg-muted" />
            <div className="h-12 w-full max-w-2xl rounded-xl bg-muted" />
            <div className="h-5 w-full max-w-3xl rounded-lg bg-muted" />
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <Card
              key={index}
              className="border-border/70 bg-background/90 shadow-sm"
            >
              <CardHeader className="animate-pulse space-y-4">
                <div className="h-14 w-14 rounded-2xl bg-muted" />
                <div className="h-6 w-1/2 rounded-lg bg-muted" />
                <div className="h-4 w-2/3 rounded-lg bg-muted" />
              </CardHeader>
              <CardContent className="space-y-3 animate-pulse">
                <div className="h-4 w-full rounded-lg bg-muted" />
                <div className="h-4 w-5/6 rounded-lg bg-muted" />
                <div className="h-10 w-full rounded-xl bg-muted" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export async function Discover() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("users_table")
    .select(discoverUserSelect)
    .neq("role", "admin")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <section className="min-h-screen bg-[radial-gradient(circle_at_top,_hsl(var(--secondary))_0%,_transparent_45%),linear-gradient(to_bottom,_hsl(var(--background)),_hsl(var(--muted)/0.35))]">
        <div className="mx-auto flex max-w-4xl flex-col gap-6 px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
          <Card className="overflow-hidden border-destructive/30 bg-background/95 shadow-sm">
            <CardHeader>
              <Badge variant="destructive" className="w-fit">
                Directory unavailable
              </Badge>
              <CardTitle className="text-3xl">
                Discover is temporarily offline
              </CardTitle>
              <CardDescription className="max-w-2xl text-base">
                The profile directory could not be loaded right now. Try again
                shortly or create your own profile while the feed reconnects.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild>
                <Link href="/auth/login">Member login</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  const users = ((data ?? []) as DiscoverUser[]).filter(
    (user) => user.is_approved,
  );
  const openToCollab = users.filter((user) => user.collab_status);
  const genres = new Set(users.map((user) => user.genre).filter(Boolean));
  const recentCount = getRecentCount(users);

  return (
    <section className="min-h-screen bg-[radial-gradient(circle_at_top,_hsl(var(--secondary))_0%,_transparent_45%),linear-gradient(to_bottom,_hsl(var(--background)),_hsl(var(--muted)/0.35))]">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <div className="relative overflow-hidden rounded-3xl border bg-background/95 p-8 shadow-sm lg:p-10">
          <div className="absolute inset-y-0 right-0 hidden w-1/3 bg-[radial-gradient(circle_at_center,_hsl(var(--primary)/0.12),_transparent_65%)] lg:block" />
          <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.8fr)] lg:items-end">
            <div className="space-y-5">
              <Badge variant="secondary" className="w-fit gap-2">
                <SparkleIcon className="h-3.5 w-3.5" />
                Discover artists
              </Badge>
              <div className="space-y-3">
                <h1 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
                  Find femme musicians ready to build the next project with you.
                </h1>
                <p className="max-w-2xl text-base text-muted-foreground sm:text-lg">
                  Browse approved community profiles, scan instruments and
                  genres fast, and jump straight into collaboration when someone
                  matches your sound.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg">
                  <Link href="/auth/login">Member login</Link>
                </Button>
              </div>
            </div>

            <Card className="border-border/70 bg-background/90 shadow-sm backdrop-blur">
              <CardHeader className="pb-4">
                <CardDescription>Community snapshot</CardDescription>
                <CardTitle className="text-2xl">
                  A curated, collaboration-first directory
                </CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border bg-muted/40 p-4">
                  <p className="text-sm text-muted-foreground">
                    Approved artists
                  </p>
                  <p className="mt-2 text-3xl font-semibold">{users.length}</p>
                </div>
                <div className="rounded-2xl border bg-muted/40 p-4">
                  <p className="text-sm text-muted-foreground">
                    Open to collab
                  </p>
                  <p className="mt-2 text-3xl font-semibold">
                    {openToCollab.length}
                  </p>
                </div>
                <div className="rounded-2xl border bg-muted/40 p-4">
                  <p className="text-sm text-muted-foreground">
                    Genres represented
                  </p>
                  <p className="mt-2 text-3xl font-semibold">{genres.size}</p>
                </div>
                <div className="rounded-2xl border bg-muted/40 p-4">
                  <p className="text-sm text-muted-foreground">
                    Joined this month
                  </p>
                  <p className="mt-2 text-3xl font-semibold">{recentCount}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {users.length === 0 ? (
          <Card className="border-dashed bg-background/90 shadow-sm">
            <CardHeader>
              <CardTitle>No live profiles yet</CardTitle>
              <CardDescription>
                Once artists are approved, they will appear here as a browsable
                directory.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild>
                <Link href="/auth/login">Member login</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {users.map((user) => {
              const displayName = user.artist_name || user.username;
              const hasExternalLinks = Boolean(
                user.instagram_url || user.video_link,
              );

              return (
                <Card
                  key={user.id}
                  className="group relative flex h-full flex-col overflow-hidden border-border/70 bg-background/90 shadow-sm transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg"
                >
                  <Link
                    href={getDiscoverProfileHref(user.username)}
                    aria-label={`View ${displayName}'s profile`}
                    className="absolute inset-0 z-10 rounded-xl"
                  />

                  <CardHeader className="pointer-events-none relative z-20 space-y-5 pb-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-4">
                        {user.avatar_url ? (
                          <Image
                            src={user.avatar_url}
                            alt={displayName}
                            width={56}
                            height={56}
                            className="h-14 w-14 rounded-2xl object-cover"
                          />
                        ) : (
                          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-lg font-semibold text-primary-foreground">
                            {getInitials(displayName)}
                          </div>
                        )}
                        <div className="space-y-1">
                          <CardTitle className="text-xl">
                            {displayName}
                          </CardTitle>
                          <CardDescription>@{user.username}</CardDescription>
                        </div>
                      </div>
                      <Badge
                        variant={user.collab_status ? "default" : "outline"}
                      >
                        {user.collab_status ? "Open to collab" : "Profile live"}
                      </Badge>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {user.main_instrument ? (
                        <Badge variant="secondary">
                          {user.main_instrument}
                        </Badge>
                      ) : null}
                      {user.genre ? (
                        <Badge variant="outline">{user.genre}</Badge>
                      ) : null}
                      <Badge variant="secondary">
                        {getRoleLabel(user.role)}
                      </Badge>
                      <Badge variant="outline" className="gap-1.5">
                        <CheckCircleIcon className="h-3.5 w-3.5" />
                        Approved
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="pointer-events-none relative z-20 flex flex-1 flex-col gap-5">
                    <div className="space-y-3 text-sm text-muted-foreground">
                      {user.city_country ? (
                        <div className="flex items-center gap-2">
                          <MapPinIcon className="h-4 w-4" />
                          <span>{user.city_country}</span>
                        </div>
                      ) : null}
                      {user.role === "musician" || user.role === "band" ? (
                        <div className="flex items-center gap-2">
                          <UsersIcon className="h-4 w-4" />
                          <span>
                            {user.collab_status
                              ? "Currently looking for collaborations"
                              : "Profile available for discovery"}
                          </span>
                        </div>
                      ) : null}
                    </div>

                    <p className="flex-1 text-sm leading-6 text-foreground/80">
                      {user.bio ?? "No bio added yet."}
                    </p>

                    {hasExternalLinks ? (
                      <div className="pointer-events-auto relative z-30 flex flex-wrap gap-3 pt-2">
                        {user.instagram_url ? (
                          <Button asChild variant="outline">
                            <a
                              href={user.instagram_url}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <GlobeIcon className="h-4 w-4" />
                              Instagram
                              <ArrowUpRightIcon className="h-4 w-4" />
                            </a>
                          </Button>
                        ) : null}
                        {user.video_link ? (
                          <Button asChild>
                            <a
                              href={user.video_link}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <PlayCircleIcon className="h-4 w-4" />
                              Watch clip
                            </a>
                          </Button>
                        ) : null}
                      </div>
                    ) : (
                      <div className="rounded-2xl border border-dashed bg-muted/30 p-4 text-sm text-muted-foreground">
                        This artist has not added links yet, but their profile
                        is now visible in the directory.
                      </div>
                    )}

                    <div className="relative z-20 flex items-center justify-between border-t border-border/60 pt-4 text-sm text-muted-foreground">
                      <span>Open full profile</span>
                      <ArrowRightIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<DiscoverSkeleton />}>
      <Discover />
    </Suspense>
  );
}
