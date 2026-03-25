import { motion } from 'framer-motion'

const projects = [
  {
    code: 'MISSION // VLM-001 · ACTIVE',
    title: 'VLM Defect Detection',
    description:
      'Fine-tuned LLaVA-1.5-7B with QLoRA on MVTec AD for manufacturing defect classification across 15 categories — entire training run on a single consumer GPU.',
    metrics: ['91.6% ACC', '99.1% RECALL', '<12GB VRAM', '~5K SAMPLES'],
    tags: ['PyTorch', 'QLoRA', 'PEFT', 'HuggingFace', 'FastAPI', 'W&B', 'Docker'],
    color: 'var(--red)',
    glow: 'rgba(255,24,1,0.1)',
    border: 'rgba(255,24,1,0.18)',
    hoverBorder: 'rgba(255,24,1,0.45)',
  },
  {
    code: 'MISSION // RAG-002 · DEPLOYED',
    title: 'Personalized Learning Roadmap',
    description:
      'Full-stack RAG platform serving personalized learning roadmaps via GPT-4, Qdrant vector DB, MMR re-ranking, and a React Flow knowledge graph visualization.',
    metrics: ['85% RELEVANCE', '<100ms RETRIEVAL', '3–8s E2E'],
    tags: ['GPT-4', 'Qdrant', 'React', 'FastAPI', 'Vercel', 'Render'],
    color: 'var(--gold)',
    glow: 'rgba(255,215,0,0.08)',
    border: 'rgba(255,215,0,0.2)',
    hoverBorder: 'rgba(255,215,0,0.45)',
  },
  {
    code: 'MISSION // LLM-003 · ACTIVE',
    title: 'Inverta AI — Finance Platform',
    description:
      'Dual-provider LLM router (Claude + OpenAI) with a 3-layer memory system, a zero-API-cost keyword classifier, and a 6-action agentic layer driving real SQL execution.',
    metrics: ['~60% COST CUT', '~40% PROMPT ↓', '6 AGENT ACTIONS'],
    tags: ['Claude API', 'OpenAI', 'PostgreSQL', 'Railway', 'Docker'],
    color: 'var(--cyan)',
    glow: 'rgba(0,229,255,0.08)',
    border: 'rgba(0,229,255,0.18)',
    hoverBorder: 'rgba(0,229,255,0.4)',
  },
  {
    code: 'MISSION // CV-004 · PRODUCTION',
    title: 'TensorRT CV Pipeline',
    description:
      'Production-grade DeepLabV3+ segmentation pipeline with TensorRT layer fusion and dynamic batch scheduling — deployed at ATAI Labs for real-time scene detection.',
    metrics: ['60 FPS LIVE', '8 s → 1.5 s', 'PRODUCTION'],
    tags: ['TensorRT', 'DeepLabV3+', 'OpenCV', 'CUDA', 'Docker'],
    color: 'var(--green)',
    glow: 'rgba(57,255,20,0.07)',
    border: 'rgba(57,255,20,0.15)',
    hoverBorder: 'rgba(57,255,20,0.4)',
  },
]

export default function Projects() {
  return (
    <section
      id="projects"
      className="section"
      style={{ background: 'rgba(4,4,14,0.88)', boxShadow: '0 0 80px rgba(4,4,14,0.9)' }}
    >
      <div className="section-inner">
        <div className="section-label">// 02 · MISSION LOGS</div>
        <h2 className="section-title">PROJECTS</h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 20,
        }}>
          {projects.map((p, i) => (
            <motion.div
              key={p.code}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{
                background: 'var(--surface)',
                border: `1px solid ${p.border}`,
                padding: 30,
                position: 'relative',
                overflow: 'hidden',
                transition: 'transform .3s, border-color .3s, box-shadow .3s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-5px)'
                e.currentTarget.style.borderColor = p.hoverBorder
                e.currentTarget.style.boxShadow = `0 12px 40px ${p.glow}`
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.borderColor = p.border
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              {/* Top accent bar */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                background: `linear-gradient(90deg, ${p.color}, transparent)`,
              }} />

              {/* Mission code */}
              <div style={{
                fontFamily: 'var(--f-mono)', fontSize: 9,
                letterSpacing: '0.3em', color: 'var(--dim)',
                marginBottom: 10, textTransform: 'uppercase',
              }}>{p.code}</div>

              {/* Title */}
              <div style={{
                fontFamily: 'var(--f-display)', fontWeight: 700, fontSize: 16,
                letterSpacing: '0.05em', textTransform: 'uppercase',
                color: 'var(--text)', marginBottom: 12,
              }}>{p.title}</div>

              {/* Description */}
              <p style={{
                fontFamily: 'var(--f-head)', fontSize: 13,
                lineHeight: 1.75, color: 'var(--muted)', marginBottom: 18,
              }}>{p.description}</p>

              {/* Metrics */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 18 }}>
                {p.metrics.map(m => (
                  <span key={m} style={{
                    fontFamily: 'var(--f-mono)', fontSize: 10,
                    padding: '4px 10px',
                    border: `1px solid ${p.border}`,
                    color: p.color,
                    background: p.glow,
                    letterSpacing: '0.05em',
                  }}>{m}</span>
                ))}
              </div>

              {/* Tech stack */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {p.tags.map(tag => (
                  <span key={tag} style={{
                    fontFamily: 'var(--f-mono)', fontSize: 10,
                    color: 'var(--dim)', padding: '3px 8px',
                    border: '1px solid rgba(255,255,255,0.07)',
                    letterSpacing: '0.04em',
                  }}>{tag}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #projects .section-inner > div:last-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
