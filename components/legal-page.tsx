import type { ReactNode } from "react";

import { Badge } from "@/components/ui/badge";

export type LegalSection = {
  id: string;
  title: string;
  content: ReactNode;
};

type LegalPageProps = {
  title: string;
  description: string;
  lastUpdated: string;
  sections: LegalSection[];
};

export function LegalPage({ title, description, lastUpdated, sections }: LegalPageProps) {
  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-14 sm:px-8 sm:py-20">
      <header className="max-w-3xl space-y-4">
        <Badge variant="outline">Legal</Badge>
        <h1 className="font-heading text-4xl font-semibold tracking-tight sm:text-5xl">{title}</h1>
        <p className="text-base leading-7 text-muted-foreground sm:text-lg">{description}</p>
        <p className="text-sm font-medium text-foreground">Last updated: {lastUpdated}</p>
      </header>

      <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_15rem] lg:items-start">
        <article className="order-2 min-w-0 space-y-12 lg:order-1">
          {sections.map((section) => (
            <section key={section.id} id={section.id} className="scroll-mt-24 space-y-4">
              <h2 className="font-heading text-2xl font-semibold tracking-tight">
                {section.title}
              </h2>
              <div className="space-y-4 text-base leading-7 text-muted-foreground [&_a]:font-medium [&_a]:text-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:transition-colors [&_a:hover]:text-foreground/75 [&_li]:pl-1 [&_strong]:font-semibold [&_strong]:text-foreground [&_ul]:ml-5 [&_ul]:list-disc [&_ul]:space-y-2">
                {section.content}
              </div>
            </section>
          ))}
        </article>

        <aside className="order-1 lg:order-2 lg:sticky lg:top-24">
          <nav
            aria-label={`${title} contents`}
            className="rounded-2xl border border-border/70 bg-muted/20 p-5"
          >
            <p className="font-heading text-sm font-semibold">On this page</p>
            <ol className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              {sections.map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`} className="transition-colors hover:text-foreground">
                    {section.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </aside>
      </div>
    </main>
  );
}
