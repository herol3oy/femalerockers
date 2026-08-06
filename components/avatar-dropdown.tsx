"use client";

import { EnvelopeSimpleIcon, GearIcon, SignOutIcon, UserIcon } from "@phosphor-icons/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { createClient } from "@/lib/supabase/client";

interface AvatarDropdownProps {
  email: string;
  artistName: string | null;
  avatarUrl: string | null;
}

function getInitials(name: string) {
  const initials = name
    .trim()
    .split(/[\s._-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

  return initials || "U";
}

export function AvatarDropdown({ email, artistName, avatarUrl }: AvatarDropdownProps) {
  const router = useRouter();
  const emailIdentifier = email.split("@")[0] ?? "";
  const displayName = artistName?.trim() || emailIdentifier || "User";
  const initials = getInitials(displayName);
  const imageAlt = `${displayName}'s profile picture`;

  const logout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/auth/login");
    router.refresh();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full"
          aria-label={`Open account menu for ${email}`}
        >
          <Avatar>
            {avatarUrl ? <AvatarImage src={avatarUrl} alt={imageAlt} /> : null}
            <AvatarFallback aria-hidden="true">{initials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="flex min-w-0 items-center gap-2.5">
          <EnvelopeSimpleIcon aria-hidden="true" />
          <span className="min-w-0">
            <span className="sr-only">Signed in as </span>
            <span className="block truncate" title={email}>
              {email}
            </span>
          </span>
        </DropdownMenuLabel>

        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/profile">
              <UserIcon aria-hidden="true" />
              <span>My Profile</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/profile/settings">
              <GearIcon aria-hidden="true" />
              <span>Settings</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          variant="destructive"
          onSelect={() => {
            void logout();
          }}
        >
          <SignOutIcon aria-hidden="true" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
