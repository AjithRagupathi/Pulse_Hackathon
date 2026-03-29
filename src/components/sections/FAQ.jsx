import { useState } from "react";
import FadeUp from "../ui/FadeUp";
import SectionHeader from "../ui/SectionHeader";
import { FAQS } from "../../constants/data";
import styles from "./FAQ.module.css";

function FAQItem({ q, a, isOpen, onToggle, index }) {
  return (
    <FadeUp delay={index * 50}>
      <div className={`${styles.item} ${isOpen ? styles.open : ""}`}>
        <button
          className={styles.question}
          onClick={onToggle}
          aria-expanded={isOpen}
        >
          <span>{q}</span>
          <span className={styles.chevron} aria-hidden="true">
            +
          </span>
        </button>
        <div className={styles.answer} role="region" aria-hidden={!isOpen}>
          <p className={styles.answerText}>{a}</p>
        </div>
      </div>
    </FadeUp>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section id="faq" aria-label="Frequently asked questions">
      <FadeUp>
        <SectionHeader
          label="FAQ"
          title={
            <>
              Questions gym owners
              <br />
              actually ask us.
            </>
          }
          centered
        />
      </FadeUp>

      <div className={styles.list} role="list">
        {FAQS.map((faq, i) => (
          <FAQItem
            key={faq.q}
            {...faq}
            index={i}
            isOpen={openIndex === i}
            onToggle={() => toggle(i)}
          />
        ))}
      </div>
    </section>
  );
}
