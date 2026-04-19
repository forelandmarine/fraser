'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { registerGSAP } from '@/lib/animations/gsap-config'
import Link from 'next/link'
import type { Exhibition, Print } from '@/types'

interface ExhibitionViewProps {
  exhibition: Exhibition
  prints: Print[]
}

function CountdownTimer({ endDate }: { endDate: string }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    function calculate() {
      const end = new Date(endDate).getTime()
      const now = Date.now()
      const diff = Math.max(0, end - now)

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      })
    }

    calculate()
    const interval = setInterval(calculate, 1000)
    return () => clearInterval(interval)
  }, [endDate])

  const pad = (n: number) => String(n).padStart(2, '0')

  return (
    <div className="flex gap-6">
      {[
        { value: timeLeft.days, label: 'Days' },
        { value: timeLeft.hours, label: 'Hrs' },
        { value: timeLeft.minutes, label: 'Min' },
        { value: timeLeft.seconds, label: 'Sec' },
      ].map((unit) => (
        <div key={unit.label} className="text-center">
          <span className="font-display text-2xl md:text-4xl text-deep-light block">
            {pad(unit.value)}
          </span>
          <span className="font-mono text-[0.6rem] uppercase tracking-wider text-deep-muted">
            {unit.label}
          </span>
        </div>
      ))}
    </div>
  )
}

export default function ExhibitionView({
  exhibition,
  prints,
}: ExhibitionViewProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const printRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    registerGSAP()

    const ctx = gsap.context(() => {
      printRefs.current.forEach((el) => {
        if (!el) return

        const image = el.querySelector('.print-image')
        const info = el.querySelector('.print-info')

        // Fade and slide in the image
        if (image) {
          gsap.fromTo(
            image,
            { opacity: 0, x: -60 },
            {
              opacity: 1,
              x: 0,
              duration: 1.2,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: el,
                start: 'top 60%',
                toggleActions: 'play none none none',
              },
            }
          )
        }

        // Fade and slide in the info
        if (info) {
          gsap.fromTo(
            info,
            { opacity: 0, y: 60 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              delay: 0.3,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: el,
                start: 'top 60%',
                toggleActions: 'play none none none',
              },
            }
          )
        }
      })
    }, containerRef.current!)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef}>
      {/* Print presentations */}
      {prints.map((print, i) => {
        const remaining = print.edition.total - print.edition.sold

        return (
          <div
            key={print.id}
            ref={(el) => {
              printRefs.current[i] = el
            }}
            className="min-h-screen grid grid-cols-1 lg:grid-cols-2 items-center"
          >
            {/* Image side */}
            <div className="print-image relative flex items-center justify-center p-8 lg:p-16 opacity-0">
              <div className="relative w-full max-w-xl">
                <img
                  src={print.image}
                  alt={print.title}
                  className="w-full h-auto shadow-2xl shadow-black/80 rounded-[1px]"
                />
              </div>
            </div>

            {/* Info side */}
            <div className="print-info px-8 pb-16 lg:p-16 space-y-6 opacity-0">
              <span className="font-mono text-[0.65rem] uppercase tracking-wider text-deep-muted">
                {String(i + 1).padStart(2, '0')} / {String(prints.length).padStart(2, '0')}
              </span>

              <span className="font-mono text-xs uppercase tracking-[0.2em] text-signal block">
                Edition of {print.edition.total}
                <span className="text-deep-muted ml-3">
                  {remaining} remaining
                </span>
              </span>

              <h2
                className="font-display text-deep-light leading-none"
                style={{ fontSize: 'clamp(2rem, 4vw, 4.5rem)' }}
              >
                {print.title.toUpperCase()}
              </h2>

              <p className="font-mono text-xs uppercase tracking-wider text-deep-muted">
                {print.location}
              </p>

              <p className="font-sans text-base leading-relaxed text-deep-mid max-w-md">
                {print.story}
              </p>

              <p
                className="font-display text-deep-light"
                style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2.5rem)' }}
              >
                From {print.price.currency === 'GBP' ? '£' : '$'}
                {print.price.from.toLocaleString()}
              </p>

              <Link
                href={`/prints/${print.slug}`}
                className="inline-block font-display text-sm uppercase tracking-[0.15em] bg-deep-light text-deep px-8 py-3 rounded-sm hover:bg-white transition-colors duration-300"
              >
                ACQUIRE
              </Link>
            </div>
          </div>
        )
      })}

      {/* Countdown footer */}
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-8 pb-16">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-deep-muted mb-8">
          Exhibition closes
        </p>
        <CountdownTimer endDate={exhibition.endDate} />
        <p className="font-mono text-xs text-deep-muted mt-8 max-w-md leading-relaxed">
          When this exhibition closes, select prints will be permanently retired.
          No further editions will be produced.
        </p>
        <Link
          href="/prints"
          className="mt-10 font-display text-sm uppercase tracking-[0.2em] text-deep-light border border-deep-muted/40 px-10 py-4 rounded-sm hover:bg-deep-light/10 hover:border-deep-light/30 transition-all duration-300"
        >
          VIEW ALL PRINTS
        </Link>
      </div>
    </div>
  )
}
