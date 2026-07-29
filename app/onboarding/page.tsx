import { and, eq, isNull } from "drizzle-orm";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { db } from "@/app/db";
import { usersTable } from "@/app/db/schema";
import { createClient } from "@/lib/supabase/server";
import { OnboardingForm } from "./onboarding-form";

async function OnboardingContent({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string | string[] }>;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const [existingMember] = await db
    .select({ id: usersTable.id })
    .from(usersTable)
    .where(eq(usersTable.id, user.id))
    .limit(1);

  if (existingMember) {
    redirect("/profile");
  }

  const params = await searchParams;
  const rawReferralCode = Array.isArray(params.ref)
    ? params.ref[0]
    : params.ref;
  const metadataReferralCode =
    typeof user.user_metadata?.referral_code === "string"
      ? user.user_metadata.referral_code
      : undefined;
  const referralCode = (rawReferralCode || metadataReferralCode)
    ?.trim()
    .toUpperCase();

  if (!referralCode) {
    redirect("/");
  }

  const [referrer] = await db
    .select({ id: usersTable.id })
    .from(usersTable)
    .where(
      and(
        eq(usersTable.referralCode, referralCode),
        isNull(usersTable.deactivatedAt),
      ),
    )
    .limit(1);

  if (!referrer || referrer.id === user.id) {
    redirect("/");
  }

  return <OnboardingForm referralCode={referralCode} />;
}

export default function OnboardingPage({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string | string[] }>;
}) {
  return (
    <Suspense>
      <OnboardingContent searchParams={searchParams} />
    </Suspense>
  );
}
