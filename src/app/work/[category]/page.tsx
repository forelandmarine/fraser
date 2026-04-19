import { projects } from '@/lib/data/projects'
import ProjectGrid from '@/components/portfolio/ProjectGrid'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Category } from '@/types'

const validCategories: Category[] = ['sailing', 'adventure', 'lifestyle', 'feature-films', 'publications']

const categoryLabels: Record<string, string> = {
  sailing: 'Sailing',
  adventure: 'Adventure',
  lifestyle: 'Lifestyle',
  'feature-films': 'Films',
  publications: 'Publications',
}

const categories = [
  { label: 'All', href: '/work' },
  { label: 'Sailing', href: '/work/sailing' },
  { label: 'Adventure', href: '/work/adventure' },
  { label: 'Lifestyle', href: '/work/lifestyle' },
  { label: 'Films', href: '/work/feature-films' },
]

export function generateStaticParams() {
  return validCategories.map((category) => ({ category }))
}

export async function generateMetadata(props: { params: Promise<{ category: string }> }) {
  const { category } = await props.params
  const label = categoryLabels[category] ?? category
  return {
    title: `${label} | Work | Fraser Edwards Photography`,
    description: `${label} photography by Fraser Edwards.`,
  }
}

export default async function CategoryPage(props: {
  params: Promise<{ category: string }>
}) {
  const { category } = await props.params

  if (!validCategories.includes(category as Category)) {
    notFound()
  }

  const filtered = projects.filter((p) => p.category === category)
  const label = categoryLabels[category] ?? category

  return (
    <section className="bg-paper min-h-screen">
      {/* Section header */}
      <div className="px-8 pt-32 pb-8 md:px-16">
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-ink-ghost">
          Portfolio / {label}
        </span>
        <h1
          className="font-display text-ink mt-2"
          style={{ fontSize: 'clamp(4rem, 10vw, 12rem)' }}
        >
          {label.toUpperCase()}
        </h1>
      </div>

      {/* Category filter tabs */}
      <div className="px-8 pb-16 md:px-16">
        <nav className="flex gap-6 border-b border-ink-whisper pb-4">
          {categories.map((cat) => {
            const isActive = cat.href === `/work/${category}`
            return (
              <Link
                key={cat.href}
                href={cat.href}
                className={`font-mono text-xs uppercase tracking-[0.2em] transition-colors duration-300 ${
                  isActive
                    ? 'text-ink border-b-2 border-bearing pb-[calc(1rem+1px)] -mb-[calc(1rem+5px)]'
                    : 'text-ink-ghost hover:text-ink'
                }`}
              >
                {cat.label}
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Project grid */}
      <div className="px-8 pb-32 md:px-16">
        {filtered.length > 0 ? (
          <ProjectGrid projects={filtered} />
        ) : (
          <p className="font-mono text-sm text-ink-ghost">No projects in this category yet.</p>
        )}
      </div>
    </section>
  )
}
