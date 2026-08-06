import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { db } from "@/app/db";
import { usersTable } from "@/app/db/schema";
import { createClient } from "@/lib/supabase/server";

async function CollabGate({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const rows = await db
    .select({ isApproved: usersTable.isApproved, role: usersTable.role })
    .from(usersTable)
    .where(eq(usersTable.id, user.id))
    .limit(1);

  if (
    rows.length === 0 ||
    !rows[0].isApproved ||
    (rows[0].role !== "musician" && rows[0].role !== "band")
  ) {
    redirect("/");
  }

  return <>{children}</>;
}

export default function CollabLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div>Loading…</div>}>
      <CollabGate>{children}</CollabGate>
    </Suspense>
  );
}
