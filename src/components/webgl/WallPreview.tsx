'use client'

import { Canvas } from '@react-three/fiber'
import { Environment, OrbitControls, useTexture } from '@react-three/drei'
import { Suspense, useMemo } from 'react'
import * as THREE from 'three'

interface WallPreviewProps {
  imageUrl: string
  widthCm: number
  heightCm: number
  frameColor: string
  wallColor: string
}

function PrintOnWall({
  imageUrl,
  widthCm,
  heightCm,
  frameColor,
  wallColor,
}: WallPreviewProps) {
  const texture = useTexture(imageUrl)
  texture.colorSpace = THREE.SRGBColorSpace

  // Scale: 1 unit = 10cm
  const printWidth = widthCm / 10
  const printHeight = heightCm / 10
  const frameWidth = 0.15
  const frameDepth = 0.08

  const frameColorHex = useMemo(() => {
    const colors: Record<string, string> = {
      'black-oak': '#1A1816',
      'natural-oak': '#C4A87C',
      white: '#F0EDE6',
      aluminium: '#8A8A8A',
      unframed: 'none',
    }
    return colors[frameColor] || '#1A1816'
  }, [frameColor])

  const wallColorHex = useMemo(() => {
    const colors: Record<string, string> = {
      white: '#F4F0EA',
      grey: '#B5B0A8',
      dark: '#1A1816',
    }
    return colors[wallColor] || '#F4F0EA'
  }, [wallColor])

  return (
    <group position={[0, 0, 0]}>
      {/* Wall */}
      <mesh position={[0, 0, -0.1]} receiveShadow>
        <planeGeometry args={[20, 12]} />
        <meshStandardMaterial color={wallColorHex} roughness={0.9} />
      </mesh>

      {/* Frame (if not unframed) */}
      {frameColor !== 'unframed' && (
        <mesh position={[0, 0.5, 0]} castShadow>
          <boxGeometry
            args={[
              printWidth + frameWidth * 2,
              printHeight + frameWidth * 2,
              frameDepth,
            ]}
          />
          <meshStandardMaterial
            color={frameColorHex}
            roughness={0.4}
            metalness={frameColor === 'aluminium' ? 0.8 : 0.1}
          />
        </mesh>
      )}

      {/* Print image */}
      <mesh position={[0, 0.5, frameColor !== 'unframed' ? 0.041 : 0]}>
        <planeGeometry args={[printWidth, printHeight]} />
        <meshStandardMaterial map={texture} roughness={0.3} />
      </mesh>

      {/* Human scale reference (simplified silhouette) */}
      <group position={[printWidth / 2 + 1.5, -2.5, 0]}>
        {/* Body */}
        <mesh position={[0, 0.9, 0]}>
          <capsuleGeometry args={[0.2, 1.0, 4, 8]} />
          <meshStandardMaterial
            color="#3D3A36"
            transparent
            opacity={0.15}
            roughness={1}
          />
        </mesh>
        {/* Head */}
        <mesh position={[0, 1.8, 0]}>
          <sphereGeometry args={[0.15, 8, 8]} />
          <meshStandardMaterial
            color="#3D3A36"
            transparent
            opacity={0.15}
            roughness={1}
          />
        </mesh>
        {/* Label */}
      </group>

      {/* Floor line */}
      <mesh position={[0, -3, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[20, 4]} />
        <meshStandardMaterial color="#12161D" roughness={0.95} />
      </mesh>
    </group>
  )
}

export function WallPreviewCanvas(props: WallPreviewProps) {
  return (
    <div className="w-full aspect-[16/10] bg-deep-surface rounded-sm overflow-hidden">
      <Canvas
        shadows
        camera={{ position: [0, 0, 8], fov: 35 }}
        gl={{ antialias: true, alpha: false }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.3} />
          <spotLight
            position={[0, 4, 4]}
            angle={0.4}
            penumbra={0.8}
            intensity={1.5}
            castShadow
            shadow-mapSize={[512, 512]}
          />
          <pointLight position={[-3, 2, 3]} intensity={0.3} />
          <PrintOnWall {...props} />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI / 1.8}
            minAzimuthAngle={-Math.PI / 6}
            maxAzimuthAngle={Math.PI / 6}
          />
          <Environment preset="studio" />
        </Suspense>
      </Canvas>
    </div>
  )
}
