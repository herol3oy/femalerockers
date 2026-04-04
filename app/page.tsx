import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="relative h-screen w-full overflow-hidden">
      <video
        className="absolute inset-0 h-full w-full object-cover "
        src="/hero-video.webm"
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
      />

      <div
        className="absolute inset-0 bg-black/50"
        aria-hidden="true"
      />

      <section className="relative z-10 flex h-full items-end pb-24 px-8 md:px-16 lg:px-24">
        <div className="max-w-2xl space-y-6">
          <header>
            <h1 className="text-5xl font-extrabold leading-tight tracking-tight text-white md:text-6xl lg:text-7xl">
              Where Female Musicians Get Discovered
            </h1>
            <p className="text-lg text-white/80 md:text-xl">
              Create your profile, share your sound, and connect with a community
              that celebrates women who rock.
            </p>
          </header>

          <nav aria-label="Primary actions" className="flex gap-4 pt-2">
            <Button
              asChild
              size="lg"
              className="rounded-full bg-white text-black hover:bg-white/90 px-8 text-base font-semibold"
            >
              <Link href="/auth/sign-up">Get Started</Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full border-white text-white hover:bg-white/10 px-8 text-base font-semibold"
            >
              <Link href="/discover">Discover Artists</Link>
            </Button>
          </nav>
        </div>
      </section>
    </main>
  );
}