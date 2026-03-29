import FadeUp from "../ui/FadeUp";
import SectionHeader from "../ui/SectionHeader";
import { FEATURES } from "../../constants/data";
import styles from "./Features.module.css";

function FeatureCard({ icon, color, title, desc, index }) {
  return (
    <FadeUp delay={index * 60}>
      <article className={styles.card}>
        <div
          className={styles.icon}
          style={{ background: color }}
          aria-hidden="true"
        >
          {icon}
        </div>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.desc}>{desc}</p>
      </article>
    </FadeUp>
  );
}

export default function Features() {
  return (
    <section
      className={styles.section}
      id="features"
      aria-label="Platform features"
    >
      <FadeUp>
        <SectionHeader
          label="Platform Features"
          title={
            <>
              Everything your gym needs,
              <br />
              nothing it doesn't.
            </>
          }
          subtitle="Eight deeply integrated modules designed to remove operational friction and give you full visibility over your business."
        />
      </FadeUp>

      <div className={styles.grid}>
        {FEATURES.map((feature, i) => (
          <FeatureCard key={feature.title} {...feature} index={i} />
        ))}
      </div>
    </section>
  );
}
