import { motion } from 'framer-motion'
import { CONTACT } from '../data/config.js'
import {
  PhoneIcon,
  MailIcon,
  FacebookIcon,
  InstagramIcon,
  WhatsAppIcon,
} from './Icons.jsx'

const EASE = [0.22, 1, 0.36, 1]
const VP = { once: true, amount: 0.15 }

const fromLeft = {
  hidden: { opacity: 0, x: -48 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE } },
}

const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
}

const fromRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: EASE } },
}

export default function Contact({ t }) {
  return (
    <section className="contact" id="contacto">
      <div className="container">
        <div className="contact-grid">
          <motion.div variants={fromLeft} initial="hidden" whileInView="visible" viewport={VP}>
            <h2 className="section-title">{t.contact.title}</h2>
            <p className="section-subtitle contact-subtitle">{t.contact.subtitle}</p>
            <a
              className="btn btn-primary"
              href={CONTACT.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon size={20} />
              {t.contact.whatsapp}
            </a>
            <p className="contact-note">{t.contact.whatsappNote}</p>
          </motion.div>

          <motion.div
            className="contact-info"
            variants={listVariants}
            initial="hidden"
            whileInView="visible"
            viewport={VP}
          >
            <motion.div className="contact-item" variants={fromRight}>
              <div className="contact-icon"><PhoneIcon /></div>
              <div>
                <span>{t.contact.phoneLabel}</span>
                <strong>{CONTACT.phoneDisplay}</strong>
              </div>
            </motion.div>

            <motion.div className="contact-item" variants={fromRight}>
              <div className="contact-icon"><MailIcon /></div>
              <div>
                <span>{t.contact.emailLabel}</span>
                <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
              </div>
            </motion.div>

            <motion.div className="contact-item" variants={fromRight}>
              <div className="contact-icon contact-icon--facebook"><FacebookIcon /></div>
              <div>
                <span>{t.contact.followLabel}</span>
                <a href={CONTACT.facebookUrl} target="_blank" rel="noopener noreferrer">
                  Roberto Terremoto Arellano
                </a>
              </div>
            </motion.div>

            <motion.div className="contact-item" variants={fromRight}>
              <div className="contact-icon contact-icon--instagram"><InstagramIcon /></div>
              <div>
                <span>{t.contact.followLabel}</span>
                <a href={CONTACT.instagramUrl} target="_blank" rel="noopener noreferrer">
                  @robertoarellano1980
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
