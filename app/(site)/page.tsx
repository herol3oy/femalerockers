import HeroCarousel from '../components/HeroCarousel'
import InterviewCard from '../components/InterviewCard'
import { getInterviews } from '@/sanity/sanity-utils'
import { New_Rocker } from 'next/font/google'

const newRocker = New_Rocker({ subsets: ['latin'], weight: '400' })

export default async function Home() {
  const interviews = await getInterviews()

  return (
    <>
      <HeroCarousel />

      <main className="px-4 sm:px-6 lg:px-12 max-w-screen-xl mx-auto">
        <h1
          className={`w-full mt-16 mb-12 lg:my-24 text-center text-3xl lg:text-6xl font-normal tracking-wide text-slate-50 shadow-sm ${newRocker.className}`}
        >
          <span className="block leading-tight">
            Future Sensations in Rock
            <br /> Exclusive Interviews
          </span>
        </h1>

        <div className="grid grid-cols-2 gap-5 md:grid-cols-4 lg:grid-cols-6">
          {interviews.map((interview) => (
            <div
              key={interview._id}
              className="transform transition duration-300 hover:scale-105 hover:shadow-lg"
            >
              <InterviewCard interview={interview} />
            </div>
          ))}
        </div>
      </main>
    </>
  )
}
