'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import type { Print } from '@/types'

interface PrintCardProps {
  print: Print
}

export default function PrintCard({ print }: PrintCardProps) {
  const cardRef = useRef<HTMLAnchorElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)

  const handleMouseEnter = () => {
    if (imageRef.current) {
      gsap.to(imageRef.current, {
        scale: 1.05,
        duration: 0.6,
        ease: 'power2.out',
      })
    }
  }

  const handleMouseLeave = () => {
    if (imageRef.current) {
      gsap.to(imageRef.current, {
        scale: 1,
        duration: 0.6,
        ease: 'power2.out',
      })
    }
  }

  const remaining = print.edition.total - print.edition.sold

  return (
    <Link
      ref={cardRef}
      href={`/prints/${print.slug}`}
      className="group relative block overflow-hidden rounded-sm"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Image */}
      <div className="relative aspect-[4/5] overflow-hidden bg-deep-surface">
        <img
          ref={imageRef}
          src={print.image}
          alt={print.title}
          className="h-full w-full object-cover will-change-transform"
        />

        {/* Edition badge */}
        <div className="absolute top-4 right-4 bg-deep-surface/90 backdrop-blur-sm px-3 py-1.5 rounded-sm">
          <span className="font-mono text-xs text-signal">
            {print.edition.sold}/{print.edition.total}
          </span>
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-deep via-deep/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
            <h3
              className="font-display text-deep-light leading-none"
              style={{ fontSize: 'clamp(1.8rem, 3vw, 3rem)' }}
            >
              {print.title.toUpperCase()}
            </h3>
            <p className="font-mono text-xs uppercase tracking-wider text-deep-muted mt-2">
              {print.location}
            </p>
            <div className="flex items-center justify-between mt-4">
              <span className="font-mono text-sm text-deep-light">
                From {print.price.currency === 'GBP' ? '£' : '$'}
                {print.price.from.toLocaleString()}
              </span>
              <span className="font-mono text-xs text-deep-muted">
                {remaining} remaining
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Info below image (always visible) */}
      <div className="pt-4 pb-2">
        <h3 className="font-display text-lg text-deep-light tracking-wide">
          {print.title.toUpperCase()}
        </h3>
        <div className="flex items-center justify-between mt-1">
          <span className="font-mono text-xs text-deep-muted">
            {print.location}
          </span>
          <span className="font-mono text-xs text-deep-mid">
            From {print.price.currency === 'GBP' ? '£' : '$'}
            {print.price.from.toLocaleString()}
          </span>
        </div>
      </div>
    </Link>
  )
}
