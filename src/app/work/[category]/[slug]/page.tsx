import { projects } from '@/lib/data/projects'
import ProjectDetail from '@/components/portfolio/ProjectDetail'
import { notFound } from 'next/navigation'

export function generateStaticParams() {
  return projects.map((p) => ({
    category: p.category,
    slug: p.slug,
  }))
}

export async function generateMetadata(props: {
  params: Promise<{ category: string; slug: string }>
}) {
  const { slug } = await props.params
  const project = projects.find((p) => p.slug === slug)
  if (!project) return { title: 'Not Found' }
  return {
    title: `${project.title} | Fraser Edwards Photography`,
    description: project.excerpt,
  }
}

export default async function ProjectPage(props: {
  params: Promise<{ category: string; slug: string }>
}) {
  const { slug } = await props.params
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    notFound()
  }

  return <ProjectDetail project={project} />
}
