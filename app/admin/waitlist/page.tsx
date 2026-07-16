import { EnvelopeIcon, UsersThreeIcon } from "@phosphor-icons/react/ssr";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getWaitlistStats } from "./actions";
import { InviteForm } from "./invite-form";
import { WaitlistTable } from "./waitlist-table";

export default async function AdminWaitlistPage() {
  const stats = await getWaitlistStats();

  if ("error" in stats) {
    return (
      <section className="min-h-screen bg-[radial-gradient(circle_at_top,_hsl(var(--secondary))_0%,_transparent_45%),linear-gradient(to_bottom,_hsl(var(--background)),_hsl(var(--muted)/0.35))]">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
          <Card className="overflow-hidden border-border/70 bg-background/95 shadow-sm">
            <CardContent className="pt-6">
              <p className="text-destructive">{stats.error}</p>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[radial-gradient(circle_at_top,_hsl(var(--secondary))_0%,_transparent_45%),linear-gradient(to_bottom,_hsl(var(--background)),_hsl(var(--muted)/0.35))]">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <Card className="overflow-hidden border-border/70 bg-background/95 shadow-sm">
          <CardHeader className="border-b border-border/60 bg-[linear-gradient(135deg,_hsl(var(--background))_0%,_hsl(var(--secondary)/0.35)_100%)] pb-8">
            <Badge variant="secondary" className="w-fit gap-2">
              <EnvelopeIcon className="h-3.5 w-3.5" />
              Waitlist
            </Badge>
            <CardTitle className="text-3xl">Waitlist Management</CardTitle>
            <CardDescription className="max-w-2xl text-base">
              Send invitation emails and track waitlist signups.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8 pt-6">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <StatCard label="Invited" value={stats.totalInvited} />
              <StatCard label="Confirmed" value={stats.totalConfirmed} />
              <StatCard label="Conversion" value={`${stats.conversionRate}%`} />
              <StatCard
                label="Referrals"
                value={`${stats.referralsConverted}/${stats.referralsSent}`}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-border/70 bg-background/95 shadow-sm">
          <CardHeader className="border-b border-border/60 bg-[linear-gradient(135deg,_hsl(var(--background))_0%,_hsl(var(--secondary)/0.35)_100%)] pb-8">
            <Badge variant="secondary" className="w-fit gap-2">
              <EnvelopeIcon className="h-3.5 w-3.5" />
              Invite
            </Badge>
            <CardTitle className="text-2xl">Send Invitations</CardTitle>
            <CardDescription className="max-w-2xl text-base">
              Paste email addresses below. Each person will receive an
              invitation email with a unique link to join the waitlist.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <InviteForm />
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-border/70 bg-background/95 shadow-sm">
          <CardHeader className="border-b border-border/60 bg-[linear-gradient(135deg,_hsl(var(--background))_0%,_hsl(var(--secondary)/0.35)_100%)] pb-8">
            <Badge variant="secondary" className="w-fit gap-2">
              <UsersThreeIcon className="h-3.5 w-3.5" />
              Status
            </Badge>
            <CardTitle className="text-2xl">All Invitations</CardTitle>
            <CardDescription className="max-w-2xl text-base">
              Track invitation statuses, referral sources, and confirmations.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <WaitlistTable invitations={stats.invitations} />
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-2xl border border-border/60 bg-muted/20 px-5 py-4">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="font-heading text-2xl font-semibold">{value}</p>
    </div>
  );
}
