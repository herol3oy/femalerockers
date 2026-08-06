import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { db } from "@/app/db";
import { usersTable } from "@/app/db/schema";
import { createClient } from "@/lib/supabase/server";

async function OnboardingGate({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const rows = await db
    .select({ id: usersTable.id })
    .from(usersTable)
    .where(eq(usersTable.id, user.id))
    .limit(1);

  if (rows.length > 0) {
    redirect("/profile");
  }

  return <>{children}</>;
}

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OnboardingGate>{children}</OnboardingGate>
    </Suspense>
  );
}
