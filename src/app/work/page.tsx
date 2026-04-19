import { projects } from '@/lib/data/projects'
import ProjectGrid from '@/components/portfolio/ProjectGrid'
import Link from 'next/link'

const categories = [
  { label: 'All', href: '/work' },
  { label: 'Sailing', href: '/work/sailing' },
  { label: 'Adventure', href: '/work/adventure' },
  { label: 'Lifestyle', href: '/work/lifestyle' },
  { label: 'Films', href: '/work/feature-films' },
]

export const metadata = {
  title: 'Work | Fraser Edwards Photography',
  description:
    'Portfolio of maritime and adventure photography. Sailing, lifestyle, and documentary work from oceans worldwide.',
}

export default function WorkPage() {
  return (
    <section className="bg-paper min-h-screen">
      {/* Section header */}
      <div className="px-8 pt-32 pb-8 md:px-16">
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-ink-ghost">
          Portfolio
        </span>
        <h1
          className="font-display text-ink mt-2"
          style={{ fontSize: 'clamp(4rem, 10vw, 12rem)' }}
        >
          WORK
        </h1>
      </div>

      {/* Category filter tabs */}
      <div className="px-8 pb-16 md:px-16">
        <nav className="flex gap-6 border-b border-ink-whisper pb-4">
          {categories.map((cat) => (
            <Link
              key={cat.href}
              href={cat.href}
              className={`font-mono text-xs uppercase tracking-[0.2em] transition-colors duration-300 ${
                cat.label === 'All'
                  ? 'text-ink border-b-2 border-bearing pb-[calc(1rem+1px)] -mb-[calc(1rem+5px)]'
                  : 'text-ink-ghost hover:text-ink'
              }`}
            >
              {cat.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Project grid */}
      <div className="px-8 pb-32 md:px-16">
        <ProjectGrid projects={projects} />
      </div>
    </section>
  )
}
