import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { CONTACT, HERO_IMAGE } from '../data/config.js'
import { WhatsAppIcon } from './Icons.jsx'

const EASE = [0.22, 1, 0.36, 1]
const EASE_OUT = [0.16, 1, 0.3, 1]

// Partículas de luz de escenario — flotantes hacia arriba
const SPARKS = [
  { id: 0, size: 3, left: '9%',  bottom: '18%', delay: 0,   dur: 7.5  },
  { id: 1, size: 2, left: '21%', bottom: '26%', delay: 2.1, dur: 9.2  },
  { id: 2, size: 5, left: '34%', bottom: '12%', delay: 0.8, dur: 6.8  },
  { id: 3, size: 3, left: '51%', bottom: '30%', delay: 3.5, dur: 8.4  },
  { id: 4, size: 2, left: '64%', bottom: '16%', delay: 1.4, dur: 7.1  },
  { id: 5, size: 4, left: '76%', bottom: '22%', delay: 4.2, dur: 10.0 },
  { id: 6, size: 2, left: '87%', bottom: '10%', delay: 0.3, dur: 8.8  },
  { id: 7, size: 3, left: '43%', bottom: '8%',  delay: 2.8, dur: 6.2  },
]

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18, delayChildren: 0.15 } },
}

const badge = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
}

// h1: cada línea sube desde detrás de una máscara
const titleLines = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14 } },
}

const lineInner = {
  hidden: { y: '112%' },
  visible: { y: 0, transition: { duration: 0.9, ease: EASE_OUT } },
}

const item = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
}

export default function Hero({ t }) {
  const ref = useRef(null)
  const shouldReduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 60])

  return (
    <section className="hero" id="inicio" ref={ref}>
      {/* Ken Burns — zoom cinematográfico sobre la foto */}
      <motion.div
        className="hero-bg"
        style={{ backgroundImage: `url('${HERO_IMAGE}')`, y: bgY }}
        initial={{ scale: 1 }}
        animate={shouldReduce ? {} : { scale: 1.07 }}
        transition={{ duration: 24, ease: 'linear' }}
        role="img"
        aria-label="Escenario iluminado en un evento en vivo"
      />

      {/* Partículas de luz de escenario */}
      {!shouldReduce && SPARKS.map((p) => (
        <motion.span
          key={p.id}
          aria-hidden="true"
          style={{
            position: 'absolute',
            width: p.size,
            height: p.size,
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.55)',
            left: p.left,
            bottom: p.bottom,
            zIndex: 1,
            pointerEvents: 'none',
          }}
          animate={{ y: [0, -260, -520], opacity: [0, 0.55, 0] }}
          transition={{
            duration: p.dur,
            delay: p.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}

      <div className="container">
        <motion.div
          className="hero-content"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          <motion.span className="hero-badge" variants={badge}>
            {t.hero.tagline}
          </motion.span>

          <motion.h1 variants={titleLines}>
            <span className="reveal-line">
              <motion.span className="reveal-inner" variants={lineInner}>
                {t.hero.title}
              </motion.span>
            </span>
            <span className="reveal-line">
              <motion.span className="reveal-inner accent" variants={lineInner}>
                {t.hero.titleAccent}
              </motion.span>
            </span>
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

      {/* Indicador de scroll */}
      <motion.div
        className="hero-scroll"
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.9 }}
      >
        <span className="hero-scroll-line" />
      </motion.div>
    </section>
  )
}
