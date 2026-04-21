'use client'

import { useEffect, useState } from 'react'
import { ReactLenis } from 'lenis/react'
import { registerGSAP } from '@/lib/animations/gsap-config'

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode
}) {
  const [isDesktop, setIsDesktop] = useState(true)

  useEffect(() => {
    registerGSAP()
    setIsDesktop(window.innerWidth >= 768)
  }, [])

  // On mobile: no Lenis, just native scroll. Prevents conflicts with
  // horizontal overflow-x containers and touch scrolling.
  if (!isDesktop) {
    return <>{children}</>
  }

  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.2 }}>
      {children}
    </ReactLenis>
  )
}
