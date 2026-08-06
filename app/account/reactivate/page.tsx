import { ArrowCounterClockwiseIcon } from "@phosphor-icons/react/ssr";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { db } from "@/app/db";
import { usersTable } from "@/app/db/schema";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { createClient } from "@/lib/supabase/server";
import { ReactivateForm } from "./reactivate-form";

async function ReactivateAccountContent() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const [account] = await db
    .select({ deactivatedAt: usersTable.deactivatedAt })
    .from(usersTable)
    .where(eq(usersTable.id, user.id))
    .limit(1);

  if (!account) {
    redirect("/onboarding");
  }

  if (!account.deactivatedAt) {
    redirect("/profile");
  }

  return (
    <section className="flex min-h-svh items-center justify-center bg-[radial-gradient(circle_at_top,_hsl(var(--secondary))_0%,_transparent_45%),linear-gradient(to_bottom,_hsl(var(--background)),_hsl(var(--muted)/0.35))] p-6">
      <Card className="w-full max-w-md border-border/70 bg-background/95 shadow-sm">
        <CardHeader>
          <Badge variant="secondary" className="w-fit gap-2">
            <ArrowCounterClockwiseIcon className="size-3.5" />
            Account deactivated
          </Badge>
          <CardTitle className="text-2xl">Welcome back</CardTitle>
          <CardDescription className="text-base leading-7">
            Your profile and contributions are still safely stored. Reactivate to make them visible
            and use Female Rockers again.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ReactivateForm />
        </CardContent>
      </Card>
    </section>
  );
}

function ReactivateAccountSkeleton() {
  return (
    <section className="flex min-h-svh items-center justify-center p-6">
      <Card className="w-full max-w-md border-border/70 bg-background/95 shadow-sm">
        <CardHeader className="space-y-3">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-5 w-full" />
        </CardHeader>
        <CardContent className="space-y-3">
          <Skeleton className="h-9 w-full rounded-full" />
          <Skeleton className="h-9 w-full rounded-full" />
        </CardContent>
      </Card>
    </section>
  );
}

export default function ReactivateAccountPage() {
  return (
    <Suspense fallback={<ReactivateAccountSkeleton />}>
      <ReactivateAccountContent />
    </Suspense>
  );
}
