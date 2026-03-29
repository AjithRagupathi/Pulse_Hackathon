import FadeUp from "../ui/FadeUp";
import SectionHeader from "../ui/SectionHeader";
import { SHOWCASE_BARS, SHOWCASE_HIGHLIGHTS } from "../../constants/data";
import styles from "./AppShowcase.module.css";

function DashboardMockup() {
  return (
    <div className={styles.mockup}>
      <div className={styles.mockBar}>
        <span className={styles.dot} style={{ background: "#EF4444" }} />
        <span className={styles.dot} style={{ background: "#F59E0B" }} />
        <span className={styles.dot} style={{ background: "#10B981" }} />
      </div>

      <div className={styles.screen}>
        <div className={styles.screenHeader}>
          <span className={styles.screenTitle}>Today's Overview</span>
          <span className={styles.liveBadge}>● LIVE</span>
        </div>

        <div className={styles.statRow}>
          {[
            { n: "127", label: "Check-ins today", color: "var(--blue)" },
            { n: "₹48K", label: "Revenue today", color: "var(--teal)" },
            { n: "14", label: "At-risk members", color: "#F59E0B" },
          ].map((s) => (
            <div key={s.label} className={styles.statCard}>
              <span className={styles.statNum} style={{ color: s.color }}>
                {s.n}
              </span>
              <span className={styles.statLabel}>{s.label}</span>
            </div>
          ))}
        </div>

        <div className={styles.barList}>
          {SHOWCASE_BARS.map((b) => (
            <div key={b.label} className={styles.barItem}>
              <span className={styles.barLabel}>{b.label}</span>
              <div className={styles.barTrack}>
                <div
                  className={styles.barFill}
                  style={{ width: `${b.value}%` }}
                />
              </div>
              <span className={styles.barVal}>{b.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function AppShowcase() {
  return (
    <section id="platform" aria-label="App showcase">
      <FadeUp>
        <SectionHeader
          label="App Showcase"
          title={
            <>
              A dashboard that actually
              <br />
              tells you what's happening.
            </>
          }
          subtitle="Clean, fast, and built for the chaos of a real gym floor — not for a product demo."
        />
      </FadeUp>

      <div className={styles.grid}>
        <FadeUp>
          <DashboardMockup />
        </FadeUp>

        <FadeUp delay={150}>
          <div className={styles.content}>
            <p className={styles.eyebrow}>
              Built for gym owners, not IT teams.
            </p>
            <h3 className="section-title">
              Real numbers.
              <br />
              Real decisions.
            </h3>

            <div className={styles.highlights}>
              {SHOWCASE_HIGHLIGHTS.map((h) => (
                <div key={h.title} className={styles.highlight}>
                  <div className={styles.highlightIcon}>{h.icon}</div>
                  <div>
                    <h4 className={styles.highlightTitle}>{h.title}</h4>
                    <p className={styles.highlightDesc}>{h.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
