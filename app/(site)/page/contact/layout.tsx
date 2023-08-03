import '@/app/globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="container mx-auto w-11/12 md:w-7/12">{children}</div>
}
