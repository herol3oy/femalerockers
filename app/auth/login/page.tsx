import { LoginForm } from "@/components/login-form";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

async function LoginContent({
  searchParams,
}: {
  searchParams: Promise<{
    deactivated?: string;
    deleted?: string;
  }>;
}) {
  const params = await searchParams;
  const notice =
    params.deleted === "1"
      ? "Your account and profile have been permanently deleted."
      : params.deactivated === "1"
        ? "Your account is deactivated. Sign in whenever you are ready to reactivate it."
        : undefined;

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm notice={notice} />
      </div>
    </div>
  );
}

function LoginSkeleton() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm rounded-xl border p-6">
        <Skeleton className="h-8 w-24" />
        <Skeleton className="mt-3 h-4 w-64" />
        <Skeleton className="mt-8 h-10 w-full" />
        <Skeleton className="mt-5 h-10 w-full" />
        <Skeleton className="mt-6 h-9 w-full rounded-full" />
      </div>
    </div>
  );
}

export default function Page({
  searchParams,
}: {
  searchParams: Promise<{
    deactivated?: string;
    deleted?: string;
  }>;
}) {
  return (
    <Suspense fallback={<LoginSkeleton />}>
      <LoginContent searchParams={searchParams} />
    </Suspense>
  );
}
