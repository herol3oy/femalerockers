import { GearIcon } from "@phosphor-icons/react/ssr";
import { eq } from "drizzle-orm";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { db } from "@/app/db";
import { usersTable } from "@/app/db/schema";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";
import { AccountManagement } from "./account-management";

async function AccountSettingsContent() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const [account] = await db
    .select({ id: usersTable.id })
    .from(usersTable)
    .where(eq(usersTable.id, user.id))
    .limit(1);

  if (!account) {
    redirect("/onboarding");
  }

  return (
    <section className="min-h-screen bg-[radial-gradient(circle_at_top,_hsl(var(--secondary))_0%,_transparent_45%),linear-gradient(to_bottom,_hsl(var(--background)),_hsl(var(--muted)/0.35))]">
      <div className="mx-auto flex max-w-4xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <Card className="overflow-hidden border-border/70 bg-background/95 shadow-sm">
          <CardHeader className="border-b border-border/60 bg-[linear-gradient(135deg,_hsl(var(--background))_0%,_hsl(var(--secondary)/0.35)_100%)] pb-8">
            <Badge variant="secondary" className="w-fit gap-2">
              <GearIcon className="size-3.5" />
              Account settings
            </Badge>
            <CardTitle className="text-3xl">Account management</CardTitle>
            <CardDescription className="max-w-2xl text-base">
              Manage what happens if you want to step away from Female Rockers.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <AccountManagement />
            <Button asChild variant="ghost">
              <Link href="/profile/edit">Back to profile settings</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

function AccountSettingsSkeleton() {
  return (
    <section className="min-h-screen">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <Card className="border-border/70 bg-background/95 shadow-sm">
          <CardHeader className="space-y-3">
            <Skeleton className="h-6 w-36" />
            <Skeleton className="h-9 w-64" />
            <Skeleton className="h-5 w-full max-w-xl" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-32 rounded-2xl" />
            <Skeleton className="h-32 rounded-2xl" />
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

export default function AccountSettingsPage() {
  return (
    <Suspense fallback={<AccountSettingsSkeleton />}>
      <AccountSettingsContent />
    </Suspense>
  );
}
