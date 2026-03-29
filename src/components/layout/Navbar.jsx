import { useState, useEffect } from "react";
import Button from "../ui/Button";
import { NAV_LINKS } from "../../constants/data";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToCTA = () => {
    document.getElementById("cta")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.logo}>
        PULSE<span className={styles.dot}>.</span>
      </div>

      <div className={styles.links}>
        {NAV_LINKS.map(({ label, href }) => (
          <a key={href} href={href} className={styles.link}>
            {label}
          </a>
        ))}
        <Button
          variant="primary"
          onClick={scrollToCTA}
          style={{ padding: "0.6rem 1.4rem", fontSize: "0.9rem" }}
        >
          Book a Demo
        </Button>
      </div>
    </nav>
  );
}
