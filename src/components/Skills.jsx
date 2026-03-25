import { motion } from 'framer-motion'

const skillGroups = [
  {
    label: 'ML / AI',
    color: 'var(--red)',
    skills: [
      { name: 'PyTorch', level: 95 },
      { name: 'TensorFlow / Keras', level: 80 },
      { name: 'HuggingFace Transformers', level: 92 },
      { name: 'PEFT / QLoRA', level: 88 },
      { name: 'LangChain / LlamaIndex', level: 85 },
      { name: 'TensorRT / ONNX', level: 78 },
    ],
  },
  {
    label: 'Languages',
    color: 'var(--cyan)',
    skills: [
      { name: 'Python', level: 97 },
      { name: 'C++', level: 72 },
      { name: 'JavaScript / TypeScript', level: 75 },
      { name: 'SQL', level: 82 },
      { name: 'Bash / Shell', level: 78 },
    ],
  },
  {
    label: 'MLOps / Cloud',
    color: 'var(--gold)',
    skills: [
      { name: 'Docker / Kubernetes', level: 82 },
      { name: 'AWS (ECS, Lambda, S3)', level: 80 },
      { name: 'GCP (Cloud Run, GCS)', level: 75 },
      { name: 'MLflow / W&B', level: 88 },
      { name: 'GitHub Actions / CI-CD', level: 83 },
    ],
  },
  {
    label: 'Data & Backend',
    color: 'var(--green)',
    skills: [
      { name: 'FastAPI', level: 90 },
      { name: 'PostgreSQL', level: 78 },
      { name: 'Redis', level: 72 },
      { name: 'Pinecone / Weaviate', level: 82 },
      { name: 'Pandas / NumPy', level: 94 },
    ],
  },
]

export default function Skills() {
  return (
    <section
      id="skills"
      className="section"
      style={{ background: 'rgba(4,4,14,0.82)', boxShadow: '0 0 80px rgba(4,4,14,0.9)' }}
    >
      <div className="section-inner">
        <div className="section-label">// 03 · TELEMETRY READOUT</div>
        <h2 className="section-title">SKILLS</h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 32,
        }}>
          {skillGroups.map((group, gi) => (
            <motion.div
              key={group.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, delay: gi * 0.1 }}
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--dim)',
                padding: 28,
              }}
            >
              {/* Group header */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                marginBottom: 24,
              }}>
                <div style={{
                  width: 3,
                  height: 18,
                  background: group.color,
                }} />
                <span style={{
                  fontFamily: 'var(--f-mono)',
                  fontSize: 10,
                  letterSpacing: '0.2em',
                  color: group.color,
                  textTransform: 'uppercase',
                }}>{group.label}</span>
              </div>

              {/* Skills */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {group.skills.map((skill, si) => (
                  <div key={skill.name}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: 6,
                    }}>
                      <span style={{
                        fontFamily: 'var(--f-mono)',
                        fontSize: 11,
                        color: 'var(--text)',
                        letterSpacing: '0.05em',
                      }}>{skill.name}</span>
                      <span style={{
                        fontFamily: 'var(--f-mono)',
                        fontSize: 9,
                        color: group.color,
                        letterSpacing: '0.1em',
                      }}>{skill.level}%</span>
                    </div>
                    {/* Track */}
                    <div style={{
                      height: 3,
                      background: 'var(--dim)',
                      position: 'relative',
                      overflow: 'hidden',
                    }}>
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.9, delay: gi * 0.1 + si * 0.07, ease: 'easeOut' }}
                        style={{
                          height: '100%',
                          background: group.color,
                          boxShadow: `0 0 8px ${group.color}`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional badges */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{ marginTop: 48 }}
        >
          <div style={{
            fontFamily: 'var(--f-mono)',
            fontSize: 9,
            letterSpacing: '0.25em',
            color: 'var(--muted)',
            marginBottom: 16,
          }}>ALSO FAMILIAR WITH</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {[
              'CUDA', 'Triton', 'Ray', 'Dask', 'Spark', 'Airflow',
              'Prometheus', 'Grafana', 'Terraform', 'React', 'Three.js',
              'OpenCV', 'Scikit-learn', 'XGBoost', 'Jax',
            ].map(badge => (
              <span
                key={badge}
                style={{
                  fontFamily: 'var(--f-mono)',
                  fontSize: 10,
                  letterSpacing: '0.08em',
                  color: 'var(--muted)',
                  border: '1px solid var(--dim)',
                  padding: '5px 12px',
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
              >{badge}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
