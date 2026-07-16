import type { PortableTextBlock } from "next-sanity";

type SanityImage = {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
};

export type Interview = {
  _id: string;
  title: string;
  excerpt: string;
  stageName: string;
  slug: { current: string };
  country: string;
  profession: string[];
  profileImage: SanityImage;
  coverImage: SanityImage;
  instagram: string | null;
  spotify: string | null;
  facebook: string | null;
  twitter: string | null;
  youtube: string | null;
  website: string | null;
  date: string;
  body: PortableTextBlock[];
  quote: string[];
};

export type SongReview = {
  _id: string;
  title: string;
  stageName: string;
  slug: { current: string };
  date: string;
  body: PortableTextBlock[];
};

export type SongReviewListItem = Pick<
  SongReview,
  "_id" | "title" | "stageName" | "slug" | "date"
>;

export type InterviewListItem = Pick<
  Interview,
  | "_id"
  | "title"
  | "stageName"
  | "slug"
  | "country"
  | "profession"
  | "profileImage"
  | "date"
>;
