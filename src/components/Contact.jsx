import { motion } from 'framer-motion'

const links = [
  {
    label: 'EMAIL',
    value: 'pranavkoduruc@gmail.com',
    href: 'mailto:pranavkoduruc@gmail.com',
    color: 'var(--cyan)',
    borderColor: 'rgba(0,229,255,0.3)',
    hoverBorder: 'rgba(0,229,255,0.5)',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="4" width="20" height="16" rx="2"/>
        <path d="m2 7 10 7 10-7"/>
      </svg>
    ),
  },
  {
    label: 'GITHUB',
    value: 'Pranavk098',
    href: 'https://github.com/Pranavk098',
    color: 'var(--text)',
    borderColor: 'rgba(255,255,255,0.1)',
    hoverBorder: 'rgba(255,255,255,0.3)',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
      </svg>
    ),
  },
  {
    label: 'LINKEDIN',
    value: '/in/pranav-koduru',
    href: 'https://linkedin.com/in/pranav-koduru',
    color: 'var(--cyan)',
    borderColor: 'rgba(0,229,255,0.25)',
    hoverBorder: 'rgba(0,229,255,0.5)',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>
    ),
  },
  {
    label: 'RESUME',
    value: 'Download PDF',
    href: '/Pranav Koduru Resume.pdf',
    download: true,
    color: 'var(--green)',
    borderColor: 'rgba(57,255,20,0.3)',
    hoverBorder: 'rgba(57,255,20,0.6)',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
        <polyline points="7 10 12 15 17 10"/>
        <line x1="12" y1="15" x2="12" y2="3"/>
      </svg>
    ),
  },
]

export default function Contact() {
  return (
    <section
      id="contact"
      className="section"
      style={{ background: 'rgba(4,4,14,0.88)', boxShadow: '0 0 80px rgba(4,4,14,0.9)' }}
    >
      <div className="section-inner" style={{ textAlign: 'center' }}>
        <div className="section-label">// 04 · PIT WALL</div>
        <h2 className="section-title" style={{ display: 'inline-block' }}>CONTACT</h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          style={{
            fontFamily: 'var(--f-head)', fontSize: 15,
            lineHeight: 1.85, color: 'var(--muted)',
            maxWidth: 520, margin: '0 auto 56px',
          }}
        >
          Ready to build something exceptional? I'm actively looking for AI/ML Engineering roles.
          Let's connect and discuss the mission — no detours, straight to the point.
        </motion.p>

        {/* Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          style={{
            display: 'flex', justifyContent: 'center',
            flexWrap: 'wrap', gap: 16, marginBottom: 80,
          }}
        >
          {links.map(link => (
            <a
              key={link.label}
              href={link.href}
              download={link.download || undefined}
              target={!link.download && !link.href.startsWith('mailto') ? '_blank' : undefined}
              rel="noopener noreferrer"
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                fontFamily: 'var(--f-mono)', fontSize: 11,
                letterSpacing: '0.1em', color: 'var(--muted)',
                padding: '14px 28px',
                border: `1px solid ${link.borderColor}`,
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = link.color
                e.currentTarget.style.borderColor = link.hoverBorder
                e.currentTarget.style.background = `${link.color}08`
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = 'var(--muted)'
                e.currentTarget.style.borderColor = link.borderColor
                e.currentTarget.style.background = 'transparent'
              }}
            >
              <span style={{ color: 'inherit', display: 'flex', alignItems: 'center' }}>{link.icon}</span>
              <div style={{ textAlign: 'left' }}>
                <div style={{
                  fontFamily: 'var(--f-mono)', fontSize: 8,
                  letterSpacing: '0.25em', marginBottom: 2, color: 'inherit', opacity: 0.6,
                }}>{link.label}</div>
                <div style={{ fontFamily: 'var(--f-mono)', fontSize: 11, color: 'inherit' }}>
                  {link.value}
                </div>
              </div>
            </a>
          ))}
        </motion.div>

        {/* Footer strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            paddingTop: 32,
            borderTop: '1px solid rgba(255,255,255,0.04)',
            display: 'flex', justifyContent: 'space-between',
            alignItems: 'center', flexWrap: 'wrap', gap: 12,
          }}
        >
          <span style={{
            fontFamily: 'var(--f-mono)', fontSize: 9,
            color: 'var(--dim)', letterSpacing: '0.14em',
          }}>
            PRANAV KODURU &nbsp;·&nbsp; AI/ML ENGINEER &nbsp;·&nbsp; FAIRFAX, VA &nbsp;·&nbsp; 2025
          </span>
          <span style={{
            fontFamily: 'var(--f-mono)', fontSize: 9,
            color: 'var(--dim)', letterSpacing: '0.12em',
          }}>
            F1 · CRICKET · ASTRONOMY · AI &nbsp;|&nbsp;{' '}
            <span style={{ color: 'var(--green)' }}>SYSTEM ONLINE</span>
          </span>
        </motion.div>
      </div>
    </section>
  )
}
