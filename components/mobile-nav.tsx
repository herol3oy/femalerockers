"use client";

import { ListIcon, XIcon } from "@phosphor-icons/react";
import Link from "next/link";
import { useState } from "react";
import LogoWithType from "@/components/logo-with-type";
import { LogoutButton } from "@/components/logout-button";
import { Button } from "@/components/ui/button";

interface MobileNavProps {
  user: { email?: string } | null;
  username: string | null;
  isApproved: boolean;
  role: string | null;
}

export function MobileNav({
  user,
  username,
  isApproved,
  role,
}: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { href: "/discover", label: "Discover", show: true },
    { href: "/interviews", label: "Interviews", show: true },
    { href: `/${username}`, label: "My Profile", show: !!(user && username) },
    { href: "/collab", label: "Collab", show: !!(user && isApproved) },
    { href: "/admin", label: "Admin", show: role === "admin" },
  ].filter((link) => link.show);

  return (
    <>
      <button
        type="button"
        className="md:hidden flex items-center justify-center w-11 h-11 border-2 border-transparent rounded-lg focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
      >
        <ListIcon className="h-7 w-7" weight="bold" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-40 md:hidden bg-background">
          <div className="flex flex-col h-full">
            <div className="flex justify-between items-center h-16 px-5 border-b">
              <div className="flex items-center font-semibold h-12">
                <LogoWithType />
              </div>
              <button
                type="button"
                className="flex items-center justify-center w-11 h-11 border-2 border-transparent rounded-lg focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50"
                onClick={() => setIsOpen(false)}
                aria-label="Close menu"
              >
                <XIcon className="h-7 w-7" weight="bold" />
              </button>
            </div>

            <div className="flex flex-col gap-2 p-4 flex-1">
              <div className="flex flex-col gap-2 font-semibold text-lg">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="py-4 px-5 rounded-lg hover:bg-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4 p-4 border-t">
              {user ? (
                <>
                  <span className="text-base text-muted-foreground px-4">
                    {user.email}
                  </span>
                  <div className="px-4">
                    <LogoutButton />
                  </div>
                </>
              ) : (
                <>
                  <Link href="/auth/login" className="w-full">
                    <Button
                      size="lg"
                      variant="outline"
                      className="w-full text-base"
                      onClick={() => setIsOpen(false)}
                    >
                      Login
                    </Button>
                  </Link>
                  <Link href="/auth/sign-up" className="w-full">
                    <Button
                      size="lg"
                      variant="default"
                      className="w-full text-base"
                      onClick={() => setIsOpen(false)}
                    >
                      Sign up
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
