import { eq } from "drizzle-orm";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { db } from "@/app/db";
import { usersTable } from "@/app/db/schema";
import { LogoutButton } from "@/components/logout-button";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";

async function NavLinks() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let role: string | null = null;
  if (user) {
    const rows = await db
      .select({ role: usersTable.role })
      .from(usersTable)
      .where(eq(usersTable.id, user.id))
      .limit(1);
    role = rows[0]?.role ?? null;
  }

  return (
    <>
      <div className="flex items-center font-semibold">
        <Link className="group flex items-center gap-2" href="/">
          <Image
            className="w-12 cursor-pointer transition-all duration-300 ease-in-out group-hover:-rotate-[360deg] md:w-12"
            src="/female-rockers-logo.svg"
            alt="Female Rockers logo"
            width={0}
            height={0}
            sizes="100vw"
          />
          <Image
            className="w-12 md:w-12"
            src="/female-rockers-type.svg"
            alt="Female Rockers logo"
            width={0}
            height={0}
            sizes="100vw"
          />
        </Link>
      </div>
      <div className="flex gap-5 items-center font-semibold">
        <Link href="/discover">Discover</Link>
        {user && <Link href="/profile">Profile</Link>}
        {role === "admin" && <Link href="/admin">Admin</Link>}
      </div>
      <div className="flex items-center gap-4">
        {/* <ThemeSwitcher /> */}
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
    <nav className="sticky top-0 z-50 w-full flex justify-center border-b border-b-foreground/10 h-16 bg-background">
      <div className="w-full flex justify-between items-center p-3 px-5 text-sm">
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
