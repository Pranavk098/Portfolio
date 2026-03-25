import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function StarField() {
  const ref = useRef()
  const count = 3000

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    const palette = [
      new THREE.Color('#ffffff'),
      new THREE.Color('#00e5ff'),
      new THREE.Color('#FFD700'),
    ]
    for (let i = 0; i < count; i++) {
      // Spherical distribution — keep stars closer so fog doesn't kill them
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 18 + Math.random() * 28   // 18–46 units (well inside fog at 80)
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = r * Math.cos(phi)

      const rand = Math.random()
      const c = rand < 0.8 ? palette[0] : rand < 0.92 ? palette[1] : palette[2]
      col[i * 3] = c.r
      col[i * 3 + 1] = c.g
      col[i * 3 + 2] = c.b
    }
    return [pos, col]
  }, [])

  useFrame(() => {
    if (ref.current) ref.current.rotation.y += 0.00008
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.18}
        vertexColors
        sizeAttenuation
        transparent
        opacity={0.95}
      />
    </points>
  )
}
