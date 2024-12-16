import HeroCarousel from '@/components/HeroCarousel'
import InterviewCard from '@/components/InterviewCard'
import { getInterviews } from '@/sanity/sanity-utils'

export default async function Home() {
  const interviews = await getInterviews()

  return (
    <>
      <HeroCarousel />
      <div className="grid w-full grid-cols-2 gap-5 md:grid-cols-4 lg:grid-cols-6">
        {interviews.map((interview) => (
          <InterviewCard interview={interview} key={interview._id} />
        ))}
      </div>
    </>
  )
}
