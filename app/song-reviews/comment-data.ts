import { count, desc, eq, inArray } from "drizzle-orm";
import { db } from "@/app/db";
import { songReviewCommentsTable, usersTable } from "@/app/db/schema";

export type CommentWithUser = {
  id: string;
  userId: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
  username: string;
  artistName: string;
  avatarUrl: string | null;
};

export async function getReviewComments(
  reviewId: string,
): Promise<CommentWithUser[]> {
  const rows = await db
    .select({
      id: songReviewCommentsTable.id,
      userId: songReviewCommentsTable.userId,
      body: songReviewCommentsTable.body,
      createdAt: songReviewCommentsTable.createdAt,
      updatedAt: songReviewCommentsTable.updatedAt,
      username: usersTable.username,
      artistName: usersTable.artistName,
      avatarUrl: usersTable.avatarUrl,
    })
    .from(songReviewCommentsTable)
    .innerJoin(usersTable, eq(songReviewCommentsTable.userId, usersTable.id))
    .where(eq(songReviewCommentsTable.reviewId, reviewId))
    .orderBy(desc(songReviewCommentsTable.createdAt));

  return rows;
}

export async function getReviewsCommentCounts(
  reviewIds: string[],
): Promise<Record<string, number>> {
  if (reviewIds.length === 0) return {};

  const rows = await db
    .select({
      reviewId: songReviewCommentsTable.reviewId,
      total: count(),
    })
    .from(songReviewCommentsTable)
    .where(inArray(songReviewCommentsTable.reviewId, reviewIds))
    .groupBy(songReviewCommentsTable.reviewId);

  const result: Record<string, number> = {};
  for (const row of rows) {
    result[row.reviewId] = Number(row.total);
  }
  return result;
}
