'use client'

import { useEffect, useRef, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { registerGSAP } from '@/lib/animations/gsap-config'

export default function WaterlineHero() {
  const sectionRef = useRef<HTMLElement>(null)
  const nameRef = useRef<HTMLHeadingElement>(null)
  const roleRef = useRef<HTMLParagraphElement>(null)
  const scrollCueRef = useRef<HTMLDivElement>(null)
  const wavePathRef = useRef<SVGPathElement>(null)
  const rafRef = useRef<number>(0)

  const animateWave = useCallback(() => {
    const path = wavePathRef.current
    if (!path) return
    const t = performance.now() * 0.001
    const w = 1440
    let d = 'M 0 50'
    for (let i = 1; i <= 100; i++) {
      const x = (i / 100) * w
      const y = 50 + Math.sin(x * 0.008 + t * 0.8) * 6 + Math.sin(x * 0.015 + t * 1.2) * 3 + Math.sin(x * 0.003 + t * 0.4) * 8
      d += ` L ${x.toFixed(0)} ${y.toFixed(1)}`
    }
    d += ` L ${w} 100 L 0 100 Z`
    path.setAttribute('d', d)
    rafRef.current = requestAnimationFrame(animateWave)
  }, [])

  useEffect(() => {
    registerGSAP()
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl.from(nameRef.current, { y: 60, opacity: 0, duration: 1.2 })
      .from(roleRef.current, { opacity: 0, y: 8, duration: 0.6 }, '-=0.5')
      .from(scrollCueRef.current, { opacity: 0, duration: 0.5 }, '-=0.2')

    gsap.to(nameRef.current, {
      opacity: 0, y: -40, ease: 'none',
      scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: '40% top', scrub: true },
    })

    rafRef.current = requestAnimationFrame(animateWave)
    return () => cancelAnimationFrame(rafRef.current)
  }, [animateWave])

  // Mobile-first: design for 390px portrait, enhance for desktop
  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden bg-[#0B0E13]" style={{ height: '100svh' }}>
      {/* Top image: extends past the midpoint to overlap with bottom */}
      <div className="absolute top-0 left-0 right-0 overflow-hidden" style={{ bottom: '46%' }}>
        <img
          src="/images/hero-aerial.jpg"
          alt="Raven under sail from above"
          className="absolute top-0 left-0 w-full h-full object-cover object-center"
        />
        {/* Fade bottom edge of top image into the seam */}
        <div className="absolute bottom-0 left-0 right-0 h-[15%]" style={{ background: 'linear-gradient(to bottom, transparent, #0B0E13)' }} />
      </div>

      {/* Bottom image: extends past the midpoint to overlap with top */}
      <div className="absolute left-0 right-0 bottom-0 overflow-hidden" style={{ top: '46%' }}>
        <img
          src="/images/raven-drone-406.jpg"
          alt="Raven from above on dark ocean"
          className="absolute top-0 left-0 w-full h-full object-cover object-center"
        />
        {/* Fade top edge of bottom image into the seam */}
        <div className="absolute top-0 left-0 right-0 h-[15%]" style={{ background: 'linear-gradient(to top, transparent, #0B0E13)' }} />
      </div>

      {/* Subtle wave at the seam - barely visible, just a texture */}
      <svg
        className="absolute left-0 top-1/2 -translate-y-1/2 w-full pointer-events-none z-10"
        viewBox="0 0 1440 100" preserveAspectRatio="none"
        style={{ height: '4vh' }}
      >
        <path ref={wavePathRef} fill="rgba(255,255,255,0.03)" d="M 0 50 L 1440 50 L 1440 100 L 0 100 Z" />
      </svg>

      {/* Title overlay - centered, readable on 320px+ */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-4 pointer-events-none">
        <h1
          ref={nameRef}
          className="font-display uppercase text-white text-center"
          style={{ fontSize: 'clamp(2.4rem, 12vw, 16rem)', lineHeight: 0.9, mixBlendMode: 'difference' }}
        >
          FRASER EDWARDS
        </h1>
        <p
          ref={roleRef}
          className="font-mono text-white/70 uppercase text-center mt-3 text-[0.55rem] tracking-[0.2em] md:text-xs md:tracking-[0.35em] md:mt-4"
          style={{ mixBlendMode: 'difference' }}
        >
          Photography / Film / Drone
        </p>
      </div>

      {/* Scroll cue */}
      <div ref={scrollCueRef} className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 pointer-events-none md:bottom-10 md:gap-2">
        <span className="font-mono text-white/40 uppercase text-[0.45rem] tracking-[0.25em] md:text-[0.55rem]" style={{ mixBlendMode: 'difference' }}>Scroll</span>
        <span className="block w-px h-5 bg-white/25 animate-pulse md:h-8" />
      </div>
    </section>
  )
}
