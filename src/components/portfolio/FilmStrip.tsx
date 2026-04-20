'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { registerGSAP } from '@/lib/animations/gsap-config'

interface Project {
  number: string
  title: string
  coordinates: string
  date: string
  seaState: string
  description: string
  images: { src: string; alt: string }[]
}

const projects: Project[] = [
  {
    number: '01',
    title: 'Baltic 111 Raven',
    coordinates: '28.1235\u00b0N 15.4363\u00b0W',
    date: 'June 2024',
    seaState: 'Beaufort 5, NE trade winds',
    description:
      'Drone and onboard content for the Baltic 111 Raven. Black carbon sails, red T-foil, 111 feet of Finnish precision cutting through the Atlantic.',
    images: [
      { src: '/images/raven-yachtingworld.jpg', alt: 'Baltic 111 Raven drone selects' },
      { src: '/images/raven-bow.jpg', alt: 'Raven bow-on at speed' },
    ],
  },
  {
    number: '02',
    title: 'RORC Transatlantic',
    coordinates: '16.2358\u00b0N 61.5310\u00b0W',
    date: 'January 2026',
    seaState: 'Sea state 4, ENE 22kts',
    description:
      'Raven crossing the Atlantic for the RORC Transatlantic Race. Lanzarote to Grenada. DJI Mavic 3 at dawn and dusk.',
    images: [
      { src: '/images/raven-drone-406.jpg', alt: 'Raven aerial drone shot' },
      { src: '/images/raven-drone-453.jpg', alt: 'Raven from directly above' },
    ],
  },
  {
    number: '03',
    title: 'Raven Sea Trials',
    coordinates: '60.4518\u00b0N 22.2666\u00b0E',
    date: 'Autumn 2023',
    seaState: 'Baltic Sea, light airs',
    description:
      'First sea trials out of Jakobstad, Finland. Documenting the bird\'s nest canopy, carbon rig, and the moment a 111-foot yacht meets open water for the first time.',
    images: [
      { src: '/images/raven-drone-368.jpg', alt: 'Raven drone aerial' },
      { src: '/images/raven-cockpit.jpg', alt: 'Raven bird\'s nest canopy' },
    ],
  },
]

export default function FilmStrip() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Only set up GSAP pinned scroll on desktop
    if (window.innerWidth < 768) return

    registerGSAP()

    const track = trackRef.current
    const wrapper = wrapperRef.current
    if (!track || !wrapper) return

    const totalWidth = track.scrollWidth
    const viewportWidth = window.innerWidth
    const scrollDistance = totalWidth - viewportWidth

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

    return () => {
      st.kill()
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  return (
    <section className="relative">
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 20% 50%, rgba(27,107,147,0.03) 0%, transparent 70%),
            radial-gradient(ellipse 60% 80% at 80% 30%, rgba(194,69,10,0.02) 0%, transparent 60%),
            linear-gradient(180deg, #F4F0EA 0%, #EDE7DD 50%, #F4F0EA 100%)
          `,
        }}
      />

      {/* Header */}
      <div className="relative z-10 px-6 md:px-[8vw] pt-28 md:pt-48 pb-6 md:pb-8">
        <div className="flex items-baseline gap-4 md:gap-6">
          <span className="font-mono text-[0.55rem] uppercase tracking-[0.35em] text-ink-ghost">01</span>
          <span className="w-8 md:w-12 h-px bg-ink-whisper" />
          <span className="font-mono text-[0.55rem] uppercase tracking-[0.35em] text-ink-ghost">Selected Work</span>
        </div>
        <h2
          className="font-display text-ink mt-4 md:mt-6 leading-none"
          style={{ fontSize: 'clamp(3rem, 12vw, 14rem)' }}
        >
          VOYAGES
        </h2>
      </div>

      {/* MOBILE: vertical stacked layout */}
      <div className="md:hidden px-6 pb-16">
        {projects.map((project, i) => (
          <div key={project.number} className="mb-16 last:mb-0">
            {/* Full-width image */}
            <div className="w-full aspect-[4/3] overflow-hidden mb-6">
              <img
                src={project.images[0].src}
                alt={project.images[0].alt}
                className="w-full h-full object-cover"
                style={{ filter: 'saturate(0.9) contrast(1.02)' }}
              />
            </div>

            {/* Second image - smaller */}
            <div className="w-3/4 aspect-[3/2] overflow-hidden mb-6">
              <img
                src={project.images[1].src}
                alt={project.images[1].alt}
                className="w-full h-full object-cover"
                style={{ filter: 'saturate(0.9) contrast(1.02)' }}
              />
            </div>

            {/* Text */}
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-[0.55rem] text-ink-ghost tracking-[0.2em]">{project.number}</span>
              <span className="w-8 h-px bg-ink-whisper" />
            </div>

            <h3 className="font-display text-ink leading-[0.9] text-[2rem] tracking-wide mb-4">
              {project.title.toUpperCase()}
            </h3>

            <div className="space-y-1 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-bearing" />
                <span className="font-mono text-[0.6rem] text-bearing tracking-wider">{project.coordinates}</span>
              </div>
              <p className="font-mono text-[0.6rem] text-ink-ghost tracking-wider pl-3">{project.date}</p>
              <p className="font-mono text-[0.6rem] text-ink-ghost tracking-wider pl-3">{project.seaState}</p>
            </div>

            <p className="font-sans text-[0.85rem] leading-[1.75] text-ink-soft mb-5">
              {project.description}
            </p>

            <div className="flex items-center gap-3">
              <span className="font-sans text-[0.65rem] font-bold uppercase tracking-[0.2em] text-ink-ghost">
                View Project
              </span>
              <span className="w-6 h-px bg-ink-ghost" />
            </div>

            {/* Divider */}
            {i < projects.length - 1 && (
              <div className="mt-16 h-px bg-ink-whisper/40" />
            )}
          </div>
        ))}
      </div>

      {/* DESKTOP: pinned horizontal scroll */}
      <div ref={wrapperRef} className="relative h-screen overflow-hidden hidden md:block">
        <div
          ref={trackRef}
          className="flex items-center h-full will-change-transform py-[5vh]"
          style={{ width: 'max-content' }}
        >
          <div className="w-[8vw] shrink-0" />

          {projects.map((project, i) => (
            <div key={project.number} className="flex items-center shrink-0 gap-0">
              {/* Text block */}
              <div
                className="relative flex flex-col justify-center shrink-0"
                style={{ width: '30vw', height: '75vh', padding: '0 4vw' }}
              >
                <span
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-ink pointer-events-none select-none"
                  style={{ fontSize: 'clamp(14rem, 25vw, 30rem)', opacity: 0.03, lineHeight: 0.8 }}
                >
                  {project.number}
                </span>

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-8">
                    <span className="font-mono text-[0.55rem] text-ink-ghost tracking-[0.2em]">{project.number}</span>
                    <span className="w-8 h-px bg-ink-whisper" />
                  </div>

                  <h3 className="font-display text-ink leading-[0.9] tracking-wide" style={{ fontSize: 'clamp(2.8rem, 4.5vw, 5.5rem)' }}>
                    {project.title.toUpperCase()}
                  </h3>

                  <div className="mt-8 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-bearing" />
                      <span className="font-mono text-[0.65rem] text-bearing tracking-wider">{project.coordinates}</span>
                    </div>
                    <p className="font-mono text-[0.65rem] text-ink-ghost tracking-wider pl-3">{project.date}</p>
                    <p className="font-mono text-[0.65rem] text-ink-ghost tracking-wider pl-3">{project.seaState}</p>
                  </div>

                  <p className="mt-8 font-sans text-[0.85rem] leading-[1.8] text-ink-soft max-w-[30ch]">
                    {project.description}
                  </p>

                  <div className="mt-8 flex items-center gap-3 group cursor-pointer">
                    <span className="font-sans text-[0.7rem] font-bold uppercase tracking-[0.2em] text-ink-ghost group-hover:text-ink transition-colors">View Project</span>
                    <span className="w-6 h-px bg-ink-ghost group-hover:w-10 group-hover:bg-ink transition-all" />
                  </div>
                </div>
              </div>

              {/* Images */}
              {project.images.map((img, j) => (
                <div
                  key={j}
                  className="relative shrink-0 overflow-hidden group cursor-pointer"
                  style={{ width: j === 0 ? '55vw' : '40vw', height: '75vh', marginLeft: j === 0 ? '2vw' : '0.5vw' }}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="h-full w-full object-cover transition-transform duration-[1.2s] ease-[var(--ease-drift)] group-hover:scale-[1.04]"
                    style={{ filter: 'saturate(0.9) contrast(1.02)' }}
                  />
                  <div
                    className="absolute inset-0 pointer-events-none opacity-30"
                    style={{ background: 'radial-gradient(ellipse at center, transparent 50%, rgba(26,24,22,0.4) 100%)' }}
                  />
                </div>
              ))}

              {i < projects.length - 1 && (
                <div className="shrink-0 w-[0.5vw] self-stretch flex items-center justify-center">
                  <div className="w-px h-[30%] bg-ink-whisper/30" />
                </div>
              )}
            </div>
          ))}

          <div className="w-[15vw] shrink-0" />
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-16 flex items-center justify-between px-[8vw] pointer-events-none z-10">
          <span className="font-mono text-[0.55rem] text-ink-ghost/50 tracking-[0.15em] uppercase">Scroll to explore</span>
          <span className="font-mono text-[0.55rem] text-ink-ghost/50 tracking-[0.15em]">{projects.length} Projects</span>
        </div>
      </div>
    </section>
  )
}
