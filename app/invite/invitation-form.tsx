"use client";

import { useId, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { sendMemberInvitation } from "@/lib/invitations/actions";

export function MemberInvitationForm({
  remainingSlots,
}: {
  remainingSlots: number;
}) {
  const id = useId();
  const [notice, setNotice] = useState<{
    success: boolean;
    text: string;
  } | null>(null);
  const [isPending, startTransition] = useTransition();

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const email = String(new FormData(form).get("email") ?? "");
    setNotice(null);

    startTransition(async () => {
      const result = await sendMemberInvitation(email);
      setNotice({
        success: result.success,
        text: result.success ? result.message : result.error,
      });
      if (result.success) form.reset();
    });
  }

  return (
    <form className="space-y-4" onSubmit={submit}>
      <div className="grid gap-2">
        <Label htmlFor={id}>Friend&apos;s email address</Label>
        <Input
          id={id}
          name="email"
          type="email"
          autoComplete="email"
          disabled={isPending || remainingSlots === 0}
          required
        />
      </div>
      <Button type="submit" disabled={isPending || remainingSlots === 0}>
        {isPending ? "Sending…" : "Send invitation"}
      </Button>
      {notice ? (
        <p
          className={
            notice.success
              ? "text-sm text-muted-foreground"
              : "text-sm text-destructive"
          }
          aria-live="polite"
        >
          {notice.text}
        </p>
      ) : null}
    </form>
  );
}
