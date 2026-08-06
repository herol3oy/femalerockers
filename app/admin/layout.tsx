import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { db } from "@/app/db";
import { usersTable } from "@/app/db/schema";
import { createClient } from "@/lib/supabase/server";

async function AdminGate({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const rows = await db
    .select({ role: usersTable.role })
    .from(usersTable)
    .where(eq(usersTable.id, user.id))
    .limit(1);

  if (rows.length === 0 || rows[0].role !== "admin") {
    redirect("/");
  }

  return <>{children}</>;
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div>Loading…</div>}>
      <AdminGate>{children}</AdminGate>
    </Suspense>
  );
}
