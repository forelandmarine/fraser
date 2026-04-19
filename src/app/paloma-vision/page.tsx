import Link from 'next/link'
import Image from 'next/image'
import { projects } from '@/lib/data/projects'

export const metadata = {
  title: 'Paloma Vision | Film / Drone / Production',
  description:
    'Paloma Vision is the film, drone, and commercial production arm of Fraser Edwards Photography. Aerial cinematography, feature films, and commercial content for the marine industry.',
}

const services = [
  {
    title: 'DRONE CINEMATOGRAPHY',
    description:
      'Licensed commercial drone operations for sailing, superyachts, and marine events. From tight tracking shots to sweeping aerials, captured on DJI Mavic 3 and DJI Inspire 3 platforms.',
    marker: '01',
  },
  {
    title: 'FEATURE FILMS',
    description:
      'Long-form documentary and narrative storytelling. End-to-end production from concept development through to final grade, with a focus on adventure, the ocean, and the people who work on it.',
    marker: '02',
  },
  {
    title: 'COMMERCIAL CONTENT',
    description:
      'Branded content, social campaigns, and marketing films for yacht builders, sail makers, and marine brands. Delivered fast, graded to match your brand, ready for every platform.',
    marker: '03',
  },
]

const equipment = [
  'DJI Mavic 3 Cine',
  'DJI Inspire 3',
  'RED Komodo 6K',
  'Phase One IQ4 150MP',
]

export default function PalomaVisionPage() {
  const palomaProjects = projects.filter(
    (p) => p.brand === 'paloma' || p.brand === 'both'
  )

  return (
    <div className="bg-deep text-deep-light">
      {/* Hero */}
      <section className="flex flex-col items-center justify-center min-h-[80vh] px-6 text-center">
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-deep-mid mb-6">
          Film / Drone / Production
        </span>
        <h1
          className="font-display text-white tracking-wider"
          style={{ fontSize: 'clamp(4rem, 12vw, 14rem)' }}
        >
          PALOMA VISION
        </h1>
        <p className="max-w-2xl mt-8 font-sans text-base leading-relaxed text-deep-light/80">
          Paloma Vision is the film, drone, and commercial production arm of
          Fraser Edwards Photography. From aerial cinematography over open ocean
          to feature-length documentaries, we deliver visual storytelling for
          clients in the marine industry, sport, and beyond.
        </p>
      </section>

      {/* Services */}
      <section className="border-t border-deep-surface">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-20 md:py-32">
          <span className="block font-mono text-xs uppercase tracking-[0.3em] text-deep-mid mb-12">
            Services
          </span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {services.map((service) => (
              <div key={service.marker} className="space-y-4">
                <span className="font-mono text-xs text-deep-mid tracking-wider">
                  {service.marker}
                </span>
                <h3 className="font-display text-2xl md:text-3xl text-white tracking-wider">
                  {service.title}
                </h3>
                <p className="font-sans text-sm leading-relaxed text-deep-light/70">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Selected Productions */}
      {palomaProjects.length > 0 && (
        <section className="border-t border-deep-surface">
          <div className="max-w-7xl mx-auto px-6 md:px-10 py-20 md:py-32">
            <span className="block font-mono text-xs uppercase tracking-[0.3em] text-deep-mid mb-12">
              Selected Productions
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {palomaProjects.map((project) => (
                <Link
                  key={project.id}
                  href={`/paloma-vision/${project.slug}`}
                  className="group block"
                >
                  <div className="relative aspect-[16/9] overflow-hidden mb-4">
                    <Image
                      src={project.coverImage}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-deep/30 group-hover:bg-deep/10 transition-colors duration-500" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-display text-xl tracking-wider text-white group-hover:text-signal transition-colors duration-300">
                      {project.title}
                    </h4>
                    <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-deep-mid">
                      {project.location} / {project.date}
                    </p>
                    <p className="font-sans text-sm text-deep-light/60 line-clamp-2 mt-2">
                      {project.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Equipment */}
      <section className="border-t border-deep-surface">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-20 md:py-32">
          <span className="block font-mono text-xs uppercase tracking-[0.3em] text-deep-mid mb-8">
            Equipment
          </span>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {equipment.map((item) => (
              <div
                key={item}
                className="border border-deep-surface px-4 py-5"
              >
                <p className="font-mono text-xs text-deep-light tracking-wide">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-deep-surface">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-20 md:py-32 text-center">
          <h2
            className="font-display text-white tracking-wider mb-8"
            style={{ fontSize: 'clamp(2rem, 5vw, 5rem)' }}
          >
            BOOK PALOMA VISION
          </h2>
          <p className="font-sans text-base text-deep-light/70 max-w-lg mx-auto mb-10">
            Available for drone, film, and production commissions worldwide.
            Get in touch to discuss your project.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-signal text-white font-display text-lg tracking-wider px-12 py-4 hover:bg-signal/90 transition-colors duration-300"
          >
            GET IN TOUCH
          </Link>
        </div>
      </section>
    </div>
  )
}
