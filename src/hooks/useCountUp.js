import { useState, useEffect, useRef } from "react";

/**
 * Animates a counter from 0 → target when the returned ref enters the viewport.
 *
 * @param {number} target   - final value to count to
 * @param {number} duration - animation duration in ms (default 1200)
 * @returns {{ ref: React.RefObject, count: number }}
 */
export function useCountUp(target, duration = 1200) {
  const ref = useRef(null);
  const [count, setCount] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;

          const frames = Math.round((duration / 1000) * 60); // ~60 fps
          const step = target / frames;
          let current = 0;

          const timer = setInterval(() => {
            current += step;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, 1000 / 60);
        }
      },
      { threshold: 0.5 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return { ref, count };
}
