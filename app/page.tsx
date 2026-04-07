import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  return (
    <main className="w-full">
      <section className="relative isolate overflow-hidden">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="/hero-video.webm"
          autoPlay
          loop
          muted
          playsInline
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-background"
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-16 pt-12 sm:px-8 sm:pb-20 sm:pt-16 lg:pb-28">
          <div className="max-w-2xl space-y-6">
            <Badge variant="secondary" className="bg-white/10 text-white ring-1 ring-white/15">
              Built for women who rock
            </Badge>
            <h1 className="font-heading text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Where Female Musicians Get Discovered.
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
              Create a standout artist profile, share your music, and connect with fans,
              collaborators.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button asChild size="lg">
                <Link href="/auth/sign-up">Create your profile</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/30 bg-white/5 text-white hover:bg-white/10"
              >
                <Link href="/discover">Browse artists</Link>
              </Button>
            </div>

            <dl className="grid max-w-xl grid-cols-3 gap-4 pt-6 text-white">
              <div className="rounded-2xl bg-white/5 px-4 py-3 ring-1 ring-white/10 backdrop-blur">
                <dt className="text-xs text-white/70">Profiles</dt>
                <dd className="font-heading text-lg font-semibold">Beautiful</dd>
              </div>
              <div className="rounded-2xl bg-white/5 px-4 py-3 ring-1 ring-white/10 backdrop-blur">
                <dt className="text-xs text-white/70">Discovery</dt>
                <dd className="font-heading text-lg font-semibold">Curated</dd>
              </div>
              <div className="rounded-2xl bg-white/5 px-4 py-3 ring-1 ring-white/10 backdrop-blur">
                <dt className="text-xs text-white/70">Community</dt>
                <dd className="font-heading text-lg font-semibold">Supportive</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-16 sm:px-8 sm:py-20">
        <div className="flex flex-col gap-3">
          <Badge variant="outline" className="w-fit">
            Why Female Rockers
          </Badge>
          <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            Everything you need to show up like a headliner
          </h2>
          <p className="max-w-2xl text-muted-foreground">
            A fast, modern home for your artist identity—built to help you be found and
            remembered.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Press-kit ready profiles</CardTitle>
              <CardDescription>
                Links, photos, embeds, and highlights in one clean page you can share.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              Add your genre tags, location, availability, and a short story that actually
              sounds like you.
            </CardContent>
            <CardFooter className="border-t">
              <Button asChild variant="link" className="px-0">
                <Link href="/auth/sign-up">Build yours</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Discovery that feels human</CardTitle>
              <CardDescription>
                Explore artists by genre, vibe, and city—without the noise.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              Find collaborators, openers, and new favorites with curated browsing and
              spotlighted creators.
            </CardContent>
            <CardFooter className="border-t">
              <Button asChild variant="link" className="px-0">
                <Link href="/discover">Start discovering</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Community, not competition</CardTitle>
              <CardDescription>
                Connect with people who support women musicians—on and off stage.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              Follow artists, share releases, and build momentum together.
            </CardContent>
            <CardFooter className="border-t">
              <Button asChild variant="link" className="px-0">
                <Link href="/auth/sign-up">Join the community</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>

      <section className="border-y bg-muted/30">
        <div className="mx-auto w-full max-w-6xl px-6 py-16 sm:px-8 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div className="space-y-4">
              <Badge variant="secondary" className="w-fit">
                How it works
              </Badge>
              <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
                From profile to playbook in minutes
              </h2>
              <p className="text-muted-foreground">
                Set up once, then share everywhere—venues, collaborators, playlists, and
                fans.
              </p>
            </div>

            <ol className="grid gap-4">
              {[
                {
                  title: "Create your profile",
                  body: "Add photos, bio, links, and embeds. Make it yours—no templates that flatten your style.",
                },
                {
                  title: "Share your sound",
                  body: "Post releases and highlights so people can understand your vibe in seconds.",
                },
                {
                  title: "Get discovered",
                  body: "Show up in discovery and spotlights. Connect with a community that amplifies women in music.",
                },
              ].map((step, idx) => (
                <li
                  key={step.title}
                  className="rounded-2xl bg-background px-5 py-5 ring-1 ring-foreground/10"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                      <span className="font-heading text-sm font-semibold">
                        {idx + 1}
                      </span>
                    </div>
                    <div className="space-y-1">
                      <p className="font-heading text-base font-medium">{step.title}</p>
                      <p className="text-sm text-muted-foreground">{step.body}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-16 sm:px-8 sm:py-20">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="space-y-3">
            <Badge variant="outline" className="w-fit">
              Explore
            </Badge>
            <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
              Find your next favorite artist
            </h2>
            <p className="max-w-2xl text-muted-foreground">
              Browse by genre, mood, or location—then follow and share what moves you.
            </p>
          </div>
          <Button asChild variant="outline">
            <Link href="/discover">Open discovery</Link>
          </Button>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { title: "Indie rock", desc: "Raw, clever, unforgettable hooks" },
            { title: "Punk", desc: "Fast, loud, fearless energy" },
            { title: "Metal", desc: "Heavy tones and sharper edges" },
            { title: "Alt / grunge", desc: "Dirty riffs and big feelings" },
          ].map((item) => (
            <Card key={item.title} size="sm" className="bg-card">
              <CardHeader className="gap-1">
                <CardTitle className="text-sm">{item.title}</CardTitle>
                <CardDescription className="text-xs">{item.desc}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <section className="border-t">
        <div className="mx-auto w-full max-w-6xl px-6 py-16 sm:px-8 sm:py-20">
          <div className="rounded-3xl bg-primary px-6 py-12 text-primary-foreground sm:px-10 sm:py-14">
            <div className="grid items-center gap-8 md:grid-cols-[1fr_auto]">
              <div className="space-y-3">
                <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
                  Ready to be discovered?
                </h2>
                <p className="max-w-2xl text-primary-foreground/80">
                  Join Female Rockers and publish a profile you’ll be proud to share.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" variant="secondary">
                  <Link href="/auth/sign-up">Create your profile</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="ghost"
                  className="text-primary-foreground hover:bg-white/10 hover:text-primary-foreground"
                >
                  <Link href="/discover">Discover artists</Link>
                </Button>
              </div>
            </div>
          </div>

          <footer className="mt-10 flex flex-col gap-3 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <p>© Female Rockers</p>
            <div className="flex gap-4">
              <Link className="hover:text-foreground" href="/discover">
                Discover
              </Link>
              <Link className="hover:text-foreground" href="/auth/sign-up">
                Get started
              </Link>
            </div>
          </footer>
        </div>
      </section>
    </main>
  );
}
