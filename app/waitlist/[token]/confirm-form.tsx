"use client";

import { CheckCircleIcon } from "@phosphor-icons/react/ssr";
import Link from "next/link";
import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { confirmWaitlistEntry } from "./actions";

type Props = {
  token: string;
  disabled: boolean;
  onConfirm: (entryId: string, referralCode: string) => void;
};

type FormState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "error"; message: string };

export function ConfirmForm({ token, disabled, onConfirm }: Props) {
  const [state, setState] = useState<FormState>({ status: "idle" });
  const [accepted, setAccepted] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!accepted || disabled) return;

    setState({ status: "submitting" });
    startTransition(async () => {
      const result = await confirmWaitlistEntry(token, true);
      if (result.success) {
        onConfirm(result.entryId, result.referralCode);
      } else {
        setState({ status: "error", message: result.error });
      }
    });
  }

  if (disabled) {
    return (
      <div className="flex items-center gap-3 text-sm text-emerald-400">
        <CheckCircleIcon className="h-5 w-5" />
        <span>You&apos;ve confirmed your spot on the waitlist.</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-start gap-3">
        <Checkbox
          id="tos"
          checked={accepted}
          onCheckedChange={(checked) => setAccepted(checked === true)}
        />
        <Label htmlFor="tos" className="text-sm leading-relaxed">
          I have read and accepted the{" "}
          <Link
            href="/page/terms-and-conditions"
            target="_blank"
            className="font-medium text-primary underline underline-offset-4 hover:text-primary/80"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href="/page/privacy-policy-for-female-rockers-blog"
            target="_blank"
            className="font-medium text-primary underline underline-offset-4 hover:text-primary/80"
          >
            Privacy Policy
          </Link>
          .
        </Label>
      </div>

      {state.status === "error" && (
        <p className="text-sm text-destructive">{state.message}</p>
      )}

      <Button type="submit" disabled={!accepted || isPending} size="lg">
        {isPending ? "Confirming…" : "Confirm & Join Waitlist"}
      </Button>
    </form>
  );
}
