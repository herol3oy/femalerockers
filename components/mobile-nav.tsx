"use client";

import { ListIcon, XIcon } from "@phosphor-icons/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
  const pathname = usePathname();

  const links = [
    { href: "/discover", label: "Discover", show: true },
    { href: "/interviews", label: "Interviews", show: true },
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
    { href: `/${username}`, label: "My Profile", show: !!(user && username) },
    {
      href: "/collab",
      label: "Collab",
      show: !!(user && isApproved && (role === "musician" || role === "band")),
    },
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
                {links.map((link) => {
                  const isExternal = "external" in link && link.external;
                  const isActive = !isExternal && pathname === link.href;
                  const classes = [
                    "py-4 px-5 rounded-lg transition-colors",
                    "hover:bg-accent",
                    isActive ? "bg-accent text-foreground" : undefined,
                  ]
                    .filter(Boolean)
                    .join(" ");

                  if (isExternal) {
                    return (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => setIsOpen(false)}
                        className={classes}
                      >
                        {link.label}
                      </a>
                    );
                  }

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      aria-current={isActive ? "page" : undefined}
                      onClick={() => setIsOpen(false)}
                      className={classes}
                    >
                      {link.label}
                    </Link>
                  );
                })}
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
