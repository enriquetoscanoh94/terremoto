import { useEffect, useState } from 'react'
import { translations } from './data/i18n.js'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Marquee from './components/Marquee.jsx'
import Services from './components/Services.jsx'
import Events from './components/Events.jsx'
import Gallery from './components/Gallery.jsx'
import About from './components/About.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import FloatingActions from './components/FloatingActions.jsx'

export default function App() {
  const [lang, setLang] = useState('es')
  const t = translations[lang]

  // Sincroniza el atributo lang del documento para lectores de pantalla y SEO
  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  return (
    <>
      <Navbar t={t} lang={lang} setLang={setLang} />
      <main>
        <Hero t={t} />
        <Marquee t={t} />
        <Services t={t} />
        <Events t={t} />
        <Gallery t={t} />
        <About t={t} />
        <Contact t={t} />
      </main>
      <Footer t={t} />
      <FloatingActions />
    </>
  )
}
