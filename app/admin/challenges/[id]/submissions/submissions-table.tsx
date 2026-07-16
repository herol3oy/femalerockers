"use client";

import Link from "next/link";
import { useState } from "react";
import type { ParticipationWithUser } from "@/app/challenge/actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

function SubmissionDetailModal({
  participation,
  onClose,
}: {
  participation: ParticipationWithUser;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="max-w-3xl w-full max-h-[90vh] overflow-y-auto rounded-xl border border-border/70 bg-card p-6 space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={participation.user.avatarUrl || undefined} />
              <AvatarFallback>
                {participation.user.artistName[0]}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-xl font-bold">
                {participation.user.artistName}
              </h3>
              <p className="text-sm text-muted-foreground">
                @{participation.user.username}
              </p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            Close
          </Button>
        </div>

        <div className="space-y-4">
          <div>
            <div className="text-sm font-medium text-muted-foreground mb-1">
              Status
            </div>
            <Badge
              variant={
                participation.status === "submitted" ? "default" : "secondary"
              }
            >
              {participation.status}
            </Badge>
          </div>

          {participation.videoUrl && (
            <div>
              <div className="text-sm font-medium text-muted-foreground mb-1">
                Video URL
              </div>
              <a
                href={participation.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline break-all"
              >
                {participation.videoUrl}
              </a>
            </div>
          )}

          {participation.description && (
            <div>
              <div className="text-sm font-medium text-muted-foreground mb-1">
                Description
              </div>
              <p className="text-sm whitespace-pre-wrap">
                {participation.description}
              </p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 pt-4 border-t">
            <div>
              <div className="text-sm font-medium text-muted-foreground mb-1">
                Joined
              </div>
              <p className="text-sm">
                {new Date(participation.createdAt).toLocaleString()}
              </p>
            </div>
            <div>
              <div className="text-sm font-medium text-muted-foreground mb-1">
                Last Updated
              </div>
              <p className="text-sm">
                {new Date(participation.updatedAt).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SubmissionsTable({
  participations,
}: {
  participations: ParticipationWithUser[];
}) {
  const [selectedParticipation, setSelectedParticipation] =
    useState<ParticipationWithUser | null>(null);

  if (participations.length === 0) {
    return (
      <div className="rounded-xl border border-border/70 bg-card p-8 text-center">
        <p className="text-muted-foreground">No participants yet.</p>
      </div>
    );
  }

  return (
    <>
      <div className="w-full overflow-x-auto rounded-xl border border-border/70">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/40 text-left">
              <th className="px-4 py-3 font-medium">Participant</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Joined</th>
              <th className="px-4 py-3 font-medium">Last Updated</th>
              <th className="px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {participations.map((participation) => (
              <tr
                key={participation.id}
                className="border-b last:border-b-0 hover:bg-muted/20"
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={participation.user.avatarUrl || undefined}
                      />
                      <AvatarFallback>
                        {participation.user.artistName[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">
                        {participation.user.artistName}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        @{participation.user.username}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <Badge
                    variant={
                      participation.status === "submitted"
                        ? "default"
                        : "secondary"
                    }
                  >
                    {participation.status}
                  </Badge>
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {new Date(participation.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {new Date(participation.updatedAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    {participation.status === "submitted" && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedParticipation(participation)}
                      >
                        View Details
                      </Button>
                    )}
                    <Link href={`/${participation.user.username}`}>
                      <Button variant="ghost" size="sm">
                        Profile
                      </Button>
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedParticipation && (
        <SubmissionDetailModal
          participation={selectedParticipation}
          onClose={() => setSelectedParticipation(null)}
        />
      )}
    </>
  );
}
