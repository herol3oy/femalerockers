import {
  CheckCircleIcon,
  ClockIcon,
  HandshakeIcon,
  XCircleIcon,
} from "@phosphor-icons/react/ssr";
import { desc, eq } from "drizzle-orm";
import Image from "next/image";
import Link from "next/link";

import { db } from "@/app/db";
import { collaborationsTable } from "@/app/db/schema";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";
import { WithdrawButton } from "./withdraw-button";

export default async function CollabPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Layout gate ensures user is authenticated and approved, but guard anyway
  if (!user) return null;

  // Fetch all collaboration submissions
  const collabs = await db
    .select()
    .from(collaborationsTable)
    .where(eq(collaborationsTable.userId, user.id))
    .orderBy(desc(collaborationsTable.createdAt));

  const latestCollab = collabs[0] ?? null;
  const isPending = latestCollab?.status === "pending";
  const pastCollabs = isPending ? collabs.slice(1) : collabs;
  const canSubmit = !isPending;

  return (
    <section className="min-h-screen bg-[radial-gradient(circle_at_top,_hsl(var(--secondary))_0%,_transparent_45%),linear-gradient(to_bottom,_hsl(var(--background)),_hsl(var(--muted)/0.35))]">
      <div className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <Card className="overflow-hidden border-border/70 bg-background/95 shadow-sm">
          <CardHeader className="border-b border-border/60 bg-[linear-gradient(135deg,_hsl(var(--background))_0%,_hsl(var(--secondary)/0.35)_100%)] pb-8">
            <Badge variant="secondary" className="w-fit gap-2">
              <HandshakeIcon className="h-3.5 w-3.5" />
              Collaboration
            </Badge>
            <CardTitle className="text-3xl">Apply for a Collab</CardTitle>
            <CardDescription className="max-w-2xl text-base">
              Submit your performance reel to be featured on our Instagram,
              YouTube, and TikTok. We&apos;ll craft the caption — you bring the
              music.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            {isPending ? (
              <SubmissionStatus collab={latestCollab} />
            ) : (
              <div className="flex flex-col gap-6">
                {latestCollab?.status === "approved" && <ApprovalNotice />}
                {latestCollab?.status === "rejected" && (
                  <RejectionNotice adminNotes={latestCollab.adminNotes} />
                )}
                {canSubmit && (
                  <Button asChild size="lg">
                    <Link href="/collab/submit">Submit New Application</Link>
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {pastCollabs.length > 0 && (
          <Card className="overflow-hidden border-border/70 bg-background/95 shadow-sm">
            <CardHeader className="border-b border-border/60 pb-4">
              <CardTitle className="text-xl">Submission History</CardTitle>
              <CardDescription>
                Your past collaboration submissions.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4 flex flex-col gap-4">
              {pastCollabs.map((collab) => (
                <HistoryItem key={collab.id} collab={collab} />
              ))}
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
}

function SubmissionStatus({
  collab,
}: {
  collab: {
    id: string;
    status: string;
    songTitle: string;
    pieceType: string;
    bandName: string | null;
    videoUrl: string;
    coverPhotoUrl: string | null;
    bio: string;
    upcomingNews: string | null;
    createdAt: Date;
  };
}) {
  const isPending = collab.status === "pending";

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        {isPending ? (
          <ClockIcon className="h-6 w-6 text-yellow-500" />
        ) : (
          <CheckCircleIcon className="h-6 w-6 text-green-500" />
        )}
        <div>
          <h3 className="font-semibold text-lg">
            {isPending ? "Submission Under Review" : "Submission Approved"}
          </h3>
          <p className="text-sm text-muted-foreground">
            {isPending
              ? "Your collaboration application is being reviewed by our team."
              : "Congratulations! Your submission has been approved."}
          </p>
        </div>
      </div>

      <div className="rounded-lg border border-border/60 p-4 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h4 className="font-medium">{collab.songTitle}</h4>
          <Badge variant={isPending ? "secondary" : "default"}>
            {isPending ? "Pending" : "Approved"}
          </Badge>
        </div>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <span className="text-muted-foreground">Type:</span>{" "}
            {collab.pieceType === "cover" ? "Cover" : "Original"}
          </div>
          {collab.bandName && (
            <div>
              <span className="text-muted-foreground">Band:</span>{" "}
              {collab.bandName}
            </div>
          )}
          <div className="col-span-2">
            <span className="text-muted-foreground">Video:</span>{" "}
            <a
              href={collab.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-primary/30 underline-offset-4 hover:decoration-primary break-all"
            >
              {collab.videoUrl}
            </a>
          </div>
        </div>
        {collab.coverPhotoUrl && (
          <div>
            <span className="text-sm text-muted-foreground">Cover Photo:</span>
            <Image
              src={collab.coverPhotoUrl}
              alt="Cover photo"
              width={120}
              height={180}
              className="mt-2 h-45 w-30 rounded-lg object-cover"
            />
          </div>
        )}
        {collab.upcomingNews && (
          <div>
            <span className="text-sm text-muted-foreground">
              Upcoming News:
            </span>
            <p className="text-sm mt-1">{collab.upcomingNews}</p>
          </div>
        )}
        <div className="text-xs text-muted-foreground">
          Submitted{" "}
          {collab.createdAt.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </div>
      </div>

      {isPending && <WithdrawButton collabId={collab.id} />}
    </div>
  );
}

function RejectionNotice({ adminNotes }: { adminNotes: string | null }) {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-destructive/30 bg-destructive/5 p-4">
      <XCircleIcon className="h-6 w-6 text-destructive shrink-0 mt-0.5" />
      <div>
        <h3 className="font-semibold">Previous Submission Declined</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Your previous submission was not accepted. You&apos;re welcome to
          submit a new one.
        </p>
        {adminNotes && (
          <p className="text-sm mt-2 italic">&ldquo;{adminNotes}&rdquo;</p>
        )}
      </div>
    </div>
  );
}

function ApprovalNotice() {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-green-500/30 bg-green-500/5 p-4">
      <CheckCircleIcon className="h-6 w-6 text-green-500 shrink-0 mt-0.5" />
      <div>
        <h3 className="font-semibold">Previous Submission Approved</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Congratulations! Your last submission was approved. Feel free to
          submit a new one.
        </p>
      </div>
    </div>
  );
}

function HistoryItem({
  collab,
}: {
  collab: {
    id: string;
    status: string;
    songTitle: string;
    pieceType: string;
    bandName: string | null;
    adminNotes: string | null;
    createdAt: Date;
  };
}) {
  const statusConfig = {
    approved: {
      icon: CheckCircleIcon,
      color: "text-green-500",
      label: "Approved",
      variant: "default" as const,
    },
    rejected: {
      icon: XCircleIcon,
      color: "text-destructive",
      label: "Rejected",
      variant: "destructive" as const,
    },
    pending: {
      icon: ClockIcon,
      color: "text-yellow-500",
      label: "Pending",
      variant: "secondary" as const,
    },
  };

  const config =
    statusConfig[collab.status as keyof typeof statusConfig] ??
    statusConfig.pending;
  const Icon = config.icon;

  return (
    <div className="rounded-lg border border-border/60 p-4 flex items-center gap-4">
      <Icon className={`h-5 w-5 shrink-0 ${config.color}`} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-medium truncate">{collab.songTitle}</span>
          <Badge variant={config.variant} className="shrink-0 text-xs">
            {config.label}
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground mt-0.5">
          {collab.pieceType === "cover" ? "Cover" : "Original"}
          {collab.bandName && ` · ${collab.bandName}`}
          {" · "}
          {collab.createdAt.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </p>
        {collab.status === "rejected" && collab.adminNotes && (
          <p className="text-xs text-muted-foreground mt-1 italic">
            &ldquo;{collab.adminNotes}&rdquo;
          </p>
        )}
      </div>
    </div>
  );
}
