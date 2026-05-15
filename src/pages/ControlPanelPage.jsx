import { useEffect, useState } from "react";
import SuperAdminHeader from "../components/SuperAdminHeader";
import SuperAdminSidebar from "../components/SuperAdminSidebar";
import { navItems } from "../data/superAdminData";
import "../styles/superadmin.css";

const statusConfig = [
  {
    id: "online",
    statusMatch: "Online",
    label: "Systems Online",
    color: "#1dd1a1",
    iconPath:
      "M16 18l2.29-2.29-4.88-4.88-4 4L2 7.41 3.41 6l6 6 4-4 6.3 6.29L22 12v6z",
  },
  {
    id: "standby",
    statusMatch: "Standby",
    label: "Standby Mode",
    color: "#ff9f1a",
    iconPath:
      "M13 3h-2v10h2V3z M17.83 5.17l-1.42 1.42C17.99 7.86 19 9.81 19 12c0 3.87-3.13 7-7 7s-7-3.13-7-7c0-2.19 1.01-4.14 2.58-5.42L6.17 5.17C4.23 6.82 3 9.28 3 12c0 4.97 4.03 9 9 9s9-4.03 9-9c0-2.72-1.23-5.18-3.17-6.83z",
  },
  {
    id: "offline",
    statusMatch: "Offline",
    label: "Offline",
    color: "#ea2027",
    iconPath:
      "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z",
  },
];

const initialSwitches = [
  {
    id: "hvac-a",
    type: "hvac",
    name: "HVAC System - Building A",
    location: "Building A",
    status: "Standby",
    checked: true,
  },
  {
    id: "hvac-b",
    type: "hvac",
    name: "HVAC System - Building B",
    location: "Building B",
    status: "Online",
    checked: true,
  },
  {
    id: "hvac-c",
    type: "hvac",
    name: "HVAC System - Building C",
    location: "Building C",
    status: "Standby",
    checked: true,
  },
  {
    id: "light-a",
    type: "light",
    name: "Lighting - Building A",
    location: "Building A",
    status: "Online",
    checked: true,
  },
  {
    id: "light-b",
    type: "light",
    name: "Lighting - Building B",
    location: "Building B",
    status: "Online",
    checked: true,
  },
  {
    id: "light-c",
    type: "light",
    name: "Lighting - Building C",
    location: "Building C",
    status: "Offline",
    checked: false,
  },
];

const powerLimits = [
  { id: "pa", label: "Building A - Power Limit", value: 80 },
  { id: "pb", label: "Building B - Power Limit", value: 75 },
  { id: "pc", label: "Building C - Power Limit", value: 90 },
];

export default function ControlPanelPage() {
  const [activeNav, setActiveNav] = useState("control");
  const [timeLabel, setTimeLabel] = useState("");
  const [switches, setSwitches] = useState(initialSwitches);
  const [limits, setLimits] = useState(powerLimits);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeLabel(
        now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
      );
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleSwitch = (id) => {
    setSwitches(
      switches.map((s) => {
        if (s.id === id) {
          const checked = !s.checked;
          const status = checked
            ? s.type === "hvac"
              ? "Standby"
              : "Online"
            : "Offline";
          return { ...s, checked, status };
        }
        return s;
      }),
    );
  };

  const getStatusColor = (status) => {
    if (status === "Online") return "rgba(29, 209, 161, 1)"; // green
    if (status === "Standby") return "rgba(255, 159, 26, 1)"; // orange/yellow
    return "rgba(234, 32, 39, 1)"; // red for offline
  };

  const getStatusBg = (status) => {
    if (status === "Online") return "rgba(29, 209, 161, 0.1)";
    if (status === "Standby") return "rgba(255, 159, 26, 0.1)";
    return "rgba(234, 32, 39, 0.1)";
  };

  const dynamicStatusSummary = statusConfig.map((config) => ({
    ...config,
    count: switches.filter((s) => s.status === config.statusMatch).length,
  }));

  const getIcon = (type) => {
    if (type === "hvac") {
      return (
        <svg viewBox="0 0 24 24" width="20" height="20">
          <path
            d="M4 14h10v2H4v-2zm0-4h16v2H4v-2zm0-4h14v2H4V6z"
            fill="currentColor"
          />
        </svg>
      );
    }
    return (
      <svg viewBox="0 0 24 24" width="20" height="20">
        <path
          d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6C7.8 12.16 7 10.63 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z"
          fill="currentColor"
        />
      </svg>
    );
  };

  return (
    <div className="sems-admin">
      <SuperAdminSidebar
        items={navItems}
        activeId={activeNav}
        onSelect={setActiveNav}
      />

      <div className="sems-main">
        <SuperAdminHeader
          timeLabel={timeLabel}
          userName="Energy Admin"
          userRole="Administrator"
        />

        <main className="sems-content control-panel-content">
          <div className="content-header">
            <div>
              <h2 style={{ color: "var(--yellow)" }}>Control Panel</h2>
              <p>Manage and control energy systems across all facilities</p>
            </div>
          </div>

          <div className="cp-stats-grid">
            {dynamicStatusSummary.map((stat) => (
              <div className="cp-stat-card" key={stat.id}>
                <div className="cp-stat-icon" style={{ color: stat.color }}>
                  <svg viewBox="0 0 24 24" width="28" height="28">
                    <path d={stat.iconPath} fill="currentColor" />
                  </svg>
                </div>
                <div className="cp-stat-info">
                  <div className="cp-stat-count" style={{ color: stat.color }}>
                    {stat.count}
                  </div>
                  <div className="cp-stat-label">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>

          <section className="cp-section cp-switches-section">
            <h3 className="cp-section-title">System Control Switches</h3>
            <div className="cp-switches-grid">
              {switches.map((sw) => (
                <div
                  className={`cp-switch-card ${sw.checked ? "is-active" : "is-inactive"}`}
                  key={sw.id}
                  style={{
                    borderColor: sw.checked
                      ? getStatusColor(sw.status)
                      : "rgba(255, 255, 255, 0.08)",
                    boxShadow: sw.checked
                      ? `0 0 10px ${getStatusBg(sw.status)}`
                      : "none",
                  }}
                >
                  <div className="cp-switch-top">
                    <div
                      className="cp-switch-icon"
                      style={{
                        color: getStatusColor(sw.status),
                        backgroundColor: getStatusBg(sw.status),
                      }}
                    >
                      {getIcon(sw.type)}
                    </div>
                    <div className="cp-switch-text">
                      <h4>{sw.name}</h4>
                      <span>{sw.location}</span>
                    </div>
                  </div>
                  <div className="cp-switch-bottom">
                    <div className="cp-status">
                      <span
                        className="cp-status-dot"
                        style={{ backgroundColor: getStatusColor(sw.status) }}
                      ></span>
                      <span style={{ color: "rgba(255,255,255,0.6)" }}>
                        {sw.status}
                      </span>
                    </div>
                    <div
                      className="cp-toggle"
                      onClick={() => toggleSwitch(sw.id)}
                    >
                      <div
                        className={`cp-toggle-track ${sw.checked ? "active" : ""}`}
                        style={
                          sw.checked
                            ? {
                                backgroundColor: getStatusColor(sw.status),
                                borderColor: getStatusColor(sw.status),
                              }
                            : {}
                        }
                      >
                        <div className="cp-toggle-thumb"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="cp-section cp-power-section">
            <h3 className="cp-section-title">Power Limit Controls</h3>
            <div className="cp-power-grid">
              {limits.map((pl) => (
                <div className="cp-power-row" key={pl.id}>
                  <div className="cp-power-header">
                    <span>{pl.label}</span>
                    <span className="cp-power-val">{pl.value}%</span>
                  </div>
                  <div className="cp-slider-wrap">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={pl.value}
                      onChange={(e) =>
                        setLimits(
                          limits.map((l) =>
                            l.id === pl.id
                              ? { ...l, value: parseInt(e.target.value) }
                              : l,
                          ),
                        )
                      }
                      className="cp-range-slider"
                      style={{ "--val": `${pl.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="cp-section cp-schedule-section">
            <h3 className="cp-section-title cp-schedule-title">
              <svg
                viewBox="0 0 24 24"
                width="20"
                height="20"
                style={{ marginRight: "8px", color: "var(--yellow)" }}
              >
                <path
                  d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.2 3.2.8-1.3-4.5-2.7V7z"
                  fill="currentColor"
                />
              </svg>
              Automated Scheduling
            </h3>
            <div className="cp-schedule-grid">
              <div className="cp-schedule-block">
                <h4>HVAC Operating Hours</h4>
                <div className="cp-schedule-inputs">
                  <div className="cp-input-group">
                    <label>Start Time</label>
                    <div className="cp-time-input">
                      <input type="text" defaultValue="06:00 am" />
                      <svg viewBox="0 0 24 24" width="16" height="16">
                        <path
                          d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"
                          fill="currentColor"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="cp-input-group">
                    <label>End Time</label>
                    <div className="cp-time-input">
                      <input type="text" defaultValue="06:00 pm" />
                      <svg viewBox="0 0 24 24" width="16" height="16">
                        <path
                          d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"
                          fill="currentColor"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div className="cp-schedule-block">
                <h4>Lighting Operating Hours</h4>
                <div className="cp-schedule-inputs">
                  <div className="cp-input-group">
                    <label>Start Time</label>
                    <div className="cp-time-input">
                      <input type="text" defaultValue="06:00 am" />
                      <svg viewBox="0 0 24 24" width="16" height="16">
                        <path
                          d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"
                          fill="currentColor"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="cp-input-group">
                    <label>End Time</label>
                    <div className="cp-time-input">
                      <input type="text" defaultValue="10:00 pm" />
                      <svg viewBox="0 0 24 24" width="16" height="16">
                        <path
                          d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"
                          fill="currentColor"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="cp-schedule-actions">
              <button className="cp-apply-btn">Apply Schedule Changes</button>
            </div>
          </section>

          <section className="cp-section cp-indicators-section">
            <h3 className="cp-section-title">System Status Indicators</h3>
            <div className="cp-indicators-grid">
              <div className="cp-indicator-card">
                <span className="cp-ind-label">Current Load</span>
                <div className="cp-ind-value">68.5%</div>
                <span className="cp-ind-sub" style={{ color: "#1dd1a1" }}>
                  Within limits
                </span>
              </div>
              <div className="cp-indicator-card">
                <span className="cp-ind-label">Active Overrides</span>
                <div className="cp-ind-value" style={{ color: "#ff9f1a" }}>
                  2
                </div>
                <span className="cp-ind-sub">Manual interventions</span>
              </div>
              <div className="cp-indicator-card">
                <span className="cp-ind-label">Automation Rate</span>
                <div className="cp-ind-value">92%</div>
                <span className="cp-ind-sub" style={{ color: "#1dd1a1" }}>
                  Optimal performance
                </span>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
