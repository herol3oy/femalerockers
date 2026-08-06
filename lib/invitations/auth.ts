import "server-only";

import { eq } from "drizzle-orm";
import { db } from "@/app/db";
import { usersTable } from "@/app/db/schema";
import { createClient } from "@/lib/supabase/server";
import { InvitationError } from "./errors";

export type InvitationActor = {
  id: string;
  email: string;
  artistName: string;
  role: string;
  isApproved: boolean;
};

async function requireActor(): Promise<InvitationActor> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) {
    throw new InvitationError("You must be signed in.");
  }

  const [profile] = await db
    .select({
      id: usersTable.id,
      email: usersTable.email,
      artistName: usersTable.artistName,
      role: usersTable.role,
      isApproved: usersTable.isApproved,
      deactivatedAt: usersTable.deactivatedAt,
    })
    .from(usersTable)
    .where(eq(usersTable.id, user.id))
    .limit(1);

  if (!profile || profile.deactivatedAt) {
    throw new InvitationError("Your account is not active.");
  }

  return profile;
}

export async function requireInvitationAdmin(): Promise<InvitationActor> {
  const actor = await requireActor();

  if (actor.role !== "admin") {
    throw new InvitationError("You do not have permission to do that.");
  }

  return actor;
}

export async function requireInvitationMember(): Promise<InvitationActor> {
  const actor = await requireActor();

  if (actor.role === "admin" || !actor.isApproved) {
    throw new InvitationError("Invitations are available to approved members only.");
  }

  return actor;
}
