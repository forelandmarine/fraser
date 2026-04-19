'use client'

import { useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { registerGSAP } from '@/lib/animations/gsap-config'
import type { Project } from '@/types'

interface ProjectGridProps {
  projects: Project[]
}

/**
 * Grid span patterns for the bento layout.
 * Index 0 is the featured/hero card; the rest cycle through varied spans.
 */
const gridSpans = [
  { colSpan: 'md:col-span-7', rowSpan: 'md:row-span-2', aspect: 'aspect-[4/3]' },
  { colSpan: 'md:col-span-5', rowSpan: 'md:row-span-1', aspect: 'aspect-[16/10]' },
  { colSpan: 'md:col-span-5', rowSpan: 'md:row-span-1', aspect: 'aspect-[16/10]' },
  { colSpan: 'md:col-span-6', rowSpan: 'md:row-span-1', aspect: 'aspect-[3/2]' },
  { colSpan: 'md:col-span-6', rowSpan: 'md:row-span-1', aspect: 'aspect-[3/2]' },
  { colSpan: 'md:col-span-4', rowSpan: 'md:row-span-1', aspect: 'aspect-[4/5]' },
  { colSpan: 'md:col-span-8', rowSpan: 'md:row-span-1', aspect: 'aspect-[21/9]' },
]

export default function ProjectGrid({ projects }: ProjectGridProps) {
  const gridRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([])
  const imageRefs = useRef<(HTMLImageElement | null)[]>([])

  // Cursor-based image displacement
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, index: number) => {
      const card = cardRefs.current[index]
      const img = imageRefs.current[index]
      if (!card || !img) return

      const rect = card.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2

      gsap.to(img, {
        x: x * 4,
        y: y * 3,
        duration: 0.4,
        ease: 'power2.out',
      })
    },
    []
  )

  const handleMouseLeave = useCallback((_e: React.MouseEvent, index: number) => {
    const img = imageRefs.current[index]
    if (!img) return
    gsap.to(img, { x: 0, y: 0, duration: 0.6, ease: 'power2.out' })
  }, [])

  // GSAP scroll reveal
  useEffect(() => {
    registerGSAP()

    const cards = cardRefs.current.filter(Boolean)
    if (!cards.length) return

    gsap.set(cards, { opacity: 0, y: 60 })

    const triggers = cards.map((card, i) =>
      ScrollTrigger.create({
        trigger: card!,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to(card!, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: i * 0.08,
            ease: 'power3.out',
          })
        },
      })
    )

    return () => {
      triggers.forEach((t) => t.kill())
    }
  }, [projects])

  return (
    <div
      ref={gridRef}
      className="grid grid-cols-1 md:grid-cols-12 gap-4"
    >
      {projects.map((project, i) => {
        const span = gridSpans[i % gridSpans.length]
        const year = project.date.split('-')[0]

        return (
          <Link
            key={project.id}
            ref={(el) => {
              cardRefs.current[i] = el
            }}
            href={`/work/${project.category}/${project.slug}`}
            className={`relative col-span-1 ${span.colSpan} ${span.rowSpan} overflow-hidden rounded-sm group`}
            onMouseMove={(e) => handleMouseMove(e, i)}
            onMouseLeave={(e) => handleMouseLeave(e, i)}
          >
            {/* Image */}
            <div className={`relative w-full h-full ${i === 0 ? 'min-h-[500px]' : ''} ${span.aspect}`}>
              <Image
                ref={(el) => {
                  imageRefs.current[i] = el
                }}
                src={project.coverImage}
                alt={project.title}
                fill
                sizes={i === 0 ? '(max-width: 768px) 100vw, 58vw' : '(max-width: 768px) 100vw, 42vw'}
                className="object-cover scale-[1.05] will-change-transform transition-transform duration-700 ease-[var(--ease-drift)] group-hover:scale-[1.08]"
              />
            </div>

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-deep/80 via-deep/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Always-visible bottom info bar */}
            <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 bg-gradient-to-t from-deep/60 to-transparent">
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-bearing">
                {project.category}
              </span>
              <h3
                className="font-display text-paper leading-none mt-1"
                style={{ fontSize: 'clamp(1.25rem, 2.5vw, 2.5rem)' }}
              >
                {project.title}
              </h3>
              <span className="font-mono text-[10px] uppercase tracking-wider text-paper/60 mt-1 block">
                {project.location} / {year}
              </span>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
