import { Link } from "react-router-dom";
import "./Landing.css";

export default function Landing() {
  return (
    <div className="landing">
      {/* Hero */}
      <section className="hero">
        <div className="hero-badge">🏋️ The smarter way to train</div>
        <h1 className="hero-title">
          Track Your Fitness,
          <br />
          <span className="hero-gradient">Unlock Your Potential</span>
        </h1>
        <p className="hero-subtitle">
          Log workouts, visualise progress and stay consistent — all in one
          beautifully designed dashboard.
        </p>
        <div className="hero-actions">
          <Link to="/register" className="btn btn-primary">
            Start for Free
          </Link>
          <Link to="/login" className="btn btn-ghost">
            Log In
          </Link>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="features">
        {[
          {
            icon: "📊",
            title: "Smart Dashboard",
            desc: "See total workouts, duration trends and personal bests at a glance.",
          },
          {
            icon: "📈",
            title: "Progress Charts",
            desc: "Interactive Chart.js graphs that show how far you've come.",
          },
          {
            icon: "🗂️",
            title: "Workout History",
            desc: "A complete log of every session with notes and timestamps.",
          },
          {
            icon: "➕",
            title: "Quick Logging",
            desc: "Add a new workout in seconds with a clean, validated form.",
          },
        ].map((f) => (
          <div className="feature-card" key={f.title}>
            <span className="feature-icon">{f.icon}</span>
            <h3 className="feature-title">{f.title}</h3>
            <p className="feature-desc">{f.desc}</p>
          </div>
        ))}
      </section>

      {/* CTA Banner */}
      <section className="cta-banner">
        <h2>Ready to crush your goals?</h2>
        <Link to="/register" className="btn btn-primary">
          Create Your Free Account
        </Link>
      </section>
    </div>
  );
}
