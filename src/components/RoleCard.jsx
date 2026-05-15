export default function RoleCard({ role, isActive, onSelect, onQuickLogin }) {
  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onSelect(role);
    }
  };

  return (
    <div
      className={`role-card ${isActive ? "is-active" : ""}`}
      role="button"
      tabIndex={0}
      onClick={() => onSelect(role)}
      onKeyDown={handleKeyDown}
    >
      <div className="role-card-top">
        <span className={`role-badge badge-${role.badgeColor}`}>
          {role.badgeLabel}
        </span>
        <div>
          <h4>{role.title}</h4>
          <p>{role.subtitle}</p>
        </div>
      </div>
      <ul>
        {role.access.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <div className="role-card-footer">
        <div className="role-creds">
          <span>
            <strong>Email:</strong> {role.credentials.email}
          </span>
          <span>
            <strong>Password:</strong> {role.credentials.password}
          </span>
        </div>
        <button
          type="button"
          className="ghost-button"
          onClick={(event) => {
            event.stopPropagation();
            onQuickLogin(role);
          }}
        >
          Use Demo
        </button>
      </div>
    </div>
  );
}
