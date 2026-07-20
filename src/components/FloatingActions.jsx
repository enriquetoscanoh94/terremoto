import { motion } from 'framer-motion'
import { CONTACT } from '../data/config.js'
import { WhatsAppIcon, MessageIcon } from './Icons.jsx'

const spring = { type: 'spring', stiffness: 280, damping: 22 }

export default function FloatingActions() {
  return (
    <div className="fab-stack">
      <motion.a
        className="fab sms-fab"
        href={CONTACT.smsUrl}
        aria-label="Mensaje de texto"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ ...spring, delay: 1.4 }}
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.94 }}
      >
        <MessageIcon />
      </motion.a>

      <motion.a
        className="fab whatsapp-fab"
        href={CONTACT.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ ...spring, delay: 1.6 }}
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.94 }}
      >
        <WhatsAppIcon />
      </motion.a>
    </div>
  )
}
