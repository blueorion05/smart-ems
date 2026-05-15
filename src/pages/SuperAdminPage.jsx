import { useEffect, useMemo, useState } from "react";
import AlertCard from "../components/AlertCard";
import BarChartPanel from "../components/BarChartPanel";
import ChartPanel from "../components/ChartPanel";
import DonutChartPanel from "../components/DonutChartPanel";
import MetricCard from "../components/MetricCard";
import SuperAdminHeader from "../components/SuperAdminHeader";
import SuperAdminSidebar from "../components/SuperAdminSidebar";
import {
  alertItems,
  chartSeries,
  chartTabs,
  energyDistribution,
  facilityPerformance,
  metricCards,
  navItems,
} from "../data/superAdminData";
import "../styles/superadmin.css";

export default function SuperAdminPage() {
  const [activeNav, setActiveNav] = useState("dashboard");
  const [activeTab, setActiveTab] = useState("daily");
  const [timeLabel, setTimeLabel] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeLabel(
        now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
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
              <h2>Control Center</h2>
              <p>Real-time energy monitoring and facility management</p>
            </div>
            <div className="content-actions">
              <button type="button" className="action-btn secondary">
                Export Report
              </button>
              <button type="button" className="action-btn primary">
                Generate Alert
              </button>
            </div>
          </div>

          <section className="metrics-grid">
            {metricCards.map((card) => (
              <MetricCard key={card.id} card={card} />
            ))}
          </section>

          <section className="main-grid">
            <ChartPanel
              title="Real-Time Energy Consumption"
              tabs={chartTabs}
              activeTab={activeTab}
              onTabChange={setActiveTab}
              data={chartData}
            />
            <div className="alerts-panel">
              <h3>System Alerts</h3>
              <div className="alerts-list">
                {alertItems.map((alert) => (
                  <AlertCard key={alert.id} alert={alert} />
                ))}
              </div>
            </div>
          </section>

          <section className="secondary-grid">
            <BarChartPanel
              title="Facility Performance Comparison"
              data={facilityPerformance}
            />
            <DonutChartPanel
              title="Energy Distribution by Category"
              data={energyDistribution}
            />
          </section>
        </main>
      </div>
    </div>
  );
}
