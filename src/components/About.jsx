import { motion } from 'framer-motion'

const interests = [
  '🏎 Formula One',
  '🏏 Cricket',
  '🔭 Astronomy',
  '⚡ AI/Tech',
  'Netflix Binges',
  '🍳 Cooking Experiments',
  '🕳️ Tech Rabbit Holes',
]

const dataRows = [
  { label: 'BASE', value: 'Fairfax, VA' },
  { label: 'TEAM', value: 'Open to Hire' },
  { label: 'CHASSIS', value: 'RTX 5070' },
  { label: 'ENGINE', value: 'PyTorch · CUDA' },
  { label: 'STANDINGS', value: 'GPA 3.6 / 4.0' },
  { label: 'CONSTRUCTOR', value: 'GMU × ATAI' },
]

export default function About() {
  return (
    <section
      id="about"
      className="section"
      style={{ background: 'rgba(4,4,14,0.82)', boxShadow: '0 0 80px rgba(4,4,14,0.9)' }}
    >
      <div className="section-inner">
        <div className="section-label">// 00 · DRIVER PROFILE</div>
        <h2 className="section-title">ABOUT</h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '260px 1fr',
          gap: 48,
          alignItems: 'start',
        }}>
          {/* LEFT — Driver Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            style={{
              background: 'var(--surface)',
              border: '1px solid rgba(255,24,1,0.18)',
              padding: 28,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Ghost number */}
            <span style={{
              position: 'absolute',
              top: 8,
              right: 12,
              fontFamily: 'var(--f-display)',
              fontSize: 80,
              fontWeight: 900,
              color: 'var(--red)',
              opacity: 0.08,
              lineHeight: 1,
              userSelect: 'none',
              pointerEvents: 'none',
            }}>01</span>

            {/* Radar */}
            <div style={{
              width: 120,
              height: 120,
              margin: '0 auto 24px',
              position: 'relative',
              borderRadius: '50%',
              background: 'rgba(57,255,20,0.03)',
              border: '1px solid rgba(57,255,20,0.15)',
            }}>
              {/* Concentric circles */}
              {[0.3, 0.55, 0.8].map((scale, i) => (
                <div key={i} style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: `translate(-50%, -50%) scale(${scale})`,
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  border: '1px solid rgba(57,255,20,0.2)',
                }} />
              ))}
              {/* Crosshair */}
              <div style={{
                position: 'absolute',
                top: '50%',
                left: 0,
                right: 0,
                height: 1,
                background: 'rgba(57,255,20,0.15)',
              }} />
              <div style={{
                position: 'absolute',
                left: '50%',
                top: 0,
                bottom: 0,
                width: 1,
                background: 'rgba(57,255,20,0.15)',
              }} />
              {/* Sweep line */}
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: '50%',
                height: 1,
                background: 'linear-gradient(90deg, rgba(57,255,20,0.8), transparent)',
                transformOrigin: '0 50%',
                animation: 'radarSweep 3s linear infinite',
              }} />
              {/* Center dot */}
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: 'var(--green)',
                boxShadow: '0 0 6px var(--green)',
              }} />
            </div>

            {/* Data rows */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {dataRows.map(row => (
                <div key={row.label} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderBottom: '1px solid rgba(255,255,255,0.04)',
                  paddingBottom: 8,
                }}>
                  <span style={{
                    fontFamily: 'var(--f-mono)',
                    fontSize: 9,
                    letterSpacing: '0.15em',
                    color: 'var(--muted)',
                    textTransform: 'uppercase',
                  }}>{row.label}</span>
                  <span style={{
                    fontFamily: 'var(--f-mono)',
                    fontSize: 10,
                    color: 'var(--text)',
                  }}>{row.value}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT — Body text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 36 }}>
              {[
                `I'm a Machine Learning Engineer and CS Master's student at George Mason University, with hands-on experience building production-grade AI systems. My work spans the full ML stack — from fine-tuning large language models and designing RAG pipelines to optimizing inference with TensorRT and deploying containerized services on cloud platforms.`,
                `At ATAI Labs, I shipped vision-language models, multi-agent LLM systems, and high-throughput CV pipelines that reached production. I care about the craft of ML engineering: rigorous experimentation, clean abstractions, and systems that actually perform under real-world conditions.`,
                `Outside of work, I follow Formula One obsessively, keep tabs on AI research, and occasionally go down rabbit holes about astronomy and cosmology. I'm actively looking for AI/ML Engineering roles where I can build things that matter.`,
              ].map((text, i) => (
                <p key={i} style={{
                  fontFamily: 'var(--f-head)',
                  fontSize: 15,
                  lineHeight: 1.75,
                  color: 'var(--muted)',
                }}>{text}</p>
              ))}
            </div>

            {/* Interests */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 10,
            }}>
              {interests.map(tag => (
                <span key={tag} style={{
                  fontFamily: 'var(--f-mono)',
                  fontSize: 10,
                  letterSpacing: '0.08em',
                  color: 'var(--muted)',
                  border: '1px solid var(--dim)',
                  padding: '6px 14px',
                  transition: 'all 0.2s ease',
                  cursor: 'default',
                }}
                  onMouseEnter={e => {
                    e.target.style.color = 'var(--cyan)'
                    e.target.style.borderColor = 'var(--cyan)'
                  }}
                  onMouseLeave={e => {
                    e.target.style.color = 'var(--muted)'
                    e.target.style.borderColor = 'var(--dim)'
                  }}
                >{tag}</span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #about .section-inner > div:last-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
