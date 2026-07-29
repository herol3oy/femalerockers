import { and, eq, isNull } from "drizzle-orm";
import { db } from "@/app/db";
import { usersTable } from "@/app/db/schema";

export async function isActiveAccount(userId: string) {
  const [account] = await db
    .select({ id: usersTable.id })
    .from(usersTable)
    .where(and(eq(usersTable.id, userId), isNull(usersTable.deactivatedAt)))
    .limit(1);

  return Boolean(account);
}
