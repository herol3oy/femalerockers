"use client";

import Image from "next/image";
import { useState, useTransition } from "react";
import { approveCollab, rejectCollab } from "@/app/admin/actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type CollabRow = {
  id: string;
  status: string;
  bio: string;
  pieceType: string;
  songTitle: string;
  bandName: string | null;
  videoUrl: string;
  coverPhotoUrl: string | null;
  upcomingNews: string | null;
  adminNotes: string | null;
  createdAt: Date;
  artistName: string;
  username: string;
};

export function CollabTable({ collabs }: { collabs: CollabRow[] }) {
  if (collabs.length === 0) {
    return <p className="text-muted-foreground">No collaboration submissions yet.</p>;
  }

  return (
    <div className="w-full overflow-x-auto rounded-xl border border-border/70">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b bg-muted/40 text-left">
            <th className="px-4 py-3 font-medium">Artist</th>
            <th className="px-4 py-3 font-medium">Song Title</th>
            <th className="px-4 py-3 font-medium">Type</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 font-medium">Submitted</th>
            <th className="px-4 py-3 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {collabs.map((c) => (
            <CollabRow key={c.id} collab={c} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CollabRow({ collab }: { collab: CollabRow }) {
  const [isPending, startTransition] = useTransition();
  const [expanded, setExpanded] = useState(false);
  const [rejectNotes, setRejectNotes] = useState("");
  const [showRejectInput, setShowRejectInput] = useState(false);

  const handleApprove = () => {
    startTransition(async () => {
      await approveCollab(collab.id);
    });
  };

  const handleReject = () => {
    if (!showRejectInput) {
      setShowRejectInput(true);
      return;
    }
    startTransition(async () => {
      await rejectCollab(collab.id, rejectNotes || null);
      setShowRejectInput(false);
    });
  };

  const statusVariant =
    collab.status === "approved"
      ? "default"
      : collab.status === "rejected"
        ? "destructive"
        : "secondary";

  return (
    <>
      <tr className="border-b border-border/60 transition-colors hover:bg-muted/30">
        <td className="px-4 py-3">
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="font-medium underline decoration-primary/30 underline-offset-4 hover:decoration-primary text-left"
          >
            {collab.artistName}
          </button>
        </td>
        <td className="px-4 py-3">{collab.songTitle}</td>
        <td className="px-4 py-3 capitalize">{collab.pieceType}</td>
        <td className="px-4 py-3">
          <Badge variant={statusVariant} className="capitalize">
            {collab.status}
          </Badge>
        </td>
        <td className="px-4 py-3 text-muted-foreground">
          {collab.createdAt.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </td>
        <td className="px-4 py-3">
          {collab.status === "pending" && (
            <div className="flex items-center gap-2">
              <Button size="sm" disabled={isPending} onClick={handleApprove}>
                {isPending ? "Saving…" : "Approve"}
              </Button>
              <Button size="sm" variant="destructive" disabled={isPending} onClick={handleReject}>
                {isPending ? "Saving…" : "Reject"}
              </Button>
            </div>
          )}
        </td>
      </tr>
      {showRejectInput && collab.status === "pending" && (
        <tr className="border-b border-border/60 bg-muted/10">
          <td colSpan={6} className="px-4 py-3">
            <div className="flex items-center gap-2 max-w-lg">
              <Input
                placeholder="Reason for rejection (optional)…"
                value={rejectNotes}
                onChange={(e) => setRejectNotes(e.target.value)}
              />
              <Button size="sm" variant="destructive" disabled={isPending} onClick={handleReject}>
                Confirm Reject
              </Button>
              <Button size="sm" variant="outline" onClick={() => setShowRejectInput(false)}>
                Cancel
              </Button>
            </div>
          </td>
        </tr>
      )}
      {expanded && (
        <tr className="border-b border-border/60 bg-muted/10">
          <td colSpan={6} className="px-4 py-4">
            <div className="flex flex-col gap-3 max-w-2xl">
              <div>
                <span className="text-xs font-medium text-muted-foreground uppercase">Bio</span>
                <p className="text-sm mt-1">{collab.bio}</p>
              </div>
              {collab.bandName && (
                <div>
                  <span className="text-xs font-medium text-muted-foreground uppercase">Band</span>
                  <p className="text-sm mt-1">{collab.bandName}</p>
                </div>
              )}
              <div>
                <span className="text-xs font-medium text-muted-foreground uppercase">
                  Video URL
                </span>
                <p className="text-sm mt-1">
                  <a
                    href={collab.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline decoration-primary/30 underline-offset-4 hover:decoration-primary break-all"
                  >
                    {collab.videoUrl}
                  </a>
                </p>
              </div>
              {collab.coverPhotoUrl && (
                <div>
                  <span className="text-xs font-medium text-muted-foreground uppercase">
                    Cover Photo
                  </span>
                  <Image
                    src={collab.coverPhotoUrl}
                    alt="Cover photo"
                    width={100}
                    height={150}
                    className="mt-2 h-37.5 w-25 rounded-lg object-cover"
                  />
                </div>
              )}
              {collab.upcomingNews && (
                <div>
                  <span className="text-xs font-medium text-muted-foreground uppercase">
                    Upcoming News
                  </span>
                  <p className="text-sm mt-1">{collab.upcomingNews}</p>
                </div>
              )}
              {collab.adminNotes && (
                <div>
                  <span className="text-xs font-medium text-muted-foreground uppercase">
                    Admin Notes
                  </span>
                  <p className="text-sm mt-1 italic">{collab.adminNotes}</p>
                </div>
              )}
            </div>
          </td>
        </tr>
      )}
    </>
  );
}
