import Link from "next/link";
import { Suspense } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { sanityClient } from "@/lib/sanity/client";
import { songReviewsListQuery } from "../interviews/queries";
import type { SongReviewListItem } from "../interviews/types";
import { getReviewsCommentCounts } from "./comment-data";
import { getReviewsLikeCounts } from "./like-data";
import { getReviewsRatingData } from "./rating-data";

function SongReviewsSkeleton() {
  return (
    <section className="min-h-screen bg-[radial-gradient(circle_at_top,hsl(var(--secondary))_0%,transparent_45%),linear-gradient(to_bottom,hsl(var(--background)),hsl(var(--muted)/0.35))]">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <div className="overflow-hidden rounded-3xl border bg-background/95 p-8 shadow-sm">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="mt-4 h-12 w-full max-w-2xl" />
          <Skeleton className="mt-3 h-5 w-full max-w-3xl" />
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card
              key={`skeleton-${i.toString()}`}
              className="min-h-87.5 border-border/70 bg-background/90 shadow-sm"
            >
              <CardHeader className="flex h-full flex-col justify-end space-y-4">
                <Skeleton className="h-6 w-1/2" />
                <Skeleton className="h-4 w-2/3" />
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

async function SongReviewsList() {
  const songReviews =
    await sanityClient.fetch<SongReviewListItem[]>(songReviewsListQuery);

  const reviewIds = songReviews.map((r) => r._id);
  const [likeCounts, ratingData, commentCounts] = await Promise.all([
    getReviewsLikeCounts(reviewIds),
    getReviewsRatingData(reviewIds),
    getReviewsCommentCounts(reviewIds),
  ]);

  return (
    <section className="min-h-screen bg-[radial-gradient(circle_at_top,hsl(var(--secondary))_0%,transparent_45%),linear-gradient(to_bottom,hsl(var(--background)),hsl(var(--muted)/0.35))]">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <div className="relative overflow-hidden rounded-3xl border bg-background/95 p-8 shadow-sm lg:p-10">
          <div className="space-y-3">
            <Badge variant="secondary" className="w-fit">
              Song Reviews
            </Badge>
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
              Women Who Rock: Song Reviews.
            </h1>
            <p className="max-w-2xl text-base text-muted-foreground sm:text-lg">
              Discover what our community thinks about the latest releases from
              artists around the world.
            </p>
          </div>
        </div>

        {songReviews.length === 0 ? (
          <Card className="border-dashed bg-background/90 shadow-sm">
            <CardHeader>
              <CardTitle>No song reviews yet</CardTitle>
              <CardDescription>
                Song reviews will appear here once they are published.
              </CardDescription>
            </CardHeader>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {songReviews.map((review) => (
              <Card
                key={review._id}
                className="group relative flex min-h-48 flex-col overflow-hidden border-border/70 shadow-sm transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg"
              >
                <Link
                  href={`/song-reviews/${review.slug.current}`}
                  aria-label={`Read review: ${review.title}`}
                  className="absolute inset-0 z-30"
                />
                <div className="absolute inset-0 z-0 bg-linear-to-t from-primary/10 via-primary/5 to-transparent" />
                <div className="pointer-events-none relative z-20 flex h-full flex-col justify-end p-5 sm:p-6">
                  <div className="space-y-3">
                    <CardTitle className="text-xl leading-snug line-clamp-2">
                      {review.title}
                    </CardTitle>
                    <p className="text-sm font-medium text-muted-foreground">
                      {review.stageName}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground/70">
                      {review.date && (
                        <span>
                          {new Date(review.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                          })}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="h-3 w-3 text-muted-foreground/50"
                          aria-label="likes"
                        >
                          <title>Likes</title>
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                        {likeCounts[review._id] ?? 0}
                      </span>
                      {ratingData[review._id] && (
                        <span className="flex items-center gap-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="h-3 w-3 text-amber-400"
                            aria-label="rating"
                          >
                            <title>Rating</title>
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                          {ratingData[review._id].average}
                          <span className="text-muted-foreground/50">
                            ({ratingData[review._id].count})
                          </span>
                        </span>
                      )}
                      {commentCounts[review._id] > 0 && (
                        <span className="flex items-center gap-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="h-3 w-3 text-muted-foreground/50"
                            aria-label="comments"
                          >
                            <title>Comments</title>
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10z" />
                          </svg>
                          {commentCounts[review._id]}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default function SongReviewsPage() {
  return (
    <Suspense fallback={<SongReviewsSkeleton />}>
      <SongReviewsList />
    </Suspense>
  );
}
