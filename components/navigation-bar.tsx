import { eq } from "drizzle-orm";
import Link from "next/link";
import { Suspense } from "react";
import { db } from "@/app/db";
import { usersTable } from "@/app/db/schema";
import LogoWithType from "@/components/logo-with-type";
import { LogoutButton } from "@/components/logout-button";
import { MobileNav } from "@/components/mobile-nav";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";

interface NavContentProps {
  user: { email?: string } | null;
  username: string | null;
  isApproved: boolean;
  role: string | null;
  isMobile?: boolean;
}

function NavContent({
  user,
  username,
  isApproved,
  role,
  isMobile = false,
}: NavContentProps) {
  const links = [
    { href: "/discover", label: "Discover", show: true },
    { href: "/interviews", label: "Interviews", show: true },
    { href: `/${username}`, label: "My Profile", show: !!(user && username) },
    { href: "/collab", label: "Collab", show: !!(user && isApproved) },
    { href: "/admin", label: "Admin", show: role === "admin" },
  ].filter((link) => link.show);

  if (isMobile) {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-3 font-semibold">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="py-3 px-4 rounded-lg hover:bg-accent transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="flex flex-col gap-3 pt-4 border-t border-border">
          {user ? (
            <>
              <span className="text-sm text-muted-foreground px-4">
                {user.email}
              </span>
              <div className="px-4">
                <LogoutButton />
              </div>
            </>
          ) : (
            <>
              <Link href="/auth/login" className="w-full">
                <Button size="sm" variant="outline" className="w-full">
                  Login
                </Button>
              </Link>
              <Link href="/auth/sign-up" className="w-full">
                <Button size="sm" variant="default" className="w-full">
                  Sign up
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center font-semibold h-12">
        <LogoWithType />
      </div>

      <div className="hidden md:flex gap-5 items-center font-semibold">
        {links.map((link) => (
          <Link key={link.href} href={link.href}>
            {link.label}
          </Link>
        ))}
      </div>

      <div className="hidden md:flex items-center gap-4">
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

function NavbarFallback() {
  return (
    <>
      <div className="flex items-center font-semibold h-12">
        <LogoWithType />
      </div>
      <div className="hidden md:flex gap-5 items-center font-semibold">
        <Link href="/discover">Discover</Link>
        <Link href="/interviews">Interviews</Link>
      </div>
      <div className="hidden md:flex items-center gap-4">
        <Button asChild size="sm" variant="outline">
          <Link href="/auth/login">Login</Link>
        </Button>
        <Button asChild size="sm" variant="default">
          <Link href="/auth/sign-up">Sign up</Link>
        </Button>
      </div>
    </>
  );
}

export function NavigationBar() {
  return (
    <nav className="sticky top-0 z-50 w-full flex justify-center border-b border-b-foreground/10 h-16 bg-background">
      <div className="w-full flex justify-between items-center p-3 px-5 text-sm">
        <Suspense fallback={<NavbarFallback />}>
          <NavLinksWithMobile />
        </Suspense>
      </div>
    </nav>
  );
}

async function NavLinksWithMobile() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let role: string | null = null;
  let username: string | null = null;
  let isApproved = false;

  if (user) {
    const rows = await db
      .select({
        role: usersTable.role,
        username: usersTable.username,
        isApproved: usersTable.isApproved,
      })
      .from(usersTable)
      .where(eq(usersTable.id, user.id))
      .limit(1);
    role = rows[0]?.role ?? null;
    username = rows[0]?.username ?? null;
    isApproved = rows[0]?.isApproved ?? false;
  }

  const userData = user ? { email: user.email } : null;

  return (
    <>
      <NavContent
        user={userData}
        username={username}
        isApproved={isApproved}
        role={role}
      />
      <MobileNav
        user={userData}
        username={username}
        isApproved={isApproved}
        role={role}
      />
    </>
  );
}
