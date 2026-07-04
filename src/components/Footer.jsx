import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <span className="footer-brand">
          <span className="footer-icon">⚡</span> FitTrack
        </span>
        <span className="footer-copy">
          © {new Date().getFullYear()} FitTrack. Track every rep, every mile.
        </span>
      </div>
    </footer>
  );
}
