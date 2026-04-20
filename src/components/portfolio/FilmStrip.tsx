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

    // GSAP pinned horizontal scroll - works on all screen sizes
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
    <section style={{ background: 'linear-gradient(180deg, #F4F0EA 0%, #EDE7DD 50%, #F4F0EA 100%)' }}>
      {/* Header - mobile base, enhanced for desktop */}
      <div className="px-5 pt-20 pb-4 md:px-[8vw] md:pt-48 md:pb-10">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-[0.5rem] uppercase tracking-[0.3em] text-ink-ghost">01</span>
          <span className="w-6 h-px bg-ink-whisper md:w-10" />
          <span className="font-mono text-[0.5rem] uppercase tracking-[0.3em] text-ink-ghost">Selected Work</span>
        </div>
        <h2 className="font-display text-ink mt-3 leading-none text-[2.5rem] md:mt-6 md:text-[clamp(5rem,12vw,14rem)]">
          VOYAGES
        </h2>
      </div>

      {/* Horizontal scroll strip - same structure on all screens, GSAP pins it */}
      <div ref={wrapperRef} style={{ height: '100svh' }} className="overflow-hidden">
        <div
          ref={trackRef}
          className="flex items-center h-full"
          style={{ width: 'max-content' }}
        >
          {/* Left pad */}
          <div className="shrink-0 w-5 md:w-[6vw]" />

          {projects.map((project, i) => (
            <div key={project.number} className="flex items-center shrink-0">

              {/* Text block - sized for mobile, enlarged for desktop */}
              <div className="relative flex flex-col justify-center shrink-0 w-[72vw] h-[70svh] px-4 md:w-[28vw] md:h-[75vh] md:px-[3vw]">
                {/* Ghost number */}
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-ink pointer-events-none select-none text-[7rem] md:text-[clamp(12rem,20vw,28rem)]" style={{ opacity: 0.03, lineHeight: 0.8 }}>
                  {project.number}
                </span>
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-3 md:mb-6">
                    <span className="font-mono text-[0.5rem] text-ink-ghost tracking-[0.15em]">{project.number}</span>
                    <span className="w-6 h-px bg-ink-whisper" />
                  </div>
                  <h3 className="font-display text-ink leading-[0.9] tracking-wide text-[1.4rem] md:text-[clamp(2.5rem,4vw,5rem)]">
                    {project.title}
                  </h3>
                  <div className="mt-3 space-y-0.5 md:mt-6 md:space-y-1">
                    <div className="flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-bearing" />
                      <span className="font-mono text-[0.5rem] text-bearing tracking-wider md:text-[0.6rem]">{project.coordinates}</span>
                    </div>
                    <p className="font-mono text-[0.5rem] text-ink-ghost tracking-wider pl-2.5 md:text-[0.6rem] md:pl-3">{project.date}</p>
                    <p className="font-mono text-[0.5rem] text-ink-ghost tracking-wider pl-2.5 md:text-[0.6rem] md:pl-3">{project.seaState}</p>
                  </div>
                  <p className="mt-3 font-sans text-[0.75rem] leading-[1.6] text-ink-soft max-w-[26ch] md:mt-6 md:text-[0.85rem] md:leading-[1.8] md:max-w-[30ch]">
                    {project.description}
                  </p>
                  <div className="mt-3 flex items-center gap-2 md:mt-6">
                    <span className="font-sans text-[0.6rem] font-bold uppercase tracking-[0.15em] text-ink-ghost md:text-[0.7rem] md:tracking-[0.2em]">View Project</span>
                    <span className="w-5 h-px bg-ink-ghost md:w-6" />
                  </div>
                </div>
              </div>

              {/* Image 1 */}
              <div className="shrink-0 w-[80vw] h-[70svh] ml-[2vw] overflow-hidden md:w-[50vw] md:h-[75vh]">
                <img src={project.images[0].src} alt={project.images[0].alt}
                  className="w-full h-full object-cover" style={{ filter: 'saturate(0.9) contrast(1.02)' }} />
              </div>

              {/* Image 2 */}
              <div className="shrink-0 w-[60vw] h-[70svh] ml-[1.5vw] overflow-hidden md:w-[38vw] md:h-[75vh] md:ml-[0.5vw]">
                <img src={project.images[1].src} alt={project.images[1].alt}
                  className="w-full h-full object-cover" style={{ filter: 'saturate(0.9) contrast(1.02)' }} />
              </div>

              {/* Divider between project groups */}
              {i < projects.length - 1 && (
                <div className="shrink-0 w-[4vw] self-stretch flex items-center justify-center md:w-[1vw]">
                  <div className="w-px h-[20%] bg-ink-whisper/30" />
                </div>
              )}
            </div>
          ))}

          {/* Right pad */}
          <div className="shrink-0 w-[8vw] md:w-[12vw]" />
        </div>
      </div>
    </section>
  )
}
