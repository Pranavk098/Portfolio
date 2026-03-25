export default function FloatingGrid() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -18, 0]}>
      <planeGeometry args={[80, 80, 40, 40]} />
      <meshBasicMaterial
        color="#00e5ff"
        wireframe
        transparent
        opacity={0.018}
      />
    </mesh>
  )
}
