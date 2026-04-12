"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { submitEntry } from "@/app/challenge/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function SubmitEntryForm({ challengeId }: { challengeId: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    videoUrl: "",
    description: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.videoUrl || !formData.description) {
      setError("All fields are required");
      return;
    }

    startTransition(async () => {
      const result = await submitEntry(challengeId, formData);

      if (result.error) {
        setError(result.error);
      } else {
        router.push(`/challenges/${challengeId}`);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 rounded-xl border border-border/70 bg-card p-6">
      {error && (
        <div className="rounded-lg border border-red-500/50 bg-red-500/10 p-4 text-sm text-red-500">
          {error}
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="videoUrl">Video URL</Label>
        <Input
          id="videoUrl"
          type="url"
          value={formData.videoUrl}
          onChange={(e) =>
            setFormData({ ...formData, videoUrl: e.target.value })
          }
          placeholder="https://youtube.com/watch?v=..."
          required
        />
        <p className="text-xs text-muted-foreground">
          YouTube, Vimeo, or other video platform link
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          placeholder="Tell us about your entry..."
          rows={6}
          required
        />
      </div>

      <div className="flex gap-4">
        <Button type="submit" disabled={isPending}>
          {isPending ? "Submitting..." : "Submit Entry"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push(`/challenges/${challengeId}`)}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
