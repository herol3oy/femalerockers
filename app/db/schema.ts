import { relations } from "drizzle-orm";
import {
  boolean,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

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
  isApproved: boolean("is_approved").default(false).notNull(),
  role: varchar("role", { length: 20 }).default("user").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

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
