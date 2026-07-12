import { relations } from "drizzle-orm";
import {
  boolean,
  integer,
  pgTable,
  text,
  timestamp,
  unique,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const USER_ROLES = ["musician", "band", "agent", "music_fan"] as const;
export type UserRole = (typeof USER_ROLES)[number];

export const usersTable = pgTable("users_table", {
  id: uuid("id").primaryKey().notNull(),
  email: text("email").notNull().unique(),
  username: varchar("username", { length: 50 }).unique().notNull(),
  artistName: varchar("artist_name", { length: 100 }).notNull(),
  avatarUrl: varchar("avatar_url", { length: 500 }),
  cityCountry: varchar("city_country", { length: 100 }),
  mainInstrument: varchar("main_instrument", { length: 50 }),
  genre: varchar("genre", { length: 50 }),
  bio: text("bio"),
  instagramUrl: varchar("instagram_url", { length: 255 }),
  videoLink: varchar("video_link", { length: 255 }),
  collabStatus: boolean("collab_status").default(false),
  newsletterOptIn: boolean("newsletter_opt_in").default(false).notNull(),
  newsletterOptInAt: timestamp("newsletter_opt_in_at"),
  isApproved: boolean("is_approved").default(false).notNull(),
  role: varchar("role", { length: 20 }).default("user").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const songReviewLikesTable = pgTable(
  "song_review_likes_table",
  {
    id: uuid("id").primaryKey().defaultRandom().notNull(),
    userId: uuid("user_id")
      .notNull()
      .references(() => usersTable.id, { onDelete: "cascade" }),
    reviewId: text("review_id").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (t) => ({
    uniqueLike: unique().on(t.userId, t.reviewId),
  }),
);

export const songReviewCommentsTable = pgTable("song_review_comments_table", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  userId: uuid("user_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  reviewId: text("review_id").notNull(),
  body: text("body").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type InsertSongReviewComment =
  typeof songReviewCommentsTable.$inferInsert;
export type SelectSongReviewComment =
  typeof songReviewCommentsTable.$inferSelect;

export const songReviewRatingsTable = pgTable(
  "song_review_ratings_table",
  {
    id: uuid("id").primaryKey().defaultRandom().notNull(),
    userId: uuid("user_id")
      .notNull()
      .references(() => usersTable.id, { onDelete: "cascade" }),
    reviewId: text("review_id").notNull(),
    rating: integer("rating").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (t) => ({
    uniqueRating: unique().on(t.userId, t.reviewId),
  }),
);

export type InsertSongReviewRating = typeof songReviewRatingsTable.$inferInsert;
export type SelectSongReviewRating = typeof songReviewRatingsTable.$inferSelect;

export type InsertSongReviewLike = typeof songReviewLikesTable.$inferInsert;
export type SelectSongReviewLike = typeof songReviewLikesTable.$inferSelect;

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;

export const collaborationsTable = pgTable("collaborations_table", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  userId: uuid("user_id")
    .notNull()
    .references(() => usersTable.id),
  status: varchar("status", { length: 20 }).default("pending").notNull(),
  bio: text("bio").notNull(),
  pieceType: varchar("piece_type", { length: 20 }).notNull(),
  songTitle: varchar("song_title", { length: 200 }).notNull(),
  bandName: varchar("band_name", { length: 200 }),
  videoUrl: varchar("video_url", { length: 500 }).notNull(),
  coverPhotoUrl: varchar("cover_photo_url", { length: 500 }),
  upcomingNews: text("upcoming_news"),
  adminNotes: text("admin_notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const usersRelations = relations(usersTable, ({ many }) => ({
  collaborations: many(collaborationsTable),
  challengeParticipations: many(challengeParticipationsTable),
  songReviewLikes: many(songReviewLikesTable),
  songReviewRatings: many(songReviewRatingsTable),
  songReviewComments: many(songReviewCommentsTable),
}));

export const collaborationsRelations = relations(
  collaborationsTable,
  ({ one }) => ({
    user: one(usersTable, {
      fields: [collaborationsTable.userId],
      references: [usersTable.id],
    }),
  }),
);

export type InsertCollaboration = typeof collaborationsTable.$inferInsert;
export type SelectCollaboration = typeof collaborationsTable.$inferSelect;

export const challengesTable = pgTable("challenges_table", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  title: varchar("title", { length: 200 }).notNull(),
  slug: varchar("slug", { length: 100 }).unique(),
  description: text("description").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  endsAt: timestamp("ends_at").notNull(),
});

export const challengeParticipationsTable = pgTable(
  "challenge_participations_table",
  {
    id: uuid("id").primaryKey().defaultRandom().notNull(),
    challengeId: uuid("challenge_id")
      .notNull()
      .references(() => challengesTable.id, { onDelete: "cascade" }),
    userId: uuid("user_id")
      .notNull()
      .references(() => usersTable.id, { onDelete: "cascade" }),
    status: varchar("status", { length: 20 }).default("committed").notNull(), // committed, withdrawn, submitted
    videoUrl: varchar("video_url", { length: 500 }),
    description: text("description"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
);

export const challengesRelations = relations(challengesTable, ({ many }) => ({
  participations: many(challengeParticipationsTable),
}));

export const challengeParticipationsRelations = relations(
  challengeParticipationsTable,
  ({ one }) => ({
    challenge: one(challengesTable, {
      fields: [challengeParticipationsTable.challengeId],
      references: [challengesTable.id],
    }),
    user: one(usersTable, {
      fields: [challengeParticipationsTable.userId],
      references: [usersTable.id],
    }),
  }),
);

export type InsertChallenge = typeof challengesTable.$inferInsert;
export type SelectChallenge = typeof challengesTable.$inferSelect;
export type InsertChallengeParticipation =
  typeof challengeParticipationsTable.$inferInsert;
export type SelectChallengeParticipation =
  typeof challengeParticipationsTable.$inferSelect;
