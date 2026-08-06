import { relations, sql } from "drizzle-orm";
import {
  boolean,
  check,
  index,
  integer,
  pgPolicy,
  pgTable,
  text,
  timestamp,
  unique,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const USER_ROLES = ["musician", "band", "agent", "music_fan"] as const;
export type UserRole = (typeof USER_ROLES)[number];

export const ACCOUNT_DELETION_REASONS = [
  "privacy_concerns",
  "not_useful",
  "not_enough_activity",
  "too_many_messages",
  "technical_issues",
  "taking_a_break",
  "other",
] as const;
export type AccountDeletionReason = (typeof ACCOUNT_DELETION_REASONS)[number];

export const usersTable = pgTable(
  "users_table",
  {
    id: uuid("id").primaryKey().notNull(),
    email: text("email").notNull().unique(),
    username: varchar("username", { length: 50 }).unique().notNull(),
    artistName: varchar("artist_name", { length: 100 }).notNull(),
    avatarUrl: varchar("avatar_url", { length: 500 }),
    cityCountry: varchar("city_country", { length: 100 }),
    mainInstrument: text("main_instrument"),
    genre: text("genre"),
    bio: text("bio"),
    instagramUrl: varchar("instagram_url", { length: 255 }),
    websiteUrl: varchar("website_url", { length: 255 }),
    videoLink: varchar("video_link", { length: 255 }),
    collabStatus: boolean("collab_status").default(false),
    newsletterOptIn: boolean("newsletter_opt_in").default(false).notNull(),
    newsletterOptInAt: timestamp("newsletter_opt_in_at"),
    isApproved: boolean("is_approved").default(false).notNull(),
    role: varchar("role", { length: 20 }).default("user").notNull(),
    referralCode: varchar("referral_code", { length: 10 })
      .default(sql`upper(substr(replace(gen_random_uuid()::text, '-', ''), 1, 10))`)
      .notNull()
      .unique(),
    deactivatedAt: timestamp("deactivated_at"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  () => [
    pgPolicy("users_active_public_select", {
      as: "restrictive",
      for: "select",
      using: sql`
        deactivated_at IS NULL
        OR (select auth.uid()) = id
      `,
    }),
    pgPolicy("users_active_owner_update", {
      as: "restrictive",
      for: "update",
      using: sql`
        deactivated_at IS NULL
      `,
      withCheck: sql`
        deactivated_at IS NULL
      `,
    }),
    pgPolicy("users_active_owner_delete", {
      as: "restrictive",
      for: "delete",
      using: sql`
        deactivated_at IS NULL
      `,
    }),
  ],
).enableRLS();

export const accountDeletionFeedbackTable = pgTable(
  "account_deletion_feedback",
  {
    id: uuid("id").primaryKey().defaultRandom().notNull(),
    reason: varchar("reason", { length: 50 }).notNull(),
    details: varchar("details", { length: 500 }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  () => [],
).enableRLS();

export type InsertAccountDeletionFeedback = typeof accountDeletionFeedbackTable.$inferInsert;
export type SelectAccountDeletionFeedback = typeof accountDeletionFeedbackTable.$inferSelect;

export const referralsTable = pgTable(
  "referrals_table",
  {
    id: uuid("id").primaryKey().defaultRandom().notNull(),
    referrerId: uuid("referrer_id")
      .notNull()
      .references(() => usersTable.id, { onDelete: "cascade" }),
    referredUserId: uuid("referred_user_id")
      .notNull()
      .unique()
      .references(() => usersTable.id, { onDelete: "cascade" }),
    completedAt: timestamp("completed_at").defaultNow().notNull(),
  },
  (t) => [
    index("referrals_referrer_id_idx").on(t.referrerId),
    pgPolicy("referrals_select_admin", {
      for: "select",
      using: sql`public.is_admin()`,
    }),
  ],
).enableRLS();

export type InsertReferral = typeof referralsTable.$inferInsert;
export type SelectReferral = typeof referralsTable.$inferSelect;

export const INVITATION_SOURCES = ["admin", "member"] as const;
export type InvitationSource = (typeof INVITATION_SOURCES)[number];

export const INVITATION_STATUSES = ["pending", "accepted", "expired", "revoked", "failed"] as const;
export type InvitationStatus = (typeof INVITATION_STATUSES)[number];

export const registrationInvitationsTable = pgTable(
  "registration_invitations",
  {
    id: uuid("id").primaryKey().defaultRandom().notNull(),
    recipientEmail: text("recipient_email").notNull(),
    tokenHash: varchar("token_hash", { length: 64 }).notNull().unique(),
    source: varchar("source", { length: 20 }).$type<InvitationSource>().notNull(),
    inviterId: uuid("inviter_id")
      .notNull()
      .references(() => usersTable.id, { onDelete: "cascade" }),
    memberSlot: integer("member_slot"),
    status: varchar("status", { length: 20 })
      .$type<InvitationStatus>()
      .default("pending")
      .notNull(),
    acceptedUserId: uuid("accepted_user_id").references(() => usersTable.id, {
      onDelete: "cascade",
    }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    sentAt: timestamp("sent_at"),
    expiresAt: timestamp("expires_at").notNull(),
    acceptedAt: timestamp("accepted_at"),
    revokedAt: timestamp("revoked_at"),
    deliveryError: text("delivery_error"),
  },
  (t) => [
    index("registration_invitations_inviter_id_idx").on(t.inviterId),
    index("registration_invitations_accepted_user_id_idx").on(t.acceptedUserId),
    index("registration_invitations_status_expires_at_idx").on(t.status, t.expiresAt),
    index("registration_invitations_inviter_created_at_idx").on(t.inviterId, t.createdAt),
    uniqueIndex("registration_invitations_active_recipient_email_unique")
      .on(t.recipientEmail)
      .where(sql`${t.status} = 'pending'`),
    uniqueIndex("registration_invitations_member_slot_unique")
      .on(t.inviterId, t.memberSlot)
      .where(
        sql`${t.source} = 'member' AND ${t.memberSlot} IS NOT NULL AND ${t.status} <> 'failed'`,
      ),
    uniqueIndex("registration_invitations_accepted_user_unique")
      .on(t.acceptedUserId)
      .where(sql`${t.acceptedUserId} IS NOT NULL`),
    check(
      "registration_invitations_recipient_email_normalized_check",
      sql`${t.recipientEmail} = lower(btrim(${t.recipientEmail}))`,
    ),
    check("registration_invitations_token_hash_check", sql`${t.tokenHash} ~ '^[0-9a-f]{64}$'`),
    check("registration_invitations_source_check", sql`${t.source} IN ('admin', 'member')`),
    check(
      "registration_invitations_status_check",
      sql`${t.status} IN ('pending', 'accepted', 'expired', 'revoked', 'failed')`,
    ),
    check(
      "registration_invitations_member_slot_check",
      sql`(
        (${t.source} = 'admin' AND ${t.memberSlot} IS NULL)
        OR
        (${t.source} = 'member' AND ${t.memberSlot} BETWEEN 1 AND 3)
      )`,
    ),
    check("registration_invitations_expiration_check", sql`${t.expiresAt} > ${t.createdAt}`),
    check(
      "registration_invitations_acceptance_check",
      sql`(
        (${t.status} = 'accepted' AND ${t.acceptedUserId} IS NOT NULL AND ${t.acceptedAt} IS NOT NULL)
        OR
        (${t.status} <> 'accepted' AND ${t.acceptedUserId} IS NULL AND ${t.acceptedAt} IS NULL)
      )`,
    ),
    check(
      "registration_invitations_revocation_check",
      sql`(
        (${t.status} = 'revoked' AND ${t.revokedAt} IS NOT NULL)
        OR
        (${t.status} <> 'revoked' AND ${t.revokedAt} IS NULL)
      )`,
    ),
    check(
      "registration_invitations_failure_check",
      sql`(
        (${t.status} = 'failed' AND ${t.deliveryError} IS NOT NULL)
        OR
        (${t.status} <> 'failed' AND ${t.deliveryError} IS NULL)
      )`,
    ),
  ],
).enableRLS();

export type InsertRegistrationInvitation = typeof registrationInvitationsTable.$inferInsert;
export type SelectRegistrationInvitation = typeof registrationInvitationsTable.$inferSelect;

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
  (t) => [
    unique().on(t.userId, t.reviewId),
    pgPolicy("song_review_likes_active_owner_select", {
      as: "restrictive",
      for: "select",
      using: sql`
        EXISTS (
          SELECT 1 FROM users_table
          WHERE users_table.id = user_id
            AND users_table.deactivated_at IS NULL
        )
      `,
    }),
    pgPolicy("song_review_likes_active_owner_insert", {
      as: "restrictive",
      for: "insert",
      withCheck: sql`
        EXISTS (
          SELECT 1 FROM users_table
          WHERE users_table.id = user_id
            AND users_table.deactivated_at IS NULL
        )
      `,
    }),
    pgPolicy("song_review_likes_active_owner_delete", {
      as: "restrictive",
      for: "delete",
      using: sql`
        EXISTS (
          SELECT 1 FROM users_table
          WHERE users_table.id = user_id
            AND users_table.deactivated_at IS NULL
        )
      `,
    }),
  ],
).enableRLS();

export const songReviewCommentsTable = pgTable(
  "song_review_comments_table",
  {
    id: uuid("id").primaryKey().defaultRandom().notNull(),
    userId: uuid("user_id")
      .notNull()
      .references(() => usersTable.id, { onDelete: "cascade" }),
    reviewId: text("review_id").notNull(),
    body: text("body").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  () => [
    pgPolicy("song_review_comments_active_owner_select", {
      as: "restrictive",
      for: "select",
      using: sql`
        EXISTS (
          SELECT 1 FROM users_table
          WHERE users_table.id = user_id
            AND users_table.deactivated_at IS NULL
        )
      `,
    }),
    pgPolicy("song_review_comments_active_owner_insert", {
      as: "restrictive",
      for: "insert",
      withCheck: sql`
        EXISTS (
          SELECT 1 FROM users_table
          WHERE users_table.id = user_id
            AND users_table.deactivated_at IS NULL
        )
      `,
    }),
    pgPolicy("song_review_comments_active_owner_update", {
      as: "restrictive",
      for: "update",
      using: sql`
        EXISTS (
          SELECT 1 FROM users_table
          WHERE users_table.id = user_id
            AND users_table.deactivated_at IS NULL
        )
      `,
      withCheck: sql`
        EXISTS (
          SELECT 1 FROM users_table
          WHERE users_table.id = user_id
            AND users_table.deactivated_at IS NULL
        )
      `,
    }),
    pgPolicy("song_review_comments_active_owner_delete", {
      as: "restrictive",
      for: "delete",
      using: sql`
        EXISTS (
          SELECT 1 FROM users_table
          WHERE users_table.id = user_id
            AND users_table.deactivated_at IS NULL
        )
      `,
    }),
  ],
).enableRLS();

export type InsertSongReviewComment = typeof songReviewCommentsTable.$inferInsert;
export type SelectSongReviewComment = typeof songReviewCommentsTable.$inferSelect;

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
  (t) => [
    unique().on(t.userId, t.reviewId),
    pgPolicy("song_review_ratings_active_owner_select", {
      as: "restrictive",
      for: "select",
      using: sql`
        EXISTS (
          SELECT 1 FROM users_table
          WHERE users_table.id = user_id
            AND users_table.deactivated_at IS NULL
        )
      `,
    }),
    pgPolicy("song_review_ratings_active_owner_insert", {
      as: "restrictive",
      for: "insert",
      withCheck: sql`
        EXISTS (
          SELECT 1 FROM users_table
          WHERE users_table.id = user_id
            AND users_table.deactivated_at IS NULL
        )
      `,
    }),
    pgPolicy("song_review_ratings_active_owner_update", {
      as: "restrictive",
      for: "update",
      using: sql`
        EXISTS (
          SELECT 1 FROM users_table
          WHERE users_table.id = user_id
            AND users_table.deactivated_at IS NULL
        )
      `,
      withCheck: sql`
        EXISTS (
          SELECT 1 FROM users_table
          WHERE users_table.id = user_id
            AND users_table.deactivated_at IS NULL
        )
      `,
    }),
    pgPolicy("song_review_ratings_active_owner_delete", {
      as: "restrictive",
      for: "delete",
      using: sql`
        EXISTS (
          SELECT 1 FROM users_table
          WHERE users_table.id = user_id
            AND users_table.deactivated_at IS NULL
        )
      `,
    }),
  ],
).enableRLS();

export type InsertSongReviewRating = typeof songReviewRatingsTable.$inferInsert;
export type SelectSongReviewRating = typeof songReviewRatingsTable.$inferSelect;

export type InsertSongReviewLike = typeof songReviewLikesTable.$inferInsert;
export type SelectSongReviewLike = typeof songReviewLikesTable.$inferSelect;

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;

export const collaborationsTable = pgTable(
  "collaborations_table",
  {
    id: uuid("id").primaryKey().defaultRandom().notNull(),
    userId: uuid("user_id")
      .notNull()
      .references(() => usersTable.id, { onDelete: "cascade" }),
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
  },
  () => [
    pgPolicy("collaborations_active_owner_select", {
      as: "restrictive",
      for: "select",
      using: sql`
        EXISTS (
          SELECT 1 FROM users_table
          WHERE users_table.id = user_id
            AND users_table.deactivated_at IS NULL
        )
      `,
    }),
    pgPolicy("collaborations_active_owner_insert", {
      as: "restrictive",
      for: "insert",
      withCheck: sql`
        EXISTS (
          SELECT 1 FROM users_table
          WHERE users_table.id = user_id
            AND users_table.deactivated_at IS NULL
        )
      `,
    }),
    pgPolicy("collaborations_active_owner_update", {
      as: "restrictive",
      for: "update",
      using: sql`
        EXISTS (
          SELECT 1 FROM users_table
          WHERE users_table.id = user_id
            AND users_table.deactivated_at IS NULL
        )
      `,
      withCheck: sql`
        EXISTS (
          SELECT 1 FROM users_table
          WHERE users_table.id = user_id
            AND users_table.deactivated_at IS NULL
        )
      `,
    }),
    pgPolicy("collaborations_active_owner_delete", {
      as: "restrictive",
      for: "delete",
      using: sql`
        EXISTS (
          SELECT 1 FROM users_table
          WHERE users_table.id = user_id
            AND users_table.deactivated_at IS NULL
        )
      `,
    }),
  ],
).enableRLS();

export const usersRelations = relations(usersTable, ({ many }) => ({
  collaborations: many(collaborationsTable),
  challengeParticipations: many(challengeParticipationsTable),
  songReviewLikes: many(songReviewLikesTable),
  songReviewRatings: many(songReviewRatingsTable),
  songReviewComments: many(songReviewCommentsTable),
}));

export const collaborationsRelations = relations(collaborationsTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [collaborationsTable.userId],
    references: [usersTable.id],
  }),
}));

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
  () => [
    pgPolicy("challenge_participations_active_owner_select", {
      as: "restrictive",
      for: "select",
      using: sql`
        EXISTS (
          SELECT 1 FROM users_table
          WHERE users_table.id = user_id
            AND users_table.deactivated_at IS NULL
        )
      `,
    }),
    pgPolicy("challenge_participations_active_owner_insert", {
      as: "restrictive",
      for: "insert",
      withCheck: sql`
        EXISTS (
          SELECT 1 FROM users_table
          WHERE users_table.id = user_id
            AND users_table.deactivated_at IS NULL
        )
      `,
    }),
    pgPolicy("challenge_participations_active_owner_update", {
      as: "restrictive",
      for: "update",
      using: sql`
        EXISTS (
          SELECT 1 FROM users_table
          WHERE users_table.id = user_id
            AND users_table.deactivated_at IS NULL
        )
      `,
      withCheck: sql`
        EXISTS (
          SELECT 1 FROM users_table
          WHERE users_table.id = user_id
            AND users_table.deactivated_at IS NULL
        )
      `,
    }),
    pgPolicy("challenge_participations_active_owner_delete", {
      as: "restrictive",
      for: "delete",
      using: sql`
        EXISTS (
          SELECT 1 FROM users_table
          WHERE users_table.id = user_id
            AND users_table.deactivated_at IS NULL
        )
      `,
    }),
  ],
).enableRLS();

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
export type InsertChallengeParticipation = typeof challengeParticipationsTable.$inferInsert;
export type SelectChallengeParticipation = typeof challengeParticipationsTable.$inferSelect;

export const waitlistInvitationsTable = pgTable("waitlist_invitations", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  email: text("email").notNull(),
  token: varchar("token", { length: 64 }).notNull().unique(),
  source: varchar("source", { length: 20 }).notNull(), // 'admin' | 'referral'
  referrerId: uuid("referrer_id"),
  status: varchar("status", { length: 20 }).default("pending").notNull(), // pending | sent | failed | confirmed
  sentAt: timestamp("sent_at"),
  confirmedAt: timestamp("confirmed_at"),
  errorMessage: text("error_message"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const waitlistEntriesTable = pgTable("waitlist_entries", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  email: text("email").notNull().unique(),
  referralCode: varchar("referral_code", { length: 64 }).notNull().unique(),
  acceptedTos: boolean("accepted_tos").notNull(),
  invitationId: uuid("invitation_id")
    .notNull()
    .references(() => waitlistInvitationsTable.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const waitlistEntriesRelations = relations(waitlistEntriesTable, ({ one }) => ({
  invitation: one(waitlistInvitationsTable, {
    fields: [waitlistEntriesTable.invitationId],
    references: [waitlistInvitationsTable.id],
  }),
}));

export type InsertWaitlistEntry = typeof waitlistEntriesTable.$inferInsert;
export type SelectWaitlistEntry = typeof waitlistEntriesTable.$inferSelect;
export type InsertWaitlistInvitation = typeof waitlistInvitationsTable.$inferInsert;
export type SelectWaitlistInvitation = typeof waitlistInvitationsTable.$inferSelect;
