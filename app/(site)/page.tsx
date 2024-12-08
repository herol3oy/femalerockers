import HeroCarousel from '@/components/HeroCarousel'
import InterviewCard from '@/components/InterviewCard'
import { getInterviews } from '@/sanity/sanity-utils'

export default async function Home() {
  const interviews = await getInterviews()

  return (
    <>
      <h1 className="lg:my-18 m-auto my-12 w-full p-2 text-center font-new-rocker text-4xl font-normal not-italic tracking-wide text-slate-50 shadow-sm md:w-2/3 md:text-4xl lg:text-6xl">
        <span className="mb-2 block px-2 md:inline">•</span>
        <span className="block lg:inline-block">
          Interviews Future Sensations in Rock Music
        </span>
        <span className="mt-2 block px-2 md:inline">•</span>
      </h1>

      <HeroCarousel />

      <div className="grid w-full grid-cols-2 gap-5 md:grid-cols-4 lg:grid-cols-6">
        {interviews.map((interview) => (
          <InterviewCard interview={interview} key={interview._id} />
        ))}
      </div>
    </>
  )
}
