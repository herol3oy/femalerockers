"use server";

import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/app/db";
import { songReviewLikesTable } from "@/app/db/schema";
import { createClient } from "@/lib/supabase/server";

export async function toggleLike(reviewId: string, slug: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "You must be logged in." };
  }

  const existing = await db
    .select({ id: songReviewLikesTable.id })
    .from(songReviewLikesTable)
    .where(
      and(
        eq(songReviewLikesTable.reviewId, reviewId),
        eq(songReviewLikesTable.userId, user.id),
      ),
    )
    .limit(1);

  if (existing.length > 0) {
    await db
      .delete(songReviewLikesTable)
      .where(eq(songReviewLikesTable.id, existing[0].id));
  } else {
    await db.insert(songReviewLikesTable).values({
      reviewId,
      userId: user.id,
    });
  }

  revalidatePath(`/song-reviews/${slug}`);
  revalidatePath("/song-reviews");
  return { liked: existing.length === 0 };
}
