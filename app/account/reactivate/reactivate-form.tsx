"use client";

import { useRouter } from "next/navigation";
import { useActionState, useState } from "react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { reactivateAccount } from "@/app/profile/settings/actions";

export function ReactivateForm() {
  const [state, formAction, pending] = useActionState(reactivateAccount, null);
  const [signingOut, setSigningOut] = useState(false);
  const router = useRouter();

  const stayDeactivated = async () => {
    setSigningOut(true);
    const supabase = createClient();
    await supabase.auth.signOut({ scope: "global" });
    router.push("/auth/login?deactivated=1");
    router.refresh();
  };

  return (
    <div className="space-y-4">
      {state?.error ? (
        <p className="text-sm text-destructive">{state.error}</p>
      ) : null}
      <form action={formAction}>
        <Button
          type="submit"
          className="w-full"
          disabled={pending || signingOut}
        >
          {pending ? "Reactivating…" : "Reactivate my account"}
        </Button>
      </form>
      <Button
        type="button"
        variant="outline"
        className="w-full"
        disabled={pending || signingOut}
        onClick={stayDeactivated}
      >
        {signingOut ? "Signing out…" : "Not now"}
      </Button>
    </div>
  );
}
