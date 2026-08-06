"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import {
  type ChallengeWithStatus,
  createChallenge,
  updateChallenge,
} from "@/app/challenge/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function ChallengeForm({ challenge }: { challenge?: ChallengeWithStatus }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: challenge?.title || "",
    description: challenge?.description || "",
    endsAt: challenge?.endsAt ? new Date(challenge.endsAt).toISOString().slice(0, 16) : "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.title || !formData.description || !formData.endsAt) {
      setError("All fields are required");
      return;
    }

    startTransition(async () => {
      const data = {
        title: formData.title,
        description: formData.description,
        endsAt: new Date(formData.endsAt),
      };

      const result = challenge
        ? await updateChallenge(challenge.id, data)
        : await createChallenge(data);

      if (result.error) {
        setError(result.error);
      } else {
        router.push("/admin/challenges");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="rounded-lg border border-red-500/50 bg-red-500/10 p-4 text-sm text-red-500">
          {error}
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="title">Challenge Title</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Enter challenge title"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Describe the challenge"
          rows={6}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="endsAt">End Date & Time</Label>
        <Input
          id="endsAt"
          type="datetime-local"
          value={formData.endsAt}
          onChange={(e) => setFormData({ ...formData, endsAt: e.target.value })}
          required
        />
        <p className="text-xs text-muted-foreground">
          The challenge will automatically end at this date and time
        </p>
      </div>

      <div className="flex gap-4">
        <Button type="submit" disabled={isPending}>
          {isPending
            ? challenge
              ? "Updating..."
              : "Creating..."
            : challenge
              ? "Update Challenge"
              : "Create Challenge"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.push("/admin/challenges")}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
