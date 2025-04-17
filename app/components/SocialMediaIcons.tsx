import Image from 'next/image'
import Link from 'next/link'

import { InterviewArticle } from '@/types/interview-article'
import { InterviewArticleWithDynamicFields } from '@/types/interview-article-with-dynamic-fields'
import { SocialMediaPlatforms } from '@/types/social-media-platforms'

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
