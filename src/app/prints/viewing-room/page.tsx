import { exhibitions } from '@/lib/data/exhibitions'
import Link from 'next/link'

export const metadata = {
  title: 'Viewing Room | Fraser Edwards Photography',
  description:
    'Digital viewing room for limited edition fine art print exhibitions.',
}

export default function ViewingRoomPage() {
  const activeExhibition = exhibitions.find((e) => e.isActive)

  return (
    <section className="bg-deep min-h-screen">
      {/* Header */}
      <div className="px-8 pt-32 pb-16 md:px-16">
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-deep-muted">
          Digital Exhibition Space
        </span>
        <h1
          className="font-display text-deep-light mt-2"
          style={{ fontSize: 'clamp(4rem, 10vw, 12rem)' }}
        >
          VIEWING ROOM
        </h1>
      </div>

      {activeExhibition ? (
        <div className="px-8 pb-32 md:px-16">
          {/* Active exhibition */}
          <div className="relative overflow-hidden rounded-sm">
            {/* Cover image */}
            <div className="relative aspect-[21/9] overflow-hidden">
              <img
                src={activeExhibition.coverImage}
                alt={activeExhibition.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep via-deep/60 to-transparent" />
            </div>

            {/* Exhibition info overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
              {/* Live indicator */}
              <div className="flex items-center gap-3 mb-6">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-signal opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-signal" />
                </span>
                <span className="font-mono text-xs uppercase tracking-[0.3em] text-signal">
                  Now Showing
                </span>
              </div>

              <h2
                className="font-display text-deep-light leading-none"
                style={{ fontSize: 'clamp(3rem, 8vw, 10rem)' }}
              >
                {activeExhibition.title.toUpperCase()}
              </h2>

              {/* Dates */}
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-deep-muted mt-4">
                {new Date(activeExhibition.startDate).toLocaleDateString(
                  'en-GB',
                  { day: 'numeric', month: 'long', year: 'numeric' }
                )}{' '}
                &mdash;{' '}
                {new Date(activeExhibition.endDate).toLocaleDateString(
                  'en-GB',
                  { day: 'numeric', month: 'long', year: 'numeric' }
                )}
              </p>

              {/* Description */}
              <p className="font-sans text-base leading-relaxed text-deep-mid mt-6 max-w-2xl">
                {activeExhibition.description}
              </p>

              {/* CTA */}
              <Link
                href={`/prints/viewing-room/${activeExhibition.slug}`}
                className="inline-block mt-8 font-display text-sm uppercase tracking-[0.2em] text-deep-light border border-deep-muted/40 px-10 py-4 rounded-sm hover:bg-deep-light/10 hover:border-deep-light/30 transition-all duration-300"
              >
                ENTER
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="px-8 pb-32 md:px-16 text-center max-w-lg mx-auto">
          <p className="font-sans text-base text-deep-mid leading-relaxed mb-8">
            No exhibition is currently showing. Sign up to be notified when the
            next viewing room opens.
          </p>
          <form
            className="flex gap-3"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 font-mono text-xs bg-deep-surface border border-deep-muted/40 text-deep-light px-4 py-3 rounded-sm placeholder:text-deep-muted focus:outline-none focus:border-signal/50 transition-colors"
            />
            <button
              type="submit"
              className="font-display text-sm uppercase tracking-[0.15em] bg-deep-light text-deep px-6 py-3 rounded-sm hover:bg-white transition-colors duration-300"
            >
              NOTIFY ME
            </button>
          </form>
        </div>
      )}
    </section>
  )
}
