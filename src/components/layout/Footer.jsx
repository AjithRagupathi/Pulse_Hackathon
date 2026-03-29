import styles from "./Footer.module.css";

const FOOTER_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#cta" },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.logo}>
        PULSE<span className={styles.dot}>.</span>
        <span className={styles.by}>by Gentize Innovations</span>
      </div>

      <nav className={styles.links} aria-label="Footer navigation">
        {FOOTER_LINKS.map(({ label, href }) => (
          <a key={href} href={href} className={styles.link}>
            {label}
          </a>
        ))}
      </nav>

      <p className={styles.copy}>© 2026 Gentize Innovations · Chennai, India</p>
    </footer>
  );
}
