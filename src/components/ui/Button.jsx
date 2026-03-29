import styles from "./Button.module.css";

/**
 * Reusable button component.
 *
 * @param {'primary' | 'ghost' | 'outline'} variant
 * @param {string}   className
 * @param {function} onClick
 * @param {React.ReactNode} children
 */
export default function Button({
  variant = "primary",
  className = "",
  onClick,
  children,
  type = "button",
  ...rest
}) {
  return (
    <button
      type={type}
      className={`${styles.btn} ${styles[variant]} ${className}`.trim()}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
}
