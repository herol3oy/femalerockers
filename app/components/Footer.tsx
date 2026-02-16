import Link from 'next/link'
import { navItems } from '@/utils/nav-items'

const currentYear = new Date().getFullYear()

export default function Footer() {
  const explore = navItems.filter((item) =>
    ['about', 'bio', 'contact'].includes(item.label),
  )

  const support = navItems.filter((item) =>
    ['store', 'donate'].includes(item.label),
  )

  const social = navItems.filter((item) =>
    ['youtube', 'instagram'].includes(item.label),
  )

  return (
    <footer className="mt-24 border-t border-zinc-800 bg-zinc-950 text-slate-300">
      <div className="mx-auto max-w-screen-xl px-6 py-14 sm:px-8 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4 text-center lg:text-left">
            <h2 className="mb-4 text-lg font-bold uppercase tracking-widest text-red-400">
              Female Rockers
            </h2>
            <p className="text-sm leading-relaxed text-slate-400">
              Our mission is to spread the word for talented musicians and give
              them a platform where they can professionally present their
              portfolio.
            </p>
          </div>

          <div className="lg:col-span-2 text-center lg:text-left">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-200">
              Explore
            </h3>
            <ul className="space-y-2 text-sm">
              {explore.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="footer-link capitalize">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2 text-center lg:text-left">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-200">
              Support
            </h3>
            <ul className="space-y-2 text-sm">
              {support.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    target={item.external ? '_blank' : undefined}
                    className="footer-link capitalize"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2 text-center lg:text-left">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-200">
              Social
            </h3>
            <ul className="space-y-2 text-sm">
              {social.map((item) => (
                <li
                  key={item.label}
                  className="flex items-center justify-center gap-2 lg:justify-start"
                >
                  <Link
                    href={item.href}
                    target={item.external ? '_blank' : undefined}
                    className="footer-link capitalize"
                  >
                    {item.label}
                  </Link>

                  {item.badge && (
                    <span className="rounded-full bg-red-500/10 px-2 py-0.5 text-xs font-medium text-red-400">
                      {item.badge}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2 text-center lg:text-right">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-200">
              Legal
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/page/privacy-policy-for-female-rockers-blog"
                  className="footer-link"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/page/terms-and-conditions" className="footer-link">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-zinc-800 pt-6 text-center text-xs text-zinc-500 lg:text-left">
          © 2020 – {currentYear} Female Rockers. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
