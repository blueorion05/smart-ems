import { useNavigate } from "react-router-dom";

export default function SuperAdminSidebar({ items, activeId, onSelect }) {
  const navigate = useNavigate();

  const handleNavigation = (itemId) => {
    onSelect(itemId);
    const routeMap = {
      dashboard: "/superadmin",
      energy: "/energy-monitoring",
      fuel: "/fuel-monitoring",
      analytics: "/analytics",
      control: "/control-panel",
      reports: "/reports",
      facilities: "/facilities",
      settings: "/settings",
    };
    const path = routeMap[itemId];
    if (path) navigate(path);
  };

  const renderIcon = (name) => {
    const icons = {
      dashboard: "M4 4h7v7H4V4zm9 0h7v4h-7V4zm0 6h7v10h-7V10zM4 13h7v7H4v-7z",
      energy: "M13 2 5 14h6l-2 8 10-14h-6l2-6z",
      fuel: "M9 3h6l3 4v12a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3zm0 5v11h6V8H9zm8-1h2v7a2 2 0 0 1-2 2h-1v-2h1V7z",
      analytics: "M4 19V9h4v10H4zm6 0V5h4v14h-4zm6 0v-7h4v7h-4z",
      control: "M5 7h14v2H5V7zm0 8h14v2H5v-2zm3-9h2v12H8V6zm6 0h2v12h-2V6z",
      reports:
        "M6 3h9l4 4v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm8 1v4h4",
      facilities:
        "M3 21V3h18v18H3zm2-2h14V5H5v14zm3-8h2v2H8v-2zm0-4h2v2H8V7zm6 4h2v2h-2v-2zm0-4h2v2h-2V7z",
      settings:
        "M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.5.5 0 0 0 .12-.64l-1.92-3.32a.5.5 0 0 0-.6-.22l-2.39.96a7.3 7.3 0 0 0-1.63-.94l-.36-2.54a.5.5 0 0 0-.5-.42h-3.84a.5.5 0 0 0-.5.42l-.36 2.54c-.58.24-1.12.55-1.63.94l-2.39-.96a.5.5 0 0 0-.6.22l-1.92 3.32a.5.5 0 0 0 .12.64l2.03 1.58c-.05.3-.07.62-.07.94 0 .33.02.64.07.94l-2.03 1.58a.5.5 0 0 0-.12.64l1.92 3.32c.14.24.44.34.7.22l2.39-.96c.5.39 1.05.7 1.63.94l.36 2.54a.5.5 0 0 0 .5.42h3.84a.5.5 0 0 0 .5-.42l.36-2.54c.58-.24 1.12-.55 1.63-.94l2.39.96c.26.12.56.02.7-.22l1.92-3.32a.5.5 0 0 0-.12-.64l-2.03-1.58zM12 15.5A3.5 3.5 0 1 1 12 8a3.5 3.5 0 0 1 0 7.5z",
    };

    return icons[name] || icons.dashboard;
  };

  return (
    <aside className="sems-sidebar">
      <div className="sidebar-logo">
        <span className="logo-badge" aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <path d="M13 2 5 14h6l-2 8 10-14h-6l2-6z" fill="currentColor" />
          </svg>
        </span>
        <span>SEMS</span>
      </div>

      <nav className="sidebar-nav">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`nav-item ${activeId === item.id ? "is-active" : ""}`}
            onClick={() => handleNavigation(item.id)}
          >
            <span className="nav-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d={renderIcon(item.icon)} fill="currentColor" />
              </svg>
            </span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <span>Smart Energy Management System</span>
        <span className="muted">v2.0.1 - GEMP Compliant</span>
      </div>
    </aside>
  );
}
