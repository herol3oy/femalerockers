import { and, avg, count, eq, inArray, isNull } from "drizzle-orm";
import { db } from "@/app/db";
import { songReviewRatingsTable, usersTable } from "@/app/db/schema";
import { createClient } from "@/lib/supabase/server";

export async function getReviewsRatingData(reviewIds: string[]) {
  if (reviewIds.length === 0) return {};

  const rows = await db
    .select({
      reviewId: songReviewRatingsTable.reviewId,
      average: avg(songReviewRatingsTable.rating),
      total: count(),
    })
    .from(songReviewRatingsTable)
    .innerJoin(usersTable, eq(songReviewRatingsTable.userId, usersTable.id))
    .where(
      and(inArray(songReviewRatingsTable.reviewId, reviewIds), isNull(usersTable.deactivatedAt)),
    )
    .groupBy(songReviewRatingsTable.reviewId);

  const result: Record<string, { average: number; count: number }> = {};
  for (const row of rows) {
    result[row.reviewId] = {
      average: Number(Number(row.average).toFixed(1)),
      count: Number(row.total),
    };
  }
  return result;
}

export async function getReviewRating(reviewId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const [aggregate] = await db
    .select({
      average: avg(songReviewRatingsTable.rating).mapWith(Number),
      total: count().mapWith(Number),
    })
    .from(songReviewRatingsTable)
    .innerJoin(usersTable, eq(songReviewRatingsTable.userId, usersTable.id))
    .where(and(eq(songReviewRatingsTable.reviewId, reviewId), isNull(usersTable.deactivatedAt)));

  const ratingAverage = aggregate?.average ? Number(aggregate.average.toFixed(1)) : 0;
  const ratingCount = aggregate?.total ?? 0;

  if (!user) {
    return { average: ratingAverage, count: ratingCount, userRating: null };
  }

  const existing = await db
    .select({ rating: songReviewRatingsTable.rating })
    .from(songReviewRatingsTable)
    .where(
      and(
        eq(songReviewRatingsTable.reviewId, reviewId),
        eq(songReviewRatingsTable.userId, user.id),
      ),
    )
    .limit(1);

  return {
    average: ratingAverage,
    count: ratingCount,
    userRating: existing.length > 0 ? existing[0].rating : null,
  };
}
