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
