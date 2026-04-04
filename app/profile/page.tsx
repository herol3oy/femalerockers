import { Suspense } from "react";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight,
  Globe,
  MapPin,
  Music,
  Pencil,
  PlayCircle,
  Sparkles,
  Users,
} from "lucide-react";

import { createClient } from "@/lib/supabase/server";
import { db } from "@/app/db";
import { usersTable } from "@/app/db/schema";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

function ProfileSkeleton() {
  return (
    <section className="min-h-screen bg-[radial-gradient(circle_at_top,_hsl(var(--secondary))_0%,_transparent_45%),linear-gradient(to_bottom,_hsl(var(--background)),_hsl(var(--muted)/0.35))]">
      <div className="mx-auto flex max-w-4xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <Card className="overflow-hidden border-border/70 bg-background/95 shadow-sm">
          <CardHeader className="animate-pulse space-y-4 border-b border-border/60 pb-8">
            <div className="h-6 w-28 rounded-full bg-muted" />
            <div className="flex items-start gap-5">
              <div className="h-20 w-20 rounded-3xl bg-muted" />
              <div className="space-y-3">
                <div className="h-10 w-48 rounded-xl bg-muted" />
                <div className="h-5 w-32 rounded-lg bg-muted" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="animate-pulse space-y-4 pt-6">
            <div className="h-4 w-full rounded-lg bg-muted" />
            <div className="h-4 w-5/6 rounded-lg bg-muted" />
            <div className="h-4 w-2/3 rounded-lg bg-muted" />
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

async function ProfileContent() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const rows = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.id, user.id))
    .limit(1);

  if (rows.length === 0) {
    redirect("/onboarding");
  }

  const profile = rows[0];
  const displayName = profile.artistName || profile.username;
  const hasExternalLinks = Boolean(profile.instagramUrl || profile.videoLink);

  return (
    <section className="min-h-screen bg-[radial-gradient(circle_at_top,_hsl(var(--secondary))_0%,_transparent_45%),linear-gradient(to_bottom,_hsl(var(--background)),_hsl(var(--muted)/0.35))]">
      <div className="mx-auto flex max-w-4xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <Card className="overflow-hidden border-border/70 bg-background/95 shadow-sm">
          <CardHeader className="gap-6 border-b border-border/60 bg-[linear-gradient(135deg,_hsl(var(--background))_0%,_hsl(var(--secondary)/0.35)_100%)] pb-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <Badge variant="secondary" className="w-fit gap-2 rounded-full px-3 py-1 text-xs uppercase tracking-[0.24em]">
                <Sparkles className="h-3.5 w-3.5" />
                Your profile
              </Badge>
              <div className="flex flex-col gap-2">
                <Button asChild variant="outline" className="w-fit rounded-full">
                  <Link href="/profile/edit">
                    <Pencil className="h-4 w-4" />
                    Edit profile
                  </Link>
                </Button>
                <Button asChild className="w-fit rounded-full">
                  <Link href={`/discover/${profile.username}`} target="_blank">
                    <ArrowUpRight className="h-4 w-4" />
                    View profile
                  </Link>
                </Button>
              </div>
            </div>
            <div className="flex items-start gap-5">
              {profile.avatarUrl ? (
                <Image
                  src={profile.avatarUrl}
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
                  <CardDescription className="text-base">@{profile.username}</CardDescription>
                </div>
                <div className="flex flex-wrap gap-2">
                  {profile.mainInstrument && (
                    <Badge variant="secondary">{profile.mainInstrument}</Badge>
                  )}
                  {profile.genre && <Badge variant="outline">{profile.genre}</Badge>}
                  <Badge variant={profile.collabStatus ? "default" : "outline"}>
                    {profile.collabStatus ? "Open to collab" : "Not collaborating"}
                  </Badge>
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="grid gap-6 pt-6 lg:grid-cols-[minmax(0,1fr)_240px]">
            <div className="space-y-6">
              <div className="space-y-3">
                <h2 className="text-lg font-semibold">About</h2>
                <p className="text-sm leading-7 text-foreground/80 sm:text-base">
                  {profile.bio || "You haven\u2019t added a bio yet. Edit your profile to tell others about yourself."}
                </p>
              </div>

              {hasExternalLinks ? (
                <div className="flex flex-wrap gap-3">
                  {profile.instagramUrl && (
                    <Button asChild variant="outline" className="rounded-full">
                      <a href={profile.instagramUrl} target="_blank" rel="noreferrer">
                        <Globe className="h-4 w-4" />
                        Instagram
                        <ArrowUpRight className="h-4 w-4" />
                      </a>
                    </Button>
                  )}
                  {profile.videoLink && (
                    <Button asChild className="rounded-full">
                      <a href={profile.videoLink} target="_blank" rel="noreferrer">
                        <PlayCircle className="h-4 w-4" />
                        Watch clip
                      </a>
                    </Button>
                  )}
                </div>
              ) : (
                <div className="rounded-2xl border border-dashed bg-muted/30 p-4 text-sm text-muted-foreground">
                  No public links added yet. Edit your profile to add your Instagram or a video link.
                </div>
              )}
            </div>

            <div className="space-y-4">
              <Card className="border-border/60 bg-muted/25 shadow-none">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Profile details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm text-muted-foreground">
                  {profile.cityCountry && (
                    <div className="flex items-start gap-3">
                      <MapPin className="mt-0.5 h-4 w-4 text-foreground" />
                      <div>
                        <p className="font-medium text-foreground">Location</p>
                        <p>{profile.cityCountry}</p>
                      </div>
                    </div>
                  )}
                  <div className="flex items-start gap-3">
                    <Users className="mt-0.5 h-4 w-4 text-foreground" />
                    <div>
                      <p className="font-medium text-foreground">Collaboration</p>
                      <p>
                        {profile.collabStatus
                          ? "Open to new projects and collaborations."
                          : "Not currently looking for collaborations."}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Music className="mt-0.5 h-4 w-4 text-foreground" />
                    <div>
                      <p className="font-medium text-foreground">Email</p>
                      <p>{profile.email}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

export default function ProfilePage() {
  return (
    <Suspense fallback={<ProfileSkeleton />}>
      <ProfileContent />
    </Suspense>
  );
}
