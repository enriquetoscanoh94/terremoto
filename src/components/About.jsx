import { motion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1]

const wordContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.065, delayChildren: 0.1 } },
}

const word = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.42, ease: EASE } },
}

export default function About({ t }) {
  const words = t.about.quote.split(' ')

  return (
    <section className="about">
      <div className="container">
        <motion.blockquote
          variants={wordContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >
          {words.map((w, i) => (
            <motion.span
              key={i}
              variants={word}
              style={{ display: 'inline-block', marginRight: '0.3em' }}
            >
              {w}
            </motion.span>
          ))}
        </motion.blockquote>
      </div>
    </section>
  )
}
