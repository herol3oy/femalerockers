import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";

import { createClient } from "@/lib/supabase/server";
import { db } from "@/app/db";
import { usersTable } from "@/app/db/schema";

export default async function ProfilePage() {
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
        <h2 className="font-bold text-2xl mb-4">Your profile</h2>
        <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm">
          <dt className="font-medium">Username</dt>
          <dd>{profile.username}</dd>
          <dt className="font-medium">Artist Name</dt>
          <dd>{profile.artistName}</dd>
          <dt className="font-medium">Instagram</dt>
          <dd>{profile.instagramUrl}</dd>
        </dl>
      </div>
    </div>
  );
}
