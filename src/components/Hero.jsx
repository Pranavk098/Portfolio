import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const TYPEWRITER_TEXT = '// MISSION CONTROL · SYSTEM ONLINE'

export default function Hero() {
  const [typed, setTyped] = useState('')
  const [scrollVisible, setScrollVisible] = useState(true)

  // Typewriter effect
  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      if (i < TYPEWRITER_TEXT.length) {
        setTyped(TYPEWRITER_TEXT.slice(0, i + 1))
        i++
      } else {
        clearInterval(interval)
      }
    }, 45)
    return () => clearInterval(interval)
  }, [])

  // Hide scroll hint on scroll
  useEffect(() => {
    const onScroll = () => setScrollVisible(window.scrollY < 100)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section style={{
      height: 'calc(100vh - 92px)',   /* subtract ticker (28px) + nav (64px) */
      minHeight: 600,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      background: 'transparent',
      overflow: 'hidden',
    }}>
      {/* Cyan grid overlay */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
        backgroundImage: `
          linear-gradient(rgba(0,229,255,0.028) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,229,255,0.028) 1px, transparent 1px)`,
        backgroundSize: '60px 60px',
      }} />
      {/* Radial dark vignette at edges only */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
        background: 'radial-gradient(ellipse 90% 70% at 50% 50%, transparent 40%, rgba(4,4,14,0.75) 100%)',
      }} />
      <div style={{
        position: 'relative', zIndex: 2,
        maxWidth: 900,
        width: '100%',
        padding: '0 32px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 28,
      }}>

        {/* Typewriter label */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{
            fontFamily: 'var(--f-mono)',
            fontSize: 11,
            letterSpacing: '0.25em',
            color: 'var(--cyan)',
            minHeight: '1.4em',
          }}
        >
          {typed}
          <span style={{
            display: 'inline-block',
            width: 2,
            height: '1em',
            background: 'var(--cyan)',
            marginLeft: 2,
            verticalAlign: 'text-bottom',
            animation: 'blinkDot 1s step-end infinite',
          }} />
        </motion.div>

        {/* Name block */}
        <div style={{ lineHeight: 0.88 }}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            <span style={{
              fontFamily: 'var(--f-display)',
              fontWeight: 900,
              fontSize: 'clamp(56px, 10vw, 130px)',
              color: '#ffffff',
              display: 'block',
            }}>PRANAV</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.85 }}
          >
            <span style={{
              fontFamily: 'var(--f-display)',
              fontWeight: 900,
              fontSize: 'clamp(56px, 10vw, 130px)',
              color: 'transparent',
              WebkitTextStroke: '1px rgba(255,255,255,0.35)',
              display: 'block',
            }}>KODURU</span>
          </motion.div>
        </div>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          style={{
            fontFamily: 'var(--f-mono)',
            fontSize: 13,
            letterSpacing: '0.45em',
            color: 'var(--muted)',
            textTransform: 'uppercase',
          }}
        >
          <span style={{ color: 'var(--red)' }}>AI</span> / ML ENGINEER
        </motion.div>

        {/* F1 Sector strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.3 }}
          style={{
            display: 'inline-flex',
            border: '1px solid var(--dim)',
            overflow: 'hidden',
          }}
        >
          {[
            { sector: 'S1', label: 'PRODUCTION', value: '2 YRS EXP', color: 'var(--red)' },
            { sector: 'S2', label: 'SHIPPED', value: '10+ PROJECTS', color: 'var(--gold)' },
            { sector: 'S3', label: 'EDUCATION', value: 'MS CS · GMU', color: 'var(--cyan)' },
          ].map((item, i) => (
            <div key={i} style={{
              padding: '10px 20px',
              borderRight: i < 2 ? '1px solid var(--dim)' : 'none',
              textAlign: 'left',
            }}>
              <div style={{
                fontFamily: 'var(--f-mono)',
                fontSize: 9,
                letterSpacing: '0.2em',
                color: 'var(--muted)',
                marginBottom: 4,
              }}>{item.sector} · {item.label}</div>
              <div style={{
                fontFamily: 'var(--f-mono)',
                fontSize: 11,
                color: item.color,
                fontWeight: 500,
              }}>{item.value}</div>
            </div>
          ))}
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.55 }}
          style={{
            display: 'flex',
            gap: 14,
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          <a href="#projects" className="btn btn-primary">VIEW MISSIONS</a>
          <a
            href="/Pranav Koduru Resume.pdf"
            download
            className="btn btn-green"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            RESUME
          </a>
          <a href="#contact" className="btn btn-ghost">OPEN COMMS</a>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        animate={{ opacity: scrollVisible ? 1 : 0, y: scrollVisible ? 0 : 10 }}
        transition={{ duration: 0.4 }}
        style={{
          position: 'absolute',
          bottom: 36, left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: 'var(--f-mono)',
          fontSize: 10, letterSpacing: '0.3em',
          color: 'var(--dim)',
          animation: 'floatBob 2.4s ease-in-out infinite',
          zIndex: 2,
        }}
      >
        SCROLL ↓
      </motion.div>
    </section>
  )
}
