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
    const segments = 120
    const width = 1440
    const midY = 50
    let d = `M 0 ${midY}`
    for (let i = 1; i <= segments; i++) {
      const x = (i / segments) * width
      const y = midY +
        Math.sin(x * 0.008 + t * 0.8) * 6 +
        Math.sin(x * 0.015 + t * 1.2) * 3 +
        Math.sin(x * 0.003 + t * 0.4) * 8
      d += ` L ${x.toFixed(1)} ${y.toFixed(2)}`
    }
    d += ` L ${width} 100 L 0 100 Z`
    path.setAttribute('d', d)
    rafRef.current = requestAnimationFrame(animateWave)
  }, [])

  useEffect(() => {
    registerGSAP()

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl.fromTo(nameRef.current, { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 1.4 })
      .fromTo(roleRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.6')
      .fromTo(scrollCueRef.current, { opacity: 0 }, { opacity: 1, duration: 0.6 }, '-=0.3')

    gsap.to(nameRef.current, {
      opacity: 0, y: -60, ease: 'none',
      scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: '40% top', scrub: true },
    })

    rafRef.current = requestAnimationFrame(animateWave)
    return () => cancelAnimationFrame(rafRef.current)
  }, [animateWave])

  return (
    <section ref={sectionRef} className="relative h-[100svh] w-full overflow-hidden bg-[#0B0E13]">
      {/* TOP HALF: aerial ocean shot */}
      <div className="absolute inset-x-0 top-0 h-[50%] overflow-hidden">
        <img
          src="/images/hero-aerial.jpg"
          alt="Raven under sail from above"
          className="w-full h-[120%] object-cover object-[center_70%]"
        />
      </div>

      {/* BOTTOM HALF: dark dramatic overhead */}
      <div className="absolute inset-x-0 bottom-0 h-[50%] overflow-hidden">
        <img
          src="/images/raven-drone-406.jpg"
          alt="Raven from above on dark ocean"
          className="w-full h-[120%] object-cover object-[center_30%]"
        />
      </div>

      {/* Wave separator at the midpoint */}
      <svg
        className="absolute left-0 top-1/2 -translate-y-1/2 w-full pointer-events-none z-10"
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        style={{ height: '8vh' }}
      >
        <path
          ref={wavePathRef}
          fill="rgba(255,255,255,0.06)"
          d="M 0 50 L 1440 50 L 1440 100 L 0 100 Z"
        />
      </svg>

      {/* Name + role centered on the waterline */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-5 pointer-events-none">
        <h1
          ref={nameRef}
          className="font-display uppercase text-white text-center will-change-transform"
          style={{
            fontSize: 'clamp(2.6rem, 13vw, 18rem)',
            lineHeight: 0.9,
            mixBlendMode: 'difference',
          }}
        >
          FRASER EDWARDS
        </h1>
        <p
          ref={roleRef}
          className="font-mono text-white/80 uppercase tracking-[0.25em] md:tracking-[0.35em] mt-3 md:mt-4 text-[0.6rem] md:text-xs text-center"
          style={{ mixBlendMode: 'difference' }}
        >
          Photography / Film / Drone
        </p>
      </div>

      {/* Scroll cue */}
      <div
        ref={scrollCueRef}
        className="absolute bottom-6 md:bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="font-mono text-white/50 uppercase text-[0.5rem] tracking-[0.3em]" style={{ mixBlendMode: 'difference' }}>
          Scroll
        </span>
        <span className="block w-px h-6 md:h-10 bg-white/30 animate-pulse" />
      </div>
    </section>
  )
}
