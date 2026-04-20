'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { registerGSAP } from '@/lib/animations/gsap-config'

export default function ViewingRoomTeaser() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    registerGSAP()

    const ctx = gsap.context(() => {
      gsap.from(contentRef.current, {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })
    }, sectionRef.current!)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="bg-deep py-24 md:py-56"
    >
      <div
        ref={contentRef}
        className="flex flex-col items-center text-center px-6 md:px-8"
      >
        {/* Live indicator */}
        <div className="flex items-center gap-3 mb-10">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-signal opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-signal" />
          </span>
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-signal">
            Now Showing
          </span>
        </div>

        {/* Exhibition title */}
        <h2
          className="font-display text-deep-light leading-none"
          style={{ fontSize: 'clamp(4rem, 12vw, 14rem)' }}
        >
          SOUTHERN LIGHT
        </h2>

        {/* Subtitle */}
        <p className="font-sans text-deep-mid text-base md:text-lg mt-6 max-w-lg leading-relaxed">
          An exhibition of twenty images from the 2024 RORC Transatlantic Race.
          Light, wind, and 3,000 miles of open Atlantic.
        </p>

        {/* Countdown */}
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-deep-muted mt-8">
          12d 06h 42m remaining
        </p>

        {/* CTA button */}
        <a
          href="/paloma-vision"
          className="mt-10 font-display text-sm uppercase tracking-[0.2em] text-deep-light border border-deep-muted/40 px-10 py-4 rounded-sm hover:bg-deep-light/10 hover:border-deep-light/30 transition-all duration-300"
        >
          Enter Viewing Room
        </a>
      </div>
    </section>
  )
}
