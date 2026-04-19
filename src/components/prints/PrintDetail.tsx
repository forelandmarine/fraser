'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { registerGSAP } from '@/lib/animations/gsap-config'
import type { Print } from '@/types'

interface PrintDetailProps {
  print: Print
}

export default function PrintDetail({ print }: PrintDetailProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const elementsRef = useRef<(HTMLElement | null)[]>([])

  const [selectedSize, setSelectedSize] = useState(0)
  const [selectedPaper, setSelectedPaper] = useState(0)
  const [selectedFrame, setSelectedFrame] = useState(0)

  const currentSize = print.sizes[selectedSize]
  const remaining = print.edition.total - print.edition.sold

  useEffect(() => {
    registerGSAP()

    const ctx = gsap.context(() => {
      elementsRef.current.forEach((el, i) => {
        if (!el) return
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: i * 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        )
      })
    }, containerRef.current!)

    return () => ctx.revert()
  }, [])

  const addRef = (el: HTMLElement | null, index: number) => {
    elementsRef.current[index] = el
  }

  return (
    <div ref={containerRef} className="space-y-8">
      {/* Edition */}
      <div ref={(el) => addRef(el, 0)} className="opacity-0">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-signal">
          Edition of {print.edition.total}
          <span className="text-deep-muted ml-3">
            {remaining} remaining
          </span>
        </span>
      </div>

      {/* Title */}
      <h1
        ref={(el) => addRef(el, 1)}
        className="font-display text-deep-light leading-none opacity-0"
        style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)' }}
      >
        {print.title.toUpperCase()}
      </h1>

      {/* Location */}
      <p
        ref={(el) => addRef(el, 2)}
        className="font-mono text-xs uppercase tracking-wider text-deep-muted opacity-0"
      >
        {print.coordinates.display}
      </p>

      {/* Story */}
      <p
        ref={(el) => addRef(el, 3)}
        className="font-sans text-base leading-relaxed text-deep-mid max-w-md opacity-0"
      >
        {print.story}
      </p>

      {/* Details grid */}
      <dl
        ref={(el) => addRef(el, 4)}
        className="grid grid-cols-2 gap-x-6 gap-y-3 max-w-md opacity-0"
      >
        <div>
          <dt className="font-mono text-[0.65rem] uppercase tracking-wider text-deep-muted">
            Location
          </dt>
          <dd className="font-mono text-xs text-deep-mid mt-0.5">
            {print.location}
          </dd>
        </div>
        <div>
          <dt className="font-mono text-[0.65rem] uppercase tracking-wider text-deep-muted">
            Date
          </dt>
          <dd className="font-mono text-xs text-deep-mid mt-0.5">
            {new Date(print.dateTaken).toLocaleDateString('en-GB', {
              month: 'long',
              year: 'numeric',
            })}
          </dd>
        </div>
        {print.camera && (
          <div>
            <dt className="font-mono text-[0.65rem] uppercase tracking-wider text-deep-muted">
              Camera
            </dt>
            <dd className="font-mono text-xs text-deep-mid mt-0.5">
              {print.camera}
            </dd>
          </div>
        )}
        <div>
          <dt className="font-mono text-[0.65rem] uppercase tracking-wider text-deep-muted">
            Category
          </dt>
          <dd className="font-mono text-xs text-deep-mid mt-0.5 capitalize">
            {print.category}
          </dd>
        </div>
      </dl>

      {/* Separator */}
      <div
        ref={(el) => addRef(el, 5)}
        className="border-t border-deep-muted/30 opacity-0"
      />

      {/* Size selector */}
      <div ref={(el) => addRef(el, 6)} className="opacity-0">
        <label className="font-mono text-[0.65rem] uppercase tracking-wider text-deep-muted block mb-3">
          Size
        </label>
        <div className="flex flex-wrap gap-2">
          {print.sizes.map((size, i) => (
            <button
              key={size.label}
              onClick={() => {
                setSelectedSize(i)
                setSelectedPaper(0)
                setSelectedFrame(0)
              }}
              className={`font-mono text-xs px-4 py-2 rounded-sm border transition-colors duration-200 ${
                selectedSize === i
                  ? 'border-signal text-signal bg-signal/10'
                  : 'border-deep-muted/40 text-deep-mid hover:border-deep-mid'
              }`}
            >
              {size.label}
            </button>
          ))}
        </div>
      </div>

      {/* Paper selector */}
      <div ref={(el) => addRef(el, 7)} className="opacity-0">
        <label className="font-mono text-[0.65rem] uppercase tracking-wider text-deep-muted block mb-3">
          Paper
        </label>
        <div className="flex flex-wrap gap-2">
          {currentSize?.papers.map((paper, i) => (
            <button
              key={paper}
              onClick={() => setSelectedPaper(i)}
              className={`font-mono text-xs px-4 py-2 rounded-sm border transition-colors duration-200 ${
                selectedPaper === i
                  ? 'border-signal text-signal bg-signal/10'
                  : 'border-deep-muted/40 text-deep-mid hover:border-deep-mid'
              }`}
            >
              {paper}
            </button>
          ))}
        </div>
      </div>

      {/* Frame selector */}
      <div ref={(el) => addRef(el, 8)} className="opacity-0">
        <label className="font-mono text-[0.65rem] uppercase tracking-wider text-deep-muted block mb-3">
          Frame
        </label>
        <div className="flex flex-wrap gap-2">
          {currentSize?.frames.map((frame, i) => (
            <button
              key={frame}
              onClick={() => setSelectedFrame(i)}
              className={`font-mono text-xs px-4 py-2 rounded-sm border transition-colors duration-200 capitalize ${
                selectedFrame === i
                  ? 'border-signal text-signal bg-signal/10'
                  : 'border-deep-muted/40 text-deep-mid hover:border-deep-mid'
              }`}
            >
              {frame}
            </button>
          ))}
        </div>
      </div>

      {/* Price */}
      <div ref={(el) => addRef(el, 9)} className="opacity-0">
        <p
          className="font-display text-deep-light"
          style={{ fontSize: 'clamp(1.8rem, 3vw, 3rem)' }}
        >
          {print.price.currency === 'GBP' ? '£' : '$'}
          {print.price.from.toLocaleString()}
        </p>
        <span className="font-mono text-[0.65rem] text-deep-muted uppercase tracking-wider">
          Starting price, unframed
        </span>
      </div>

      {/* Acquire button */}
      <div ref={(el) => addRef(el, 10)} className="opacity-0">
        <button className="font-display text-sm uppercase tracking-[0.15em] bg-deep-light text-deep px-10 py-4 rounded-sm hover:bg-white transition-colors duration-300 w-full md:w-auto">
          ACQUIRE
        </button>
        <p className="font-mono text-[0.6rem] text-deep-muted mt-3 uppercase tracking-wider">
          Free worldwide shipping. Produced to order in 10-14 days.
        </p>
      </div>
    </div>
  )
}
