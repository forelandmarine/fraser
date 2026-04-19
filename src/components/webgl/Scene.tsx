'use client'

import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { GrainOverlay } from './GrainOverlay'

export function WebGLScene() {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9998,
        pointerEvents: 'none',
      }}
    >
      <Canvas
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 1] }}
      >
        <Suspense fallback={null}>
          <GrainOverlay />
        </Suspense>
      </Canvas>
    </div>
  )
}
