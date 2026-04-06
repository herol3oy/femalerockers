import {
  ArrowUpRightIcon,
  GlobeIcon,
  InstagramLogoIcon,
  MapPinIcon,
  SpotifyLogoIcon,
  YoutubeLogoIcon,
} from "@phosphor-icons/react/ssr";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "next-sanity";
import { Suspense } from "react";
import { interviewDetailQuery } from "@/app/interviews/queries";
import type { Interview } from "@/app/interviews/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { sanityClient } from "@/lib/sanity/client";
import { urlFor } from "@/lib/sanity/image";

type Params = Promise<{ slug: string }>;

async function InterviewContent({ params }: { params: Params }) {
  const { slug } = await params;
  const interview = await sanityClient.fetch<Interview | null>(
    interviewDetailQuery,
    { slug },
  );

  if (!interview) {
    notFound();
  }

  const socialLinks = [
    { url: interview.instagram, label: "Instagram", icon: InstagramLogoIcon },
    { url: interview.spotify, label: "Spotify", icon: SpotifyLogoIcon },
    { url: interview.youtube, label: "YouTube", icon: YoutubeLogoIcon },
    { url: interview.facebook, label: "Facebook", icon: GlobeIcon },
    { url: interview.twitter, label: "Twitter", icon: GlobeIcon },
    { url: interview.website, label: "Website", icon: GlobeIcon },
  ].filter((link) => link.url);

  return (
    <section className="min-h-screen bg-[radial-gradient(circle_at_top,hsl(var(--secondary))_0%,transparent_45%),linear-gradient(to_bottom,hsl(var(--background)),hsl(var(--muted)/0.35))]">
      <div className="mx-auto flex max-w-4xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <div>
          <Link
            href="/interviews"
            className="text-sm transition-colors text-muted-foreground hover:text-foreground"
          >
            &larr; All interviews
          </Link>
        </div>

        {interview.coverImage && (
          <div className="relative w-full overflow-hidden border aspect-21/9 rounded-3xl">
            <Image
              src={urlFor(interview.coverImage).width(1200).height(514).url()}
              alt={`Cover image for ${interview.stageName}`}
              fill
              sizes="(max-width: 1024px) 100vw, 896px"
              className="object-cover"
              priority
            />
          </div>
        )}

        <div className="relative overflow-hidden border shadow-sm rounded-3xl bg-background/95 p-8 lg:p-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8">
            {interview.profileImage && (
              <Image
                src={urlFor(interview.profileImage)
                  .width(192)
                  .height(192)
                  .url()}
                alt={interview.stageName}
                width={96}
                height={96}
                className="object-cover h-24 w-24 rounded-2xl"
              />
            )}
            <div className="flex-1 space-y-3">
              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                {interview.stageName}
              </h1>
              {interview.country && (
                <p className="flex items-center gap-2 text-muted-foreground">
                  <MapPinIcon className="w-4 h-4" />
                  {interview.country}
                </p>
              )}
              {interview.profession && interview.profession.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {interview.profession.map((p) => (
                    <Badge key={p} variant="secondary">
                      {p}
                    </Badge>
                  ))}
                </div>
              )}
              {interview.date && (
                <p className="text-sm text-muted-foreground">
                  {new Date(interview.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              )}
            </div>
          </div>

          {socialLinks.length > 0 && (
            <div className="flex flex-wrap gap-3 mt-6">
              {socialLinks.map((link) => (
                <Button key={link.label} asChild variant="outline" size="sm">
                  <a href={link.url ?? ""} target="_blank" rel="noreferrer">
                    <link.icon className="w-4 h-4" />
                    {link.label}
                    <ArrowUpRightIcon className="w-3.5 h-3.5" />
                  </a>
                </Button>
              ))}
            </div>
          )}
        </div>

        {interview.quote && interview.quote.length > 0 && (
          <blockquote className="border shadow-sm rounded-3xl bg-background/95 p-8 lg:p-10">
            {interview.quote.map((q) => (
              <p
                key={q}
                className="text-xl italic leading-relaxed text-foreground/80"
              >
                &ldquo;{q}&rdquo;
              </p>
            ))}
          </blockquote>
        )}

        {interview.body && (
          <article className="border shadow-sm rounded-3xl bg-background/95 p-8 lg:p-12">
            <div className="max-w-none prose prose-neutral dark:prose-invert prose-lg prose-p:leading-loose prose-p:text-muted-foreground prose-strong:text-foreground prose-strong:font-semibold prose-a:text-primary hover:prose-a:text-primary/80">
              <PortableText
                value={interview.body}
                components={{
                  types: {
                    image: ({ value }) => {
                      if (!value?.asset) return null;
                      return (
                        <figure className="my-12 overflow-hidden border shadow-sm rounded-2xl bg-muted/30">
                          <Image
                            src={urlFor(value).width(1000).url()}
                            alt={value.alt || "Interview image"}
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
                          "{children}"
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

function InterviewSkeleton() {
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

export default function InterviewDetailPage({ params }: { params: Params }) {
  return (
    <Suspense fallback={<InterviewSkeleton />}>
      <InterviewContent params={params} />
    </Suspense>
  );
}
