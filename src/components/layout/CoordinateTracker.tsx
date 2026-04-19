'use client'

import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'

interface Location {
  label: string
  threshold: number
}

interface CoordinateTrackerProps {
  locations: Location[]
}

export default function CoordinateTracker({
  locations,
}: CoordinateTrackerProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const textRef = useRef<HTMLSpanElement>(null)
  const prevIndex = useRef(0)

  useEffect(() => {
    function handleScroll() {
      const scrolled = window.scrollY
      const total = document.body.scrollHeight - window.innerHeight
      const progress = total > 0 ? scrolled / total : 0

      let newIndex = 0
      for (let i = locations.length - 1; i >= 0; i--) {
        if (progress >= locations[i].threshold) {
          newIndex = i
          break
        }
      }

      if (newIndex !== prevIndex.current) {
        prevIndex.current = newIndex
        setActiveIndex(newIndex)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [locations])

  useEffect(() => {
    if (!textRef.current) return

    gsap.fromTo(
      textRef.current,
      { opacity: 0, y: 4 },
      { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
    )
  }, [activeIndex])

  return (
    <span
      ref={textRef}
      className="font-mono text-[11px] tracking-wider text-white"
    >
      {locations[activeIndex]?.label ?? ''}
    </span>
  )
}
