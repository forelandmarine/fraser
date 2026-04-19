import { notFound } from 'next/navigation'
import { prints } from '@/lib/data/prints'
import PrintDetail from '@/components/prints/PrintDetail'
import type { Metadata } from 'next'

export function generateStaticParams() {
  return prints.map((print) => ({ slug: print.slug }))
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await props.params
  const print = prints.find((p) => p.slug === slug)
  if (!print) return { title: 'Print Not Found' }

  return {
    title: `${print.title} | Prints | Fraser Edwards Photography`,
    description: print.story,
  }
}

export default async function PrintDetailPage(props: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await props.params
  const print = prints.find((p) => p.slug === slug)

  if (!print) {
    notFound()
  }

  return (
    <section className="bg-deep min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        {/* Image side: gallery wall simulation */}
        <div className="relative flex items-center justify-center px-8 py-32 lg:py-0 lg:sticky lg:top-0 lg:h-screen">
          <div
            className="relative w-full max-w-lg p-8 md:p-12 rounded-sm"
            style={{
              background:
                'radial-gradient(ellipse at center, rgba(30,30,30,0.6) 0%, rgba(11,14,19,1) 80%)',
            }}
          >
            {/* Print image with shadow for wall effect */}
            <div className="relative shadow-2xl shadow-black/60">
              <img
                src={print.image}
                alt={print.title}
                className="w-full h-auto rounded-[1px]"
              />
            </div>

            {/* Scale indicator */}
            <div className="mt-4 flex items-center gap-2">
              <span className="block h-px flex-1 bg-deep-muted/40" />
              <span className="font-mono text-[0.6rem] text-deep-muted uppercase tracking-wider">
                {print.sizes[0]?.label}
              </span>
              <span className="block h-px flex-1 bg-deep-muted/40" />
            </div>

            {/* Detail crops */}
            {print.detailCrops.length > 0 && (
              <div className="mt-6 grid grid-cols-2 gap-3">
                {print.detailCrops.map((crop, i) => (
                  <div
                    key={i}
                    className="overflow-hidden rounded-sm shadow-lg shadow-black/40"
                  >
                    <img
                      src={crop}
                      alt={`${print.title} detail ${i + 1}`}
                      className="w-full h-auto"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Info side */}
        <div className="px-8 py-16 lg:py-32 lg:px-16 flex flex-col justify-center">
          <PrintDetail print={print} />
        </div>
      </div>
    </section>
  )
}
