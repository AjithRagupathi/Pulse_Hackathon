import FadeUp from "../ui/FadeUp";
import SectionHeader from "../ui/SectionHeader";
import { PARTNERS } from "../../constants/data";
import styles from "./Partners.module.css";

export default function Partners() {
  return (
    <section
      className={styles.section}
      id="partners"
      aria-label="Integration partners"
    >
      <FadeUp>
        <SectionHeader
          label="Integrations"
          title={
            <>
              Works with the tools
              <br />
              you already trust.
            </>
          }
          centered
        />
      </FadeUp>

      <FadeUp delay={100}>
        <ul className={styles.strip} aria-label="Partner integrations">
          {PARTNERS.map((p) => (
            <li key={p.name} className={styles.pill}>
              <span aria-hidden="true">{p.icon}</span>
              {p.name}
            </li>
          ))}
        </ul>
      </FadeUp>
    </section>
  );
}
