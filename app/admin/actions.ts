"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/app/db";
import { usersTable } from "@/app/db/schema";
import { createClient } from "@/lib/supabase/server";

export async function toggleApproval(userId: string, approved: boolean) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Not authenticated" };
  }

  // Verify caller is admin
  const adminRows = await db
    .select({ role: usersTable.role })
    .from(usersTable)
    .where(eq(usersTable.id, user.id))
    .limit(1);

  if (adminRows.length === 0 || adminRows[0].role !== "admin") {
    return { error: "Forbidden" };
  }

  await db
    .update(usersTable)
    .set({ isApproved: approved })
    .where(eq(usersTable.id, userId));

  revalidatePath("/admin");
  return { success: true };
}
