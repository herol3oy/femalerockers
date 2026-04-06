import { eq } from "drizzle-orm";
import Link from "next/link";

import { db } from "@/app/db";
import { usersTable } from "@/app/db/schema";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";
import { CollabForm } from "../collab-form";

export default async function CollabSubmitPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const userRows = await db
    .select({ bio: usersTable.bio })
    .from(usersTable)
    .where(eq(usersTable.id, user.id))
    .limit(1);

  const profileBio = userRows[0]?.bio ?? "";

  return (
    <section className="min-h-screen bg-[radial-gradient(circle_at_top,_hsl(var(--secondary))_0%,_transparent_45%),linear-gradient(to_bottom,_hsl(var(--background)),_hsl(var(--muted)/0.35))]">
      <div className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <Card className="overflow-hidden border-border/70 bg-background/95 shadow-sm">
          <CardHeader className="border-b border-border/60 bg-[linear-gradient(135deg,_hsl(var(--background))_0%,_hsl(var(--secondary)/0.35)_100%)] pb-8">
            <CardTitle className="text-3xl">New Collab Submission</CardTitle>
            <CardDescription className="max-w-2xl text-base">
              Fill out the form below with your performance details. We&apos;ll
              review your submission and get back to you.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6 flex flex-col gap-6">
            <CollabForm defaultBio={profileBio} />
            <Button variant="outline" asChild>
              <Link href="/collab">Back to Collab</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
