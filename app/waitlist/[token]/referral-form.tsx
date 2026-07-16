"use client";

import { CheckIcon, PaperPlaneRightIcon } from "@phosphor-icons/react/ssr";
import { useEffect, useId, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { sendReferrals } from "./actions";

type Props = {
  entryId: string;
  referralCode: string;
  enabled: boolean;
  onAllSent: () => void;
  sentReferralEmails: string[];
};

type FieldState = {
  value: string;
  status: "idle" | "sending" | "sent" | "failed";
  error?: string;
};

export function ReferralForm({
  entryId,
  referralCode,
  enabled,
  onAllSent,
  sentReferralEmails,
}: Props) {
  const inputIds = [useId(), useId(), useId()];

  const [fields, setFields] = useState<FieldState[]>(() =>
    Array.from({ length: 3 }, (_, i) =>
      i < sentReferralEmails.length
        ? { value: sentReferralEmails[i], status: "sent" as const }
        : { value: "", status: "idle" as const },
    ),
  );
  const [, startTransition] = useTransition();

  useEffect(() => {
    if (fields.every((f) => f.status === "sent")) {
      onAllSent();
    }
  }, [fields, onAllSent]);

  function updateField(index: number, value: string) {
    setFields((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], value };
      return next;
    });
  }

  function handleSend(index: number) {
    const email = fields[index].value.trim();
    if (!email || !enabled) return;

    setFields((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], status: "sending" };
      return next;
    });

    startTransition(async () => {
      const result = await sendReferrals(entryId, referralCode, [email]);
      const firstResult = result.results[0];

      setFields((prev) => {
        const next = [...prev];
        if (firstResult?.status === "sent") {
          next[index] = { value: email, status: "sent" };
        } else {
          next[index] = {
            value: email,
            status: "failed",
            error: firstResult?.error || "Failed to send",
          };
        }

        return next;
      });
    });
  }

  return (
    <div className="space-y-4">
      <div className="space-y-4">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex gap-2">
            <div className="flex-1">
              <Label htmlFor={inputIds[i]} className="sr-only">
                Friend {i + 1} email
              </Label>
              <Input
                id={inputIds[i]}
                type="email"
                placeholder={
                  enabled
                    ? `friend${i + 1}@example.com`
                    : "Confirm your spot first…"
                }
                value={fields[i].value}
                onChange={(e) => updateField(i, e.target.value)}
                disabled={!enabled || fields[i].status === "sent"}
              />
            </div>
            <Button
              type="button"
              variant={fields[i].status === "sent" ? "default" : "outline"}
              disabled={
                !enabled ||
                fields[i].status === "sent" ||
                fields[i].status === "sending" ||
                !fields[i].value.trim()
              }
              onClick={() => handleSend(i)}
              className="shrink-0"
            >
              {fields[i].status === "sending" ? (
                "Sending…"
              ) : fields[i].status === "sent" ? (
                <CheckIcon className="h-4 w-4" />
              ) : (
                <PaperPlaneRightIcon className="h-4 w-4" />
              )}
            </Button>
          </div>
        ))}
      </div>

      {fields.some((f) => f.status === "failed" && f.error) && (
        <div className="space-y-1">
          {fields
            .filter((f) => f.status === "failed" && f.error)
            .map((f) => (
              <p key={f.value} className="text-sm text-destructive">
                {f.value}: {f.error}
              </p>
            ))}
        </div>
      )}
    </div>
  );
}
