import {
  EnvelopeIcon,
  HandshakeIcon,
  ShieldIcon,
  TrophyIcon,
  UserPlusIcon,
} from "@phosphor-icons/react/ssr";
import { asc, desc, eq } from "drizzle-orm";
import { alias } from "drizzle-orm/pg-core";
import Link from "next/link";
import { db } from "@/app/db";
import {
  collaborationsTable,
  referralsTable,
  usersTable,
} from "@/app/db/schema";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CollabTable } from "./collab-table";
import { ReferralsTable } from "./referrals-table";
import { UsersTable } from "./users-table";

export default async function AdminPage() {
  const referredUsers = alias(usersTable, "referred_users");

  const users = await db
    .select()
    .from(usersTable)
    .orderBy(asc(usersTable.isApproved));

  const collabRows = await db
    .select({
      id: collaborationsTable.id,
      status: collaborationsTable.status,
      bio: collaborationsTable.bio,
      pieceType: collaborationsTable.pieceType,
      songTitle: collaborationsTable.songTitle,
      bandName: collaborationsTable.bandName,
      videoUrl: collaborationsTable.videoUrl,
      coverPhotoUrl: collaborationsTable.coverPhotoUrl,
      upcomingNews: collaborationsTable.upcomingNews,
      adminNotes: collaborationsTable.adminNotes,
      createdAt: collaborationsTable.createdAt,
      artistName: usersTable.artistName,
      username: usersTable.username,
    })
    .from(collaborationsTable)
    .innerJoin(usersTable, eq(collaborationsTable.userId, usersTable.id))
    .orderBy(desc(collaborationsTable.createdAt));

  const referrals = await db
    .select({
      id: referralsTable.id,
      completedAt: referralsTable.completedAt,
      referrerUsername: usersTable.username,
      referrerArtistName: usersTable.artistName,
      referrerEmail: usersTable.email,
      referredUsername: referredUsers.username,
      referredArtistName: referredUsers.artistName,
      referredEmail: referredUsers.email,
    })
    .from(referralsTable)
    .innerJoin(usersTable, eq(referralsTable.referrerId, usersTable.id))
    .innerJoin(
      referredUsers,
      eq(referralsTable.referredUserId, referredUsers.id),
    )
    .orderBy(desc(referralsTable.completedAt));

  return (
    <section className="min-h-screen bg-[radial-gradient(circle_at_top,_hsl(var(--secondary))_0%,_transparent_45%),linear-gradient(to_bottom,_hsl(var(--background)),_hsl(var(--muted)/0.35))]">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <Card className="overflow-hidden border-border/70 bg-background/95 shadow-sm">
          <CardHeader className="border-b border-border/60 bg-[linear-gradient(135deg,_hsl(var(--background))_0%,_hsl(var(--secondary)/0.35)_100%)] pb-8">
            <Badge variant="secondary" className="w-fit gap-2">
              <ShieldIcon className="h-3.5 w-3.5" />
              Admin panel
            </Badge>
            <CardTitle className="text-3xl">All Users</CardTitle>
            <CardDescription className="max-w-2xl text-base">
              Manage user approvals and review profiles across the directory.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            {users.length === 0 ? (
              <p className="text-muted-foreground">No users found.</p>
            ) : (
              <UsersTable users={users} />
            )}
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-border/70 bg-background/95 shadow-sm">
          <CardHeader className="border-b border-border/60 bg-[linear-gradient(135deg,_hsl(var(--background))_0%,_hsl(var(--secondary)/0.35)_100%)] pb-8">
            <Badge variant="secondary" className="w-fit gap-2">
              <UserPlusIcon className="h-3.5 w-3.5" />
              Referrals
            </Badge>
            <CardTitle className="text-3xl">Referral Tracking</CardTitle>
            <CardDescription className="max-w-2xl text-base">
              {referrals.length} completed{" "}
              {referrals.length === 1 ? "referral" : "referrals"}. A referral
              is completed when the invited member finishes onboarding.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <ReferralsTable referrals={referrals} />
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-border/70 bg-background/95 shadow-sm">
          <CardHeader className="border-b border-border/60 bg-[linear-gradient(135deg,_hsl(var(--background))_0%,_hsl(var(--secondary)/0.35)_100%)] pb-8">
            <Badge variant="secondary" className="w-fit gap-2">
              <HandshakeIcon className="h-3.5 w-3.5" />
              Collaborations
            </Badge>
            <CardTitle className="text-3xl">Collab Submissions</CardTitle>
            <CardDescription className="max-w-2xl text-base">
              Review and manage collaboration applications from artists.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <CollabTable collabs={collabRows} />
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-border/70 bg-background/95 shadow-sm">
          <CardHeader className="border-b border-border/60 bg-[linear-gradient(135deg,_hsl(var(--background))_0%,_hsl(var(--secondary)/0.35)_100%)] pb-8">
            <Badge variant="secondary" className="w-fit gap-2">
              <TrophyIcon className="h-3.5 w-3.5" />
              Challenges
            </Badge>
            <CardTitle className="text-3xl">Challenge Management</CardTitle>
            <CardDescription className="max-w-2xl text-base">
              Create and manage challenges for the community.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <Link href="/admin/challenges">
              <Button>Manage Challenges</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-border/70 bg-background/95 shadow-sm">
          <CardHeader className="border-b border-border/60 bg-[linear-gradient(135deg,_hsl(var(--background))_0%,_hsl(var(--secondary)/0.35)_100%)] pb-8">
            <Badge variant="secondary" className="w-fit gap-2">
              <EnvelopeIcon className="h-3.5 w-3.5" />
              Waitlist
            </Badge>
            <CardTitle className="text-3xl">Waitlist Management</CardTitle>
            <CardDescription className="max-w-2xl text-base">
              Send invitations and track waitlist signups.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <Link href="/admin/waitlist">
              <Button>Manage Waitlist</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
