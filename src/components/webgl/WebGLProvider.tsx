'use client'

import dynamic from 'next/dynamic'

const WebGLScene = dynamic(
  () => import('@/components/webgl/Scene').then((m) => ({ default: m.WebGLScene })),
  { ssr: false }
)

export function WebGLProvider() {
  return <WebGLScene />
}
