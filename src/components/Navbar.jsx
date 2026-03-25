import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      backdropFilter: 'blur(16px)',
      background: 'rgba(4,4,14,0.85)',
      borderBottom: scrolled ? '1px solid rgba(255,24,1,0.15)' : '1px solid transparent',
      transition: 'border-color 0.3s ease',
      padding: '0 32px',
    }}>
      <div style={{
        maxWidth: 1180,
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 64,
      }}>
        {/* Logo */}
        <a href="#" style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
          <span style={{
            fontFamily: 'var(--f-display)',
            fontWeight: 700,
            fontSize: 18,
            color: 'var(--text)',
            letterSpacing: '0.05em',
          }}>PK.AI</span>
          <span style={{
            fontFamily: 'var(--f-mono)',
            fontSize: 10,
            color: 'var(--muted)',
            letterSpacing: '0.1em',
          }}>.v2.0</span>
        </a>

        {/* Center links — desktop */}
        <ul style={{
          display: 'flex',
          gap: 36,
          alignItems: 'center',
        }} className="nav-links-desktop">
          {navLinks.map(link => (
            <li key={link.href}>
              <a
                href={link.href}
                style={{
                  fontFamily: 'var(--f-mono)',
                  fontSize: 11,
                  letterSpacing: '0.12em',
                  color: 'var(--muted)',
                  textTransform: 'uppercase',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={e => e.target.style.color = 'var(--cyan)'}
                onMouseLeave={e => e.target.style.color = 'var(--muted)'}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right: availability indicator */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}>
          <span style={{
            width: 7,
            height: 7,
            borderRadius: '50%',
            background: 'var(--green)',
            display: 'inline-block',
            animation: 'blinkDot 2s ease-in-out infinite',
            boxShadow: '0 0 6px var(--green)',
          }} />
          <span style={{
            fontFamily: 'var(--f-mono)',
            fontSize: 10,
            letterSpacing: '0.12em',
            color: 'var(--green)',
            textTransform: 'uppercase',
          }}>Available</span>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              marginLeft: 16,
              display: 'none',
              flexDirection: 'column',
              gap: 4,
              padding: 4,
            }}
            className="hamburger"
            aria-label="Toggle menu"
          >
            {[0, 1, 2].map(i => (
              <span key={i} style={{
                display: 'block',
                width: 20,
                height: 2,
                background: 'var(--text)',
                transition: 'all 0.25s ease',
              }} />
            ))}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              borderTop: '1px solid var(--dim)',
              overflow: 'hidden',
            }}
          >
            <ul style={{ padding: '16px 0', display: 'flex', flexDirection: 'column', gap: 0 }}>
              {navLinks.map(link => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    style={{
                      display: 'block',
                      fontFamily: 'var(--f-mono)',
                      fontSize: 12,
                      letterSpacing: '0.12em',
                      color: 'var(--muted)',
                      textTransform: 'uppercase',
                      padding: '12px 0',
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={e => e.target.style.color = 'var(--cyan)'}
                    onMouseLeave={e => e.target.style.color = 'var(--muted)'}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .nav-links-desktop { display: none !important; }
          .hamburger { display: flex !important; }
        }
      `}</style>
    </nav>
  )
}
