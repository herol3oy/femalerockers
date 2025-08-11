import Image from 'next/image'
import Link from 'next/link'

const navItems = [
  { label: 'about', href: '/page/about' },
  { label: 'bio', href: '/bio' },
  { label: 'contact', href: '/page/contact' },
  { label: 'store', href: 'https://store.femalerockers.com' },
  { label: 'donate', href: '/donate' },
  {
    label: 'youtube',
    href: 'https://youtube.com/@FemaleRockers/',
    external: true,
    badge: '+1K',
  },
  {
    label: 'instagram',
    href: 'https://instagram.com/female_rockers/',
    external: true,
    badge: '+200K',
  },
]

export default function TopBar() {
  return (
    <nav className="my-10 flex w-full flex-col items-center justify-between gap-5 lg:flex-row">
      <Link className="group flex items-center gap-2" href="/">
        <Image
          className="w-16 cursor-pointer transition-all duration-300 ease-in-out group-hover:-rotate-[360deg] md:w-16"
          src="/icons/female-rockers-logo.svg"
          alt="Female Rockers logo"
          width={0}
          height={0}
          sizes="100vw"
        />
        <Image
          className="w-16 md:w-16"
          src="/icons/female-rockers-typography.svg"
          alt="Female Rockers logo"
          width={0}
          height={0}
          sizes="100vw"
        />
      </Link>

      <ul className="flex gap-3 md:gap-5 text-lg text-slate-50">
        {navItems.map((item) => (
          <li key={item.label}>
            <Link
              href={item.href}
              target={item.external ? '_blank' : undefined}
              className="relative text-sm font-bold transition hover:text-red-400 lg:text-lg"
            >
              {item.label}
              {item.badge && (
                <span className="absolute -top-3 -right-0 text-xs text-red-400">
                  {item.badge}
                </span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
