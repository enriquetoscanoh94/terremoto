import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence, MotionConfig } from 'framer-motion'
import { CloseIcon, ChevronLeftIcon, ChevronRightIcon } from './Icons.jsx'

// ── Datos ────────────────────────────────────────────────────────────────────
const photos = [
  '03DB010D-D1DD-4C0E-B559-16DF3526B2A0.webp',
  '251DE61E-51DE-4F17-8ED3-E86EE782E6E0.webp',
  '2d6baffc-836b-45f8-b902-7f2a741c631f.webp',
  '59563152176__0E0819FF-B4C4-4D47-B1CC-2F04A2E1697E.webp',
  '7d4f6831-3583-4c2c-b234-89fa806fd069.webp',
  '8299fcc7-d9e8-49ee-a5d1-bc2878d29eda.webp',
  '8DD71284-41B0-497A-A257-3DE351ED296E.webp',
  'DD199BA9-95CA-4C60-AD6B-321EDE03B334.webp',
  'E5148967-A9CF-4036-A894-60EA11DE3659.webp',
  'F853A192-DDDB-47FD-9926-EA3177DF7ED3.webp',
  'IMG_0059.webp', 'IMG_0061.webp', 'IMG_0062.webp', 'IMG_0152.webp',
  'IMG_0278.webp', 'IMG_0307.webp', 'IMG_0503.webp', 'IMG_0608.webp',
  'IMG_0620.webp', 'IMG_0623.webp', 'IMG_0691.webp', 'IMG_0764.webp',
  'IMG_0814.webp', 'IMG_0828.webp', 'IMG_0897.webp', 'IMG_0909.webp',
  'IMG_0967.webp', 'IMG_0971.webp', 'IMG_0972.webp', 'IMG_0973.webp',
  'IMG_1344.webp', 'IMG_1412.webp', 'IMG_1627.webp', 'IMG_1659.webp',
  'IMG_1809.webp', 'IMG_1810.webp', 'IMG_2039.webp', 'IMG_2074.webp',
  'IMG_2164.webp', 'IMG_2172.webp', 'IMG_2218.webp', 'IMG_2469.webp',
  'IMG_2487.webp', 'IMG_2686.webp', 'IMG_2690.webp', 'IMG_2764.webp',
  'IMG_2772.webp', 'IMG_2896.webp', 'IMG_3005.webp', 'IMG_3284.webp',
  'IMG_3377.webp', 'IMG_3571.webp', 'IMG_3650.webp', 'IMG_3699.webp',
  'IMG_3813.webp', 'IMG_3824.webp', 'IMG_3837.webp', 'IMG_3841.webp',
  'IMG_3924.webp', 'IMG_3991.webp', 'IMG_4208.webp', 'IMG_4239.webp',
  'IMG_4253.webp', 'IMG_4520.webp', 'IMG_4565.webp', 'IMG_4835.webp',
  'IMG_4836.webp', 'IMG_4931.webp', 'IMG_4985.webp', 'IMG_5141.webp',
  'IMG_5171.webp', 'IMG_5236.webp', 'IMG_5730.webp', 'IMG_5885.webp',
  'IMG_5886.webp', 'IMG_5973.webp', 'IMG_6090.webp', 'IMG_6670.webp',
  'IMG_6726.webp', 'IMG_6820.webp', 'IMG_6825.webp', 'IMG_6836.webp',
  'IMG_6837.webp', 'IMG_6839.webp', 'IMG_6840.webp', 'IMG_6841.webp',
  'IMG_7095.webp', 'IMG_7099.webp', 'IMG_7196.webp', 'IMG_7197.webp',
  'IMG_7200.webp', 'IMG_7215.webp', 'IMG_7256.webp', 'IMG_7257.webp',
  'IMG_7392.webp', 'IMG_7415.webp', 'IMG_7457.webp', 'IMG_7539.webp',
  'IMG_8780.webp', 'IMG_8804.webp', 'IMG_8805.webp', 'IMG_9094.webp',
  'IMG_9221.webp', 'IMG_9370.webp', 'IMG_9383.webp', 'IMG_9507.webp',
  'IMG_9550.webp', 'IMG_9733.webp', 'IMG_9746.webp',
]

// Ordenados por duración: los clips con más contenido primero
const videos = [
  { file: 'IMG_3617.mp4', dur: '2:43' },
  { file: 'IMG_2342.mp4', dur: '2:32' },
  { file: 'IMG_2753.mp4', dur: '1:47' },
  { file: 'IMG_0022.mp4', dur: '1:19' },
  { file: 'IMG_3364.mp4', dur: '0:47' },
  { file: 'IMG_0796.mp4', dur: '0:26' },
  { file: 'IMG_6061.mp4', dur: '0:20' },
  { file: 'F86ECCF7-2745-4940-82DB-708293BB3B30.mp4', dur: '0:15' },
  { file: 'IMG_2772.mp4', dur: '0:03' },
  { file: 'IMG_2896.mp4', dur: '0:03' },
  { file: 'IMG_3247.mp4', dur: '0:03' },
  { file: 'IMG_3841.mp4', dur: '0:03' },
  { file: 'IMG_9540.mp4', dur: '0:03' },
]

const BASE = import.meta.env.BASE_URL
const EASE = [0.22, 1, 0.36, 1]
const VP = { once: true, amount: 0.12 }
const AUTOPLAY_MS = 5000

const poster = (file) => `${BASE}videos/posters/${file.replace('.mp4', '.webp')}`
const pad3 = (n) => String(n).padStart(3, '0')

// ── Íconos ───────────────────────────────────────────────────────────────────
const PlayIcon = ({ size = 30 }) => (
  <svg width={size} height={size} viewBox="0 0 30 30" fill="currentColor" aria-hidden="true">
    <path d="M7.5 5.5l17 9.5-17 9.5V5.5z" />
  </svg>
)

// ── Hook: medida del viewport del carrusel ───────────────────────────────────
function useElementWidth(ref) {
  const [width, setWidth] = useState(0)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width))
    ro.observe(el)
    return () => ro.disconnect()
  }, [ref])
  return width
}

// ═══════════════════════════════════════════════════════════════════════════
// Carrusel de fotos — escenario central con peek lateral
// ═══════════════════════════════════════════════════════════════════════════
function PhotoCarousel({ t, frozen, onOpen }) {
  const viewportRef = useRef(null)
  const width = useElementWidth(viewportRef)
  const [index, setIndex] = useState(0)
  const [hovered, setHovered] = useState(false)
  const touchX = useRef(null)

  const isMobile = width > 0 && width < 640
  const slideW = isMobile ? width * 0.88 : Math.min(width * 0.66, 980)
  const gap = isMobile ? 12 : 24
  const x = (width - slideW) / 2 - index * (slideW + gap)

  const go = useCallback(
    (i) => setIndex(((i % photos.length) + photos.length) % photos.length),
    [],
  )
  const next = useCallback(() => setIndex((i) => (i + 1) % photos.length), [])
  const prev = useCallback(() => go(index - 1), [go, index])

  // Autoplay — se detiene con hover, lightbox abierto o tab inactivo
  const paused = hovered || frozen
  useEffect(() => {
    if (paused) return
    const id = setInterval(next, AUTOPLAY_MS)
    return () => clearInterval(id)
  }, [paused, next])

  // Swipe táctil
  const onTouchStart = (e) => { touchX.current = e.touches[0].clientX }
  const onTouchEnd = (e) => {
    if (touchX.current === null) return
    const delta = e.changedTouches[0].clientX - touchX.current
    if (delta < -50) next()
    else if (delta > 50) prev()
    touchX.current = null
  }

  return (
    <div className="pcv-root">
      {/* Escenario full-bleed */}
      <div
        className="pcv"
        ref={viewportRef}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {width > 0 && (
          <motion.div
            className="pcv-track"
            style={{ gap }}
            animate={{ x }}
            transition={{ duration: 0.72, ease: EASE }}
          >
            {photos.map((photo, i) => {
              const active = i === index
              return (
                <button
                  key={photo}
                  className={`pcv-slide${active ? ' active' : ''}`}
                  style={{ width: slideW }}
                  onClick={() => (active ? onOpen(i) : go(i))}
                  tabIndex={active ? 0 : -1}
                  aria-label={active ? t.gallery.expand : `${t.gallery.tagline} ${i + 1}`}
                >
                  <img
                    src={`${BASE}gallery/${photo}`}
                    alt={`${t.gallery.tagline} ${i + 1}`}
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                  />
                </button>
              )
            })}
          </motion.div>
        )}

        {/* Progreso del autoplay */}
        {!paused && (
          <motion.div
            key={`progress-${index}`}
            className="pcv-progress"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: AUTOPLAY_MS / 1000, ease: 'linear' }}
            aria-hidden="true"
          />
        )}
      </div>

      {/* Controles: contador tipográfico + flechas */}
      <div className="container pcv-controls">
        <div className="pcv-counter" aria-hidden="true">
          <span className="pcv-counter-current">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={index}
                initial={{ y: 18, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -18, opacity: 0 }}
                transition={{ duration: 0.35, ease: EASE }}
                style={{ display: 'inline-block' }}
              >
                {pad3(index + 1)}
              </motion.span>
            </AnimatePresence>
          </span>
          <span className="pcv-counter-total">/ {pad3(photos.length)}</span>
        </div>

        <div className="pcv-arrows">
          <button className="pcv-arrow" onClick={prev} aria-label="Anterior">
            <ChevronLeftIcon />
          </button>
          <button className="pcv-arrow" onClick={next} aria-label="Siguiente">
            <ChevronRightIcon />
          </button>
        </div>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// Cine de videos — player destacado + tira de posters
// ═══════════════════════════════════════════════════════════════════════════
function VideoCinema({ t }) {
  const [current, setCurrent] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [fading, setFading] = useState(false)
  const videoRef = useRef(null)
  const stripRef = useRef(null)

  const select = useCallback((i) => {
    if (i === current) return
    setFading(true)
    videoRef.current?.pause()
    setTimeout(() => { setCurrent(i); setFading(false) }, 200)
  }, [current])

  // Al cambiar de clip: recargar y centrar su tarjeta en la tira
  useEffect(() => {
    videoRef.current?.load()
    setIsPlaying(false)
    const strip = stripRef.current
    const card = strip?.children[current]
    if (!strip || !card) return
    strip.scrollTo({
      left: card.offsetLeft - (strip.offsetWidth - card.offsetWidth) / 2,
      behavior: 'smooth',
    })
  }, [current])

  const togglePlay = useCallback(() => {
    const v = videoRef.current
    if (!v) return
    v.paused ? v.play() : v.pause()
  }, [])

  const scrollStrip = (dir) => {
    stripRef.current?.scrollBy({
      left: dir * stripRef.current.offsetWidth * 0.7,
      behavior: 'smooth',
    })
  }

  return (
    <div className="vc">
      {/* Player destacado */}
      <div
        className={`reel-player${isPlaying ? ' is-playing' : ''}`}
        onClick={togglePlay}
        role="button"
        tabIndex={0}
        aria-label={isPlaying ? t.gallery.pause : t.gallery.play}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && togglePlay()}
      >
        <video
          ref={videoRef}
          src={`${BASE}videos/${videos[current].file}`}
          poster={poster(videos[current].file)}
          preload="metadata"
          playsInline
          style={{ opacity: fading ? 0 : 1, transition: 'opacity 0.2s ease' }}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => select((current + 1) % videos.length)}
        />
        <div className="reel-overlay">
          <motion.div
            className="reel-play-btn"
            aria-hidden="true"
            animate={{ scale: isPlaying ? 0.7 : 1, opacity: isPlaying ? 0 : 1 }}
            transition={{ duration: 0.22, ease: EASE }}
          >
            <PlayIcon />
          </motion.div>
        </div>
        <div className="reel-hud">
          <div className="reel-counter">
            <span className="reel-n">{String(current + 1).padStart(2, '0')}</span>
            <span className="reel-slash"> / </span>
            <span className="reel-total">{String(videos.length).padStart(2, '0')}</span>
          </div>
          <span className="vc-dur">{videos[current].dur}</span>
        </div>
      </div>

      {/* Tira de posters con flechas */}
      <div className="vc-strip-wrap">
        <button className="pcv-arrow vc-strip-arrow" onClick={() => scrollStrip(-1)} aria-label="Ver clips anteriores">
          <ChevronLeftIcon />
        </button>

        <div className="vc-strip" ref={stripRef}>
          {videos.map((v, i) => {
            const active = i === current
            return (
              <button
                key={v.file}
                className={`vc-card${active ? ' active' : ''}`}
                onClick={() => select(i)}
                aria-label={`Video ${i + 1} — ${v.dur}`}
                aria-current={active ? 'true' : undefined}
              >
                <img src={poster(v.file)} alt="" loading="lazy" decoding="async" draggable={false} />
                <span className="vc-card-shade" aria-hidden="true" />
                <span className="vc-card-play" aria-hidden="true"><PlayIcon size={16} /></span>
                <span className="vc-card-dur">{v.dur}</span>
                {active && (
                  <motion.span
                    layoutId="vcActiveRing"
                    className="vc-card-ring"
                    transition={{ duration: 0.4, ease: EASE }}
                    aria-hidden="true"
                  />
                )}
              </button>
            )
          })}
        </div>

        <button className="pcv-arrow vc-strip-arrow" onClick={() => scrollStrip(1)} aria-label="Ver más clips">
          <ChevronRightIcon />
        </button>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// Galería — sección principal con tabs Fotos / Videos
// ═══════════════════════════════════════════════════════════════════════════
export default function Gallery({ t }) {
  const [tab, setTab] = useState('photos')
  const [lightbox, setLightbox] = useState(null)

  const openLightbox = useCallback((i) => {
    setLightbox(i)
    document.body.style.overflow = 'hidden'
  }, [])
  const closeLightbox = useCallback(() => {
    setLightbox(null)
    document.body.style.overflow = ''
  }, [])
  const prevLightbox = useCallback(
    () => setLightbox((i) => (i > 0 ? i - 1 : photos.length - 1)), [])
  const nextLightbox = useCallback(
    () => setLightbox((i) => (i < photos.length - 1 ? i + 1 : 0)), [])

  // Teclado del lightbox
  useEffect(() => {
    if (lightbox === null) return
    const onKey = (e) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowRight') nextLightbox()
      if (e.key === 'ArrowLeft') prevLightbox()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightbox, closeLightbox, nextLightbox, prevLightbox])

  const tabs = [
    { id: 'photos', label: t.gallery.photosTab, count: photos.length },
    { id: 'videos', label: t.gallery.videosTab, count: videos.length },
  ]

  return (
    <MotionConfig reducedMotion="user">
      <section id="galeria">
        <div className="container media-head">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VP}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <h2 className="section-title">{t.gallery.title}</h2>
            <p className="section-subtitle media-subtitle">{t.gallery.subtitle}</p>
          </motion.div>

          {/* Tabs Fotos / Videos */}
          <motion.div
            className="media-tabs"
            role="tablist"
            aria-label={t.gallery.tagline}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VP}
            transition={{ duration: 0.55, ease: EASE, delay: 0.12 }}
          >
            {tabs.map(({ id, label, count }) => (
              <button
                key={id}
                role="tab"
                aria-selected={tab === id}
                className={`media-tab${tab === id ? ' active' : ''}`}
                onClick={() => setTab(id)}
              >
                {tab === id && (
                  <motion.span
                    layoutId="mediaTabPill"
                    className="media-tab-pill"
                    transition={{ duration: 0.4, ease: EASE }}
                    aria-hidden="true"
                  />
                )}
                <span className="media-tab-label">
                  {label} <em>{count}</em>
                </span>
              </button>
            ))}
          </motion.div>
        </div>

        {/* Contenido del tab activo */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            {tab === 'photos' ? (
              <PhotoCarousel t={t} frozen={lightbox !== null} onOpen={openLightbox} />
            ) : (
              <div className="container">
                <VideoCinema t={t} />
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Lightbox */}
        <AnimatePresence>
          {lightbox !== null && (
            <motion.div
              className="lightbox"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={closeLightbox}
            >
              <motion.div
                className="lightbox-inner"
                initial={{ scale: 0.92, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.92, opacity: 0 }}
                transition={{ duration: 0.28, ease: EASE }}
                onClick={(e) => e.stopPropagation()}
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={lightbox}
                    src={`${BASE}gallery/${photos[lightbox]}`}
                    alt={`${t.gallery.tagline} ${lightbox + 1}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  />
                </AnimatePresence>
                <button className="lightbox-close" onClick={closeLightbox} aria-label="Cerrar">
                  <CloseIcon />
                </button>
                <button className="lightbox-nav lightbox-prev" onClick={prevLightbox} aria-label="Anterior">
                  <ChevronLeftIcon />
                </button>
                <button className="lightbox-nav lightbox-next" onClick={nextLightbox} aria-label="Siguiente">
                  <ChevronRightIcon />
                </button>
                <div className="lightbox-counter">
                  {lightbox + 1} <span>/</span> {photos.length}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </MotionConfig>
  )
}
