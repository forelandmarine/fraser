'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { registerGSAP } from '@/lib/animations/gsap-config'

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const textGroupRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    registerGSAP()

    const ctx = gsap.context(() => {
      const elements = textGroupRef.current?.children
      if (!elements) return

      gsap.fromTo(
        Array.from(elements),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: textGroupRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      )
    }, sectionRef.current!)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="bg-paper min-h-screen"
    >
      <div
        className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] min-h-screen"
      >
        {/* Left: sticky image */}
        <div className="relative h-[60vh] md:h-auto">
          <div className="md:sticky md:top-0 md:h-screen">
            <img
              src="/images/raven-mysailing.jpg"
              alt="Fraser Edwards on board"
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* Right: text content */}
        <div className="flex items-center px-6 py-16 md:px-16 md:py-32">
          <div ref={textGroupRef} className="max-w-lg space-y-6">
            <span className="block font-mono text-xs uppercase tracking-[0.3em] text-ink-ghost">
              About
            </span>

            <h2
              className="font-display text-ink leading-none"
              style={{ fontSize: 'clamp(3rem, 6vw, 6rem)' }}
            >
              FRASER EDWARDS
            </h2>

            <p className="font-sans text-base leading-relaxed text-ink-soft">
              International maritime photographer and filmmaker based between
              the UK and the Mediterranean. Specialising in sailing yachts from
              24 to 60 metres, with a particular focus on J Class and
              performance superyachts.
            </p>

            <p className="font-sans text-base leading-relaxed text-ink-soft">
              Working from the water, the air, and on board, capturing the
              moments that define a campaign, a crossing, or a sea trial.
              Every shoot is built around the story of the boat and the
              people who sail her.
            </p>

            <p className="font-sans text-base leading-relaxed text-ink-soft">
              Available for commissions worldwide. Currently booking Q3/Q4
              2026 for regattas, deliveries, and yard documentation.
            </p>

            {/* Clients */}
            <div className="pt-6 border-t border-ink-whisper/30">
              <span className="block font-mono text-[0.65rem] uppercase tracking-[0.25em] text-ink-ghost mb-3">
                Selected Clients
              </span>
              <p className="font-mono text-xs text-ink-ghost leading-loose">
                Baltic Yachts / Royal Ocean Racing Club / Yachting World /
                Claasen Shipyards / North Sails / Rondal / Paloma Vision
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
