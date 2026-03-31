"use client";

import { useActionState } from "react";
import { completeOnboarding } from "./actions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function OnboardingPage() {
  const [state, formAction, pending] = useActionState(completeOnboarding, null);

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md flex flex-col gap-6 p-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">Complete your profile</h1>
          <p className="text-sm text-muted-foreground">
            Fill in the details below to get started on Female Rockers.
          </p>
        </div>

        <form action={formAction} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              name="username"
              placeholder="e.g. jane_rocks"
              required
              minLength={3}
              maxLength={50}
              pattern="^[a-zA-Z0-9_]+$"
            />
            <p className="text-xs text-muted-foreground">
              Letters, numbers, and underscores only. This will be your public
              URL.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="artistName">Artist Name</Label>
            <Input
              id="artistName"
              name="artistName"
              placeholder="e.g. Jane Doe"
              required
              maxLength={100}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="instagramUrl">Instagram URL</Label>
            <Input
              id="instagramUrl"
              name="instagramUrl"
              placeholder="https://instagram.com/janedoe"
              required
              maxLength={255}
            />
          </div>

          {state?.error && (
            <p className="text-sm text-destructive">{state.error}</p>
          )}

          <Button type="submit" disabled={pending}>
            {pending ? "Saving…" : "Complete Setup"}
          </Button>
        </form>
      </div>
    </main>
  );
}
