"use client";

import { useState, useTransition } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { revokeAdminInvitation } from "@/lib/invitations/actions";
import type { InvitationListItem } from "@/lib/invitations/types";

function formatDate(value: Date | null): string {
  if (!value) return "—";
  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function statusVariant(status: InvitationListItem["status"]) {
  switch (status) {
    case "accepted":
      return "default" as const;
    case "failed":
      return "destructive" as const;
    case "pending":
      return "secondary" as const;
    default:
      return "outline" as const;
  }
}

export function AdminInvitationHistory({ invitations }: { invitations: InvitationListItem[] }) {
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function revoke(id: string) {
    setPendingId(id);
    setNotice(null);
    startTransition(async () => {
      const result = await revokeAdminInvitation(id);
      setNotice(result.success ? result.message : result.error);
      setPendingId(null);
    });
  }

  if (invitations.length === 0) {
    return <p className="text-muted-foreground">No invitations yet.</p>;
  }

  return (
    <div className="space-y-3">
      {notice ? (
        <p className="text-sm text-muted-foreground" aria-live="polite">
          {notice}
        </p>
      ) : null}
      <div className="w-full overflow-x-auto rounded-xl border border-border/70">
        <table className="w-full min-w-[980px] text-sm">
          <thead>
            <tr className="border-b bg-muted/40 text-left">
              <th className="px-4 py-3 font-medium">Recipient</th>
              <th className="px-4 py-3 font-medium">Source</th>
              <th className="px-4 py-3 font-medium">Inviter</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Created</th>
              <th className="px-4 py-3 font-medium">Sent</th>
              <th className="px-4 py-3 font-medium">Expires</th>
              <th className="px-4 py-3 font-medium">Completed</th>
              <th className="px-4 py-3 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {invitations.map((invitation) => (
              <tr key={invitation.id} className="border-b border-border/60 align-top">
                <td className="px-4 py-3 font-medium">
                  {invitation.recipientEmail}
                  {invitation.deliveryError ? (
                    <p
                      className="mt-1 max-w-64 text-xs font-normal text-destructive"
                      title={invitation.deliveryError}
                    >
                      {invitation.deliveryError}
                    </p>
                  ) : null}
                </td>
                <td className="px-4 py-3">
                  <Badge variant="outline">
                    {invitation.source}
                    {invitation.memberSlot ? ` · slot ${invitation.memberSlot}` : ""}
                  </Badge>
                </td>
                <td className="px-4 py-3 text-muted-foreground">{invitation.inviterEmail}</td>
                <td className="px-4 py-3">
                  <Badge variant={statusVariant(invitation.status)}>{invitation.status}</Badge>
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {formatDate(invitation.createdAt)}
                </td>
                <td className="px-4 py-3 text-muted-foreground">{formatDate(invitation.sentAt)}</td>
                <td className="px-4 py-3 text-muted-foreground">
                  {formatDate(invitation.expiresAt)}
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {formatDate(invitation.acceptedAt ?? invitation.revokedAt)}
                </td>
                <td className="px-4 py-3">
                  {invitation.status === "pending" ? (
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      disabled={isPending}
                      onClick={() => revoke(invitation.id)}
                    >
                      {pendingId === invitation.id ? "Revoking…" : "Revoke"}
                    </Button>
                  ) : (
                    "—"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
