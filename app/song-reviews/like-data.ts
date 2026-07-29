import { and, count, eq, inArray, isNull } from "drizzle-orm";
import { db } from "@/app/db";
import { songReviewLikesTable, usersTable } from "@/app/db/schema";
import { createClient } from "@/lib/supabase/server";

export async function getReviewsLikeCounts(reviewIds: string[]) {
  if (reviewIds.length === 0) return {};

  const rows = await db
    .select({
      reviewId: songReviewLikesTable.reviewId,
      total: count(),
    })
    .from(songReviewLikesTable)
    .innerJoin(usersTable, eq(songReviewLikesTable.userId, usersTable.id))
    .where(
      and(
        inArray(songReviewLikesTable.reviewId, reviewIds),
        isNull(usersTable.deactivatedAt),
      ),
    )
    .groupBy(songReviewLikesTable.reviewId);

  const counts: Record<string, number> = {};
  for (const row of rows) {
    counts[row.reviewId] = Number(row.total);
  }
  return counts;
}

export async function getReviewLikes(reviewId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const [result] = await db
    .select({ total: count() })
    .from(songReviewLikesTable)
    .innerJoin(usersTable, eq(songReviewLikesTable.userId, usersTable.id))
    .where(
      and(
        eq(songReviewLikesTable.reviewId, reviewId),
        isNull(usersTable.deactivatedAt),
      ),
    );

  const likeCount = Number(result?.total ?? 0);

  if (!user) {
    return { count: likeCount, isLiked: false };
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

  return { count: likeCount, isLiked: existing.length > 0 };
}
