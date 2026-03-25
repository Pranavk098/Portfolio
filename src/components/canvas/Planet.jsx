import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

export default function Planet() {
  const planetRef = useRef()
  const ringRef = useRef()

  useFrame(() => {
    if (planetRef.current) planetRef.current.rotation.y += 0.0003
    if (ringRef.current) ringRef.current.rotation.y += 0.0001
  })

  return (
    <group position={[8, 2, -15]}>
      {/* Core planet */}
      <mesh ref={planetRef}>
        <sphereGeometry args={[4, 64, 64]} />
        <meshStandardMaterial
          color="#0a0a2e"
          emissive="#FF1801"
          emissiveIntensity={0.15}
          roughness={0.8}
          metalness={0.3}
        />
      </mesh>
      {/* Atmosphere wireframe glow */}
      <mesh ref={ringRef}>
        <sphereGeometry args={[4.3, 32, 32]} />
        <meshBasicMaterial
          color="#00e5ff"
          wireframe
          transparent
          opacity={0.04}
        />
      </mesh>
      {/* Glow light */}
      <pointLight color="#FF1801" intensity={1.5} distance={20} decay={2} />
    </group>
  )
}
