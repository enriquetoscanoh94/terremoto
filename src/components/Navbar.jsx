import { useEffect, useMemo, useState } from 'react'
import { MenuIcon, CloseIcon } from './Icons.jsx'

export default function Navbar({ t, lang, setLang }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = useMemo(
    () => [
      { href: '#servicios', label: t.nav.services },
      { href: '#eventos', label: t.nav.events },
      { href: '#galeria', label: t.nav.gallery },
      { href: '#contacto', label: t.nav.contact },
    ],
    [t.nav]
  )

  return (
    <header className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <div className="container navbar-inner">
        <a href="#inicio" className="navbar-logo">
          <img src={`${import.meta.env.BASE_URL}logo.png`} alt="Terremoto Sound & Lighting" />
        </a>

        <nav>
          <ul className={`navbar-links${menuOpen ? ' open' : ''}`}>
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href} onClick={() => setMenuOpen(false)}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div className="lang-toggle">
            <button
              className={lang === 'es' ? 'active' : ''}
              onClick={() => setLang('es')}
              aria-label="Español"
            >
              ES
            </button>
            <button
              className={lang === 'en' ? 'active' : ''}
              onClick={() => setLang('en')}
              aria-label="English"
            >
              EN
            </button>
          </div>
          <button
            className="menu-btn"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>
    </header>
  )
}
