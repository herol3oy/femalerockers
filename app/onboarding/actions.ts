"use server";

import { createClient } from "@/lib/supabase/server";
import { db } from "@/app/db";
import { usersTable } from "@/app/db/schema";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";

export async function completeOnboarding(
  _prevState: { error: string } | null,
  formData: FormData
) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const username = formData.get("username")?.toString().trim();
  const artistName = formData.get("artistName")?.toString().trim();
  const instagramUrl = formData.get("instagramUrl")?.toString().trim();

  if (!username || !artistName || !instagramUrl) {
    return { error: "All fields are required." };
  }

  if (!/^[a-zA-Z0-9_]{3,50}$/.test(username)) {
    return {
      error:
        "Username must be 3–50 characters and contain only letters, numbers, or underscores.",
    };
  }

  // Check if username is already taken
  const existing = await db
    .select({ id: usersTable.id })
    .from(usersTable)
    .where(eq(usersTable.username, username))
    .limit(1);

  if (existing.length > 0) {
    return { error: "Username is already taken." };
  }

  try {
    await db.insert(usersTable).values({
      id: user.id,
      email: user.email!,
      username,
      artistName,
      instagramUrl,
    });
  } catch {
    return { error: "Something went wrong. Please try again." };
  }

  redirect("/profile");
}
