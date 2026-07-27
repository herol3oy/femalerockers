"use client";

import { CheckIcon, CopyIcon } from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type CopyState = "idle" | "copied" | "error";

export function CopyReferralLink({ referralUrl }: { referralUrl: string }) {
  const [copyState, setCopyState] = useState<CopyState>("idle");
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (resetTimer.current) {
        clearTimeout(resetTimer.current);
      }
    };
  }, []);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(referralUrl);
      setCopyState("copied");
    } catch {
      setCopyState("error");
    }

    if (resetTimer.current) {
      clearTimeout(resetTimer.current);
    }
    resetTimer.current = setTimeout(() => setCopyState("idle"), 3000);
  }

  return (
    <div className="space-y-2">
      <div className="flex flex-col gap-3 sm:flex-row">
        <Input
          aria-label="Your referral link"
          value={referralUrl}
          readOnly
          className="font-mono text-sm"
        />
        <Button
          type="button"
          onClick={handleCopy}
          className="shrink-0 sm:min-w-32"
        >
          {copyState === "copied" ? (
            <CheckIcon className="h-4 w-4" />
          ) : (
            <CopyIcon className="h-4 w-4" />
          )}
          {copyState === "copied" ? "Copied!" : "Copy Link"}
        </Button>
      </div>
      <p className="min-h-5 text-sm text-muted-foreground" aria-live="polite">
        {copyState === "copied"
          ? "Your referral link has been copied."
          : copyState === "error"
            ? "Could not copy automatically. Select and copy the link above."
            : ""}
      </p>
    </div>
  );
}
