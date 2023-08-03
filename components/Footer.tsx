import Link from 'next/link'
import React from 'react'

const currentYear = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="secondary-light-color my-20 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
      {FOOTER_SECTIONS.map((section) => (
        <section key={section.title}>
          <h3 className="w-full border border-l-0 border-r-0 border-t-0 border-b-zinc-100 pb-1 text-xl font-bold uppercase">
            {section.title}
          </h3>
          {section.content}
        </section>
      ))}
    </footer>
  )
}

const FOOTER_SECTIONS = [
  {
    title: 'Female Rockers',
    content: (
      <>
        <p className="mt-2 text-sm">
          Our mission is to spread the word for talented musicians and give them
          a stance where they can professionally present their portfolio
          <br />
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
        </p>
      </>
    ),
  },
  {
    title: 'About',
    content: (
      <>
        <p className="mt-2 text-sm">
          Read more about us {` `}
          <Link
            className="font-bold underline transition hover:text-red-400"
            href="/page/about"
          >
            here
          </Link>{' '}
          and find out about our ideas
        </p>
      </>
    ),
  },
  {
    title: 'Contact',
    content: (
      <>
        <p className="mt-2 text-sm">
          To reach our editorial team please send your inquiries through our{' '}
          {` `}
          <Link
            className="font-bold underline transition hover:text-red-400"
            href="/page/contact"
          >
            contact form
          </Link>
        </p>
      </>
    ),
  },
  {
    title: 'Instagram',
    content: (
      <>
        <p className="mt-2 text-sm">
          Follow us on
          {` `}
          <Link
            className="font-bold underline transition hover:text-red-400"
            href="https://www.instagram.com/female_rockers/"
            target="_blank"
          >
            instagram (+200K)
          </Link>{' '}
          and watch our daily reels
        </p>
      </>
    ),
  },
]
