import { motion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1]
const VP = { once: true, amount: 0.2 }

const header = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const fade = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.58, ease: EASE } },
}

const list = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
}

const pill = {
  hidden: { opacity: 0, scale: 0.88, y: 12 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4, ease: EASE } },
}

export default function Events({ t }) {
  return (
    <section className="events" id="eventos">
      <div className="container">
        <motion.div variants={header} initial="hidden" whileInView="visible" viewport={VP}>
          <motion.span className="tagline" variants={fade}>{t.events.tagline}</motion.span>
          <motion.h2 className="section-title" variants={fade}>{t.events.title}</motion.h2>
        </motion.div>

        <motion.ul
          className="events-list"
          variants={list}
          initial="hidden"
          whileInView="visible"
          viewport={VP}
        >
          {t.events.items.map((item) => (
            <motion.li key={item} variants={pill} whileHover={{ scale: 1.04, transition: { duration: 0.15 } }}>
              {item}
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
