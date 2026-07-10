import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "next-sanity";
import { Suspense } from "react";
import { songReviewDetailQuery } from "@/app/interviews/queries";
import type { SongReview } from "@/app/interviews/types";
import { sanityClient } from "@/lib/sanity/client";
import { urlFor } from "@/lib/sanity/image";

type Params = Promise<{ slug: string }>;

async function SongReviewsContent({ params }: { params: Params }) {
  const { slug } = await params;
  const songReview = await sanityClient.fetch<SongReview | null>(
    songReviewDetailQuery,
    { slug },
  );

  if (!songReview) {
    notFound();
  }

  return (
    <section className="min-h-screen bg-[radial-gradient(circle_at_top,hsl(var(--secondary))_0%,transparent_45%),linear-gradient(to_bottom,hsl(var(--background)),hsl(var(--muted)/0.35))]">
      <div className="mx-auto flex max-w-4xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <div>
          <Link
            href="/song-reviews"
            className="text-sm transition-colors text-muted-foreground hover:text-foreground"
          >
            &larr; All song reviews
          </Link>
        </div>

        <div className="relative overflow-hidden border shadow-sm rounded-3xl bg-background/95 p-8 lg:p-10">
          <div className="space-y-3">
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              {songReview.title}
            </h1>
            <p className="text-lg text-muted-foreground">
              {songReview.stageName}
            </p>
            {songReview.date && (
              <p className="text-sm text-muted-foreground">
                {new Date(songReview.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            )}
          </div>
        </div>

        {songReview.body && (
          <article className="border shadow-sm rounded-3xl bg-background/95 p-8 lg:p-12">
            <div className="max-w-none prose prose-neutral dark:prose-invert prose-lg prose-p:leading-loose prose-p:text-muted-foreground prose-strong:text-foreground prose-strong:font-semibold prose-a:text-primary hover:prose-a:text-primary/80">
              <PortableText
                value={songReview.body}
                components={{
                  types: {
                    image: ({ value }) => {
                      if (!value?.asset) return null;
                      return (
                        <figure className="my-12 overflow-hidden border shadow-sm rounded-2xl bg-muted/30">
                          <Image
                            src={urlFor(value).width(1000).url()}
                            alt={value.alt || "Review image"}
                            width={1000}
                            height={667}
                            className="w-full h-auto object-cover m-0 transition-transform duration-700 hover:scale-[1.02]"
                          />
                        </figure>
                      );
                    },
                  },
                  block: {
                    blockquote: ({ children }) => (
                      <blockquote className="my-12 border-l-4 border-primary bg-primary/5 p-6 rounded-r-2xl sm:p-8">
                        <p className="m-0! text-xl font-medium italic leading-relaxed text-foreground sm:text-2xl">
                          &ldquo;{children}&rdquo;
                        </p>
                      </blockquote>
                    ),
                    normal: ({ children }) => (
                      <p className="mb-6">{children}</p>
                    ),
                  },
                  marks: {
                    strong: ({ children }) => (
                      <strong className="flex flex-col gap-4 mt-12 mb-6 text-xl tracking-tight sm:text-2xl font-semibold text-foreground">
                        <Image
                          src="/female-rockers-logo.svg"
                          alt="Female Rockers Logo"
                          width={36}
                          height={36}
                          className="w-7 h-7 rounded-full m-0"
                        />
                        <span>{children}</span>
                      </strong>
                    ),
                  },
                }}
              />
            </div>
          </article>
        )}
      </div>
    </section>
  );
}

function SongReviewSkeleton() {
  return (
    <section className="min-h-screen bg-[radial-gradient(circle_at_top,hsl(var(--secondary))_0%,transparent_45%),linear-gradient(to_bottom,hsl(var(--background)),hsl(var(--muted)/0.35))]">
      <div className="flex flex-col max-w-4xl gap-8 px-4 py-8 mx-auto sm:px-6 lg:px-8 lg:py-12 animate-pulse">
        <div className="w-24 h-4 rounded bg-muted" />
        <div className="w-full rounded-3xl aspect-21/9 bg-muted" />
        <div className="space-y-4 border shadow-sm rounded-3xl bg-background/95 p-8">
          <div className="w-24 h-24 rounded-2xl bg-muted" />
          <div className="w-1/2 h-8 rounded-lg bg-muted" />
          <div className="w-1/3 h-4 rounded bg-muted" />
        </div>
      </div>
    </section>
  );
}

export default function SongReviewPage({ params }: { params: Params }) {
  return (
    <Suspense fallback={<SongReviewSkeleton />}>
      <SongReviewsContent params={params} />
    </Suspense>
  );
}
