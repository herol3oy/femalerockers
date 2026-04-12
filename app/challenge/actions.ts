"use server";

import { db } from "@/app/db";
import { createClient } from "@/lib/supabase/server";
import {
  type InsertChallenge,
  type InsertChallengeParticipation,
  challengeParticipationsTable,
  challengesTable,
  usersTable,
} from "@/app/db/schema";
import { and, desc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export type ChallengeWithStatus = {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  endsAt: Date;
  status: "live" | "ended";
};

export type ParticipationWithUser = {
  id: string;
  status: string;
  videoUrl: string | null;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
  user: {
    id: string;
    username: string;
    artistName: string;
    avatarUrl: string | null;
  };
};

function getChallengeStatus(endsAt: Date): "live" | "ended" {
  return new Date() > endsAt ? "ended" : "live";
}

export async function createChallenge(data: Omit<InsertChallenge, "id" | "createdAt">) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  // Check if user is admin
  const dbUser = await db.query.usersTable.findFirst({
    where: eq(usersTable.id, user.id),
  });

  if (!dbUser || dbUser.role !== "admin") {
    return { error: "Unauthorized - Admin access required" };
  }

  try {
    const [challenge] = await db
      .insert(challengesTable)
      .values(data)
      .returning();

    revalidatePath("/challenge");
    revalidatePath("/admin/challenges");
    return { success: true, challenge };
  } catch (error) {
    console.error("Error creating challenge:", error);
    return { error: "Failed to create challenge" };
  }
}

export async function updateChallenge(
  id: string,
  data: Partial<Omit<InsertChallenge, "id" | "createdAt">>,
) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  // Check if user is admin
  const dbUser = await db.query.usersTable.findFirst({
    where: eq(usersTable.id, user.id),
  });

  if (!dbUser || dbUser.role !== "admin") {
    return { error: "Unauthorized - Admin access required" };
  }

  try {
    const [challenge] = await db
      .update(challengesTable)
      .set(data)
      .where(eq(challengesTable.id, id))
      .returning();

    revalidatePath("/challenge");
    revalidatePath("/admin/challenges");
    return { success: true, challenge };
  } catch (error) {
    console.error("Error updating challenge:", error);
    return { error: "Failed to update challenge" };
  }
}

export async function getAllChallenges(): Promise<ChallengeWithStatus[]> {
  const challenges = await db.query.challengesTable.findMany({
    orderBy: [desc(challengesTable.createdAt)],
  });

  return challenges.map((challenge) => ({
    ...challenge,
    status: getChallengeStatus(challenge.endsAt),
  }));
}

export async function getActiveChallenge(): Promise<ChallengeWithStatus | null> {
  const challenges = await db.query.challengesTable.findMany({
    orderBy: [desc(challengesTable.createdAt)],
    limit: 1,
  });

  if (challenges.length === 0) return null;

  const challenge = challenges[0];
  return {
    ...challenge,
    status: getChallengeStatus(challenge.endsAt),
  };
}

export async function getChallengeById(id: string): Promise<ChallengeWithStatus | null> {
  const challenge = await db.query.challengesTable.findFirst({
    where: eq(challengesTable.id, id),
  });

  if (!challenge) return null;

  return {
    ...challenge,
    status: getChallengeStatus(challenge.endsAt),
  };
}

export async function getChallengeParticipations(
  challengeId: string,
): Promise<ParticipationWithUser[]> {
  const participations = await db.query.challengeParticipationsTable.findMany({
    where: eq(challengeParticipationsTable.challengeId, challengeId),
    with: {
      user: {
        columns: {
          id: true,
          username: true,
          artistName: true,
          avatarUrl: true,
        },
      },
    },
  });

  // Filter to only show committed and submitted participations
  return participations
    .filter((p) => p.status === "committed" || p.status === "submitted")
    .map((p) => ({
      id: p.id,
      status: p.status,
      videoUrl: p.videoUrl,
      description: p.description,
      createdAt: p.createdAt,
      updatedAt: p.updatedAt,
      user: p.user,
    }));
}

export async function joinChallenge(challengeId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  // Check if challenge exists and is live
  const challenge = await getChallengeById(challengeId);
  if (!challenge) {
    return { error: "Challenge not found" };
  }

  if (challenge.status === "ended") {
    return { error: "Cannot join an ended challenge" };
  }

  // Check if user already joined
  const existing = await db.query.challengeParticipationsTable.findFirst({
    where: and(
      eq(challengeParticipationsTable.challengeId, challengeId),
      eq(challengeParticipationsTable.userId, user.id),
    ),
  });

  if (existing && existing.status !== "withdrawn") {
    return { error: "Already joined this challenge" };
  }

  try {
    if (existing) {
      // Update existing participation
      await db
        .update(challengeParticipationsTable)
        .set({ status: "committed", updatedAt: new Date() })
        .where(eq(challengeParticipationsTable.id, existing.id));
    } else {
      // Create new participation
      await db.insert(challengeParticipationsTable).values({
        challengeId,
        userId: user.id,
        status: "committed",
      });
    }

    revalidatePath("/challenge");
    return { success: true };
  } catch (error) {
    console.error("Error joining challenge:", error);
    return { error: "Failed to join challenge" };
  }
}

export async function leaveChallenge(challengeId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  // Check if challenge exists and is live
  const challenge = await getChallengeById(challengeId);
  if (!challenge) {
    return { error: "Challenge not found" };
  }

  if (challenge.status === "ended") {
    return { error: "Cannot leave an ended challenge" };
  }

  // Find participation
  const participation = await db.query.challengeParticipationsTable.findFirst({
    where: and(
      eq(challengeParticipationsTable.challengeId, challengeId),
      eq(challengeParticipationsTable.userId, user.id),
    ),
  });

  if (!participation || participation.status !== "committed") {
    return { error: "Not currently joined to this challenge" };
  }

  try {
    await db
      .update(challengeParticipationsTable)
      .set({ status: "withdrawn", updatedAt: new Date() })
      .where(eq(challengeParticipationsTable.id, participation.id));

    revalidatePath("/challenge");
    return { success: true };
  } catch (error) {
    console.error("Error leaving challenge:", error);
    return { error: "Failed to leave challenge" };
  }
}

export async function submitEntry(
  challengeId: string,
  data: { videoUrl: string; description: string },
) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  // Check if challenge exists and is live
  const challenge = await getChallengeById(challengeId);
  if (!challenge) {
    return { error: "Challenge not found" };
  }

  if (challenge.status === "ended") {
    return { error: "Cannot submit to an ended challenge" };
  }

  // Find participation
  const participation = await db.query.challengeParticipationsTable.findFirst({
    where: and(
      eq(challengeParticipationsTable.challengeId, challengeId),
      eq(challengeParticipationsTable.userId, user.id),
    ),
  });

  if (!participation || participation.status !== "committed") {
    return { error: "Must join the challenge before submitting" };
  }

  try {
    await db
      .update(challengeParticipationsTable)
      .set({
        status: "submitted",
        videoUrl: data.videoUrl,
        description: data.description,
        updatedAt: new Date(),
      })
      .where(eq(challengeParticipationsTable.id, participation.id));

    revalidatePath("/challenge");
    return { success: true };
  } catch (error) {
    console.error("Error submitting entry:", error);
    return { error: "Failed to submit entry" };
  }
}

export async function getUserParticipation(challengeId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return undefined; // Return undefined to indicate user is not logged in
  }

  const participation = await db.query.challengeParticipationsTable.findFirst({
    where: and(
      eq(challengeParticipationsTable.challengeId, challengeId),
      eq(challengeParticipationsTable.userId, user.id),
    ),
  });

  return participation || null; // Return null if logged in but not participating
}
