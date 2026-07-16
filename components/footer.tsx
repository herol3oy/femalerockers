import Link from "next/link";

import { Badge } from "@/components/ui/badge";

export function Footer() {
  return (
    <footer className="mt-auto border-t bg-background">
      <div className="mx-auto w-full max-w-6xl px-6 py-12 sm:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="space-y-3 lg:col-span-2">
            <p className="font-heading text-lg font-semibold tracking-tight">
              Female Rockers
            </p>
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
              Our mission is to spread the word for talented musicians and give
              them a platform where they can professionally present their
              portfolio.
            </p>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-semibold">Explore</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link className="hover:text-foreground" href="/about">
                  About
                </Link>
              </li>
              <li>
                <Link className="hover:text-foreground" href="/contact">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-semibold">Social</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center justify-between gap-4">
                <a
                  className="hover:text-foreground"
                  href="https://instagram.com/female_rockers"
                  target="_blank"
                  rel="noreferrer"
                >
                  Instagram
                </a>
                <Badge variant="secondary" className="font-normal">
                  +200K
                </Badge>
              </li>
              <li className="flex items-center justify-between gap-4">
                <a
                  className="hover:text-foreground"
                  href="https://youtube.com/@FemaleRockers"
                  target="_blank"
                  rel="noreferrer"
                >
                  Youtube
                </a>
                <Badge variant="secondary" className="font-normal">
                  +1K
                </Badge>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-semibold">Legal</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <span className="cursor-default">Privacy Policy</span>
              </li>
              <li>
                <span className="cursor-default">Terms &amp; Conditions</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© 2020 – 2026 Female Rockers. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
