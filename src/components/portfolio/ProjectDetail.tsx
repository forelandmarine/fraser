'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { registerGSAP } from '@/lib/animations/gsap-config'
import type { Project } from '@/types'

interface ProjectDetailProps {
  project: Project
}

export default function ProjectDetail({ project }: ProjectDetailProps) {
  const heroRef = useRef<HTMLDivElement>(null)
  const heroImageRef = useRef<HTMLImageElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const metaBarRef = useRef<HTMLDivElement>(null)
  const galleryRefs = useRef<(HTMLDivElement | null)[]>([])
  const storyRefs = useRef<(HTMLDivElement | null)[]>([])

  const year = project.date.split('-')[0]

  useEffect(() => {
    registerGSAP()

    // Hero parallax: image moves slower than scroll
    if (heroRef.current && heroImageRef.current) {
      gsap.to(heroImageRef.current, {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    }

    // Title reveal
    if (titleRef.current) {
      gsap.from(titleRef.current, {
        y: 60,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: 'power3.out',
      })
    }

    // Meta bar reveal
    if (metaBarRef.current) {
      gsap.from(metaBarRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.6,
        ease: 'power3.out',
      })
    }

    // Gallery scroll reveals
    const galleryTriggers = galleryRefs.current
      .filter(Boolean)
      .map((el) => {
        gsap.set(el!, { opacity: 0, scale: 0.97 })
        return ScrollTrigger.create({
          trigger: el!,
          start: 'top 80%',
          once: true,
          onEnter: () => {
            gsap.to(el!, {
              opacity: 1,
              scale: 1,
              duration: 1,
              ease: 'power2.out',
            })
          },
        })
      })

    // Story text reveals
    const storyTriggers = storyRefs.current
      .filter(Boolean)
      .map((el) => {
        gsap.set(el!, { opacity: 0, y: 40 })
        return ScrollTrigger.create({
          trigger: el!,
          start: 'top 85%',
          once: true,
          onEnter: () => {
            gsap.to(el!, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power2.out',
            })
          },
        })
      })

    return () => {
      galleryTriggers.forEach((t) => t.kill())
      storyTriggers.forEach((t) => t.kill())
    }
  }, [project])

  // Split story text into paragraphs for interspersing with gallery
  const storyParagraphs = project.story ? project.story.split('\n').filter(Boolean) : []

  return (
    <article className="bg-paper">
      {/* Hero section */}
      <div ref={heroRef} className="relative h-screen w-full overflow-hidden">
        <Image
          ref={heroImageRef}
          src={project.coverImage}
          alt={project.title}
          fill
          priority
          sizes="100vw"
          className="object-cover scale-[1.1] will-change-transform"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-deep via-deep/30 to-transparent" />

        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 pb-12 md:pb-20">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-bearing">
            {project.category}
          </span>
          <h1
            ref={titleRef}
            className="font-display text-paper leading-[0.9] mt-2"
            style={{ fontSize: 'clamp(3rem, 8vw, 10rem)' }}
          >
            {project.title}
          </h1>
          <div className="flex items-center gap-4 mt-4 font-mono text-xs uppercase tracking-wider text-paper/60">
            <span>{project.location}</span>
            <span className="w-1 h-1 rounded-full bg-paper/40" />
            <span>{year}</span>
          </div>
        </div>
      </div>

      {/* Logbook metadata bar */}
      <div
        ref={metaBarRef}
        className="bg-deep-surface border-t border-deep-light"
      >
        <div className="max-w-7xl mx-auto px-8 md:px-16 py-6 flex flex-wrap gap-8 md:gap-16">
          {project.coordinates && (
            <div>
              <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-deep-muted block mb-1">
                Position
              </span>
              <span className="font-mono text-xs text-bearing">
                {project.coordinates.display}
              </span>
            </div>
          )}
          {project.seaState && (
            <div>
              <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-deep-muted block mb-1">
                Sea State
              </span>
              <span className="font-mono text-xs text-paper/70">
                {project.seaState}
              </span>
            </div>
          )}
          {project.wind && (
            <div>
              <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-deep-muted block mb-1">
                Wind
              </span>
              <span className="font-mono text-xs text-paper/70">
                {project.wind}
              </span>
            </div>
          )}
          {project.client && (
            <div>
              <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-deep-muted block mb-1">
                Client
              </span>
              <span className="font-mono text-xs text-paper/70">
                {project.client}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Gallery + story */}
      <div className="bg-deep py-16 md:py-24">
        {/* Excerpt */}
        <div
          ref={(el) => {
            storyRefs.current[0] = el
          }}
          className="max-w-[65ch] mx-auto px-8 md:px-16 mb-16 md:mb-24"
        >
          <p className="font-sans text-lg md:text-xl leading-relaxed text-paper/80">
            {project.excerpt}
          </p>
        </div>

        {/* Gallery images interspersed with story */}
        {project.gallery.map((item, i) => {
          if (item.type !== 'image') return null
          // Skip the hero image if it's the same as cover
          if (i === 0 && item.layout === 'hero') return null

          const isFullWidth = item.layout === 'full' || item.layout === 'hero'

          return (
            <div key={`gallery-${i}`}>
              <div
                ref={(el) => {
                  galleryRefs.current[i] = el
                }}
                className={`relative overflow-hidden ${
                  isFullWidth
                    ? 'w-full px-0 mb-8 md:mb-12'
                    : 'max-w-5xl mx-auto px-8 md:px-16 mb-8 md:mb-12'
                }`}
              >
                <div className={`relative w-full ${isFullWidth ? 'aspect-[21/9]' : 'aspect-[3/2]'}`}>
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes={isFullWidth ? '100vw' : '(max-width: 768px) 100vw, 64rem'}
                    className="object-cover"
                  />
                </div>
                {item.caption && (
                  <p className="font-mono text-[10px] uppercase tracking-wider text-paper/40 mt-3 px-8 md:px-0">
                    {item.caption}
                  </p>
                )}
              </div>

              {/* Insert story paragraph after certain images */}
              {storyParagraphs[i] && (
                <div
                  ref={(el) => {
                    storyRefs.current[i + 1] = el
                  }}
                  className="max-w-[65ch] mx-auto px-8 md:px-16 my-16 md:my-24"
                >
                  <p className="font-sans text-base md:text-lg leading-relaxed text-paper/70">
                    {storyParagraphs[i]}
                  </p>
                </div>
              )}
            </div>
          )
        })}

        {/* Full story if not split */}
        {storyParagraphs.length === 1 && (
          <div
            ref={(el) => {
              storyRefs.current[storyRefs.current.length] = el
            }}
            className="max-w-[65ch] mx-auto px-8 md:px-16 my-16 md:my-24"
          >
            <p className="font-sans text-base md:text-lg leading-relaxed text-paper/70">
              {project.story}
            </p>
          </div>
        )}
      </div>

      {/* Back to Work */}
      <div className="bg-deep-surface py-16 md:py-24 text-center">
        <Link
          href="/work"
          className="inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-bearing hover:text-paper transition-colors duration-300 group"
        >
          <span className="inline-block w-8 h-px bg-bearing group-hover:w-12 transition-all duration-300" />
          Back to Work
        </Link>
      </div>
    </article>
  )
}
