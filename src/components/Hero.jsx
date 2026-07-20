import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { CONTACT, HERO_IMAGE } from '../data/config.js'
import { WhatsAppIcon } from './Icons.jsx'

const EASE = [0.22, 1, 0.36, 1]

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.16, delayChildren: 0.12 } },
}

const item = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.72, ease: EASE } },
}

export default function Hero({ t }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 60])

  return (
    <section className="hero" id="inicio" ref={ref}>
      <motion.div
        className="hero-bg"
        style={{ backgroundImage: `url('${HERO_IMAGE}')`, y: bgY }}
        role="img"
        aria-label="Escenario iluminado en un evento en vivo"
      />
      <div className="container">
        <motion.div
          className="hero-content"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          <motion.span className="tagline" variants={item}>
            {t.hero.tagline}
          </motion.span>

          <motion.h1 variants={item}>
            {t.hero.title} <span>{t.hero.titleAccent}</span>
          </motion.h1>

          <motion.p variants={item}>{t.hero.subtitle}</motion.p>

          <motion.div className="hero-actions" variants={item}>
            <a
              className="btn btn-primary"
              href={CONTACT.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon size={20} />
              {t.hero.cta}
            </a>
            <a className="btn btn-ghost" href="#servicios">
              {t.hero.ctaSecondary}
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
