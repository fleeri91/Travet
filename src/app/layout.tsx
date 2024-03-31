import type { Metadata } from 'next'
import { Titillium_Web } from 'next/font/google'
import './globals.css'

import { SWRProvider } from '@/providers/SWRProvider'
import { ThemeProvider } from '@/context/themeContext'

const TitilliumWeb = Titillium_Web({
  subsets: ['latin'],
  weight: ['200', '300', '400', '600', '700', '900'],
  variable: '--font-source-code-pro',
})

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
      <body className={`${TitilliumWeb.className}`}>
        <main className="flex justify-center">
          <ThemeProvider>
            <SWRProvider>{children}</SWRProvider>
          </ThemeProvider>
        </main>
      </body>
    </html>
  )
}

export default RootLayout
