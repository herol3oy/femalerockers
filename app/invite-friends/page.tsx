import {
  LinkIcon,
  ShareNetworkIcon,
  UserPlusIcon,
  UsersThreeIcon,
} from "@phosphor-icons/react/ssr";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { db } from "@/app/db";
import { usersTable } from "@/app/db/schema";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";
import { CopyReferralLink } from "./copy-referral-link";

const steps = [
  {
    title: "Share your referral link",
    description: "Send your unique link to a friend you would like to invite.",
    icon: ShareNetworkIcon,
  },
  {
    title: "Your friend joins Female Rockers",
    description: "They create an account and complete their member profile.",
    icon: UserPlusIcon,
  },
  {
    title: "Contact Female Rockers for verification",
    description: "Get in touch with us after your friend has joined.",
    icon: UsersThreeIcon,
  },
];

async function InviteFriendsContent() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const [member] = await db
    .select({
      referralCode: usersTable.referralCode,
    })
    .from(usersTable)
    .where(eq(usersTable.id, user.id))
    .limit(1);

  if (!member) {
    redirect("/onboarding");
  }

  const siteUrl = (
    process.env.NEXT_PUBLIC_SITE_URL || "https://femalerockers.com"
  ).replace(/\/+$/, "");
  const referralUrl = `${siteUrl}/auth/sign-up?ref=${encodeURIComponent(member.referralCode)}`;

  return (
    <section className="min-h-screen bg-[radial-gradient(circle_at_top,_hsl(var(--secondary))_0%,_transparent_45%),linear-gradient(to_bottom,_hsl(var(--background)),_hsl(var(--muted)/0.35))]">
      <div className="mx-auto flex max-w-4xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <Card className="overflow-hidden border-border/70 bg-background/95 shadow-sm">
          <CardHeader className="gap-4 border-b border-border/60 bg-[linear-gradient(135deg,_hsl(var(--background))_0%,_hsl(var(--secondary)/0.35)_100%)] pb-8">
            <Badge variant="secondary" className="w-fit gap-2">
              <LinkIcon className="h-3.5 w-3.5" />
              Your unique invite
            </Badge>
            <div className="space-y-2">
              <CardTitle className="text-3xl sm:text-4xl">
                Invite friends
              </CardTitle>
              <CardDescription className="max-w-2xl text-base leading-7">
                Invite friends to join the Female Rockers community and help us
                grow a trusted network of women in music.
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-8 pt-6">
            <CopyReferralLink referralUrl={referralUrl} />

            <div className="grid gap-4 md:grid-cols-3">
              {steps.map((step, index) => {
                const Icon = step.icon;

                return (
                  <div
                    key={step.title}
                    className="rounded-2xl border border-border/60 bg-muted/20 p-5"
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="font-heading text-2xl font-semibold text-muted-foreground/60">
                        {index + 1}
                      </span>
                    </div>
                    <h2 className="font-semibold">{step.title}</h2>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

export default function InviteFriendsPage() {
  return (
    <Suspense
      fallback={
        <section className="min-h-screen">
          <div className="mx-auto max-w-4xl px-4 py-12 text-muted-foreground">
            Loading your invite…
          </div>
        </section>
      }
    >
      <InviteFriendsContent />
    </Suspense>
  );
}
