import { useState, useEffect, useRef } from "react";

/**
 * Returns a [ref, isVisible] tuple.
 * Once the element enters the viewport it stays visible (one-shot).
 *
 * @param {number} threshold - 0–1, portion of element that must be visible
 */
export function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect(); // one-shot — no need to keep watching
        }
      },
      { threshold },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, visible];
}
