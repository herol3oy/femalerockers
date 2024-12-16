import Image from 'next/image'
import Link from 'next/link'

export default function TopBar() {
  return (
    <nav className="my-10 flex w-full flex-col items-center justify-between gap-5 lg:flex-row">
      <Link className="group flex items-center gap-2" href="/">
        <Image
          className="w-16 cursor-pointer transition-all duration-300 ease-in-out group-hover:-rotate-[360deg] md:w-24"
          src="/icons/female-rockers-logo.svg"
          alt="Female Rockers logo"
          width={0}
          height={0}
          sizes="100vw"
        />
        <Image
          className="w-16 md:w-24"
          src="/icons/female-rockers-typography.svg"
          alt="Female Rockers logo"
          width={0}
          height={0}
          sizes="100vw"
        />
      </Link>

      <h1 className="w-full text-center font-new-rocker text-3xl font-normal not-italic tracking-wide text-slate-50 shadow-sm lg:w-1/4">
        <span className="block lg:inline-block">
          Interviews Future Sensations in Rock Music
        </span>
      </h1>

      <ul className="flex gap-8 text-lg text-slate-50">
        <li>
          <Link
            className="text-sm font-bold transition hover:text-red-400 lg:text-lg"
            href="/page/about"
          >
            about
          </Link>
        </li>
        <li>
          <Link
            className="text-sm font-bold transition hover:text-red-400 lg:text-lg"
            href="/page/contact"
          >
            contact
          </Link>
        </li>
        <li>
          <Link
            className="text-sm font-bold transition hover:text-red-400 lg:text-lg"
            href="https://instagram.com/female_rockers/"
            target="_blank"
          >
            instagram
          </Link>
        </li>
      </ul>
    </nav>
  )
}
