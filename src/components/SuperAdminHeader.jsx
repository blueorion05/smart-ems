export default function SuperAdminHeader({ timeLabel, userName, userRole }) {
  return (
    <header className="sems-header">
      <div className="header-title">
        <h1>Smart Energy Management System</h1>
        <span>Enterprise Control Center</span>
      </div>
      <div className="header-actions">
        <div className="time-pill">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M12 5a7 7 0 1 0 0 14 7 7 0 0 0 0-14zm0-3a10 10 0 1 1 0 20 10 10 0 0 1 0-20zm1 6h-2v5l4 2 1-2-3-1V8z"
              fill="currentColor"
            />
          </svg>
          <span>{timeLabel}</span>
        </div>
        <button type="button" className="icon-button" aria-label="Notifications">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M12 22a2 2 0 0 0 2-2h-4a2 2 0 0 0 2 2zm6-6V11a6 6 0 1 0-12 0v5l-2 2v1h16v-1l-2-2z"
              fill="currentColor"
            />
          </svg>
          <span className="notify-dot" />
        </button>
        <div className="profile-card">
          <span className="profile-avatar">EA</span>
          <div>
            <strong>{userName}</strong>
            <span>{userRole}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
