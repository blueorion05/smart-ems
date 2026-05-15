import { useEffect, useState } from "react";
import BarChartPanel from "../components/BarChartPanel";
import ChartPanel from "../components/ChartPanel";
import SuperAdminHeader from "../components/SuperAdminHeader";
import SuperAdminSidebar from "../components/SuperAdminSidebar";
import {
  fuelLogs,
  fuelMetrics,
  fuelTanks,
  fuelTrendData,
  fuelUsageSource,
  navItems,
} from "../data/superAdminData";
import "../styles/superadmin.css";

export default function FuelMonitoringPage() {
  const [activeNav, setActiveNav] = useState("fuel");
  const [timeLabel, setTimeLabel] = useState("");

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

        <main className="sems-content fuel-page">
          <div className="content-header">
            <div>
              <h2>Fuel Monitoring</h2>
              <p>Track fuel consumption across generators and vehicle fleet</p>
            </div>
          </div>

          {/* Top Metric Cards */}
          <section className="fuel-metrics-grid">
            {fuelMetrics.map((card) => (
              <div key={card.id} className="fuel-metric-card">
                <div className="fuel-metric-content">
                  <div className="fuel-metric-info">
                    <span className="fuel-metric-label">{card.label}</span>
                    <div className="fuel-metric-value-wrap">
                      <span className="fuel-metric-value">{card.value}</span>
                      <span className="fuel-metric-unit">{card.unit}</span>
                    </div>
                  </div>
                  <div className="fuel-metric-icon">
                    <svg viewBox="0 0 24 24">
                      <path d={card.icon} fill="currentColor" />
                    </svg>
                  </div>
                </div>
                <div className={`fuel-metric-delta ${card.trend}`}>
                  <svg viewBox="0 0 24 24" className="delta-icon">
                    {card.trend === "up" ? (
                      <path
                        d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"
                        fill="currentColor"
                      />
                    ) : (
                      <path
                        d="M16 18l2.29-2.29-4.88-4.88-4 4L2 7.41 3.41 6l6 6 4-4 6.3 6.29L22 12v6z"
                        fill="currentColor"
                      />
                    )}
                  </svg>
                  {card.delta}
                </div>
              </div>
            ))}
          </section>

          {/* Charts Section */}
          <section className="fuel-charts-grid">
            <ChartPanel
              title="Fuel Consumption Trend"
              data={fuelTrendData}
              valueLabel="liters"
              hideLive={true}
            />
            <BarChartPanel
              title="Fuel Usage by Source"
              data={fuelUsageSource}
            />
          </section>

          {/* Bottom Log and Tanks Sections */}
          <section className="fuel-bottom-grid">
            <div className="fuel-table-panel">
              <div className="log-header">
                <h3>Fuel Consumption Log</h3>
              </div>
              <div className="log-table-wrapper">
                <table className="log-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Facility</th>
                      <th>Liters Used</th>
                      <th>Source</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fuelLogs.map((log, index) => (
                      <tr key={index}>
                        <td>{log.date}</td>
                        <td>{log.facility}</td>
                        <td className="highlight-text">{log.liters}</td>
                        <td>{log.source}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <section className="fuel-tanks-section">
            <div className="log-header">
              <h3>Fuel Tank Levels</h3>
            </div>
            <div className="tank-cards-grid">
              {fuelTanks.map((tank) => (
                <div key={tank.id} className="tank-card">
                  <div className="tank-name">{tank.name}</div>
                  <div className="tank-progress-wrapper">
                    <div className="tank-progress-bar">
                      <div
                        className={`tank-progress-fill ${tank.status === "Low" ? "danger" : ""}`}
                        style={{ width: `${tank.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="tank-footer">
                    <span className="tank-percentage">{tank.percentage}%</span>
                    {tank.status === "Low" && (
                      <span className="tank-status-low">Low</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
