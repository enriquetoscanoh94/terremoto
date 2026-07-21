import { motion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1]
const VP = { once: true, amount: 0.15 }

const header = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const fade = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.58, ease: EASE } },
}

const lineup = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.12 } },
}

const lineupItem = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.42, ease: EASE } },
}

export default function Events({ t }) {
  return (
    <section className="events" id="eventos">
      <div className="container">
        <motion.div variants={header} initial="hidden" whileInView="visible" viewport={VP}>
          <motion.h2 className="section-title" variants={fade}>{t.events.title}</motion.h2>
        </motion.div>

        <motion.ul
          className="events-lineup"
          style={{ listStyle: 'none' }}
          variants={lineup}
          initial="hidden"
          whileInView="visible"
          viewport={VP}
        >
          {t.events.items.map((item) => (
            <motion.li
              key={item}
              className="event-lineup-item"
              variants={lineupItem}
            >
              {/* Fondo rojo que barre de izquierda a derecha */}
              <span className="event-sweep" aria-hidden="true" />
              <span className="event-lineup-text">{item}</span>
              <span className="event-lineup-arrow" aria-hidden="true">→</span>
            </motion.li>
          ))}
        </motion.ul>

        <motion.p
          className="events-note"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={VP}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          {t.events.note}
        </motion.p>
      </div>
    </section>
  )
}
