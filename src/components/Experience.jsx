import { motion } from 'framer-motion'

const experiences = [
  {
    role: 'Machine Learning Engineer',
    company: 'ATAI Labs · Hyderabad, India',
    period: 'MAY 2023 — DEC 2023',
    color: 'var(--red)',
    tag: 'S2',
    bullets: [
      <>Built a <strong>synthetic data pipeline</strong> in Blender generating 10K edge-case frames, boosting downstream model accuracy by <strong>14%</strong> and cutting dataset build time by 20%.</>,
      <>Designed a <strong>CNN anomaly classifier</strong> for live surveillance — reduced manual review workload by <strong>70%</strong> and cut mean time-to-alert from minutes to <strong>15 seconds</strong>.</>,
      <>Optimized a <strong>DeepLabV3+ segmentation pipeline</strong> with TensorRT (layer fusion + dynamic batching) — inference latency dropped from 8 s to <strong>1.5 s</strong>, achieving <strong>60 FPS</strong> in production.</>,
      <>Refactored data ingestion to async multiprocessing across a 5-person team, increasing throughput by <strong>38.5%</strong> with full pipeline reproducibility.</>,
    ],
  },
  {
    role: 'Machine Learning Intern',
    company: 'ATAI Labs · Hyderabad, India',
    period: 'AUG 2022 — MAY 2023',
    color: 'var(--gold)',
    tag: 'S1',
    bullets: [
      <>Trained <strong>pixel-level segmentation models</strong> for warehouse occupancy on an 8-class dataset of 24K images, achieving <strong>89.2% accuracy</strong> using InceptionNet with custom class-weighted loss.</>,
      <>Built and curated a <strong>60K+ image dataset</strong> achieving 95% inter-annotator agreement via automated outlier flagging with Scikit-learn.</>,
      <>Implemented <strong>continuous model monitoring</strong> tracking distribution shifts and retraining triggers, maintaining ±3–5% variance in mIoU, accuracy and F1.</>,
      <>Designed an <strong>Albumentations augmentation pipeline</strong> contributing to a 5–10% increase in validation performance under varied lighting and occlusion conditions.</>,
    ],
  },
]

export default function Experience() {
  return (
    <section
      id="experience"
      className="section"
      style={{ background: 'rgba(4,4,14,0.88)', boxShadow: '0 0 80px rgba(4,4,14,0.9)' }}
    >
      <div className="section-inner">
        <div className="section-label">// 01 · CHAMPIONSHIP SEASONS</div>
        <h2 className="section-title">EXPERIENCE</h2>

        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 40 }}>
          {/* Vertical track line */}
          <div style={{
            position: 'absolute',
            left: 19,
            top: 8,
            bottom: 8,
            width: 2,
            background: 'linear-gradient(to bottom, var(--red) 60%, transparent)',
            opacity: 0.35,
          }} />

          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.55, delay: i * 0.15 }}
              style={{ display: 'flex', gap: 28 }}
            >
              {/* Node dot */}
              <div style={{
                flexShrink: 0, width: 40,
                display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 8,
              }}>
                <div style={{
                  width: 14, height: 14, borderRadius: '50%',
                  border: `2px solid ${exp.color}`,
                  background: 'var(--bg)',
                  boxShadow: `0 0 12px ${exp.color}`,
                  flexShrink: 0,
                }} />
              </div>

              {/* Card */}
              <div style={{
                flex: 1,
                background: 'var(--surface)',
                border: '1px solid rgba(255,24,1,0.15)',
                borderLeft: `3px solid ${exp.color}`,
                padding: '28px 32px',
                position: 'relative',
                overflow: 'hidden',
                transition: 'border-color .3s, box-shadow .3s',
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = exp.color
                  e.currentTarget.style.boxShadow = `0 0 28px ${exp.color}22`
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,24,1,0.15)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                {/* Ghost season label */}
                <span style={{
                  position: 'absolute', right: 20, top: 18,
                  fontFamily: 'var(--f-display)', fontSize: 52, fontWeight: 900,
                  color: exp.color, opacity: 0.06, letterSpacing: '0.05em',
                  pointerEvents: 'none', userSelect: 'none',
                }}>{exp.tag}</span>

                <div style={{ marginBottom: 6 }}>
                  <div style={{
                    fontFamily: 'var(--f-mono)', fontSize: 10,
                    color: exp.color, letterSpacing: '0.2em',
                    textTransform: 'uppercase', marginBottom: 8,
                  }}>{exp.period}</div>
                  <div style={{
                    fontFamily: 'var(--f-display)', fontWeight: 700, fontSize: 18,
                    color: 'var(--text)', letterSpacing: '0.06em',
                    textTransform: 'uppercase', marginBottom: 4,
                  }}>{exp.role}</div>
                  <div style={{
                    fontFamily: 'var(--f-mono)', fontSize: 12,
                    color: exp.color, letterSpacing: '0.12em',
                    textTransform: 'uppercase', marginBottom: 22,
                  }}>{exp.company}</div>
                </div>

                <ul style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {exp.bullets.map((b, j) => (
                    <li key={j} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                      <span style={{
                        fontFamily: 'var(--f-mono)', fontSize: 10,
                        color: 'var(--red)', flexShrink: 0, marginTop: 4,
                      }}>▸</span>
                      <span style={{
                        fontFamily: 'var(--f-head)', fontSize: 14,
                        lineHeight: 1.65, color: 'var(--muted)',
                      }}>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
