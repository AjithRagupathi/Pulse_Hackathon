import { useState } from "react";
import FadeUp from "../ui/FadeUp";
import SectionHeader from "../ui/SectionHeader";
import { DEMO_TABS } from "../../constants/data";
import styles from "./ProductTour.module.css";

function DemoRow({ icon, name, meta, status, statusBg, statusColor, iconBg }) {
  return (
    <div className={styles.row}>
      <div className={styles.rowIcon} style={{ background: iconBg }}>
        {icon}
      </div>
      <div className={styles.rowInfo}>
        <p className={styles.rowName}>{name}</p>
        <p className={styles.rowMeta}>{meta}</p>
      </div>
      <span
        className={styles.rowStatus}
        style={{ background: statusBg, color: statusColor }}
      >
        {status}
      </span>
    </div>
  );
}

export default function ProductTour() {
  const [activeTab, setActiveTab] = useState(0);
  const tab = DEMO_TABS[activeTab];

  return (
    <section
      className={styles.section}
      id="demo"
      aria-label="Interactive product tour"
    >
      <FadeUp>
        <SectionHeader
          label="Product Tour"
          title="See PULSE in action."
          subtitle="Explore the core workflows that your team will use every single day."
        />
      </FadeUp>

      <FadeUp delay={100}>
        <div className={styles.tabs} role="tablist" aria-label="Demo sections">
          {DEMO_TABS.map((t, i) => (
            <button
              key={t.label}
              role="tab"
              aria-selected={activeTab === i}
              className={`${styles.tab} ${activeTab === i ? styles.activeTab : ""}`}
              onClick={() => setActiveTab(i)}
            >
              {t.label}
            </button>
          ))}
        </div>
      </FadeUp>

      <div className={styles.content} role="tabpanel">
        <FadeUp>
          <div className={styles.info}>
            <h3 className={styles.infoTitle}>{tab.title}</h3>
            <p className={styles.infoDesc}>{tab.desc}</p>
            <ul className={styles.points} aria-label="Key capabilities">
              {tab.points.map((pt) => (
                <li key={pt} className={styles.point}>
                  {pt}
                </li>
              ))}
            </ul>
          </div>
        </FadeUp>

        <FadeUp delay={150}>
          <div className={styles.visual} aria-label="Demo preview">
            {tab.rows.map((row) => (
              <DemoRow key={row.name} {...row} />
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
