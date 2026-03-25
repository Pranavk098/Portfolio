import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function NeuralNet() {
  const groupRef = useRef()

  // Build nodes
  const nodes = useMemo(() => {
    const n = []
    const colors = ['#FF1801', '#FFD700', '#00e5ff', '#39ff14']
    for (let i = 0; i < 20; i++) {
      n.push({
        pos: new THREE.Vector3(
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 8
        ),
        color: colors[Math.floor(Math.random() * colors.length)],
        phase: Math.random() * Math.PI * 2
      })
    }
    return n
  }, [])

  // Build edges (connect nearby nodes)
  const edges = useMemo(() => {
    const e = []
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (nodes[i].pos.distanceTo(nodes[j].pos) < 5) {
          e.push([nodes[i].pos, nodes[j].pos])
        }
      }
    }
    return e
  }, [nodes])

  // Edge geometry
  const lineGeometry = useMemo(() => {
    const pts = []
    edges.forEach(([a, b]) => {
      pts.push(a, b)
    })
    const geo = new THREE.BufferGeometry().setFromPoints(pts)
    return geo
  }, [edges])

  useFrame(() => {
    if (!groupRef.current) return
    groupRef.current.rotation.y += 0.0015
    groupRef.current.rotation.x += 0.0005
  })

  return (
    <group ref={groupRef} position={[-4, -8, 2]}>
      {/* Edges */}
      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial color="#00e5ff" transparent opacity={0.12} />
      </lineSegments>
      {/* Nodes */}
      {nodes.map((node, i) => (
        <mesh key={i} position={node.pos}>
          <sphereGeometry args={[0.08, 8, 8]} />
          <meshStandardMaterial
            color={node.color}
            emissive={node.color}
            emissiveIntensity={0.8}
          />
        </mesh>
      ))}
    </group>
  )
}
