import { motion } from 'framer-motion'
import { SERVICE_ICONS } from '../data/icons-map.js'

const EASE = [0.22, 1, 0.36, 1]
const VP = { once: true, amount: 0.12 }

const header = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const fade = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
}

const grid = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
}

const card = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.52, ease: EASE } },
}

export default function Services({ t }) {
  return (
    <section id="servicios">
      <div className="container">
        <motion.div variants={header} initial="hidden" whileInView="visible" viewport={VP}>
          <motion.span className="tagline" variants={fade}>{t.services.tagline}</motion.span>
          <motion.h2 className="section-title" variants={fade}>{t.services.title}</motion.h2>
          <motion.p className="section-subtitle" variants={fade}>{t.services.subtitle}</motion.p>
        </motion.div>

        <motion.div
          className="services-grid"
          variants={grid}
          initial="hidden"
          whileInView="visible"
          viewport={VP}
        >
          {t.services.items.map((item) => {
            const Icon = SERVICE_ICONS[item.id]
            return (
              <motion.article
                className="service-card"
                key={item.id}
                variants={card}
                whileHover={{ y: -6, transition: { duration: 0.22, ease: EASE } }}
              >
                <div className="service-icon">{Icon && <Icon />}</div>
                <h3>{item.name}</h3>
                <p>{item.desc}</p>
              </motion.article>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
