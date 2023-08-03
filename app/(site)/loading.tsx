import Image from 'next/image'

export default function Loading() {
  return (
    <div className="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center bg-zinc-900 align-middle">
      <Image
        className="animate-spin"
        src="/icons/female-rockers-logo.svg"
        width={75}
        height={75}
        alt="Female Rockers"
      />
    </div>
  )
}
