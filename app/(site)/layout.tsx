import '@/app/globals.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import Footer from '../components/Footer'
import TopBar from '../components/TopBar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Female Rockers',
  description: 'FemaleRockers interviews future sensations in rock music',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`primary-dark-color container mx-auto px-2 ${inter.className}`}
      >
        <TopBar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
