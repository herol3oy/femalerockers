import { Suspense } from "react";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";

import { createClient } from "@/lib/supabase/server";
import { db } from "@/app/db";
import { usersTable } from "@/app/db/schema";
import { EditProfileForm } from "../edit-profile-form";

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
    <div className="flex-1 w-full flex flex-col gap-6">
      <h2 className="font-bold text-2xl">Edit Profile</h2>
      <EditProfileForm
        profile={{
          email: profile.email,
          username: profile.username,
          artistName: profile.artistName,
          cityCountry: profile.cityCountry,
          mainInstrument: profile.mainInstrument,
          genre: profile.genre,
          bio: profile.bio,
          instagramUrl: profile.instagramUrl,
          videoLink: profile.videoLink,
          collabStatus: profile.collabStatus,
        }}
      />
    </div>
  );
}

export default function EditProfilePage() {
  return (
    <Suspense fallback={<div>Loading…</div>}>
      <EditProfileContent />
    </Suspense>
  );
}
