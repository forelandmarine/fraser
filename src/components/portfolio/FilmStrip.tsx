'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { registerGSAP } from '@/lib/animations/gsap-config'

const projects = [
  {
    number: '01',
    title: 'BALTIC 111 RAVEN',
    coordinates: '28.1235\u00b0N 15.4363\u00b0W',
    date: 'June 2024',
    seaState: 'Beaufort 5, NE trade winds',
    description: 'Drone and onboard content for the Baltic 111 Raven. Black carbon sails, red T-foil, 111 feet of Finnish precision cutting through the Atlantic.',
    images: [
      { src: '/images/raven-yachtingworld.jpg', alt: 'Baltic 111 Raven drone selects' },
      { src: '/images/raven-bow.jpg', alt: 'Raven bow-on at speed' },
    ],
  },
  {
    number: '02',
    title: 'RORC TRANSATLANTIC',
    coordinates: '16.2358\u00b0N 61.5310\u00b0W',
    date: 'January 2026',
    seaState: 'Sea state 4, ENE 22kts',
    description: 'Raven crossing the Atlantic for the RORC Transatlantic Race. Lanzarote to Grenada. DJI Mavic 3 at dawn and dusk.',
    images: [
      { src: '/images/raven-drone-406.jpg', alt: 'Raven aerial drone shot' },
      { src: '/images/raven-drone-453.jpg', alt: 'Raven from directly above' },
    ],
  },
  {
    number: '03',
    title: 'RAVEN SEA TRIALS',
    coordinates: '60.4518\u00b0N 22.2666\u00b0E',
    date: 'Autumn 2023',
    seaState: 'Baltic Sea, light airs',
    description: 'First sea trials out of Jakobstad. Documenting the bird\'s nest canopy, carbon rig, and the moment a 111-foot yacht meets open water.',
    images: [
      { src: '/images/raven-cockpit.jpg', alt: 'Raven deck detail' },
      { src: '/images/raven-drone-23.jpg', alt: 'Raven under black carbon sails' },
    ],
  },
]

export default function FilmStrip() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    registerGSAP()

    const track = trackRef.current
    const wrapper = wrapperRef.current
    if (!track || !wrapper) return

    const scrollDistance = track.scrollWidth - window.innerWidth
    if (scrollDistance <= 0) return

    const st = ScrollTrigger.create({
      trigger: wrapper,
      start: 'top top',
      end: () => `+=${scrollDistance}`,
      pin: true,
      scrub: 0.8,
      anticipatePin: 1,
      onUpdate: (self) => {
        gsap.set(track, { x: -scrollDistance * self.progress })
      },
    })

    return () => st.kill()
  }, [])

  return (
    <section className="relative" style={{
      background: 'linear-gradient(180deg, #F4F0EA 0%, #EDE7DD 50%, #F4F0EA 100%)',
    }}>
      {/* Header */}
      <div className="px-6 md:px-[8vw] pt-24 md:pt-48 pb-6 md:pb-10">
        <div className="flex items-baseline gap-4">
          <span className="font-mono text-[0.55rem] uppercase tracking-[0.35em] text-ink-ghost">01</span>
          <span className="w-8 h-px bg-ink-whisper" />
          <span className="font-mono text-[0.55rem] uppercase tracking-[0.35em] text-ink-ghost">Selected Work</span>
        </div>
        <h2 className="font-display text-ink mt-4 leading-none" style={{ fontSize: 'clamp(3rem, 12vw, 14rem)' }}>
          VOYAGES
        </h2>
      </div>

      {/* Horizontal scroll area - overflow-x-auto is the CSS fallback, GSAP overrides with pinning */}
      <div ref={wrapperRef} className="h-[100svh] overflow-x-auto overflow-y-hidden scrollbar-hide">
        <div
          ref={trackRef}
          className="flex items-center h-full"
          style={{ width: 'max-content' }}
        >
          <div className="w-[6vw] shrink-0" />

          {projects.map((project, i) => (
            <div key={project.number} className="flex items-center shrink-0">
              {/* Text block */}
              <div className="relative flex flex-col justify-center shrink-0 w-[75vw] md:w-[28vw] h-[78vh] px-[5vw] md:px-[3vw]">
                <span
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-ink pointer-events-none select-none"
                  style={{ fontSize: 'clamp(8rem, 20vw, 28rem)', opacity: 0.03, lineHeight: 0.8 }}
                >
                  {project.number}
                </span>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4 md:mb-8">
                    <span className="font-mono text-[0.55rem] text-ink-ghost tracking-[0.2em]">{project.number}</span>
                    <span className="w-8 h-px bg-ink-whisper" />
                  </div>
                  <h3 className="font-display text-ink leading-[0.9] tracking-wide text-[1.6rem] md:text-[clamp(2.5rem,4vw,5rem)]">
                    {project.title}
                  </h3>
                  <div className="mt-4 md:mt-8 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-bearing" />
                      <span className="font-mono text-[0.6rem] text-bearing tracking-wider">{project.coordinates}</span>
                    </div>
                    <p className="font-mono text-[0.6rem] text-ink-ghost tracking-wider pl-3">{project.date}</p>
                    <p className="font-mono text-[0.6rem] text-ink-ghost tracking-wider pl-3">{project.seaState}</p>
                  </div>
                  <p className="mt-4 md:mt-8 font-sans text-[0.8rem] leading-[1.7] text-ink-soft max-w-[28ch]">
                    {project.description}
                  </p>
                  <div className="mt-4 md:mt-8 flex items-center gap-3">
                    <span className="font-sans text-[0.65rem] font-bold uppercase tracking-[0.2em] text-ink-ghost">View Project</span>
                    <span className="w-6 h-px bg-ink-ghost" />
                  </div>
                </div>
              </div>

              {/* Two photo frames */}
              <div className="shrink-0 w-[82vw] md:w-[50vw] h-[78vh] ml-[2vw] overflow-hidden">
                <img src={project.images[0].src} alt={project.images[0].alt}
                  className="w-full h-full object-cover" style={{ filter: 'saturate(0.9) contrast(1.02)' }} />
              </div>
              <div className="shrink-0 w-[65vw] md:w-[38vw] h-[78vh] ml-[1vw] overflow-hidden">
                <img src={project.images[1].src} alt={project.images[1].alt}
                  className="w-full h-full object-cover" style={{ filter: 'saturate(0.9) contrast(1.02)' }} />
              </div>

              {i < projects.length - 1 && (
                <div className="shrink-0 w-[5vw] md:w-[1vw] self-stretch flex items-center justify-center">
                  <div className="w-px h-[25%] bg-ink-whisper/30" />
                </div>
              )}
            </div>
          ))}

          <div className="w-[10vw] shrink-0" />
        </div>
      </div>
    </section>
  )
}
