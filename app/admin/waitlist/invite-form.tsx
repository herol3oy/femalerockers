"use client";

import { useId, useState, useTransition } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { type InviteResult, sendBulkInvitations } from "./actions";

type FormState =
  | { status: "idle" }
  | { status: "submitting" }
  | {
      status: "done";
      invited: number;
      skipped: number;
      failed: number;
      results: InviteResult[];
    };

export function InviteForm() {
  const textareaId = useId();
  const [state, setState] = useState<FormState>({ status: "idle" });
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const raw = String(data.get("emails") ?? "");
    const emails = raw
      .split(/[\n,]+/)
      .map((s) => s.trim())
      .filter(Boolean);

    if (emails.length === 0) return;

    setState({ status: "submitting" });
    startTransition(async () => {
      const result = await sendBulkInvitations(emails);
      if ("error" in result) {
        setState({ status: "idle" });
        return;
      }
      setState({
        status: "done",
        invited: result.invited,
        skipped: result.skipped,
        failed: result.failed,
        results: result.results,
      });
      form.reset();
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-2">
        <Label htmlFor={textareaId}>
          Email addresses{" "}
          <span className="text-muted-foreground">
            (one per line or comma-separated)
          </span>
        </Label>
        <Textarea
          id={textareaId}
          name="emails"
          placeholder={
            "artist1@example.com\nartist2@example.com\nartist3@example.com"
          }
          rows={6}
          disabled={isPending}
          required
        />
      </div>

      <div className="flex items-center gap-3">
        <Button type="submit" disabled={isPending}>
          {isPending ? "Sending…" : "Send Invitations"}
        </Button>
        {state.status === "done" && (
          <div className="flex gap-2">
            <Badge variant="default">{state.invited} sent</Badge>
            {state.skipped > 0 && (
              <Badge variant="secondary">{state.skipped} skipped</Badge>
            )}
            {state.failed > 0 && (
              <Badge variant="destructive">{state.failed} failed</Badge>
            )}
          </div>
        )}
      </div>
    </form>
  );
}
