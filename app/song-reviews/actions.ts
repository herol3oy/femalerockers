"use server";

import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/app/db";
import { songReviewLikesTable, songReviewRatingsTable } from "@/app/db/schema";
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

export async function rateReview(
  reviewId: string,
  slug: string,
  rating: number,
) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "You must be logged in." };
  }

  if (rating < 1 || rating > 5 || !Number.isInteger(rating)) {
    return { error: "Rating must be an integer between 1 and 5." };
  }

  const existing = await db
    .select({ id: songReviewRatingsTable.id })
    .from(songReviewRatingsTable)
    .where(
      and(
        eq(songReviewRatingsTable.reviewId, reviewId),
        eq(songReviewRatingsTable.userId, user.id),
      ),
    )
    .limit(1);

  if (existing.length > 0) {
    await db
      .update(songReviewRatingsTable)
      .set({ rating, updatedAt: new Date() })
      .where(eq(songReviewRatingsTable.id, existing[0].id));
  } else {
    await db.insert(songReviewRatingsTable).values({
      reviewId,
      userId: user.id,
      rating,
      updatedAt: new Date(),
    });
  }

  revalidatePath(`/song-reviews/${slug}`);
  revalidatePath("/song-reviews");
  return { rating };
}

export async function removeRating(reviewId: string, slug: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "You must be logged in." };
  }

  const existing = await db
    .select({ id: songReviewRatingsTable.id })
    .from(songReviewRatingsTable)
    .where(
      and(
        eq(songReviewRatingsTable.reviewId, reviewId),
        eq(songReviewRatingsTable.userId, user.id),
      ),
    )
    .limit(1);

  if (existing.length > 0) {
    await db
      .delete(songReviewRatingsTable)
      .where(eq(songReviewRatingsTable.id, existing[0].id));
  }

  revalidatePath(`/song-reviews/${slug}`);
  revalidatePath("/song-reviews");
  return { removed: true };
}
