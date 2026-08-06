import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Female Rockers is an independent, feminist initiative to empower talented female musicians of rock and its subgenres.",
};

export default function AboutPage() {
  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-14 sm:px-8 sm:py-20">
      <header className="space-y-4">
        <h1 className="font-heading text-4xl font-semibold tracking-tight sm:text-5xl">About</h1>
        <p className="max-w-2xl text-base text-muted-foreground sm:text-lg">
          An independent project founded by art lovers, built to support women in rock with a
          platform that puts artists first.
        </p>
      </header>

      <section className="mt-10 space-y-6 text-base leading-relaxed">
        <p>
          Female Rockers is an independent project that kicked off in February 2020 for
          entertainment purposes only. But things got more serious with newly found directions,
          soon. Founded by a group of art lovers (musicians, painters, writers, graphic designers,
          programmers and rock n’ roll lovers), we realized that in the world of art, there are many
          fantastic artists that seldom get a chance to be seen due to the fact that there are lots
          of art dealers that impose immense financial demands for a new artist to emerge and be
          seen.
        </p>

        <p>
          We dug more into it and found out that there are a lot of areas in art suffering from this
          and as active members ourselves, we realized that many men and women artists who have been
          practicing their craft and instrument for years and years but not with much audience, are
          actually the victims of the “business of art”. Imagine a great unknown painter who never
          had a chance to be seen except for their friends who saw their works in their basement.
          Most art galleries charge a big amount of money only to represent this artist and then
          later mooch off a big percentage of the sales. That’s not fair. The representation should
          be an honor for the art gallery and the percentage should be fair only after successful
          sales. It’s just painful to see artists suffer like this.
        </p>

        <p>
          It’s not fair to charge an artist a dime. They’ve been spending years of effort and have
          spent so much money on classes, materials, and so on to be where they are today, and it’s
          not fair for magazines, channels, managers, labels, etc to charge them again for
          promotion.
        </p>

        <p>
          And if you’re a woman in rock ‘n roll, though it’s gotten much better, you may have extra
          difficulties to prove yourself as a legit musician. Our interviews with female musicians
          of rock clearly show this problem. Our project is a feministic initiative to empower
          talented female musicians of rock and all its subgenres (not pop, hip-hop, rap, trap, or
          other genres of music that have forced their way into rock, but more adhering to the
          classic rock style), regardless of their non-musical background, style or attire, and give
          them a platform where they can present their art for free (for independent musicians who
          are not signed or aren't being managed by an agency).
        </p>

        <p>
          We decided to be that platform, to gain a fan base of art enthusiasts and introduce all
          these artists to our followers via our channels, mainly this website, as well as other
          social media platforms. All the interviews, articles, and other promotional materials on
          this website have been collaborative without charging the artist. We do this because we
          love art and artists and because we have suffered similarly, one way or another, on this
          path. And we have decided to limit our monetizing plans only to visitors and other
          collaborating media, but never our musicians. Their job is to improve their art and to
          make great music and to be loyal to art, and we thank them for that. Without them, this
          project wouldn’t exist, and everyone should know that.
        </p>

        <div className="rounded-2xl border bg-muted/30 px-6 py-6">
          <p className="font-heading text-lg font-medium">May art be for art… and rock for all!</p>
          <p className="mt-4 text-sm text-muted-foreground">Female Rockers Team</p>
        </div>
      </section>
    </main>
  );
}
