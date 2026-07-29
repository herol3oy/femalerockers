"use client";

import { useId, useState, useTransition } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { sendAdminInvitations } from "@/lib/invitations/actions";
import type { AdminBulkInvitationResponse } from "@/lib/invitations/types";

export function AdminInvitationForm({
  attemptsRemaining,
}: {
  attemptsRemaining: number;
}) {
  const id = useId();
  const [result, setResult] = useState<AdminBulkInvitationResponse | null>(
    null,
  );
  const [isPending, startTransition] = useTransition();

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const rawEmails = String(new FormData(form).get("emails") ?? "");

    startTransition(async () => {
      const response = await sendAdminInvitations(rawEmails);
      setResult(response);
      if (response.success) form.reset();
    });
  }

  return (
    <form className="space-y-4" onSubmit={submit}>
      <div className="grid gap-2">
        <Label htmlFor={id}>
          Email addresses{" "}
          <span className="text-muted-foreground">
            (one per line or comma-separated)
          </span>
        </Label>
        <Textarea
          id={id}
          name="emails"
          rows={7}
          placeholder={"artist1@example.com\nartist2@example.com"}
          disabled={isPending || attemptsRemaining === 0}
          required
        />
        <p className="text-xs text-muted-foreground">
          Up to 100 recipients per batch. {attemptsRemaining} of 500 attempts
          remain in your rolling 24-hour window.
        </p>
      </div>

      <Button type="submit" disabled={isPending || attemptsRemaining === 0}>
        {isPending ? "Sending…" : "Send invitations"}
      </Button>

      {result ? (
        result.success ? (
          <div className="space-y-3" aria-live="polite">
            <div className="flex flex-wrap gap-2">
              <Badge>{result.sent} sent</Badge>
              <Badge variant="destructive">{result.failed} failed</Badge>
              <Badge variant="secondary">{result.skipped} skipped</Badge>
              <Badge variant="outline">{result.invalid} invalid</Badge>
              <Badge variant="outline">{result.duplicates} duplicates</Badge>
            </div>
            {result.results.some((item) => item.status !== "sent") ? (
              <ul className="space-y-1 rounded-xl border border-border/70 p-3 text-sm">
                {result.results
                  .filter((item) => item.status !== "sent")
                  .map((item, index) => (
                    <li key={`${item.input}-${index}`}>
                      <span className="font-medium">
                        {item.input || item.email}
                      </span>
                      : {item.status}
                      {item.error ? ` — ${item.error}` : ""}
                    </li>
                  ))}
              </ul>
            ) : null}
          </div>
        ) : (
          <p className="text-sm text-destructive" aria-live="polite">
            {result.error}
          </p>
        )
      ) : null}
    </form>
  );
}
