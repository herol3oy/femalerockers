import {
  EnvelopeIcon,
  HourglassIcon,
  UserPlusIcon,
  UsersThreeIcon,
} from "@phosphor-icons/react/ssr";
import { AdminInvitationHistory } from "@/components/invitations/invitation-history";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getAdminInvitationData } from "@/lib/invitations/queries";
import { AdminInvitationForm } from "./invitation-form";

export default async function AdminInvitationsPage() {
  const data = await getAdminInvitationData();

  if (!data.issuingEnabled) {
    return (
      <section className="min-h-screen">
        <div className="mx-auto max-w-4xl px-4 py-12">
          <Card>
            <CardHeader>
              <CardTitle>Invitation issuing is unavailable</CardTitle>
              <CardDescription>
                New invitations have been paused. Existing links follow the
                separately configured redemption window.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[radial-gradient(circle_at_top,_hsl(var(--secondary))_0%,_transparent_45%),linear-gradient(to_bottom,_hsl(var(--background)),_hsl(var(--muted)/0.35))]">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <Card>
          <CardHeader>
            <Badge variant="secondary" className="w-fit gap-2">
              <EnvelopeIcon className="h-3.5 w-3.5" />
              Registration invitations
            </Badge>
            <CardTitle className="text-3xl">Invitation management</CardTitle>
            <CardDescription>
              Send private, single-use registration links that expire
              automatically.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-3">
            <Stat
              icon={HourglassIcon}
              label="Pending"
              value={data.statuses.pending}
            />
            <Stat
              icon={UserPlusIcon}
              label="Accepted"
              value={data.statuses.accepted}
            />
            <Stat
              icon={UsersThreeIcon}
              label="Closed"
              value={
                data.statuses.expired +
                data.statuses.revoked +
                data.statuses.failed
              }
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Send invitations</CardTitle>
            <CardDescription>
              Every valid recipient receives a different seven-day signup link.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AdminInvitationForm attemptsRemaining={data.attemptsRemaining} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Invitation history</CardTitle>
            <CardDescription>
              Delivery details and the complete invitation lifecycle.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AdminInvitationHistory invitations={data.invitations} />
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-2xl border border-border/60 bg-muted/20 p-5">
      <Icon className="mb-3 h-5 w-5 text-muted-foreground" />
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="font-heading text-3xl font-semibold">{value}</p>
    </div>
  );
}
