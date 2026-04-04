import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import {
  ArrowLeftIcon,
  ArrowUpRightIcon,
  CheckCircleIcon,
  GlobeIcon,
  MapPinIcon,
  PlayCircleIcon,
  SparkleIcon,
  UsersIcon,
} from '@phosphor-icons/react/ssr'

import {
  discoverUserSelect,
  formatJoinedDate,
  getInitials,
  type DiscoverUser,
} from '@/app/discover/discover-data'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { createClient } from '@/lib/supabase/server'

type DiscoverProfilePageProps = {
  params: Promise<{
    username: string
  }>
}

function DiscoverProfileSkeleton() {
  return (
    <section className="min-h-screen bg-[radial-gradient(circle_at_top,_hsl(var(--secondary))_0%,_transparent_45%),linear-gradient(to_bottom,_hsl(var(--background)),_hsl(var(--muted)/0.35))]">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="h-10 w-40 animate-pulse rounded-full bg-muted" />
          <div className="h-8 w-32 animate-pulse rounded-full bg-muted" />
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.35fr)_320px] lg:items-start">
          <Card className="overflow-hidden border-border/70 bg-background/95 shadow-sm">
            <CardHeader className="gap-6 border-b border-border/60 pb-8 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex items-start gap-5">
                <div className="h-20 w-20 animate-pulse rounded-3xl bg-muted" />
                <div className="space-y-3">
                  <div className="h-10 w-56 animate-pulse rounded-xl bg-muted" />
                  <div className="h-5 w-32 animate-pulse rounded-lg bg-muted" />
                  <div className="flex flex-wrap gap-2">
                    <div className="h-6 w-24 animate-pulse rounded-full bg-muted" />
                    <div className="h-6 w-28 animate-pulse rounded-full bg-muted" />
                    <div className="h-6 w-32 animate-pulse rounded-full bg-muted" />
                  </div>
                </div>
              </div>

              <div className="h-28 w-full animate-pulse rounded-2xl bg-muted sm:w-56" />
            </CardHeader>

            <CardContent className="grid gap-6 pt-6 lg:grid-cols-[minmax(0,1fr)_240px]">
              <div className="space-y-4">
                <div className="h-6 w-20 animate-pulse rounded-lg bg-muted" />
                <div className="h-4 w-full animate-pulse rounded-lg bg-muted" />
                <div className="h-4 w-11/12 animate-pulse rounded-lg bg-muted" />
                <div className="h-4 w-4/5 animate-pulse rounded-lg bg-muted" />
                <div className="flex gap-3 pt-2">
                  <div className="h-10 w-32 animate-pulse rounded-full bg-muted" />
                  <div className="h-10 w-32 animate-pulse rounded-full bg-muted" />
                </div>
              </div>

              <Card className="border-border/60 bg-muted/25 shadow-none">
                <CardHeader className="pb-3">
                  <div className="h-5 w-28 animate-pulse rounded-lg bg-muted" />
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="h-12 animate-pulse rounded-xl bg-muted" />
                  <div className="h-12 animate-pulse rounded-xl bg-muted" />
                </CardContent>
              </Card>
            </CardContent>
          </Card>

          <Card className="border-border/70 bg-background/90 shadow-sm">
            <CardHeader>
              <div className="h-4 w-24 animate-pulse rounded-lg bg-muted" />
              <div className="h-8 w-48 animate-pulse rounded-xl bg-muted" />
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="h-4 w-full animate-pulse rounded-lg bg-muted" />
              <div className="h-4 w-5/6 animate-pulse rounded-lg bg-muted" />
              <div className="h-10 w-full animate-pulse rounded-full bg-muted" />
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

async function DiscoverProfileContent({ params }: DiscoverProfilePageProps) {
  const { username } = await params
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('users_table')
    .select(discoverUserSelect)
    .eq('username', decodeURIComponent(username))
    .eq('is_approved', true)
    .maybeSingle()

  if (error || !data) {
    notFound()
  }

  const user = data as DiscoverUser
  const displayName = user.artist_name || user.username
  const hasExternalLinks = Boolean(user.instagram_url || user.video_link)

  return (
    <section className="min-h-screen bg-[radial-gradient(circle_at_top,_hsl(var(--secondary))_0%,_transparent_45%),linear-gradient(to_bottom,_hsl(var(--background)),_hsl(var(--muted)/0.35))]">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Button asChild variant="outline" className="w-fit rounded-full">
            <Link href="/discover">
              <ArrowLeftIcon className="h-4 w-4" />
              Back to discover
            </Link>
          </Button>
          <Badge variant="secondary" className="w-fit gap-2 rounded-full px-3 py-1 text-xs uppercase tracking-[0.24em]">
            <SparkleIcon className="h-3.5 w-3.5" />
            Artist profile
          </Badge>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.35fr)_320px] lg:items-start">
          <Card className="overflow-hidden border-border/70 bg-background/95 shadow-sm">
            <CardHeader className="gap-6 border-b border-border/60 bg-[linear-gradient(135deg,_hsl(var(--background))_0%,_hsl(var(--secondary)/0.35)_100%)] pb-8 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex items-start gap-5">
                {user.avatar_url ? (
                  <Image
                    src={user.avatar_url}
                    alt={displayName}
                    width={80}
                    height={80}
                    className="h-20 w-20 rounded-3xl object-cover shadow-sm"
                  />
                ) : (
                  <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-primary text-2xl font-semibold text-primary-foreground shadow-sm">
                    {getInitials(displayName)}
                  </div>
                )}
                <div className="space-y-3">
                  <div className="space-y-2">
                    <CardTitle className="text-3xl sm:text-4xl">{displayName}</CardTitle>
                    <CardDescription className="text-base">@{user.username}</CardDescription>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {user.main_instrument ? (
                      <Badge variant="secondary">{user.main_instrument}</Badge>
                    ) : null}
                    {user.genre ? <Badge variant="outline">{user.genre}</Badge> : null}
                    <Badge variant={user.collab_status ? 'default' : 'outline'}>
                      {user.collab_status ? 'Open to collab' : 'Profile live'}
                    </Badge>
                    <Badge variant="outline" className="gap-1.5">
                      <CheckCircleIcon className="h-3.5 w-3.5" />
                      Approved profile
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border bg-background/80 p-4 text-sm text-muted-foreground backdrop-blur sm:min-w-56">
                <p className="font-medium text-foreground">Member since</p>
                <p className="mt-2 text-lg font-semibold text-foreground">
                  {formatJoinedDate(user.created_at)}
                </p>
                <p className="mt-1">
                  {user.collab_status
                    ? 'Currently looking for new musical collaborations.'
                    : 'Visible in the directory and available to discover.'}
                </p>
              </div>
            </CardHeader>

            <CardContent className="grid gap-6 pt-6 lg:grid-cols-[minmax(0,1fr)_240px]">
              <div className="space-y-6">
                <div className="space-y-3">
                  <h2 className="text-lg font-semibold">About</h2>
                  <p className="text-sm leading-7 text-foreground/80 sm:text-base">
                    {user.bio ??
                      'This artist has not added a bio yet. Use the available links to hear more of their work and get a feel for their sound.'}
                  </p>
                </div>

                {hasExternalLinks ? (
                  <div className="flex flex-wrap gap-3">
                    {user.instagram_url ? (
                      <Button asChild variant="outline" className="rounded-full">
                        <a href={user.instagram_url} target="_blank" rel="noreferrer">
                          <GlobeIcon className="h-4 w-4" />
                          Instagram
                          <ArrowUpRightIcon className="h-4 w-4" />
                        </a>
                      </Button>
                    ) : null}
                    {user.video_link ? (
                      <Button asChild className="rounded-full">
                        <a href={user.video_link} target="_blank" rel="noreferrer">
                          <PlayCircleIcon className="h-4 w-4" />
                          Watch clip
                        </a>
                      </Button>
                    ) : null}
                  </div>
                ) : (
                  <div className="rounded-2xl border border-dashed bg-muted/30 p-4 text-sm text-muted-foreground">
                    No public links have been added yet.
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <Card className="border-border/60 bg-muted/25 shadow-none">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Profile details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 text-sm text-muted-foreground">
                    {user.city_country ? (
                      <div className="flex items-start gap-3">
                        <MapPinIcon className="mt-0.5 h-4 w-4 text-foreground" />
                        <div>
                          <p className="font-medium text-foreground">Location</p>
                          <p>{user.city_country}</p>
                        </div>
                      </div>
                    ) : null}
                    <div className="flex items-start gap-3">
                      <UsersIcon className="mt-0.5 h-4 w-4 text-foreground" />
                      <div>
                        <p className="font-medium text-foreground">Collaboration status</p>
                        <p>
                          {user.collab_status
                            ? 'Open to new projects and active collaborations.'
                            : 'Listed in the directory for discovery.'}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/70 bg-background/90 shadow-sm">
            <CardHeader>
              <CardDescription>Explore more</CardDescription>
              <CardTitle className="text-2xl">Keep browsing the directory</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-muted-foreground">
              <p>
                Return to discover to keep scanning approved artists by instrument, genre, and collaboration status.
              </p>
              <Button asChild className="w-full rounded-full">
                <Link href="/discover">Browse more artists</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

export default function DiscoverProfilePage({ params }: DiscoverProfilePageProps) {
  return (
    <Suspense fallback={<DiscoverProfileSkeleton />}>
      <DiscoverProfileContent params={params} />
    </Suspense>
  )
}