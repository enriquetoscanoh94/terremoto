import { motion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1]
const VP = { once: true, amount: 0.1 }

const header = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const fade = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
}

const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.055, delayChildren: 0.05 } },
}

const rowVariant = {
  hidden: { opacity: 0, x: -28 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.44, ease: EASE } },
}

export default function Services({ t }) {
  return (
    <section id="servicios">
      <div className="container">
        <motion.div variants={header} initial="hidden" whileInView="visible" viewport={VP}>
          <motion.h2 className="section-title" variants={fade}>{t.services.title}</motion.h2>
          <motion.p className="section-subtitle" variants={fade}>{t.services.subtitle}</motion.p>
        </motion.div>

        <motion.div
          className="services-list"
          variants={listVariants}
          initial="hidden"
          whileInView="visible"
          viewport={VP}
        >
          {t.services.items.map((item, i) => (
            <motion.article
              className="service-row"
              key={item.id}
              variants={rowVariant}
            >
              <span className="service-num">0{i + 1}</span>
              <h3 className="service-row-name">{item.name}</h3>
              <p className="service-row-desc">{item.desc}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
