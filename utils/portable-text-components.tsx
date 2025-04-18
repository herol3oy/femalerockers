import Image from 'next/image'
import { PropsWithChildren } from 'react'

import { shimmer, toBase64 } from './shimmer'
import { urlFor } from '@/sanity/lib/image'

export const portableTextComponents = {
  types: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    image: ({ value }: any) => (
      <Image
        className="my-5 w-full"
        src={urlFor(value.asset._ref).url()}
        width={800}
        height={600}
        sizes="100vw"
        alt="Female Rocker"
        placeholder="blur"
        blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
      />
    ),
  },
  marks: {
    strong: ({ children }: PropsWithChildren) => (
      <>
        <Image
          className="mb-2"
          src="/icons/female-rockers-logo.svg"
          alt="Female Rockers logo"
          width={25}
          height={25}
          sizes="100vw"
        />
        <strong className="text-2xl font-bold text-white">{children}</strong>
      </>
    ),
  },
  block: {
    blockquote: ({ children }: PropsWithChildren) => (
      <blockquote className="my-10 text-2xl font-bold text-red-700 md:text-5xl">
        “{children}„
      </blockquote>
    ),
    normal: ({ children }: PropsWithChildren) => (
      <p className="mb-2 mt-2 text-xl" style={{ color: 'lightgray' }}>
        {children}
      </p>
    ),
  },
}
