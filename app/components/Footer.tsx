import Link from 'next/link'

const currentYear = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="secondary-light-color my-20">
      <section>
        <h3 className="w-full pb-1 text-xl font-bold uppercase">
          Female Rockers
        </h3>
        <hr className="mb-5 mt-1 border border-l-0 border-r-0 border-t-0 border-b-zinc-100 " />
        <p className="mb-1 text-sm">
          Our mission is to spread the word for talented musicians and give them
          a stance where they can professionally present their portfolio
        </p>
        <small className="rounded-sm bg-zinc-800 p-1">
          <Link
            className="underline transition hover:text-red-400"
            href="/page/privacy-policy-for-female-rockers-blog"
          >
            Privacy Policy
          </Link>
          {` `} and {` `}
          <Link
            className="underline transition hover:text-red-400"
            href="/page/terms-and-conditions"
          >
            Terms
          </Link>{' '}
          {` `}© 2020 - {currentYear}
        </small>
      </section>
    </footer>
  )
}
