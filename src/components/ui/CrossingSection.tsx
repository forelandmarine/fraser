'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { registerGSAP } from '@/lib/animations/gsap-config'

export default function CrossingSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const surfaceRef = useRef<HTMLSpanElement>(null)
  const depthRef = useRef<HTMLSpanElement>(null)
  const taglineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    registerGSAP()
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      gsap.fromTo(imageRef.current, { scale: 1.1 }, {
        scale: 1.3, ease: 'none',
        scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: true },
      })

      gsap.fromTo(surfaceRef.current, { x: '8vw' }, {
        x: '-15vw', ease: 'none',
        scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: true },
      })

      gsap.fromTo(depthRef.current, { x: '-8vw' }, {
        x: '12vw', ease: 'none',
        scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: true },
      })

      gsap.from(taglineRef.current, {
        opacity: 0, y: 20, ease: 'power2.out',
        scrollTrigger: { trigger: section, start: '30% bottom', end: '60% bottom', scrub: true },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative h-[100svh] w-full overflow-hidden">
      {/* Full-bleed image */}
      <img
        ref={imageRef}
        src="/images/raven-drone-453.jpg"
        alt="Raven cutting through ocean swells"
        className="absolute inset-0 w-full h-full object-cover will-change-transform"
        style={{ transform: 'scale(1.1)' }}
      />

      {/* Gradient: subtle paper fade at very top, deep at bottom */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'linear-gradient(to bottom, var(--color-paper) 0%, transparent 10%, transparent 75%, var(--color-deep) 100%)',
      }} />

      {/* SURFACE */}
      <span
        ref={surfaceRef}
        className="absolute top-[28%] left-0 w-full text-center font-display text-white uppercase leading-none pointer-events-none select-none"
        style={{ fontSize: 'clamp(3rem, 15vw, 28rem)', mixBlendMode: 'difference' }}
      >
        SURFACE
      </span>

      {/* DEPTH */}
      <span
        ref={depthRef}
        className="absolute bottom-[22%] left-0 w-full text-center font-display text-white uppercase leading-none pointer-events-none select-none"
        style={{ fontSize: 'clamp(3rem, 15vw, 28rem)', mixBlendMode: 'difference' }}
      >
        DEPTH
      </span>

      {/* Paloma Vision tagline */}
      <div
        ref={taglineRef}
        className="absolute bottom-[8%] right-6 md:right-16 max-w-xs md:max-w-sm text-right"
      >
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-white/50 block mb-2">
          Paloma Vision
        </span>
        <p className="font-sans text-[0.8rem] md:text-sm leading-relaxed text-white/70">
          Cinematic storytelling for the maritime world, from above and below.
        </p>
      </div>
    </section>
  )
}
