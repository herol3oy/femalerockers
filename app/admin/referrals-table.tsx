import { Badge } from "@/components/ui/badge";

export type AdminReferral = {
  id: string;
  completedAt: Date;
  referrerUsername: string;
  referrerArtistName: string;
  referrerEmail: string;
  referredUsername: string;
  referredArtistName: string;
  referredEmail: string;
};

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}

export function ReferralsTable({
  referrals,
}: {
  referrals: AdminReferral[];
}) {
  if (referrals.length === 0) {
    return (
      <p className="text-muted-foreground">
        No completed referrals have been recorded yet.
      </p>
    );
  }

  return (
    <div className="w-full overflow-x-auto rounded-xl border border-border/70">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b bg-muted/40 text-left">
            <th className="px-4 py-3 font-medium">Referrer</th>
            <th className="px-4 py-3 font-medium">Referred member</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 font-medium">Completed</th>
          </tr>
        </thead>
        <tbody>
          {referrals.map((referral) => (
            <tr
              key={referral.id}
              className="border-b border-border/60 transition-colors hover:bg-muted/30"
            >
              <td className="px-4 py-3">
                <a
                  href={`/${referral.referrerUsername}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium underline decoration-primary/30 underline-offset-4 hover:decoration-primary"
                >
                  {referral.referrerArtistName}
                </a>
                <p className="text-xs text-muted-foreground">
                  {referral.referrerEmail}
                </p>
              </td>
              <td className="px-4 py-3">
                <a
                  href={`/${referral.referredUsername}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium underline decoration-primary/30 underline-offset-4 hover:decoration-primary"
                >
                  {referral.referredArtistName}
                </a>
                <p className="text-xs text-muted-foreground">
                  {referral.referredEmail}
                </p>
              </td>
              <td className="px-4 py-3">
                <Badge>Completed</Badge>
              </td>
              <td className="px-4 py-3 text-muted-foreground">
                {formatDate(referral.completedAt)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
