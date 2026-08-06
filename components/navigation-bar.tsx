import { eq } from "drizzle-orm";
import Link from "next/link";
import { Suspense } from "react";
import { db } from "@/app/db";
import { usersTable } from "@/app/db/schema";
import { AvatarDropdown } from "@/components/avatar-dropdown";
import LogoWithType from "@/components/logo-with-type";
import { MobileNav } from "@/components/mobile-nav";
import { NavLinks } from "@/components/nav-links";
import { Button } from "@/components/ui/button";
import { isInvitationIssuingEnabled } from "@/lib/invitations/config";
import { createClient } from "@/lib/supabase/server";

interface NavigationUser {
  email: string;
  artistName: string | null;
  avatarUrl: string | null;
}

interface NavContentProps {
  user: NavigationUser | null;
  username: string | null;
  isApproved: boolean;
  role: string | null;
  invitationIssuingEnabled: boolean;
}

function NavContent({
  user,
  username,
  isApproved,
  role,
  invitationIssuingEnabled,
}: NavContentProps) {
  const links = [
    { href: "/discover", label: "Discover", show: true },
    { href: "/interviews", label: "Interviews", show: true },
    { href: "/song-reviews", label: "Song Reviews", show: true },
    { href: "/challenges", label: "Challenges", show: true },
    { href: "/about", label: "About", show: !user },
    { href: "/contact", label: "Contact", show: !user },
    {
      href: "https://instagram.com/female_rockers",
      label: "Instagram",
      show: !user,
      external: true,
    },
    {
      href: "https://youtube.com/@FemaleRockers",
      label: "YouTube",
      show: !user,
      external: true,
    },
    {
      href: "/invite",
      label: "Invite Friends",
      show: !!(user && username && isApproved && role !== "admin" && invitationIssuingEnabled),
    },
    { href: "/collab", label: "Collab", show: !!(user && isApproved) },
    { href: "/admin", label: "Admin", show: role === "admin" },
  ].filter((link) => link.show);

  return (
    <>
      <div className="flex items-center font-semibold h-12">
        <LogoWithType />
      </div>

      <NavLinks
        links={links}
        className="hidden md:flex gap-5 items-center font-semibold text-muted-foreground"
        linkClassName="py-1"
        activeClassName="text-foreground"
      />

      <div className="hidden md:flex items-center gap-4">
        {user ? (
          <AvatarDropdown
            email={user.email}
            artistName={user.artistName}
            avatarUrl={user.avatarUrl}
          />
        ) : (
          <Button asChild size="sm" variant="outline">
            <Link href="/auth/login">Login</Link>
          </Button>
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
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
        <a href="https://instagram.com/female_rockers" target="_blank" rel="noreferrer">
          Instagram
        </a>
        <a href="https://youtube.com/@FemaleRockers" target="_blank" rel="noreferrer">
          YouTube
        </a>
      </div>
      <div className="hidden md:flex items-center gap-4">
        <Button asChild size="sm" variant="outline">
          <Link href="/auth/login">Login</Link>
        </Button>
      </div>
    </>
  );
}

export function NavigationBar() {
  return (
    <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16 bg-background">
      <div className="w-full flex justify-between items-center p-3 px-5 text-sm">
        <Suspense fallback={<NavbarFallback />}>
          <NavLinksWithMobile />
        </Suspense>
      </div>
    </nav>
  );
}

async function NavLinksWithMobile() {
  const invitationIssuingEnabled = isInvitationIssuingEnabled();
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let role: string | null = null;
  let username: string | null = null;
  let isApproved = false;
  let artistName: string | null = null;
  let avatarUrl: string | null = null;
  let profileEmail: string | null = null;

  if (user) {
    const rows = await db
      .select({
        role: usersTable.role,
        username: usersTable.username,
        isApproved: usersTable.isApproved,
        artistName: usersTable.artistName,
        avatarUrl: usersTable.avatarUrl,
        email: usersTable.email,
      })
      .from(usersTable)
      .where(eq(usersTable.id, user.id))
      .limit(1);
    role = rows[0]?.role ?? null;
    username = rows[0]?.username ?? null;
    isApproved = rows[0]?.isApproved ?? false;
    artistName = rows[0]?.artistName ?? null;
    avatarUrl = rows[0]?.avatarUrl ?? null;
    profileEmail = rows[0]?.email ?? null;
  }

  const userData = user
    ? {
        email: profileEmail ?? user.email ?? "",
        artistName,
        avatarUrl,
      }
    : null;

  return (
    <>
      <NavContent
        user={userData}
        username={username}
        isApproved={isApproved}
        role={role}
        invitationIssuingEnabled={invitationIssuingEnabled}
      />
      <div className="flex items-center gap-1 md:hidden">
        {userData ? (
          <AvatarDropdown
            email={userData.email}
            artistName={userData.artistName}
            avatarUrl={userData.avatarUrl}
          />
        ) : null}
        <MobileNav
          isAuthenticated={Boolean(userData)}
          username={username}
          isApproved={isApproved}
          role={role}
          invitationIssuingEnabled={invitationIssuingEnabled}
        />
      </div>
    </>
  );
}
