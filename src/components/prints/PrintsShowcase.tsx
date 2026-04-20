'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { registerGSAP } from '@/lib/animations/gsap-config'

interface PrintItem {
  title: string
  image: string
  imageAlt: string
  edition: string
  location: string
  story: string
  details: { label: string; value: string }[]
  price: string
}

const prints: PrintItem[] = [
  {
    title: 'OVERHEAD, RAVEN',
    image: '/images/hero-aerial.jpg',
    imageAlt: 'Aerial view of Raven under sail',
    edition: 'Edition of 25',
    location: '28.1235\u00b0N, 15.4363\u00b0W',
    story:
      'Shot from 120 metres directly above as Raven carved through Atlantic swells at 14 knots. The geometry of the deck plan against infinite blue. A moment of pure symmetry in an asymmetric ocean.',
    details: [
      { label: 'Medium', value: 'Giclée on Hahnemühle Photo Rag' },
      { label: 'Size', value: '120 \u00d7 80 cm' },
      { label: 'Signed', value: 'Hand-signed and numbered' },
      { label: 'Frame', value: 'Shadow box, solid ash' },
    ],
    price: '\u00a31,200',
  },
  {
    title: 'BLACK SAILS',
    image: '/images/raven-rorc-side.jpg',
    imageAlt: 'Raven under black sails during RORC race',
    edition: 'Edition of 15',
    location: '50.7128\u00b0N, 1.8264\u00b0W',
    story:
      'Raven charging upwind in the Solent under full carbon. The black sails against a brooding sky created a monochrome drama that needed no post-processing. Printed at scale, it commands the wall.',
    details: [
      { label: 'Medium', value: 'Giclée on Canson Infinity Platine' },
      { label: 'Size', value: '150 \u00d7 100 cm' },
      { label: 'Signed', value: 'Hand-signed and numbered' },
      { label: 'Frame', value: 'Float mount, black tulipwood' },
    ],
    price: '\u00a31,800',
  },
]

export default function PrintsShowcase() {
  const sectionRef = useRef<HTMLElement>(null)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    registerGSAP()

    const ctx = gsap.context(() => {
      itemRefs.current.forEach((item) => {
        if (!item) return
        gsap.fromTo(
          item,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 80%',
              end: 'top 40%',
              toggleActions: 'play none none none',
            },
          }
        )
      })
    }, sectionRef.current!)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="bg-deep py-20 md:py-48">
      {/* Header */}
      <div className="px-6 md:px-16 mb-12 md:mb-24">
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-deep-muted">
          02 / Limited Editions
        </span>
        <h2
          className="font-display text-deep-light mt-2"
          style={{ fontSize: 'clamp(4rem, 10vw, 12rem)' }}
        >
          COLLECTED{' '}
          <span className="opacity-30">PRINTS</span>
        </h2>
      </div>

      {/* Print items */}
      <div className="space-y-20 md:space-y-48">
        {prints.map((print, i) => {
          const imageOnLeft = i % 2 === 0
          return (
            <div
              key={print.title}
              ref={(el) => { itemRefs.current[i] = el }}
              className={`grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-16 px-6 md:px-16 items-center ${
                !imageOnLeft ? 'md:[direction:rtl]' : ''
              }`}
            >
              {/* Image side */}
              <div className={`${!imageOnLeft ? 'md:[direction:ltr]' : ''}`}>
                <div
                  className="relative p-6 md:p-12 rounded-sm"
                  style={{
                    background:
                      'radial-gradient(ellipse at center, rgba(30,30,30,0.6) 0%, rgba(11,14,19,1) 80%)',
                  }}
                >
                  <div className="relative shadow-2xl shadow-black/60">
                    <img
                      src={print.image}
                      alt={print.imageAlt}
                      className="w-full h-auto rounded-[1px]"
                    />
                  </div>
                  {/* Scale indicator */}
                  <div className="mt-4 flex items-center gap-2">
                    <span className="block h-px flex-1 bg-deep-muted/40" />
                    <span className="font-mono text-[0.6rem] text-deep-muted uppercase tracking-wider">
                      {print.details.find((d) => d.label === 'Size')?.value}
                    </span>
                    <span className="block h-px flex-1 bg-deep-muted/40" />
                  </div>
                </div>
              </div>

              {/* Info side */}
              <div className={`${!imageOnLeft ? 'md:[direction:ltr]' : ''} space-y-6`}>
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-signal">
                  {print.edition}
                </span>

                <h3
                  className="font-display text-deep-light leading-none"
                  style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)' }}
                >
                  {print.title}
                </h3>

                <p className="font-mono text-xs uppercase tracking-wider text-deep-muted">
                  {print.location}
                </p>

                <p className="font-sans text-base leading-relaxed text-deep-mid max-w-md">
                  {print.story}
                </p>

                {/* Details grid */}
                <dl className="grid grid-cols-2 gap-x-6 gap-y-3 max-w-md">
                  {print.details.map((detail) => (
                    <div key={detail.label}>
                      <dt className="font-mono text-[0.65rem] uppercase tracking-wider text-deep-muted">
                        {detail.label}
                      </dt>
                      <dd className="font-mono text-xs text-deep-mid mt-0.5">
                        {detail.value}
                      </dd>
                    </div>
                  ))}
                </dl>

                <p
                  className="font-display text-deep-light"
                  style={{ fontSize: 'clamp(1.8rem, 3vw, 3rem)' }}
                >
                  {print.price}
                </p>

                <button className="font-display text-sm uppercase tracking-[0.15em] bg-deep-light text-deep px-8 py-3 rounded-sm hover:bg-white transition-colors duration-300">
                  ACQUIRE
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
