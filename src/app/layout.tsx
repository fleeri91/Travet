import type { Metadata } from 'next'
import { Noto_Sans, Source_Code_Pro } from 'next/font/google'
import { Theme } from '@radix-ui/themes'

import { SWRProvider } from '@/providers/SWRProvider'

import '@radix-ui/themes/styles.css'
import './globals.css'

const SourceCodePro = Source_Code_Pro({
  subsets: ['latin'],
  weight: ['200', '300', '400', '600', '700', '800', '900'],
  variable: '--font-source-code-pro',
})

const NotoSans = Noto_Sans({
  subsets: ['latin'],
  weight: ['200', '300', '400', '600', '700', '800', '900'],
  variable: '--font-noto-sans',
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
      <body className={`${NotoSans.className} ${SourceCodePro.className}`}>
        <main className="flex justify-center">
          <Theme
            appearance="dark"
            accentColor="blue"
            grayColor="gray"
            panelBackground="solid"
            className="w-full"
          >
            <SWRProvider>{children}</SWRProvider>
          </Theme>
        </main>
      </body>
    </html>
  )
}

export default RootLayout
