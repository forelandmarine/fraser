'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { registerGSAP } from '@/lib/animations/gsap-config'

interface Project {
  number: string
  title: string
  subtitle: string
  coordinates: string
  date: string
  seaState: string
  description: string
  image: string
  imageAlt: string
}

const projects: Project[] = [
  {
    number: '01',
    title: 'BALTIC 111 RAVEN',
    subtitle: 'Gran Canaria to Antigua',
    coordinates: '28.1235\u00b0N 15.4363\u00b0W',
    date: 'June 2024',
    seaState: 'Beaufort 5',
    description:
      'Documenting the 111-foot Raven as she cut through Atlantic swells on passage from the Canaries. Three weeks of open ocean, shifting light, and a crew pushing into the trades.',
    image: '/images/raven-yachtingworld.jpg',
    imageAlt: 'Baltic 111 Raven sailing through Atlantic swells',
  },
  {
    number: '02',
    title: 'RORC TRANSATLANTIC',
    subtitle: 'Lanzarote to Grenada',
    coordinates: '16.2358\u00b0N 61.5310\u00b0W',
    date: 'January 2026',
    seaState: 'Sea state 4',
    description:
      'Following the fleet across 3,000 nautical miles of open Atlantic. Drone sorties at dawn, night watches lit by phosphorescence, and the relentless rhythm of ocean racing.',
    image: '/images/raven-bow.jpg',
    imageAlt: 'RORC Transatlantic fleet racing',
  },
  {
    number: '03',
    title: 'RAVEN SEA TRIALS',
    subtitle: 'Baltic Sea shakedown',
    coordinates: '60.4518\u00b0N 22.2666\u00b0E',
    date: 'Autumn 2023',
    seaState: 'Baltic Sea',
    description:
      'First light on the Baltic as Raven emerged from the yard. Capturing the raw energy of a new build finding her feet in the cold northern waters off Turku.',
    image: '/images/raven-drone-406.jpg',
    imageAlt: 'Raven during sea trials in the Baltic',
  },
]

export default function FilmStrip() {
  const sectionRef = useRef<HTMLElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const ghostRefs = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    registerGSAP()

    const track = trackRef.current
    const wrapper = wrapperRef.current
    if (!track || !wrapper) return

    // Calculate scroll distance
    const totalWidth = track.scrollWidth
    const viewportWidth = window.innerWidth
    const scrollDistance = totalWidth - viewportWidth

    // Horizontal scroll pinning
    const st = ScrollTrigger.create({
      trigger: wrapper,
      start: 'top top',
      end: () => `+=${scrollDistance}`,
      pin: true,
      scrub: 1,
      anticipatePin: 1,
      onUpdate: (self) => {
        gsap.set(track, { x: -scrollDistance * self.progress })
      },
    })

    // Ghost number parallax (slower than track)
    ghostRefs.current.forEach((ghost) => {
      if (!ghost) return
      gsap.to(ghost, {
        x: 200,
        ease: 'none',
        scrollTrigger: {
          trigger: wrapper,
          start: 'top top',
          end: () => `+=${scrollDistance}`,
          scrub: 1.5,
        },
      })
    })

    return () => {
      st.kill()
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  return (
    <section ref={sectionRef} className="bg-paper">
      {/* Section header */}
      <div className="px-8 pt-32 pb-16 md:px-16">
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-ink-ghost">
          01 / Selected Work
        </span>
        <h2 className="font-display text-ink mt-2" style={{ fontSize: 'clamp(4rem, 10vw, 12rem)' }}>
          VOYAGES
        </h2>
      </div>

      {/* Pinned wrapper */}
      <div ref={wrapperRef} className="relative h-screen overflow-hidden">
        {/* Horizontal track */}
        <div
          ref={trackRef}
          className="flex items-center h-full will-change-transform"
          style={{ width: 'max-content' }}
        >
          {/* Initial spacer */}
          <div className="w-[10vw] shrink-0" />

          {projects.map((project, i) => (
            <div key={project.number} className="flex items-center shrink-0">
              {/* Interstitial text block */}
              <div
                className="relative flex flex-col justify-center px-12 shrink-0"
                style={{ width: '35vw', height: '85vh' }}
              >
                {/* Ghost number */}
                <span
                  ref={(el) => { ghostRefs.current[i] = el }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-ink pointer-events-none select-none will-change-transform"
                  style={{
                    fontSize: 'clamp(12rem, 22vw, 25rem)',
                    opacity: 0.04,
                  }}
                >
                  {project.number}
                </span>

                <div className="relative z-10">
                  <h3
                    className="font-display text-ink leading-none"
                    style={{ fontSize: 'clamp(2.5rem, 4vw, 5rem)' }}
                  >
                    {project.title}
                  </h3>

                  <div className="mt-6 space-y-1 font-mono text-xs uppercase tracking-wider">
                    <p className="text-bearing">{project.coordinates}</p>
                    <p className="text-ink-ghost">{project.date}</p>
                    <p className="text-ink-ghost">{project.seaState}</p>
                  </div>

                  <p className="mt-6 font-sans text-base leading-relaxed text-ink-soft max-w-sm">
                    {project.description}
                  </p>
                </div>
              </div>

              {/* Photo frame */}
              <div
                className="relative shrink-0 overflow-hidden rounded-sm group cursor-pointer"
                style={{ width: '70vw', height: '85vh' }}
              >
                <img
                  src={project.image}
                  alt={project.imageAlt}
                  className="h-full w-full object-cover transition-transform duration-700 ease-[var(--ease-drift)] group-hover:scale-[1.03]"
                />
              </div>
            </div>
          ))}

          {/* End spacer */}
          <div className="w-[20vw] shrink-0" />
        </div>
      </div>
    </section>
  )
}
