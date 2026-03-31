import Link from "next/link";
import { Suspense } from "react";
import { eq } from "drizzle-orm";
import { createClient } from "@/lib/supabase/server";
import { db } from "@/app/db";
import { usersTable } from "@/app/db/schema";
import { Button } from "@/components/ui/button";
import { LogoutButton } from "@/components/logout-button";
import { ThemeSwitcher } from "@/components/theme-switcher";

async function NavLinks() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let username: string | null = null;
  if (user) {
    const rows = await db
      .select({ username: usersTable.username })
      .from(usersTable)
      .where(eq(usersTable.id, user.id))
      .limit(1);
    username = rows[0]?.username ?? null;
  }

  return (
    <>
      <div className="flex gap-5 items-center font-semibold">
        <Link href="/">Female Rockers</Link>
        <Link href="/discover">Discover</Link>
        {user && <Link href="/profile">Profile</Link>}
        {username && (
          <Link href={`/discover/${username}`}>My Public Profile</Link>
        )}
      </div>
      <div className="flex items-center gap-4">
        <ThemeSwitcher />
        {user ? (
          <>
            <span className="text-sm">{user.email}</span>
            <LogoutButton />
          </>
        ) : (
          <>
            <Button asChild size="sm" variant="outline">
              <Link href="/auth/login">Login</Link>
            </Button>
            <Button asChild size="sm" variant="default">
              <Link href="/auth/sign-up">Sign up</Link>
            </Button>
          </>
        )}
      </div>
    </>
  );
}

export function NavigationBar() {
  return (
    <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
      <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
        <Suspense
          fallback={
            <div className="flex gap-5 items-center font-semibold">
              <Link href="/">Female Rockers</Link>
              <Link href="/discover">Discover</Link>
            </div>
          }
        >
          <NavLinks />
        </Suspense>
      </div>
    </nav>
  );
}
