import { useInView } from "../../hooks/useInView";

/**
 * Wraps children with a scroll-triggered fade-up animation.
 *
 * @param {React.ReactNode} children
 * @param {number}          delay   - transition-delay in ms
 * @param {object}          style   - additional inline styles
 * @param {string}          className
 */
export default function FadeUp({
  children,
  delay = 0,
  style = {},
  className = "",
}) {
  const [ref, visible] = useInView();

  return (
    <div
      ref={ref}
      className={`fade-up${visible ? " visible" : ""} ${className}`.trim()}
      style={{ transitionDelay: `${delay}ms`, ...style }}
    >
      {children}
    </div>
  );
}
