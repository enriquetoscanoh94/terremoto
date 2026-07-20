import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeftIcon, ChevronRightIcon } from './Icons.jsx'

const photos = [
  'IMG_2074.webp',
  'IMG_5973.webp',
  'E5148967-A9CF-4036-A894-60EA11DE3659.webp',
  'IMG_4985.webp',
  'IMG_5886.webp',
  'IMG_1344.webp',
  'IMG_5236.webp',
  'IMG_0307.webp',
  'IMG_3650.webp',
  'IMG_6726.webp',
  'IMG_7392.webp',
  'IMG_6837.webp',
  'IMG_7099.webp',
  'IMG_2172.webp',
  'IMG_3699.webp',
  'IMG_2469.webp',
]

const AUTOPLAY_MS = 5000
const EASE = [0.22, 1, 0.36, 1]
const VP = { once: true, amount: 0.15 }

// custom = slide direction (+1 forward, -1 backward)
const imgVariants = {
  enter: (d) => ({ opacity: 0, scale: 1.04, x: d * 30 }),
  center: { opacity: 1, scale: 1, x: 0, transition: { duration: 0.58, ease: EASE } },
  exit: (d) => ({ opacity: 0, x: d * -30, transition: { duration: 0.32, ease: EASE } }),
}

const header = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const fade = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
}

export default function Gallery({ t }) {
  const [[current, dir], setPage] = useState([0, 1])
  const [paused, setPaused] = useState(false)
  const thumbsRef = useRef(null)

  const go = (next) => {
    const d = next > current || (current === photos.length - 1 && next === 0) ? 1 : -1
    setPage([next, d])
  }

  const prev = () => go(current > 0 ? current - 1 : photos.length - 1)
  const goNext = () => go(current < photos.length - 1 ? current + 1 : 0)

  useEffect(() => {
    if (paused) return
    const timer = setInterval(goNext, AUTOPLAY_MS)
    return () => clearInterval(timer)
  }, [paused, current])

  useEffect(() => {
    const container = thumbsRef.current
    const thumb = container?.children[current]
    if (!container || !thumb) return
    const scrollTarget = thumb.offsetLeft - (container.offsetWidth - thumb.offsetWidth) / 2
    container.scrollTo({ left: Math.max(0, scrollTarget), behavior: 'smooth' })
  }, [current])

  return (
    <section id="galeria">
      <div className="container">
        <motion.div variants={header} initial="hidden" whileInView="visible" viewport={VP}>
          <motion.span className="tagline" variants={fade}>{t.gallery.tagline}</motion.span>
          <motion.h2 className="section-title" variants={fade}>{t.gallery.title}</motion.h2>
          <motion.p className="section-subtitle" variants={fade}>{t.gallery.subtitle}</motion.p>
        </motion.div>

        <motion.div
          className="carousel"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VP}
          transition={{ duration: 0.65, ease: EASE, delay: 0.2 }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="carousel-frame">
            <AnimatePresence mode="popLayout" custom={dir} initial={false}>
              <motion.img
                key={photos[current]}
                src={`/gallery/${photos[current]}`}
                alt={`${t.gallery.tagline} ${current + 1}`}
                custom={dir}
                variants={imgVariants}
                initial="enter"
                animate="center"
                exit="exit"
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                loading="lazy"
              />
            </AnimatePresence>

            <button className="carousel-nav prev" onClick={prev} aria-label="Anterior">
              <ChevronLeftIcon />
            </button>
            <button className="carousel-nav next" onClick={goNext} aria-label="Siguiente">
              <ChevronRightIcon />
            </button>

            <div className="carousel-counter">
              {current + 1} / {photos.length}
            </div>
          </div>

          <div className="carousel-thumbs" ref={thumbsRef}>
            {photos.map((photo, i) => (
              <button
                key={photo}
                className={`carousel-thumb${i === current ? ' active' : ''}`}
                onClick={() => go(i)}
                aria-label={`${t.gallery.tagline} ${i + 1}`}
              >
                <img src={`/gallery/${photo}`} alt="" loading="lazy" />
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
