"use client";

import { useRouter } from "next/navigation";
import { useRef, useTransition } from "react";
import { cn } from "@/lib/utils";
import { addComment } from "./actions";

type Props = {
  reviewId: string;
  slug: string;
};

export function CommentForm({ reviewId, slug }: Props) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (formData: FormData) => {
    const body = formData.get("body");
    if (typeof body !== "string" || body.trim().length === 0) return;

    startTransition(async () => {
      const result = await addComment(reviewId, slug, body.trim());
      if (result?.error) {
        router.push("/auth/login");
      } else {
        formRef.current?.reset();
      }
    });
  };

  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold">Leave a comment</h2>
      <form ref={formRef} action={handleSubmit} className="space-y-3">
        <textarea
          name="body"
          required
          placeholder="Share your thoughts..."
          rows={3}
          className={cn(
            "w-full resize-none rounded-xl border bg-background px-4 py-3 text-sm transition-colors placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30",
            isPending && "opacity-50",
          )}
          disabled={isPending}
        />
        <button
          type="submit"
          disabled={isPending}
          className={cn(
            "rounded-lg bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-colors",
            isPending ? "cursor-not-allowed opacity-50" : "hover:bg-primary/90",
          )}
        >
          {isPending ? "Posting..." : "Post comment"}
        </button>
      </form>
    </div>
  );
}
