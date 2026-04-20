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
      // Image zoom
      gsap.fromTo(
        imageRef.current,
        { scale: 1 },
        {
          scale: 1.2,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        }
      )

      // SURFACE drifts left
      gsap.fromTo(
        surfaceRef.current,
        { x: '10vw' },
        {
          x: '-20vw',
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        }
      )

      // DEPTH drifts right
      gsap.fromTo(
        depthRef.current,
        { x: '-10vw' },
        {
          x: '15vw',
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        }
      )

      // Tagline fade in
      gsap.fromTo(
        taglineRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: '40% top',
            end: '60% top',
            scrub: true,
          },
        }
      )
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative h-[200vh] md:h-[300vh]"
    >
      {/* Sticky image container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <img
          ref={imageRef}
          src="/images/raven-side.jpg"
          alt="Raven crossing open ocean"
          className="h-full w-full object-cover will-change-transform origin-center"
        />

        {/* Gradient overlays */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(to bottom, var(--color-paper) 0%, transparent 30%, transparent 70%, var(--color-deep) 100%)',
          }}
        />

        {/* SURFACE word */}
        <span
          ref={surfaceRef}
          className="absolute top-[30%] md:top-[20%] left-0 w-full text-center font-display text-white uppercase leading-none pointer-events-none select-none will-change-transform"
          style={{
            fontSize: 'clamp(3rem, 16vw, 28rem)',
            mixBlendMode: 'difference',
          }}
        >
          SURFACE
        </span>

        {/* DEPTH word */}
        <span
          ref={depthRef}
          className="absolute bottom-[30%] md:bottom-[15%] left-0 w-full text-center font-display text-white uppercase leading-none pointer-events-none select-none will-change-transform"
          style={{
            fontSize: 'clamp(3rem, 16vw, 28rem)',
            mixBlendMode: 'difference',
          }}
        >
          DEPTH
        </span>

        {/* Paloma Vision tagline */}
        <div
          ref={taglineRef}
          className="absolute bottom-[10%] md:bottom-[20%] left-6 right-6 md:left-auto md:right-16 max-w-sm text-left md:text-right opacity-0"
        >
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-white/60 block mb-3">
            Paloma Vision
          </span>
          <p className="font-sans text-sm md:text-base leading-relaxed text-white/80">
            Where the ocean meets the lens. Cinematic storytelling for the
            maritime world, from above and below.
          </p>
        </div>
      </div>
    </section>
  )
}
