import { motion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1]

export default function About({ t }) {
  return (
    <section className="about">
      <div className="container">
        <motion.blockquote
          initial={{ opacity: 0, scale: 0.92, y: 36 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          "<span>{t.about.quote}</span>"
        </motion.blockquote>
      </div>
    </section>
  )
}
