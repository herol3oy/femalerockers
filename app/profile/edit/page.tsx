import { PencilIcon } from "@phosphor-icons/react/ssr";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { db } from "@/app/db";
import { usersTable } from "@/app/db/schema";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";
import { EditProfileForm } from "../edit-profile-form";

function EditProfileSkeleton() {
  return (
    <section className="min-h-screen bg-[radial-gradient(circle_at_top,_hsl(var(--secondary))_0%,_transparent_45%),linear-gradient(to_bottom,_hsl(var(--background)),_hsl(var(--muted)/0.35))]">
      <div className="mx-auto flex max-w-4xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <Card className="overflow-hidden border-border/70 bg-background/95 shadow-sm">
          <CardHeader className="animate-pulse space-y-4 border-b border-border/60 pb-8">
            <div className="h-6 w-28 rounded-md bg-muted" />
            <div className="h-10 w-56 rounded-xl bg-muted" />
            <div className="h-5 w-2/3 rounded-lg bg-muted" />
          </CardHeader>
          <CardContent className="animate-pulse space-y-4 pt-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-4 w-24 rounded-lg bg-muted" />
                <div className="h-10 w-full max-w-md rounded-lg bg-muted" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

async function EditProfileContent() {
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

  return (
    <section className="min-h-screen bg-[radial-gradient(circle_at_top,_hsl(var(--secondary))_0%,_transparent_45%),linear-gradient(to_bottom,_hsl(var(--background)),_hsl(var(--muted)/0.35))]">
      <div className="mx-auto flex max-w-4xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <Card className="overflow-hidden border-border/70 bg-background/95 shadow-sm">
          <CardHeader className="border-b border-border/60 bg-[linear-gradient(135deg,_hsl(var(--background))_0%,_hsl(var(--secondary)/0.35)_100%)] pb-8">
            <Badge
              variant="secondary"
              className="w-fit gap-2"
            >
              <PencilIcon className="h-3.5 w-3.5" />
              Edit profile
            </Badge>
            <CardTitle className="text-3xl">Update your profile</CardTitle>
            <CardDescription className="max-w-2xl text-base">
              Changes will be reflected on your public profile in the discover
              directory.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <EditProfileForm
              profile={{
                email: profile.email,
                username: profile.username,
                artistName: profile.artistName,
                avatarUrl: profile.avatarUrl,
                cityCountry: profile.cityCountry,
                mainInstrument: profile.mainInstrument,
                genre: profile.genre,
                bio: profile.bio,
                instagramUrl: profile.instagramUrl,
                videoLink: profile.videoLink,
                collabStatus: profile.collabStatus,
                newsletterOptIn: profile.newsletterOptIn,
              }}
            />
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

export default function EditProfilePage() {
  return (
    <Suspense fallback={<EditProfileSkeleton />}>
      <EditProfileContent />
    </Suspense>
  );
}
