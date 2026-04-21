'use client'

import { useEffect } from 'react'
import { ReactLenis } from 'lenis/react'
import { registerGSAP } from '@/lib/animations/gsap-config'

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    registerGSAP()
  }, [])

  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.2 }}>
      {children}
    </ReactLenis>
  )
}
