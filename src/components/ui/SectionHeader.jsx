/**
 * Consistent section header with label, title, and optional subtitle.
 *
 * @param {string}  label     - small uppercase teal label
 * @param {string}  title     - main heading (supports JSX / line breaks)
 * @param {string}  subtitle  - optional muted paragraph
 * @param {boolean} centered  - center-align everything
 */
export default function SectionHeader({
  label,
  title,
  subtitle,
  centered = false,
}) {
  const style = centered ? { textAlign: "center", alignItems: "center" } : {};

  return (
    <div
      className="section-header"
      style={{ display: "flex", flexDirection: "column", ...style }}
    >
      {label && <span className="section-label">{label}</span>}
      <h2 className="section-title">{title}</h2>
      {subtitle && (
        <p className="section-sub" style={centered ? { margin: "0 auto" } : {}}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
