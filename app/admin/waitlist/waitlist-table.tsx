"use client";

import { Badge } from "@/components/ui/badge";

type Invitation = {
  id: string;
  email: string;
  source: string;
  status: string;
  sentAt: Date | null;
  confirmedAt: Date | null;
  errorMessage: string | null;
  createdAt: Date;
  referrerEmail: string | null;
};

function statusVariant(status: string) {
  switch (status) {
    case "confirmed":
      return "default" as const;
    case "sent":
      return "secondary" as const;
    case "pending":
      return "outline" as const;
    case "failed":
      return "destructive" as const;
    default:
      return "secondary" as const;
  }
}

function formatDate(date: Date | null) {
  if (!date) return "—";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}

export function WaitlistTable({ invitations }: { invitations: Invitation[] }) {
  if (invitations.length === 0) {
    return <p className="text-muted-foreground">No invitations sent yet.</p>;
  }

  return (
    <div className="w-full overflow-x-auto rounded-xl border border-border/70">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b bg-muted/40 text-left">
            <th className="px-4 py-3 font-medium">Email</th>
            <th className="px-4 py-3 font-medium">Source</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 font-medium">Referrer</th>
            <th className="px-4 py-3 font-medium">Sent</th>
            <th className="px-4 py-3 font-medium">Confirmed</th>
          </tr>
        </thead>
        <tbody>
          {invitations.map((inv) => (
            <tr
              key={inv.id}
              className="border-b border-border/60 transition-colors hover:bg-muted/30"
            >
              <td className="px-4 py-3 font-medium">{inv.email}</td>
              <td className="px-4 py-3">
                <Badge
                  variant={inv.source === "admin" ? "secondary" : "outline"}
                >
                  {inv.source}
                </Badge>
              </td>
              <td className="px-4 py-3">
                <Badge variant={statusVariant(inv.status)}>
                  {inv.status}
                  {inv.errorMessage && inv.status === "failed" && (
                    <span
                      className="ml-1 text-xs opacity-70"
                      title={inv.errorMessage}
                    >
                      (hover for details)
                    </span>
                  )}
                </Badge>
              </td>
              <td className="px-4 py-3 text-muted-foreground">
                {inv.referrerEmail ?? "—"}
              </td>
              <td className="px-4 py-3 text-muted-foreground">
                {formatDate(inv.sentAt)}
              </td>
              <td className="px-4 py-3 text-muted-foreground">
                {formatDate(inv.confirmedAt)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
