import type { MetadataRoute } from "next";
import { sanityClient } from "@/lib/sanity/client";

const baseUrl = "https://www.femalerockers.com";

const interviewsQuery = `
  *[_type == "interview"]{
    "slug": slug.current,
    _updatedAt
  }
`;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const interviews = await sanityClient.fetch(interviewsQuery);

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `${baseUrl}/interviews`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },

    ...interviews.map((interview: { slug: string; _updatedAt: string }) => ({
      url: `${baseUrl}/interviews/${interview.slug}`,
      lastModified: new Date(interview._updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}