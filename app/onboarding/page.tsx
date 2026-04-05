"use client";

import { useActionState, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { completeOnboarding } from "./actions";

const MAX_AVATAR_SIZE = 2 * 1024 * 1024; // 2 MB

export default function OnboardingPage() {
  const [state, formAction, pending] = useActionState(completeOnboarding, null);
  const [preview, setPreview] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > MAX_AVATAR_SIZE) {
        setFileError("Avatar must be under 2 MB.");
        e.target.value = "";
        return;
      }
      setFileError(null);
      setPreview(URL.createObjectURL(file));
    }
  };

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
            <Label htmlFor="avatar">Avatar (optional)</Label>
            <div className="flex items-center gap-4">
              {preview ? (
                <picture>
                  <img
                    src={preview}
                    alt="Avatar preview"
                    className="h-16 w-16 rounded-2xl object-cover"
                  />
                </picture>
              ) : (
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-muted text-sm text-muted-foreground">
                  Photo
                </div>
              )}
              <Input
                id="avatar"
                name="avatar"
                type="file"
                accept="image/png,image/jpeg,image/webp"
                onChange={handleFileChange}
                className="max-w-64"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Max 2 MB. PNG, JPEG, or WebP.
            </p>
            {fileError && (
              <p className="text-sm text-destructive">{fileError}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="username">Username <span className="text-destructive">*</span></Label>
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
            <Label htmlFor="artistName">Artist Name <span className="text-destructive">*</span></Label>
            <Input
              id="artistName"
              name="artistName"
              placeholder="e.g. Jane Doe"
              required
              maxLength={100}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="instagramUrl">Instagram URL <span className="text-destructive">*</span></Label>
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
