import "../styles/landing.css";

export default function Landing() {
  return (
    <div className="landing">

      {/* NAVBAR */}
      <nav className="landing-nav">
        <div className="logo">ShareCircle</div>
        <div className="nav-links">
          <a href="/login">Log In</a>
          <a href="/register" className="nav-btn">Create Account</a>
        </div>
      </nav>

      {/* HERO */}
      <section className="landing-hero">
        <div className="hero-content">
          <h1>Your Community, Connected.</h1>
          <p>
            ShareCircle connects neighbors through trusted local services,
            food sharing, and community support — all in one place.
          </p>

          <div className="hero-actions">
            <a href="/register" className="primary-btn">
              Get Started
            </a>
            <a href="/login" className="secondary-btn">
              Log In
            </a>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="landing-features">
        <div className="feature-card">
          <h3>Local Services</h3>
          <p>
            Find trusted plumbers, electricians, tutors, and helpers
            right in your neighborhood.
          </p>
        </div>

        <div className="feature-card">
          <h3>Food Sharing</h3>
          <p>
            Donate surplus food or buy store items at half price
            to reduce waste.
          </p>
        </div>

        <div className="feature-card">
          <h3>Secure Payments</h3>
          <p>
            Pay safely using UPI, cards, or cash — transparent and easy.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="landing-cta">
        <h2>Join Your Neighborhood Today</h2>
        <p>
          Become part of a growing local network built on trust,
          sharing, and community.
        </p>
        <a href="/register" className="primary-btn">
          Create Free Account
        </a>
      </section>

      {/* FOOTER */}
      <footer className="landing-footer">
        © {new Date().getFullYear()} ShareCircle. All rights reserved.
      </footer>
    </div>
  );
}
