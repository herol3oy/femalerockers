import Link from 'next/link'
import { getBioUrls } from '@/sanity/sanity-utils'

export default async function BioPage() {
  const [bioUrls] = await getBioUrls()
  const urls = bioUrls?.urls || []

  return (
    <div className="mx-auto mt-16 flex max-w-xl flex-col items-center px-6">
      <p className="mb-10 text-center text-sm font-light tracking-[0.3em] text-slate-400">
        @female_rockers
      </p>

      <div className="flex w-full flex-col gap-4">
        {urls.map(({ url, title }) => (
          <Link
            key={url}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="group w-full rounded-lg border border-red-700 bg-zinc-900 p-5 text-center text-white transition-all duration-300 hover:-translate-y-1 hover:bg-red-700 hover:shadow-lg hover:shadow-red-700/30"
          >
            <span className="text-base font-semibold tracking-wide md:text-lg">
              {title}
            </span>
          </Link>
        ))}
      </div>

      <p className="mt-12 text-xs text-zinc-500">Powered by Female Rockers</p>
    </div>
  )
}
