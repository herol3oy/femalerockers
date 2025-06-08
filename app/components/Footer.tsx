import Link from 'next/link'

const currentYear = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="mt-32 border-t border-zinc-700 bg-zinc-900 text-slate-200">
      <section className="mx-auto max-w-screen-xl px-6 py-12 sm:px-8 lg:px-12">
        <h3 className="text-xl font-bold uppercase tracking-widest text-red-300 mb-4">
          Female Rockers
        </h3>
        <p className="mb-4 text-sm leading-relaxed text-slate-300">
          Our mission is to spread the word for talented musicians and give them
          a stance where they can professionally present their portfolio.
        </p>

        <small className="block text-xs text-zinc-400 mt-4">
          <Link
            className="underline hover:text-red-400 transition-colors"
            href="/page/privacy-policy-for-female-rockers-blog"
          >
            Privacy Policy
          </Link>
          {` `}and{` `}
          <Link
            className="underline hover:text-red-400 transition-colors"
            href="/page/terms-and-conditions"
          >
            Terms
          </Link>{' '}
          © 2020 - {currentYear}
        </small>
      </section>
    </footer>
  )
}
