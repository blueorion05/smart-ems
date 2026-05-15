export default function Logo() {
  return (
    <div className="sems-logo">
      <span className="logo-mark" aria-hidden="true">
        <svg viewBox="0 0 64 64" role="img" aria-hidden="true">
          <path d="M36 4 14 36h16l-4 24 24-34H34l2-22Z" fill="currentColor" />
        </svg>
      </span>
      <div className="logo-text">
        <span className="logo-title">SEMS</span>
        <span className="logo-subtitle">Smart Energy Management System</span>
      </div>
    </div>
  );
}
