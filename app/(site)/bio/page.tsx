import Link from 'next/link'

import { getBioUrls } from '@/sanity/sanity-utils'

export default async function BioPage() {
  const [bioUrls] = await getBioUrls()
  const urls = bioUrls.urls

  return (
    <div className="flex flex-col gap-5">
      <p className="secondary-light-color text-center font-extralight tracking-widest">
        @female_rockers
      </p>
      {urls.map(({ url, title }) => (
        <Link
          className="hover:secondary-light-color primary-light-color w-full rounded-lg border border-red-700 p-5 transition-all duration-300 ease-in-out hover:bg-red-700"
          href={url}
          target="_blank"
          key={url}
        >
          <div className="flex">
            <span>{title.slice(0, 2)}</span>
            <span className="mx-auto text-center text-sm font-bold md:text-xl">
              {title.slice(2)}
            </span>
          </div>
        </Link>
      ))}
    </div>
  )
}
