'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { registerGSAP } from '@/lib/animations/gsap-config'

export default function CrossingSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const textBlockRef = useRef<HTMLDivElement>(null)
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

      gsap.from(textBlockRef.current, {
        opacity: 0, y: 30, duration: 1,
        scrollTrigger: { trigger: section, start: 'top 50%', toggleActions: 'play none none none' },
      })

      gsap.from(taglineRef.current, {
        opacity: 0, y: 15, duration: 0.8,
        scrollTrigger: { trigger: section, start: '40% bottom', toggleActions: 'play none none none' },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden" style={{ height: '100svh' }}>
      {/* Full-bleed image */}
      <img
        ref={imageRef}
        src="/images/raven-drone-453.jpg"
        alt="Raven cutting through ocean swells"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ transform: 'scale(1.1)' }}
      />

      {/* Darken for legibility */}
      <div className="absolute inset-0 bg-black/30 pointer-events-none" />

      {/* Gradient: paper at top, deep at bottom */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'linear-gradient(to bottom, var(--color-paper) 0%, transparent 6%, transparent 82%, var(--color-deep) 100%)',
      }} />

      {/* Centered text block - works on all screens */}
      <div
        ref={textBlockRef}
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
      >
        <span
          className="font-display text-white uppercase leading-none text-center"
          style={{ fontSize: 'clamp(2.8rem, 12vw, 22rem)', mixBlendMode: 'difference', letterSpacing: '0.06em' }}
        >
          SURFACE
        </span>
        <div className="w-10 h-px bg-white/20 my-3 md:w-20 md:my-5" />
        <span
          className="font-display text-white uppercase leading-none text-center"
          style={{ fontSize: 'clamp(2.8rem, 12vw, 22rem)', mixBlendMode: 'difference', letterSpacing: '0.06em' }}
        >
          DEPTH
        </span>
      </div>

      {/* Paloma Vision tagline */}
      <div
        ref={taglineRef}
        className="absolute left-5 right-5 text-center md:left-auto md:right-16 md:text-right md:max-w-sm"
        style={{ bottom: '7%' }}
      >
        <span className="font-mono text-[0.5rem] uppercase tracking-[0.25em] text-white/35 block mb-1 md:text-[0.6rem] md:tracking-[0.3em] md:mb-2">
          Paloma Vision
        </span>
        <p className="font-sans text-[0.65rem] leading-relaxed text-white/45 md:text-sm md:text-white/70">
          Cinematic storytelling for the maritime world.
        </p>
      </div>
    </section>
  )
}
