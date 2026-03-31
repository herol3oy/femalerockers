"use server";

import { createClient } from "@/lib/supabase/server";
import { db } from "@/app/db";
import { usersTable } from "@/app/db/schema";
import { redirect } from "next/navigation";
import { eq, and, ne } from "drizzle-orm";

export async function updateProfile(
  _prevState: { error?: string; success?: boolean } | null,
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
  const cityCountry = formData.get("cityCountry")?.toString().trim() || null;
  const mainInstrument = formData.get("mainInstrument")?.toString().trim() || null;
  const genre = formData.get("genre")?.toString().trim() || null;
  const bio = formData.get("bio")?.toString().trim() || null;
  const instagramUrl = formData.get("instagramUrl")?.toString().trim() || null;
  const videoLink = formData.get("videoLink")?.toString().trim() || null;
  const collabStatus = formData.get("collabStatus") === "on";

  if (!username || !artistName) {
    return { error: "Username and Artist Name are required." };
  }

  if (!/^[a-zA-Z0-9_]{3,50}$/.test(username)) {
    return {
      error:
        "Username must be 3–50 characters and contain only letters, numbers, or underscores.",
    };
  }

  // Check if username is taken by another user
  const existing = await db
    .select({ id: usersTable.id })
    .from(usersTable)
    .where(and(eq(usersTable.username, username), ne(usersTable.id, user.id)))
    .limit(1);

  if (existing.length > 0) {
    return { error: "Username is already taken." };
  }

  try {
    await db
      .update(usersTable)
      .set({
        username,
        artistName,
        cityCountry,
        mainInstrument,
        genre,
        bio,
        instagramUrl,
        videoLink,
        collabStatus,
      })
      .where(eq(usersTable.id, user.id));
  } catch {
    return { error: "Something went wrong. Please try again." };
  }

  redirect("/profile");
}
