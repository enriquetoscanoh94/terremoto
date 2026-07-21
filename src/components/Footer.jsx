export default function Footer({ t }) {
  return (
    <footer className="footer">
      <div className="footer-wordmark" aria-hidden="true">Terremoto</div>
      <div className="container footer-inner">
        <img src={`${import.meta.env.BASE_URL}logo.png`} alt="Terremoto Sound & Lighting" />
        <p>
          © {new Date().getFullYear()} Terremoto Sound & Lighting. {t.footer.rights}
        </p>
      </div>
    </footer>
  )
}
