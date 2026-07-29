"use server";

import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/app/db";
import {
  songReviewCommentsTable,
  songReviewLikesTable,
  songReviewRatingsTable,
} from "@/app/db/schema";
import { isActiveAccount } from "@/lib/auth/active-account";
import { createClient } from "@/lib/supabase/server";

export async function toggleLike(reviewId: string, slug: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "You must be logged in." };
  }

  if (!(await isActiveAccount(user.id))) {
    return { error: "Reactivate your account before interacting." };
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

  if (!(await isActiveAccount(user.id))) {
    return { error: "Reactivate your account before interacting." };
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

  if (!(await isActiveAccount(user.id))) {
    return { error: "Reactivate your account before interacting." };
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

export async function addComment(reviewId: string, slug: string, body: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "You must be logged in." };
  }

  if (!(await isActiveAccount(user.id))) {
    return { error: "Reactivate your account before interacting." };
  }

  if (!body || body.trim().length === 0) {
    return { error: "Comment cannot be empty." };
  }

  if (body.length > 2000) {
    return { error: "Comment is too long (max 2000 characters)." };
  }

  const [comment] = await db
    .insert(songReviewCommentsTable)
    .values({
      reviewId,
      userId: user.id,
      body: body.trim(),
    })
    .returning({ id: songReviewCommentsTable.id });

  revalidatePath(`/song-reviews/${slug}`);
  revalidatePath("/song-reviews");
  return { comment };
}

export async function deleteComment(commentId: string, slug: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "You must be logged in." };
  }

  if (!(await isActiveAccount(user.id))) {
    return { error: "Reactivate your account before interacting." };
  }

  const existing = await db
    .select({
      id: songReviewCommentsTable.id,
      userId: songReviewCommentsTable.userId,
    })
    .from(songReviewCommentsTable)
    .where(eq(songReviewCommentsTable.id, commentId))
    .limit(1);

  if (existing.length === 0) {
    return { error: "Comment not found." };
  }

  if (existing[0].userId !== user.id) {
    return { error: "You can only delete your own comments." };
  }

  await db
    .delete(songReviewCommentsTable)
    .where(eq(songReviewCommentsTable.id, commentId));

  revalidatePath(`/song-reviews/${slug}`);
  revalidatePath("/song-reviews");
  return { deleted: true };
}
