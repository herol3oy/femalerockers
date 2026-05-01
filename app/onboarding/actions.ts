"use server";

import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { db } from "@/app/db";
import { usersTable } from "@/app/db/schema";
import { createClient } from "@/lib/supabase/server";

const ALLOWED_AVATAR_TYPES = ["image/png", "image/jpeg", "image/webp"];
const MAX_AVATAR_SIZE = 2 * 1024 * 1024; // 2 MB
const MIME_TO_EXT: Record<string, string> = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/webp": "webp",
};

export async function completeOnboarding(
  _prevState: { error: string } | null,
  formData: FormData,
) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) {
    redirect("/auth/login");
  }

  const username = formData.get("username")?.toString().trim();
  const artistName = formData.get("artistName")?.toString().trim();
  const mainInstrument = formData.get("mainInstrument")?.toString().trim();
  const instagramUrl = formData.get("instagramUrl")?.toString().trim() || undefined;
  const newsletterOptIn = formData.get("newsletterOptIn") === "on";

  if (!username || !artistName || !mainInstrument) {
    return { error: "Username, artist name, and main instrument are required." };
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

  // Handle optional avatar upload
  let avatarUrl: string | undefined;
  const avatarFile = formData.get("avatar") as File | null;
  if (avatarFile && avatarFile.size > 0) {
    if (!ALLOWED_AVATAR_TYPES.includes(avatarFile.type)) {
      return { error: "Avatar must be PNG, JPEG, or WebP." };
    }
    if (avatarFile.size > MAX_AVATAR_SIZE) {
      return { error: "Avatar must be under 2 MB." };
    }

    const ext = MIME_TO_EXT[avatarFile.type];
    const uniqueId = crypto.randomUUID();
    const path = `${user.id}/fr_avatar_${uniqueId}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(path, avatarFile, { contentType: avatarFile.type });

    if (uploadError) {
      return { error: "Avatar upload failed. Please try again." };
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("avatars").getPublicUrl(path);

    avatarUrl = publicUrl;
  }

  try {
    await db.insert(usersTable).values({
      id: user.id,
      email: user.email,
      username,
      artistName,
      mainInstrument,
      newsletterOptIn,
      newsletterOptInAt: newsletterOptIn ? new Date() : null,
      ...(instagramUrl !== undefined && { instagramUrl }),
      ...(avatarUrl !== undefined && { avatarUrl }),
    });
  } catch {
    return { error: "Something went wrong. Please try again." };
  }

  redirect("/profile");
}
