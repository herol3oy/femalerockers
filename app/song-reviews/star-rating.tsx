"use client";

import { StarIcon } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { cn } from "@/lib/utils";
import { rateReview, removeRating } from "./actions";

type Props = {
  reviewId: string;
  slug: string;
  initialAverage: number;
  initialCount: number;
  initialUserRating: number | null;
};

export function StarRating({
  reviewId,
  slug,
  initialAverage,
  initialCount,
  initialUserRating,
}: Props) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleRate = (n: number) => {
    startTransition(async () => {
      if (n === initialUserRating) {
        const result = await removeRating(reviewId, slug);
        if (result?.error) {
          router.push("/auth/login");
        }
      } else {
        const result = await rateReview(reviewId, slug, n);
        if (result?.error) {
          router.push("/auth/login");
        }
      }
    });
  };

  const roundedAverage = Math.round(initialAverage);
  const displayAverage = initialCount > 0 ? initialAverage.toFixed(1) : "—";

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            disabled={isPending}
            onClick={() => handleRate(n)}
            aria-label={`${n} star${n > 1 ? "s" : ""}`}
            className={cn(
              "transition-all",
              isPending ? "cursor-not-allowed opacity-50" : "cursor-pointer",
              n <= (initialUserRating ?? roundedAverage)
                ? "text-amber-400"
                : "text-muted-foreground/30",
              !isPending && "hover:scale-110 hover:text-amber-400",
            )}
          >
            <StarIcon
              size={18}
              weight={
                n <= (initialUserRating ?? roundedAverage) ? "fill" : "regular"
              }
            />
          </button>
        ))}
      </div>
      <span className="text-sm tabular-nums text-muted-foreground">
        <span className="font-medium text-foreground">{displayAverage}</span>
        {initialCount > 0 && (
          <span className="text-muted-foreground/60">
            {" "}
            ({initialCount} rating{initialCount !== 1 ? "s" : ""})
          </span>
        )}
      </span>
    </div>
  );
}
