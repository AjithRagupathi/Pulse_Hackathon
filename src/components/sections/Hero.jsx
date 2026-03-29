import FadeUp from "../ui/FadeUp";
import Button from "../ui/Button";
import { useCountUp } from "../../hooks/useCountUp";
import { HERO_STATS } from "../../constants/data";
import styles from "./Hero.module.css";

function StatItem({ target, suffix, label, color }) {
  const { ref, count } = useCountUp(target);
  return (
    <div className={styles.statItem}>
      <span ref={ref} className={styles.statNum} style={{ color }}>
        {count}
        {suffix}
      </span>
      <span className={styles.statLabel}>{label}</span>
    </div>
  );
}

export default function Hero() {
  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className={styles.hero} id="hero" aria-label="Hero">
      {/* Background glows */}
      <div className={styles.glowBlue} aria-hidden="true" />
      <div className={styles.glowTeal} aria-hidden="true" />

      <FadeUp>
        <div className={styles.badge} role="status">
          <span className={styles.badgeDot} aria-hidden="true" />
          Live &amp; serving gyms in Chennai
        </div>
      </FadeUp>

      <FadeUp delay={80}>
        <h1 className={styles.heading}>
          Run your gym
          <br />
          like a <span className={styles.accentBlue}>modern</span>
          <br />
          <span className={styles.accentTeal}>business.</span>
        </h1>
      </FadeUp>

      <FadeUp delay={160}>
        <p className={styles.sub}>
          PULSE is the all-in-one gym management platform that handles
          everything — from member check-ins to revenue analytics — so you can
          focus on growing, not administrating.
        </p>
      </FadeUp>

      <FadeUp delay={240}>
        <div className={styles.cta}>
          <Button variant="primary" onClick={() => scrollTo("cta")}>
            Book a Free Demo →
          </Button>
          <Button variant="ghost" onClick={() => scrollTo("platform")}>
            See the Platform
          </Button>
        </div>
      </FadeUp>

      <FadeUp delay={320} style={{ width: "100%" }}>
        <div
          className={styles.statsStrip}
          role="list"
          aria-label="Key statistics"
        >
          {HERO_STATS.map((stat) => (
            <StatItem key={stat.label} {...stat} />
          ))}
        </div>
      </FadeUp>
    </section>
  );
}
