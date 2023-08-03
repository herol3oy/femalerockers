import Image from 'next/image'
import Link from 'next/link'

import { InterviewArticle } from '@/types/interview-article'
type InterviewArticleWithDynamicFields = InterviewArticle & {
  [key: string]: string
}

enum SocialMediaPlatforms {
  Instagram = 'instagram',
  Spotify = 'spotify',
  Facebook = 'facebook',
  Twitter = 'twitter',
  Youtube = 'youtube',
  Website = 'website',
}

export default function SocialMediaIcons({
  interview,
}: {
  interview: InterviewArticle
}) {
  return (
    <div className="flex gap-4">
      {Object.values(SocialMediaPlatforms).map((platform) => {
        const socialMediaLink = (
          interview as InterviewArticleWithDynamicFields
        )[platform]
        return socialMediaLink ? (
          <Link
            className="transition-all duration-300 ease-in-out hover:-translate-y-1"
            href={socialMediaLink}
            target="_blank"
            key={platform}
          >
            <Image
              src={`/icons/${platform}.svg`}
              width={30}
              height={30}
              alt={`${platform} icon`}
            />
          </Link>
        ) : null
      })}
    </div>
  )
}
