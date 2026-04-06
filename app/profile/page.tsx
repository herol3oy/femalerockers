import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { db } from "@/app/db";
import { usersTable } from "@/app/db/schema";
import { createClient } from "@/lib/supabase/server";

export default async function ProfilePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const rows = await db
    .select({ username: usersTable.username })
    .from(usersTable)
    .where(eq(usersTable.id, user.id))
    .limit(1);

  if (rows.length === 0) {
    redirect("/onboarding");
  }

  redirect(`/${rows[0].username}`);
}
