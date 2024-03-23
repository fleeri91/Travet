import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

import { SWRProvider } from '@/providers/SWRProvider'
import { ThemeProvider } from '@/context/themeContext'

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
    <html lang="en">
      <body className={inter.className}>
        <main>
          <ThemeProvider>
            <SWRProvider>{children}</SWRProvider>
          </ThemeProvider>
        </main>
      </body>
    </html>
  )
}

export default RootLayout
