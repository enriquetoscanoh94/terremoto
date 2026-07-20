export default function Footer({ t }) {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <img src="/logo.png" alt="Terremoto Sound & Lighting" />
        <p>
          © {new Date().getFullYear()} Terremoto Sound & Lighting. {t.footer.rights}
        </p>
      </div>
    </footer>
  )
}
