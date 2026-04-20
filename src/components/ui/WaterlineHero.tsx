'use client'

import { useEffect, useRef, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { registerGSAP } from '@/lib/animations/gsap-config'

export default function WaterlineHero() {
  const sectionRef = useRef<HTMLElement>(null)
  const skyRef = useRef<HTMLDivElement>(null)
  const deepRef = useRef<HTMLDivElement>(null)
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
      const y =
        midY +
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

    // Mount animations
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    tl.fromTo(
      nameRef.current,
      { y: 80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2 }
    )
      .fromTo(
        roleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.5'
      )
      .fromTo(
        scrollCueRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6 },
        '-=0.3'
      )

    // Parallax scroll
    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => {
        const p = self.progress
        if (skyRef.current) {
          gsap.set(skyRef.current, { y: -p * 120 })
        }
        if (deepRef.current) {
          gsap.set(deepRef.current, { y: -p * 40 })
        }
        if (nameRef.current) {
          gsap.set(nameRef.current, { y: -p * 200, opacity: 1 - p * 2 })
        }
        if (roleRef.current) {
          gsap.set(roleRef.current, { opacity: 1 - p * 3 })
        }
        if (scrollCueRef.current) {
          gsap.set(scrollCueRef.current, { opacity: 1 - p * 4 })
        }
      },
    })

    // Start wave animation
    rafRef.current = requestAnimationFrame(animateWave)

    return () => {
      st.kill()
      tl.kill()
      cancelAnimationFrame(rafRef.current)
    }
  }, [animateWave])

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden"
    >
      {/* Sky / top image */}
      <div
        ref={skyRef}
        className="absolute inset-x-0 top-0 h-[55%] will-change-transform"
      >
        <img
          src="/images/hero-aerial.jpg"
          alt="Raven under sail"
          className="h-full w-full object-cover object-center"
        />
      </div>

      {/* Deep / bottom image */}
      <div
        ref={deepRef}
        className="absolute inset-x-0 bottom-0 h-[55%] will-change-transform"
      >
        <img
          src="/images/raven-drone-406.jpg"
          alt="Raven from above on dark ocean"
          className="h-full w-full object-cover object-top"
        />
      </div>

      {/* Animated SVG wave separator */}
      <svg
        className="absolute left-0 top-1/2 -translate-y-1/2 w-full pointer-events-none z-10"
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        style={{ height: '12vh' }}
      >
        <path
          ref={wavePathRef}
          fill="var(--color-paper)"
          fillOpacity="0.08"
          d="M 0 50 L 1440 50 L 1440 100 L 0 100 Z"
        />
      </svg>

      {/* Name + role overlay */}
      <div className="absolute inset-0 z-20 flex flex-col items-start md:items-center justify-center px-5 md:px-0 pointer-events-none">
        <h1
          ref={nameRef}
          className="font-display uppercase text-white leading-[0.85] md:leading-none tracking-tight will-change-transform"
          style={{
            fontSize: 'clamp(3.2rem, 14vw, 18rem)',
            mixBlendMode: 'difference',
          }}
        >
          FRASER<br className="md:hidden" /> EDWARDS
        </h1>
        <p
          ref={roleRef}
          className="font-mono text-white/80 uppercase tracking-[0.35em] mt-4 text-[0.65rem] md:text-xs"
          style={{
            mixBlendMode: 'difference',
          }}
        >
          Photography / Film / Drone
        </p>
      </div>

      {/* Scroll cue */}
      <div
        ref={scrollCueRef}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3 pointer-events-none"
      >
        <span
          className="font-mono text-white/60 uppercase text-[0.65rem] tracking-[0.3em]"
          style={{ mixBlendMode: 'difference' }}
        >
          Scroll to begin
        </span>
        <span className="block w-px h-10 bg-white/40 animate-pulse" />
      </div>
    </section>
  )
}
