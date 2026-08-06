"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { withdrawCollab } from "./actions";

export function WithdrawButton({ collabId }: { collabId: string }) {
  const [state, formAction, pending] = useActionState(withdrawCollab, null);

  return (
    <form action={formAction}>
      <input type="hidden" name="collabId" value={collabId} />
      {state?.error && <p className="text-sm text-destructive mb-2">{state.error}</p>}
      <Button type="submit" variant="destructive" size="sm" disabled={pending}>
        {pending ? "Withdrawing…" : "Withdraw Submission"}
      </Button>
    </form>
  );
}
