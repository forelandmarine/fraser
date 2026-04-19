'use client'

import { useFrame, useThree } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`

const dissolveFragShader = `
  precision mediump float;
  uniform float uProgress;
  uniform float uTime;
  uniform vec3 uColor;
  varying vec2 vUv;

  // Simplex-style noise
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  float fbm(vec2 p) {
    float sum = 0.0;
    float amp = 0.5;
    for (int i = 0; i < 4; i++) {
      sum += noise(p) * amp;
      p *= 2.0;
      amp *= 0.5;
    }
    return sum;
  }

  void main() {
    float n = fbm(vUv * 6.0 + uTime * 0.3);
    float edge = smoothstep(uProgress - 0.1, uProgress + 0.1, n);
    float alpha = 1.0 - edge;

    // Bright edge during transition
    float edgeGlow = smoothstep(0.0, 0.05, abs(n - uProgress)) < 1.0 ? 0.0 : 0.0;
    vec3 color = mix(uColor, uColor + 0.1, edgeGlow);

    gl_FragColor = vec4(color, alpha * step(0.001, uProgress));
  }
`

interface TransitionMeshProps {
  progress: number
  active: boolean
  color?: [number, number, number]
}

export function TransitionMesh({
  progress,
  active,
  color = [0.024, 0.043, 0.075],
}: TransitionMeshProps) {
  const materialRef = useRef<THREE.ShaderMaterial>(null)
  const { size } = useThree()

  const uniforms = useMemo(
    () => ({
      uProgress: { value: 0 },
      uTime: { value: 0 },
      uColor: { value: new THREE.Vector3(...color) },
    }),
    [color]
  )

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uProgress.value = progress
      materialRef.current.uniforms.uTime.value = clock.getElapsedTime()
    }
  })

  if (!active && progress === 0) return null

  return (
    <mesh renderOrder={999}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={dissolveFragShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  )
}
