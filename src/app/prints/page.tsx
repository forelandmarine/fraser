import { prints } from '@/lib/data/prints'
import { exhibitions } from '@/lib/data/exhibitions'
import PrintCard from '@/components/prints/PrintCard'
import ViewingRoomTeaser from '@/components/prints/ViewingRoomTeaser'

export const metadata = {
  title: 'Prints | Fraser Edwards Photography',
  description:
    'Limited edition fine art prints from ocean crossings and offshore racing. Archival quality, signed and numbered, with certificate of authenticity.',
}

export default function PrintsPage() {
  const activeExhibition = exhibitions.find((e) => e.isActive)

  return (
    <section className="bg-deep min-h-screen">
      {/* Header */}
      <div className="px-8 pt-32 pb-8 md:px-16">
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-deep-muted">
          Limited Edition Fine Art Prints
        </span>
        <h1
          className="font-display text-deep-light mt-2"
          style={{ fontSize: 'clamp(4rem, 10vw, 12rem)' }}
        >
          PRINTS
        </h1>
      </div>

      {/* Intro */}
      <div className="px-8 pb-16 md:px-16 max-w-2xl">
        <p className="font-sans text-base leading-relaxed text-deep-mid">
          Each print is produced on archival fine art paper with pigment inks
          rated to 100+ years. Every edition is limited, hand-signed and
          numbered, and ships with a certificate of authenticity. Prints are
          produced to order and shipped worldwide from the UK.
        </p>
      </div>

      {/* Print grid */}
      <div className="px-8 pb-32 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {prints.map((print) => (
            <PrintCard key={print.id} print={print} />
          ))}
        </div>
      </div>

      {/* Viewing room teaser */}
      {activeExhibition && <ViewingRoomTeaser />}
    </section>
  )
}
