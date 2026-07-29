"use server";

import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/app/db";
import { collaborationsTable, usersTable } from "@/app/db/schema";
import { isActiveAccount } from "@/lib/auth/active-account";
import { createClient } from "@/lib/supabase/server";

const ALLOWED_COVER_TYPES = ["image/png", "image/jpeg", "image/webp"];
const MAX_COVER_SIZE = 5 * 1024 * 1024;
const MIME_TO_EXT: Record<string, string> = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/webp": "webp",
};

async function uploadCoverPhoto(
  supabase: Awaited<ReturnType<typeof createClient>>,
  userId: string,
  file: File,
): Promise<{ url?: string; error?: string }> {
  if (!ALLOWED_COVER_TYPES.includes(file.type)) {
    return { error: "Cover photo must be PNG, JPEG, or WebP." };
  }
  if (file.size > MAX_COVER_SIZE) {
    return { error: "Cover photo must be under 5 MB." };
  }

  const ext = MIME_TO_EXT[file.type];
  const uniqueId = crypto.randomUUID();
  const path = `${userId}/fr_cover_${uniqueId}.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from("collab-covers")
    .upload(path, file, { contentType: file.type });

  if (uploadError) {
    return { error: "Cover photo upload failed. Please try again." };
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from("collab-covers").getPublicUrl(path);

  return { url: `${publicUrl}?t=${Date.now()}` };
}

function isValidUrl(str: string): boolean {
  try {
    const url = new URL(str);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

export async function submitCollab(
  _prevState: { error?: string } | null,
  formData: FormData,
) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  if (!(await isActiveAccount(user.id))) {
    return { error: "Reactivate your account before submitting." };
  }

  // Verify user is approved
  const userRows = await db
    .select({ isApproved: usersTable.isApproved })
    .from(usersTable)
    .where(eq(usersTable.id, user.id))
    .limit(1);

  if (userRows.length === 0 || !userRows[0].isApproved) {
    return { error: "Only approved users can submit collaborations." };
  }

  // Check for existing pending submission
  const existing = await db
    .select({ id: collaborationsTable.id })
    .from(collaborationsTable)
    .where(
      and(
        eq(collaborationsTable.userId, user.id),
        eq(collaborationsTable.status, "pending"),
      ),
    )
    .limit(1);

  if (existing.length > 0) {
    return { error: "You already have a pending submission." };
  }

  const bio = formData.get("bio")?.toString().trim();
  const pieceType = formData.get("pieceType")?.toString().trim();
  const songTitle = formData.get("songTitle")?.toString().trim();
  const bandName = formData.get("bandName")?.toString().trim() || null;
  const videoUrl = formData.get("videoUrl")?.toString().trim();
  const upcomingNews = formData.get("upcomingNews")?.toString().trim() || null;

  if (!bio || !pieceType || !songTitle || !videoUrl) {
    return { error: "Please fill in all required fields." };
  }

  if (!["original", "cover"].includes(pieceType)) {
    return { error: "Piece type must be 'original' or 'cover'." };
  }

  if (!isValidUrl(videoUrl)) {
    return { error: "Please enter a valid video URL (https://...)." };
  }

  // Handle cover photo upload
  let coverPhotoUrl: string | null = null;
  const coverFile = formData.get("coverPhoto") as File | null;
  if (coverFile && coverFile.size > 0) {
    const result = await uploadCoverPhoto(supabase, user.id, coverFile);
    if (result.error) return { error: result.error };
    coverPhotoUrl = result.url ?? null;
  }

  try {
    await db.insert(collaborationsTable).values({
      userId: user.id,
      bio,
      pieceType,
      songTitle,
      bandName,
      videoUrl,
      coverPhotoUrl,
      upcomingNews,
    });
  } catch {
    return { error: "Something went wrong. Please try again." };
  }

  revalidatePath("/collab");
  redirect("/collab");
}

export async function withdrawCollab(
  _prevState: { error?: string } | null,
  formData: FormData,
) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  if (!(await isActiveAccount(user.id))) {
    return { error: "Reactivate your account before making changes." };
  }

  const collabId = formData.get("collabId")?.toString();
  if (!collabId) {
    return { error: "Missing submission ID." };
  }

  const rows = await db
    .select({
      id: collaborationsTable.id,
      userId: collaborationsTable.userId,
      status: collaborationsTable.status,
      coverPhotoUrl: collaborationsTable.coverPhotoUrl,
    })
    .from(collaborationsTable)
    .where(eq(collaborationsTable.id, collabId))
    .limit(1);

  if (rows.length === 0) {
    return { error: "Submission not found." };
  }

  const collab = rows[0];

  if (collab.userId !== user.id) {
    return { error: "Forbidden." };
  }

  if (collab.status !== "pending") {
    return { error: "Only pending submissions can be withdrawn." };
  }

  // Remove cover photo from storage if exists
  if (collab.coverPhotoUrl) {
    const url = collab.coverPhotoUrl.split("?")[0]; // Remove cache-busting param
    const pathMatch = url.split("/collab-covers/")[1];
    if (pathMatch) {
      await supabase.storage.from("collab-covers").remove([pathMatch]);
    }
  }

  await db
    .delete(collaborationsTable)
    .where(eq(collaborationsTable.id, collabId));

  revalidatePath("/collab");
  redirect("/collab");
}
