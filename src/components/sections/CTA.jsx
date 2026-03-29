import { useState } from "react";
import FadeUp from "../ui/FadeUp";
import Button from "../ui/Button";
import styles from "./CTA.module.css";

export default function CTA() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setSubmitted(true);
    setEmail("");
  };

  return (
    <section className={styles.section} id="cta" aria-label="Book a demo">
      <div className={styles.glow} aria-hidden="true" />

      <FadeUp>
        <h2 className={styles.heading}>
          Ready to give your gym
          <br />
          an <span className={styles.accent}>unfair advantage?</span>
        </h2>
        <p className={styles.sub}>
          Book a free 30-minute demo. We'll show you PULSE live, configured for
          your gym type.
        </p>

        {submitted ? (
          <p className={styles.success} role="status">
            ✓ We'll be in touch within 24 hours.
          </p>
        ) : (
          <div
            className={styles.form}
            role="form"
            aria-label="Demo request form"
          >
            <label htmlFor="demo-email" className={styles.srOnly}>
              Your email address
            </label>
            <input
              id="demo-email"
              className={styles.input}
              type="email"
              placeholder="your@gym.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              aria-describedby={error ? "email-error" : undefined}
              aria-invalid={!!error}
            />
            <Button variant="primary" onClick={handleSubmit}>
              Book Demo →
            </Button>
          </div>
        )}

        {error && (
          <p id="email-error" className={styles.error} role="alert">
            {error}
          </p>
        )}
      </FadeUp>
    </section>
  );
}
