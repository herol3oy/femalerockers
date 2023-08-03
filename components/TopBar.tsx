import Image from 'next/image'
import Link from 'next/link'

export default function TopBar() {
  return (
    <nav className="my-10 flex w-full justify-center">
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
    </nav>
  )
}
