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
        scale: 1.25, ease: 'none',
        scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: true },
      })
      gsap.fromTo(surfaceRef.current, { x: '5vw' }, {
        x: '-12vw', ease: 'none',
        scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: true },
      })
      gsap.fromTo(depthRef.current, { x: '-5vw' }, {
        x: '10vw', ease: 'none',
        scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: true },
      })
      gsap.from(taglineRef.current, {
        opacity: 0, y: 15, duration: 0.8,
        scrollTrigger: { trigger: section, start: '40% bottom', toggleActions: 'play none none none' },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  // Mobile-first: single viewport section, image fills it, text overlaid
  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden" style={{ height: '100svh' }}>
      {/* Full-bleed image - covers entire section on all screens */}
      <img
        ref={imageRef}
        src="/images/raven-drone-453.jpg"
        alt="Raven cutting through ocean swells"
        className="absolute top-0 left-0 w-full h-full object-cover"
        style={{ transform: 'scale(1.1)' }}
      />

      {/* Gradient: thin paper fade at top, deep at bottom */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'linear-gradient(to bottom, var(--color-paper) 0%, transparent 8%, transparent 80%, var(--color-deep) 100%)',
      }} />

      {/* SURFACE - positioned within the image area */}
      <span
        ref={surfaceRef}
        className="absolute left-0 w-full text-center font-display text-white uppercase leading-none pointer-events-none select-none"
        style={{ top: '30%', fontSize: 'clamp(2.5rem, 14vw, 26rem)', mixBlendMode: 'difference' }}
      >
        SURFACE
      </span>

      {/* DEPTH - positioned within the image area */}
      <span
        ref={depthRef}
        className="absolute left-0 w-full text-center font-display text-white uppercase leading-none pointer-events-none select-none"
        style={{ bottom: '25%', fontSize: 'clamp(2.5rem, 14vw, 26rem)', mixBlendMode: 'difference' }}
      >
        DEPTH
      </span>

      {/* Paloma Vision tagline */}
      <div
        ref={taglineRef}
        className="absolute right-4 max-w-[200px] text-right md:right-16 md:max-w-sm"
        style={{ bottom: '8%' }}
      >
        <span className="font-mono text-[0.5rem] uppercase tracking-[0.25em] text-white/40 block mb-1.5 md:text-[0.6rem] md:tracking-[0.3em] md:mb-2">
          Paloma Vision
        </span>
        <p className="font-sans text-[0.7rem] leading-relaxed text-white/60 md:text-sm md:text-white/70">
          Cinematic storytelling for the maritime world.
        </p>
      </div>
    </section>
  )
}
