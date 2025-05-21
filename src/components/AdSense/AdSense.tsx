import Script from 'next/script'

interface AdSenseProps {
  pId: string
}

const AdSense = ({ pId }: AdSenseProps): React.ReactNode => (
  <Script
    async
    src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-${pId}`}
    crossOrigin="anonymous"
    strategy="afterInteractive"
  />
)

export default AdSense
