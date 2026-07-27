import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { db } from "@/app/db";
import { usersTable } from "@/app/db/schema";
import { SignUpForm } from "@/components/sign-up-form";

async function SignUpContent({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string | string[] }>;
}) {
  const params = await searchParams;
  const rawReferralCode = Array.isArray(params.ref)
    ? params.ref[0]
    : params.ref;
  const referralCode = rawReferralCode?.trim().toUpperCase();

  if (!referralCode) {
    notFound();
  }

  const [referrer] = await db
    .select({ referralCode: usersTable.referralCode })
    .from(usersTable)
    .where(eq(usersTable.referralCode, referralCode))
    .limit(1);

  if (!referrer) {
    notFound();
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <SignUpForm referralCode={referrer.referralCode} />
      </div>
    </div>
  );
}

export default function Page({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string | string[] }>;
}) {
  return (
    <Suspense>
      <SignUpContent searchParams={searchParams} />
    </Suspense>
  );
}
