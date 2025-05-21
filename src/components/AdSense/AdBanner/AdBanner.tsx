'use client'

import { useEffect } from 'react'

interface AdBannerProps {
  pId: string
  dataAdSlot: string
  dataAdFormat?: string
  dataFullWidthResponsive?: boolean
}

const AdBanner = ({
  pId,
  dataAdSlot,
  dataAdFormat = 'auto',
  dataFullWidthResponsive = true,
}: AdBannerProps): React.ReactNode => {
  useEffect(() => {
    try {
      ;((window as any).adsbygoogle = (window as any).adsbygoogle || []).push(
        {}
      )
    } catch (error) {
      console.log(error)
    }
  }, [])

  return (
    <ins
      className="adsbygoogle block"
      data-ad-client={`ca-pub-${pId}`}
      data-ad-slot={dataAdSlot}
      data-ad-format={dataAdFormat}
      data-full-width-responsive={dataFullWidthResponsive.toString()}
    />
  )
}

export default AdBanner
