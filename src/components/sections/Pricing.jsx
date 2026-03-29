import FadeUp from "../ui/FadeUp";
import SectionHeader from "../ui/SectionHeader";
import Button from "../ui/Button";
import { PRICING_PLANS } from "../../constants/data";
import styles from "./Pricing.module.css";

function PricingCard({ tier, price, period, desc, featured, features, index }) {
  const scrollToCTA = () =>
    document.getElementById("cta")?.scrollIntoView({ behavior: "smooth" });

  return (
    <FadeUp delay={index * 100}>
      <div className={`${styles.card} ${featured ? styles.featured : ""}`}>
        {featured && <span className={styles.featuredBadge}>Most Popular</span>}

        <p className={styles.tier}>{tier}</p>
        <p className={styles.price}>
          {price}
          {period && <span className={styles.period}>{period}</span>}
        </p>
        <p className={styles.desc}>{desc}</p>

        <hr className={styles.divider} />

        <ul className={styles.features} aria-label={`${tier} plan features`}>
          {features.map((f) => (
            <li key={f} className={styles.feature}>
              <span className={styles.check} aria-hidden="true">
                ✓
              </span>
              {f}
            </li>
          ))}
        </ul>

        <Button
          variant={featured ? "primary" : "outline"}
          onClick={scrollToCTA}
          style={{ width: "100%", justifyContent: "center" }}
        >
          {tier === "Enterprise" ? "Contact Sales" : "Start Free Trial"}
        </Button>
      </div>
    </FadeUp>
  );
}

export default function Pricing() {
  return (
    <section id="pricing" aria-label="Pricing plans">
      <FadeUp>
        <SectionHeader
          label="Pricing"
          title={
            <>
              Simple, transparent pricing.
              <br />
              No surprises.
            </>
          }
          subtitle="Every plan includes onboarding support, WhatsApp automation, and our core 8 modules."
          centered
        />
      </FadeUp>

      <div className={styles.grid}>
        {PRICING_PLANS.map((plan, i) => (
          <PricingCard key={plan.tier} {...plan} index={i} />
        ))}
      </div>
    </section>
  );
}
