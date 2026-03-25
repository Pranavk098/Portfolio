import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useRef, useEffect } from 'react'
import * as THREE from 'three'
import StarField from './StarField'
import Planet from './Planet'
import NeuralNet from './NeuralNet'
import FloatingGrid from './FloatingGrid'

// Camera controller driven by scroll
function CameraRig() {
  const { camera } = useThree()
  const scrollRef = useRef(0)
  const mouseRef = useRef({ x: 0, y: 0 })
  const targetPos = useRef(new THREE.Vector3(0, 0, 12))

  // Scroll zones [scrollFraction, cameraX, cameraY, cameraZ]
  const zones = [
    [0.00, 0, 0, 12],
    [0.18, -3, -2, 10],
    [0.36, 3, -4, 9],
    [0.54, 0, -6, 11],
    [0.72, -2, -8, 10],
    [0.90, 0, -10, 12],
  ]

  useEffect(() => {
    const onScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      scrollRef.current = maxScroll > 0 ? window.scrollY / maxScroll : 0
    }
    const onMouse = (e) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('mousemove', onMouse)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('mousemove', onMouse)
    }
  }, [])

  useFrame(() => {
    const s = scrollRef.current
    // Find which zone we're in and interpolate
    let z0 = zones[0]
    let z1 = zones[zones.length - 1]
    for (let i = 0; i < zones.length - 1; i++) {
      if (s >= zones[i][0] && s <= zones[i + 1][0]) {
        z0 = zones[i]
        z1 = zones[i + 1]
        break
      }
    }
    const t = z1[0] === z0[0] ? 0 : (s - z0[0]) / (z1[0] - z0[0])
    const tx = z0[1] + (z1[1] - z0[1]) * t + mouseRef.current.x * 0.4
    const ty = z0[2] + (z1[2] - z0[2]) * t - mouseRef.current.y * 0.2
    const tz = z0[3] + (z1[3] - z0[3]) * t

    targetPos.current.set(tx, ty, tz)
    camera.position.lerp(targetPos.current, 0.04)
    camera.lookAt(camera.position.x * 0.1, camera.position.y * 0.1 + ty * 0.3, 0)
  })

  return null
}

export default function Scene() {
  return (
    <Canvas
      style={{ width: '100%', height: '100%' }}
      camera={{ position: [0, 0, 12], fov: 60, near: 0.1, far: 200 }}
      gl={{ antialias: true, alpha: false }}
    >
      <color attach="background" args={['#04040e']} />
      <fog attach="fog" args={['#04040e', 80, 160]} />
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={0.6} color="#ffffff" />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#00e5ff" />
      <CameraRig />
      <StarField />
      <Planet />
      <NeuralNet />
      <FloatingGrid />
    </Canvas>
  )
}
