'use client'

import { useEffect, useState } from 'react'

export type DeviceTier = 'high' | 'mid' | 'low'

export function useDeviceTier(): DeviceTier {
  const [tier, setTier] = useState<DeviceTier>('high')

  useEffect(() => {
    const nav = navigator as Navigator & {
      deviceMemory?: number
      connection?: { effectiveType?: string }
    }

    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    if (prefersReducedMotion) {
      setTier('low')
      return
    }

    let score = 0

    // CPU cores
    const cores = navigator.hardwareConcurrency || 4
    if (cores >= 8) score += 2
    else if (cores >= 4) score += 1

    // Device memory (Chrome only)
    const memory = nav.deviceMemory
    if (memory) {
      if (memory >= 8) score += 2
      else if (memory >= 4) score += 1
    } else {
      score += 1 // assume mid if unknown
    }

    // Connection speed
    const connection = nav.connection
    if (connection?.effectiveType) {
      if (connection.effectiveType === '4g') score += 1
    } else {
      score += 1
    }

    // Screen resolution
    const dpr = window.devicePixelRatio || 1
    const pixels = window.screen.width * window.screen.height * dpr
    if (pixels > 3000000) score += 1

    // Mobile detection
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
    if (isMobile) score -= 1

    if (score >= 5) setTier('high')
    else if (score >= 3) setTier('mid')
    else setTier('low')
  }, [])

  return tier
}
