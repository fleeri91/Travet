import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

import { SWRProvider } from '@/providers/SWRProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Travet',
  description: '',
  icons: {
    icon: '/favicons/favicon-32x32.png',
  },
}
const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <html lang="en" data-theme={undefined}>
      <body className={inter.className}>
        <main>
          <SWRProvider>{children}</SWRProvider>
        </main>
      </body>
    </html>
  )
}

export default RootLayout
