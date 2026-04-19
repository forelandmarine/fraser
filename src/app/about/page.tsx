import Image from 'next/image'
import Link from 'next/link'

export const metadata = {
  title: 'About | Fraser Edwards Photography',
  description:
    'International adventure and maritime photographer, filmmaker, and drone pilot. Specialist in onboard and aerial imagery for superyachts.',
}

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[60vh] w-full overflow-hidden">
        <Image
          src="/images/raven-side.jpg"
          alt="Fraser Edwards on location"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center mix-blend-difference">
          <h1
            className="font-display text-white tracking-wider text-center select-none"
            style={{ fontSize: 'clamp(4rem, 10vw, 12rem)' }}
          >
            FRASER EDWARDS
          </h1>
        </div>
      </section>

      {/* Bio + Details */}
      <section className="bg-paper">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-20 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-16 lg:gap-24">
            {/* Left: Bio */}
            <div className="space-y-6">
              <span className="block font-mono text-xs uppercase tracking-[0.3em] text-ink-ghost">
                About
              </span>

              <p className="font-sans text-lg leading-relaxed text-ink-soft">
                Fraser Edwards is an international adventure and maritime
                photographer based in London. Specialising in onboard and drone
                imagery for sailing yachts and superyachts from 24 to 60 metres,
                his work spans ocean crossings, regattas, sea trials, and yard
                documentation across the world.
              </p>

              <p className="font-sans text-base leading-relaxed text-ink-soft">
                As a filmmaker and licensed commercial drone pilot, Fraser
                operates across stills, motion, and aerial platforms to deliver
                complete visual coverage of a campaign or project. He is the
                onboard reporter for Andoo Comanche, documenting their offshore
                racing programme including the Rolex Sydney Hobart Yacht Race.
              </p>

              <p className="font-sans text-base leading-relaxed text-ink-soft">
                His editorial work has appeared in Yachting World, Seahorse
                Magazine, and MySailing, while commercial clients include Baltic
                Yachts, RORC, North Sails, Claasen Shipyards, and Rondal.
              </p>

              <p className="font-sans text-base leading-relaxed text-ink-soft">
                Paloma Vision is the production arm of the practice, handling
                film, drone cinematography, and commercial content for the
                marine industry and beyond.
              </p>

              <p className="font-sans text-base leading-relaxed text-ink-soft">
                Available for commissions worldwide. Currently booking for
                regattas, deliveries, and yard documentation.
              </p>
            </div>

            {/* Right: Details */}
            <div className="space-y-10">
              {/* Represented by */}
              <div>
                <h3 className="font-sans font-bold text-xs uppercase tracking-[0.2em] text-ink-ghost mb-3">
                  Represented by
                </h3>
                <p className="font-sans text-sm text-ink-soft">
                  Six Degrees Reps
                </p>
              </div>

              {/* Equipment */}
              <div>
                <h3 className="font-sans font-bold text-xs uppercase tracking-[0.2em] text-ink-ghost mb-3">
                  Equipment
                </h3>
                <ul className="space-y-1.5">
                  {[
                    'DJI Mavic 3',
                    'Phase One IQ4 150MP',
                    'RED Komodo 6K',
                  ].map((item) => (
                    <li
                      key={item}
                      className="font-mono text-xs text-ink-soft tracking-wide"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Selected Clients */}
              <div>
                <h3 className="font-sans font-bold text-xs uppercase tracking-[0.2em] text-ink-ghost mb-3">
                  Selected Clients
                </h3>
                <ul className="space-y-1.5">
                  {[
                    'Baltic Yachts',
                    'Royal Ocean Racing Club',
                    'Andoo Comanche',
                    'Yachting World',
                    'Claasen Shipyards',
                    'North Sails',
                    'Rondal',
                  ].map((client) => (
                    <li
                      key={client}
                      className="font-sans text-sm text-ink-soft"
                    >
                      {client}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Paloma Vision */}
      <section className="bg-deep text-deep-light">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-20 md:py-32">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-12 items-center">
            <div>
              <span className="block font-mono text-xs uppercase tracking-[0.3em] text-deep-mid mb-4">
                Production
              </span>
              <h2
                className="font-display text-white tracking-wider"
                style={{ fontSize: 'clamp(3rem, 5vw, 5rem)' }}
              >
                PALOMA VISION
              </h2>
            </div>
            <div className="space-y-4">
              <p className="font-sans text-base leading-relaxed text-deep-light">
                Paloma Vision is the film, drone, and commercial production arm
                of Fraser Edwards Photography. From aerial cinematography to
                feature-length documentaries, Paloma Vision delivers end-to-end
                visual storytelling for clients in the marine industry, sport,
                and beyond.
              </p>
              <Link
                href="/paloma-vision"
                className="inline-block font-display text-lg tracking-wider text-signal hover:text-white transition-colors duration-300"
              >
                EXPLORE PALOMA VISION &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
