"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/app/db";
import { collaborationsTable, usersTable } from "@/app/db/schema";
import { createClient } from "@/lib/supabase/server";

async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Not authenticated" } as const;
  }

  const adminRows = await db
    .select({ role: usersTable.role })
    .from(usersTable)
    .where(eq(usersTable.id, user.id))
    .limit(1);

  if (adminRows.length === 0 || adminRows[0].role !== "admin") {
    return { error: "Forbidden" } as const;
  }

  return { user } as const;
}

export async function toggleApproval(userId: string, approved: boolean) {
  const result = await requireAdmin();
  if ("error" in result) return { error: result.error };

  await db
    .update(usersTable)
    .set({ isApproved: approved })
    .where(eq(usersTable.id, userId));

  revalidatePath("/admin");
  return { success: true };
}

export async function approveCollab(collabId: string) {
  const result = await requireAdmin();
  if ("error" in result) return { error: result.error };

  await db
    .update(collaborationsTable)
    .set({ status: "approved", updatedAt: new Date() })
    .where(eq(collaborationsTable.id, collabId));

  revalidatePath("/admin");
  revalidatePath("/collab");
  return { success: true };
}

export async function rejectCollab(
  collabId: string,
  adminNotes: string | null,
) {
  const result = await requireAdmin();
  if ("error" in result) return { error: result.error };

  await db
    .update(collaborationsTable)
    .set({ status: "rejected", adminNotes, updatedAt: new Date() })
    .where(eq(collaborationsTable.id, collabId));

  revalidatePath("/admin");
  revalidatePath("/collab");
  return { success: true };
}
