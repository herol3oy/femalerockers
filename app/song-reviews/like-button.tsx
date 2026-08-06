"use client";

import { HeartIcon } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { cn } from "@/lib/utils";
import { toggleLike } from "./actions";

type Props = {
  reviewId: string;
  slug: string;
  initialCount: number;
  initialLiked: boolean;
};

export function LikeButton({ reviewId, slug, initialCount, initialLiked }: Props) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleClick = () => {
    startTransition(async () => {
      const result = await toggleLike(reviewId, slug);
      if (result?.error) {
        router.push("/auth/login");
      }
    });
  };

  return (
    <form action={handleClick}>
      <button
        type="submit"
        disabled={isPending}
        className={cn(
          "group flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition-all",
          initialLiked
            ? "border-red-200 bg-red-50 text-red-600 hover:bg-red-100 dark:border-red-800 dark:bg-red-950 dark:text-red-400 dark:hover:bg-red-900"
            : "border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground",
          isPending && "pointer-events-none opacity-50",
        )}
      >
        <HeartIcon
          size={16}
          weight={initialLiked ? "fill" : "regular"}
          className="transition-transform group-hover:scale-110"
        />
        <span>{initialCount}</span>
      </button>
    </form>
  );
}
