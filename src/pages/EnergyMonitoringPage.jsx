import { useEffect, useMemo, useState } from "react";
import ChartPanel from "../components/ChartPanel";
import SuperAdminHeader from "../components/SuperAdminHeader";
import SuperAdminSidebar from "../components/SuperAdminSidebar";
import {
  chartSeries,
  chartTabs,
  energyConsumptionLog,
  navItems,
} from "../data/superAdminData";
import "../styles/superadmin.css";

export default function EnergyMonitoringPage() {
  const [activeNav, setActiveNav] = useState("energy");
  const [activeTab, setActiveTab] = useState("hourly");
  const [timeLabel, setTimeLabel] = useState("");
  const [selectedDate, setSelectedDate] = useState("Today");
  const [selectedFacility, setSelectedFacility] = useState("All Facilities");

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

  const chartData = useMemo(() => chartSeries[activeTab], [activeTab]);

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

        <main className="sems-content">
          <div className="content-header">
            <div>
              <h2>Energy Monitoring</h2>
              <p>Real-time energy consumption tracking and analysis</p>
            </div>
          </div>

          <div className="monitoring-filters">
            <div className="filter-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path
                  d="M9 3h6l3 4v12a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <div className="filter-group">
              <select
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="filter-select"
              >
                <option>Today</option>
                <option>Yesterday</option>
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
              </select>
            </div>

            <div className="filter-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path
                  d="M4 6h16v2H4V6zm2 5h12v2H6v-2zm3 5h6v2H9v-2z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <div className="filter-group">
              <select
                value={selectedFacility}
                onChange={(e) => setSelectedFacility(e.target.value)}
                className="filter-select"
              >
                <option>All Facilities</option>
                <option>Building A</option>
                <option>Building B</option>
                <option>Building C</option>
                <option>Building D</option>
                <option>Building E</option>
              </select>
            </div>

            <button
              type="button"
              className="action-btn primary monitoring-export-btn"
            >
              <span className="btn-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <path
                    d="M3 12c0-1.1.9-2 2-2h2V7c0-1.1.9-2 2-2s2 .9 2 2v3h2c1.1 0 2 .9 2 2v8c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2v-8zm4-9v3h6V3H7z"
                    fill="currentColor"
                  />
                </svg>
              </span>
              Export Data
            </button>
          </div>

          <section className="energy-chart-section">
            <ChartPanel
              title="Live Energy Consumption Stream"
              tabs={chartTabs}
              activeTab={activeTab}
              onTabChange={setActiveTab}
              data={chartData}
            />
          </section>

          <section className="energy-log-section">
            <div className="log-header">
              <h3>Energy Consumption Log</h3>
            </div>
            <div className="log-table-wrapper">
              <table className="log-table">
                <thead>
                  <tr>
                    <th>Timestamp</th>
                    <th>Facility</th>
                    <th>kWh Usage</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {energyConsumptionLog.map((log, index) => (
                    <tr key={index}>
                      <td>{log.timestamp}</td>
                      <td>{log.facility}</td>
                      <td>{log.usage}</td>
                      <td>
                        <span className={`status-badge status-${log.status}`}>
                          {log.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
