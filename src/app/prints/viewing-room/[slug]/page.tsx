import { notFound } from 'next/navigation'
import { exhibitions } from '@/lib/data/exhibitions'
import { prints } from '@/lib/data/prints'
import ExhibitionView from '@/components/prints/ExhibitionView'
import Link from 'next/link'
import type { Metadata } from 'next'

export function generateStaticParams() {
  return exhibitions.map((exhibition) => ({ slug: exhibition.slug }))
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await props.params
  const exhibition = exhibitions.find((e) => e.slug === slug)
  if (!exhibition) return { title: 'Exhibition Not Found' }

  return {
    title: `${exhibition.title} | Viewing Room | Fraser Edwards Photography`,
    description: exhibition.description,
  }
}

export default async function ExhibitionPage(props: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await props.params
  const exhibition = exhibitions.find((e) => e.slug === slug)

  if (!exhibition) {
    notFound()
  }

  // Resolve prints for this exhibition
  const exhibitionPrints = exhibition.prints
    .map((printId) => prints.find((p) => p.id === printId))
    .filter(Boolean) as typeof prints

  return (
    <section className="bg-abyss min-h-screen relative">
      {/* Minimal header */}
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6">
        <Link
          href="/prints/viewing-room"
          className="font-mono text-xs uppercase tracking-[0.2em] text-deep-muted hover:text-deep-light transition-colors duration-300"
        >
          &larr; Back
        </Link>
        <span className="font-display text-sm tracking-[0.15em] text-deep-light">
          FRASER EDWARDS
        </span>
      </div>

      {/* Exhibition intro */}
      <div className="flex flex-col items-center justify-center min-h-screen text-center px-8">
        {/* Live indicator */}
        {exhibition.isActive && (
          <div className="flex items-center gap-3 mb-10">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-signal opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-signal" />
            </span>
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-signal">
              Now Showing
            </span>
          </div>
        )}

        <h1
          className="font-display text-deep-light leading-none"
          style={{ fontSize: 'clamp(4rem, 12vw, 14rem)' }}
        >
          {exhibition.title.toUpperCase()}
        </h1>

        {/* Dates */}
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-deep-muted mt-6">
          {new Date(exhibition.startDate).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}{' '}
          &mdash;{' '}
          {new Date(exhibition.endDate).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}
        </p>

        {/* Curator note */}
        {exhibition.curatorNote && (
          <blockquote className="font-sans text-base leading-relaxed text-deep-mid mt-10 max-w-2xl italic">
            &ldquo;{exhibition.curatorNote}&rdquo;
          </blockquote>
        )}

        {/* Scroll indicator */}
        <div className="mt-16 font-mono text-[0.6rem] uppercase tracking-[0.3em] text-deep-muted animate-pulse">
          Scroll to view
        </div>
      </div>

      {/* Exhibition prints, scroll-driven */}
      <ExhibitionView exhibition={exhibition} prints={exhibitionPrints} />
    </section>
  )
}
