import { MapPinIcon } from "@phosphor-icons/react/ssr";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { interviewsListQuery } from "@/app/interviews/queries";
import type { InterviewListItem } from "@/app/interviews/types";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { sanityClient } from "@/lib/sanity/client";
import { urlFor } from "@/lib/sanity/image";

function InterviewsSkeleton() {
  return (
    <section className="min-h-screen bg-[radial-gradient(circle_at_top,hsl(var(--secondary))_0%,transparent_45%),linear-gradient(to_bottom,hsl(var(--background)),hsl(var(--muted)/0.35))]">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <div className="overflow-hidden rounded-3xl border bg-background/95 p-8 shadow-sm animate-pulse">
          <div className="h-6 w-32 rounded-md bg-muted" />
          <div className="mt-4 h-12 w-full max-w-2xl rounded-xl bg-muted" />
          <div className="mt-3 h-5 w-full max-w-3xl rounded-lg bg-muted" />
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card
              key={`skeleton-${i.toString()}`}
              className="min-h-87.5 border-border/70 bg-background/90 shadow-sm"
            >
              <CardHeader className="flex h-full flex-col justify-end animate-pulse space-y-4">
                <div className="h-6 w-1/2 rounded-lg bg-muted" />
                <div className="h-4 w-2/3 rounded-lg bg-muted" />
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

async function InterviewsList() {
  const interviews =
    await sanityClient.fetch<InterviewListItem[]>(interviewsListQuery);

  return (
    <section className="min-h-screen bg-[radial-gradient(circle_at_top,hsl(var(--secondary))_0%,transparent_45%),linear-gradient(to_bottom,hsl(var(--background)),hsl(var(--muted)/0.35))]">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <div className="relative overflow-hidden rounded-3xl border bg-background/95 p-8 shadow-sm lg:p-10">
          <div className="space-y-3">
            <Badge variant="secondary" className="w-fit">
              Interviews
            </Badge>
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
              Stories from female musicians around the world.
            </h1>
            <p className="max-w-2xl text-base text-muted-foreground sm:text-lg">
              Read in-depth interviews with artists from our community — their
              journeys, creative process, and advice for fellow musicians.
            </p>
          </div>
        </div>

        {interviews.length === 0 ? (
          <Card className="border-dashed bg-background/90 shadow-sm">
            <CardHeader>
              <CardTitle>No interviews yet</CardTitle>
              <CardDescription>
                Interviews will appear here once they are published.
              </CardDescription>
            </CardHeader>
          </Card>
        ) : (
          <div className="grid gap-4 grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
            {interviews.map((interview) => (
              <Card
                key={interview._id}
                className="group relative flex min-h-95 flex-col overflow-hidden border-border/70 shadow-sm transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg"
              >
                <Link
                  href={`/interviews/${interview.slug.current}`}
                  aria-label={`Read interview with ${interview.stageName}`}
                  className="absolute inset-0 z-30"
                />

                {/* Background Image with grayscale and hover effect */}
                {interview.profileImage ? (
                  <Image
                    src={urlFor(interview.profileImage)
                      .width(600)
                      .height(800)
                      .url()}
                    alt={interview.stageName}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="absolute inset-0 z-0 object-cover grayscale transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0"
                  />
                ) : (
                  <div className="absolute inset-0 z-0 flex items-center justify-center bg-primary text-6xl font-bold text-primary-foreground/20 grayscale transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0">
                    {interview.stageName.charAt(0)}
                  </div>
                )}

                <div className="absolute inset-0 z-10 bg-linear-to-t from-black/95 via-black/60 to-black/10 transition-opacity duration-300 group-hover:from-black" />

                {/* Content placed at the bottom */}
                <div className="pointer-events-none relative z-20 flex h-full flex-col justify-end p-5 sm:p-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      {interview.title ? (
                        <CardTitle className="text-xl leading-snug text-white line-clamp-2">
                          {interview.title}
                        </CardTitle>
                      ) : (
                        <CardTitle className="text-xl leading-snug text-white line-clamp-3">
                          {interview.stageName}
                        </CardTitle>
                      )}

                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 pt-1">
                        <p className="text-sm font-medium text-white/90">
                          {interview.stageName}
                        </p>

                        {interview.country && (
                          <>
                            <span className="text-white/40 text-xs">•</span>
                            <CardDescription className="flex items-center gap-1 text-white/80">
                              <MapPinIcon className="h-3.5 w-3.5" />
                              {interview.country}
                            </CardDescription>
                          </>
                        )}
                      </div>
                    </div>

                    {interview.profession &&
                      interview.profession.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {interview.profession.map((p) => (
                            <Badge
                              key={p}
                              variant="secondary"
                              className="border-none bg-white/20 text-white backdrop-blur-md"
                            >
                              {p}
                            </Badge>
                          ))}
                        </div>
                      )}

                    {interview.date && (
                      <p className="pt-1 text-xs text-white/60">
                        {new Date(interview.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                        })}
                      </p>
                    )}
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

export default function InterviewsPage() {
  return (
    <Suspense fallback={<InterviewsSkeleton />}>
      <InterviewsList />
    </Suspense>
  );
}
