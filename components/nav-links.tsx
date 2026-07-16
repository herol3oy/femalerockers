"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLink = {
  href: string;
  label: string;
  external?: boolean;
};

export function NavLinks({
  links,
  className,
  linkClassName,
  activeClassName,
}: {
  links: NavLink[];
  className?: string;
  linkClassName?: string;
  activeClassName?: string;
}) {
  const pathname = usePathname();

  return (
    <div className={className}>
      {links.map((link) => {
        const isActive = !link.external && pathname === link.href;
        const classes = [
          linkClassName,
          "transition-colors",
          "hover:text-foreground",
          isActive ? activeClassName : undefined,
        ]
          .filter(Boolean)
          .join(" ");

        if (link.external) {
          return (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noreferrer"
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
            className={classes}
          >
            {link.label}
          </Link>
        );
      })}
    </div>
  );
}
