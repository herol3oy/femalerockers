"use client";

import { TrashIcon } from "@phosphor-icons/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { cn } from "@/lib/utils";
import { deleteComment } from "./actions";
import type { CommentWithUser } from "./comment-data";

type Props = {
  comments: CommentWithUser[];
  currentUserId: string | null;
  slug: string;
};

export function CommentList({ comments, currentUserId, slug }: Props) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleDelete = (commentId: string) => {
    startTransition(async () => {
      const result = await deleteComment(commentId, slug);
      if (result?.error) {
        router.push("/auth/login");
      }
    });
  };

  if (comments.length === 0) return null;

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Comments ({comments.length})</h2>
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="rounded-xl border bg-muted/30 p-4">
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {comment.avatarUrl ? (
                  <Image
                    src={comment.avatarUrl}
                    alt={comment.username}
                    width={28}
                    height={28}
                    className="h-7 w-7 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                    {comment.username.charAt(0).toUpperCase()}
                  </div>
                )}
                <div>
                  <p className="text-sm font-medium leading-tight">{comment.artistName}</p>
                  <p className="text-xs leading-tight text-muted-foreground">@{comment.username}</p>
                </div>
                <span className="ml-1 text-xs text-muted-foreground/50">
                  {new Date(comment.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year:
                      comment.createdAt.getFullYear() !== new Date().getFullYear()
                        ? "numeric"
                        : undefined,
                  })}
                </span>
              </div>

              {currentUserId === comment.userId && (
                <button
                  type="button"
                  onClick={() => handleDelete(comment.id)}
                  disabled={isPending}
                  className={cn(
                    "text-muted-foreground/40 transition-colors hover:text-red-500",
                    isPending && "cursor-not-allowed opacity-50",
                  )}
                  aria-label="Delete comment"
                >
                  <TrashIcon size={16} />
                </button>
              )}
            </div>
            <p className="text-sm text-foreground/85 whitespace-pre-wrap">{comment.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
