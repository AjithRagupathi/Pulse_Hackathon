import FadeUp from "../ui/FadeUp";
import SectionHeader from "../ui/SectionHeader";
import { TESTIMONIALS } from "../../constants/data";
import styles from "./Testimonials.module.css";

function TestimonialCard({ quote, name, role, initials, color, index }) {
  return (
    <FadeUp delay={index * 100}>
      <article className={styles.card}>
        <div className={styles.stars} aria-label="5 stars">
          ★★★★★
        </div>
        <div className={styles.openQuote} aria-hidden="true">
          "
        </div>
        <blockquote className={styles.quote}>{quote}</blockquote>
        <footer className={styles.author}>
          <div
            className={styles.avatar}
            style={{ background: `${color}22`, color }}
            aria-hidden="true"
          >
            {initials}
          </div>
          <div>
            <p className={styles.name}>{name}</p>
            <p className={styles.role}>{role}</p>
          </div>
        </footer>
      </article>
    </FadeUp>
  );
}

export default function Testimonials() {
  return (
    <section
      className={styles.section}
      id="testimonials"
      aria-label="Testimonials"
    >
      <FadeUp>
        <SectionHeader
          label="Social Proof"
          title={
            <>
              Gym owners in Chennai
              <br />
              already see the difference.
            </>
          }
        />
      </FadeUp>

      <div className={styles.grid}>
        {TESTIMONIALS.map((t, i) => (
          <TestimonialCard key={t.name} {...t} index={i} />
        ))}
      </div>
    </section>
  );
}
