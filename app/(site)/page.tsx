import { getInterviews } from '@/sanity/sanity-utils'
import { New_Rocker } from 'next/font/google'
import HeroCarouselLazy from '@/app/components/HeroCarouselLazy'
import InterviewCard from '@/app/components/InterviewCard'

const newRocker = New_Rocker({ subsets: ['latin'], weight: '400' })

export default async function Home() {
  const interviews = await getInterviews()

  return (
    <>
      <HeroCarouselLazy />

      <main className="px-4 sm:px-6 lg:px-12 max-w-screen-2xl mx-auto">
        <h1
          className={`text-center my-20 lg:my-28 text-4xl lg:text-6xl font-normal tracking-wide bg-linear-to-r from-pink-300 via-purple-400 to-blue-400 text-transparent bg-clip-text ${newRocker.className}`}
        >
          Future Sensations in Rock
          <br />
          <span className="text-lg lg:text-2xl text-slate-400 italic block mt-4 tracking-wider">
            Exclusive Interviews
          </span>
        </h1>

        <iframe
          className="mx-auto my-20 w-full max-w-3xl aspect-video rounded-xl ring-1 ring-white/10"
          src="https://youtube.com/embed/7-PXCq4VaUc?si=HFCLdhFHO5vPWa83"
          title="Female Rockers guitar shredders"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          loading="lazy"
        />

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {interviews.map((interview) => (
            <InterviewCard key={interview._id} interview={interview} />
          ))}
        </div>
      </main>
    </>
  )
}
