import { getInterviews } from '@/sanity/sanity-utils'
import { New_Rocker } from 'next/font/google'
import HeroCarousel from '@/app/components/HeroCarousel'
import InterviewCard from '@/app/components/InterviewCard'

const newRocker = New_Rocker({ subsets: ['latin'], weight: '400' })

export default async function Home() {
  const interviews = await getInterviews()

  return (
    <>
      <HeroCarousel />

      <main className="px-4 sm:px-6 lg:px-12 max-w-screen-xl mx-auto">
        <h1
          className={`text-center my-20 lg:my-28 text-4xl lg:text-6xl font-normal tracking-wide bg-linear-to-r from-pink-300 via-purple-400 to-blue-400 text-transparent bg-clip-text ${newRocker.className}`}
        >
          Future Sensations in Rock
          <br />
          <span className="text-lg lg:text-2xl text-slate-400 italic block mt-4 tracking-wider">
            Exclusive Interviews
          </span>
        </h1>

        <div className="grid grid-cols-2 gap-5 md:grid-cols-4 lg:grid-cols-6">
          {interviews.map((interview) => (
            <div
              key={interview._id}
              className="transform transition duration-300 hover:scale-105 hover:shadow-sm"
            >
              <InterviewCard interview={interview} />
            </div>
          ))}
        </div>
      </main>
    </>
  )
}
