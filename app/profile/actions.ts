"use server";

import { and, eq, ne } from "drizzle-orm";
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

async function uploadAvatar(
  supabase: Awaited<ReturnType<typeof createClient>>,
  userId: string,
  file: File,
): Promise<{ url?: string; error?: string }> {
  if (!ALLOWED_AVATAR_TYPES.includes(file.type)) {
    return { error: "Avatar must be PNG, JPEG, or WebP." };
  }
  if (file.size > MAX_AVATAR_SIZE) {
    return { error: "Avatar must be under 2 MB." };
  }

  const ext = MIME_TO_EXT[file.type];
  const uniqueId = crypto.randomUUID();
  const path = `${userId}/fr_avatar_${uniqueId}.${ext}`;

  // Remove old avatar files to avoid orphans
  const { data: existingFiles } = await supabase.storage
    .from("avatars")
    .list(userId, { search: "fr_avatar_" });
  if (existingFiles?.length) {
    await supabase.storage
      .from("avatars")
      .remove(existingFiles.map((f) => `${userId}/${f.name}`));
  }

  const { error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(path, file, { contentType: file.type });

  if (uploadError) {
    return { error: "Avatar upload failed. Please try again." };
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from("avatars").getPublicUrl(path);

  // Append cache-busting parameter so browsers/CDNs serve the new image
  return { url: `${publicUrl}?t=${Date.now()}` };
}

export async function updateProfile(
  _prevState: { error?: string; success?: boolean } | null,
  formData: FormData,
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
  const mainInstrument =
    formData.get("mainInstrument")?.toString().trim() || null;
  const genre = formData.get("genre")?.toString().trim() || null;
  const bio = formData.get("bio")?.toString().trim() || null;
  const instagramUrl = formData.get("instagramUrl")?.toString().trim() || null;
  const videoLink = formData.get("videoLink")?.toString().trim() || null;
  const collabStatus = formData.get("collabStatus") === "on";
  const newsletterOptIn = formData.get("newsletterOptIn") === "on";

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

  // Handle avatar upload
  let avatarUrl: string | undefined;
  const avatarFile = formData.get("avatar") as File | null;
  if (avatarFile && avatarFile.size > 0) {
    const result = await uploadAvatar(supabase, user.id, avatarFile);
    if (result.error) return { error: result.error };
    avatarUrl = result.url;
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
        newsletterOptIn,
        newsletterOptInAt: newsletterOptIn ? new Date() : null,
        ...(avatarUrl !== undefined && { avatarUrl }),
      })
      .where(eq(usersTable.id, user.id));
  } catch {
    return { error: "Something went wrong. Please try again." };
  }

  redirect("/profile");
}
