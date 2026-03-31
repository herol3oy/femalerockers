import { Suspense } from "react";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import Link from "next/link";

import { createClient } from "@/lib/supabase/server";
import { db } from "@/app/db";
import { usersTable } from "@/app/db/schema";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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

  return (
    <div className="flex-1 w-full flex flex-col gap-12">
      <div className="flex flex-col gap-2 items-start">
        <div className="flex items-center gap-4 mb-4">
          <h2 className="font-bold text-2xl">Your profile</h2>
          <Button variant="outline" size="sm" asChild>
            <Link href="/profile/edit">Edit</Link>
          </Button>
        </div>
        <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm">
          <dt className="font-medium">Email</dt>
          <dd>{profile.email}</dd>
          <dt className="font-medium">Username</dt>
          <dd>{profile.username}</dd>
          <dt className="font-medium">Artist Name</dt>
          <dd>{profile.artistName}</dd>
          <dt className="font-medium">City / Country</dt>
          <dd>{profile.cityCountry || "—"}</dd>
          <dt className="font-medium">Main Instrument</dt>
          <dd>{profile.mainInstrument || "—"}</dd>
          <dt className="font-medium">Genre</dt>
          <dd>{profile.genre || "—"}</dd>
          <dt className="font-medium">Bio</dt>
          <dd>{profile.bio || "—"}</dd>
          <dt className="font-medium">Instagram</dt>
          <dd>{profile.instagramUrl || "—"}</dd>
          <dt className="font-medium">Video Link</dt>
          <dd>{profile.videoLink || "—"}</dd>
          <dt className="font-medium">Open to Collaborate</dt>
          <dd>
            <Badge variant={profile.collabStatus ? "default" : "secondary"}>
              {profile.collabStatus ? "Yes" : "No"}
            </Badge>
          </dd>
        </dl>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <Suspense fallback={<div>Loading profile…</div>}>
      <ProfileContent />
    </Suspense>
  );
}
