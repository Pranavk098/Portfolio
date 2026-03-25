const items = [
  '◼ AI/ML ENGINEER AVAILABLE FOR NEW MISSIONS',
  '◼ MS COMPUTER SCIENCE · GEORGE MASON UNIVERSITY · GPA 3.6',
  '◼ SPECIALIZING IN VLMs · RAG · COMPUTER VISION · MLOPS',
  '◼ 2 YRS PRODUCTION ML · TensorRT · QLoRA · HuggingFace',
  '◼ BASED IN FAIRFAX, VA · OPEN TO REMOTE & HYBRID ROLES',
]

// Duplicate for seamless loop
const track = [...items, ...items]

export default function Ticker() {
  return (
    <div style={{
      background: 'var(--red)',
      color: '#fff',
      fontFamily: 'var(--f-mono)',
      fontSize: 11,
      letterSpacing: '0.15em',
      padding: '6px 0',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      position: 'relative',
      zIndex: 200,
    }}>
      <div style={{
        display: 'inline-block',
        animation: 'tickScroll 40s linear infinite',
      }}>
        {track.map((item, i) => (
          <span key={i} style={{ padding: '0 60px' }}>{item}</span>
        ))}
      </div>

      <style>{`
        @keyframes tickScroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  )
}
