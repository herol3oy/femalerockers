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

      <h1
        className={`w-full my-20 lg:my-28 text-center place-self-center text-4xl lg:text-6xl font-normal not-italic tracking-wide text-slate-50 shadow-sm lg:w-1/2 ${newRocker.className}`}
      >
        <span className="block lg:inline-block">
          Interviews Future Sensations in Rock Music
        </span>
      </h1>

      <div className="grid w-full grid-cols-2 gap-5 md:grid-cols-4 lg:grid-cols-6">
        {interviews.map((interview) => (
          <InterviewCard interview={interview} key={interview._id} />
        ))}
      </div>
    </>
  )
}
