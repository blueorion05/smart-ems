import { useEffect, useState } from "react";
import SuperAdminHeader from "../components/SuperAdminHeader";
import SuperAdminSidebar from "../components/SuperAdminSidebar";
import { navItems } from "../data/superAdminData";
import "../styles/superadmin.css";

const recentReportsList = [
  {
    id: 1,
    title: "Q1 2026 Comprehensive Report",
    type: "Comprehensive",
    date: "2026-04-01",
  },
  {
    id: 2,
    title: "March Energy Consumption",
    type: "Energy",
    date: "2026-04-01",
  },
  {
    id: 3,
    title: "GEMP Compliance Summary",
    type: "Compliance",
    date: "2026-03-15",
  },
  { id: 4, title: "Building A Analysis", type: "Facility", date: "2026-03-10" },
];

export default function ReportsPage() {
  const [activeNav, setActiveNav] = useState("reports");
  const [timeLabel, setTimeLabel] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [reports, setReports] = useState(recentReportsList);

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

  const handleGeneratePreview = () => {
    setIsGenerating(true);
    setTimeout(() => {
      alert("Preview Generated Successfully! Displaying preview window...");
      setIsGenerating(false);
    }, 800);
  };

  const handleSaveTemplate = () => {
    alert("Template saved to your localized profile.");
  };

  const handleDownload = (title) => {
    alert(`Downloading ${title}...`);
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

        <main className="sems-content reports-content">
          <div className="content-header">
            <div>
              <h2 style={{ color: "var(--yellow)" }}>Reports</h2>
              <p>Generate comprehensive energy and compliance reports</p>
            </div>
          </div>

          <section className="reports-section generator-section">
            <h3 className="reports-section-title">Report Generator</h3>

            <div className="reports-filters">
              <div className="reports-input-group">
                <label>
                  <svg viewBox="0 0 24 24" width="16" height="16">
                    <path
                      d="M7 19h10V4H7v15zm-5-2h4V6H2v11zM19 6v11h4V6h-4z"
                      fill="currentColor"
                    />
                  </svg>
                  Facility
                </label>
                <select className="reports-select">
                  <option>All Facilities</option>
                  <option>Building A</option>
                  <option>Building B</option>
                </select>
              </div>

              <div className="reports-input-group">
                <label>
                  <svg viewBox="0 0 24 24" width="16" height="16">
                    <path
                      d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7v-5z"
                      fill="currentColor"
                    />
                  </svg>
                  Date Range
                </label>
                <select className="reports-select">
                  <option>This Month</option>
                  <option>Last Month</option>
                  <option>Q1 2026</option>
                  <option>Year to Date</option>
                </select>
              </div>

              <div className="reports-input-group">
                <label>
                  <svg viewBox="0 0 24 24" width="16" height="16">
                    <path
                      d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z"
                      fill="currentColor"
                    />
                  </svg>
                  Report Type
                </label>
                <select className="reports-select">
                  <option>Comprehensive Report</option>
                  <option>Energy Consumption</option>
                  <option>Financial Summary</option>
                  <option>Compliance Report</option>
                </select>
              </div>
            </div>

            <div className="reports-actions">
              <button
                className="btn-primary"
                onClick={handleGeneratePreview}
                disabled={isGenerating}
              >
                <svg
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  style={{ marginRight: "8px" }}
                >
                  <path
                    d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"
                    fill="currentColor"
                  />
                </svg>
                {isGenerating ? "Generating..." : "Generate Preview"}
              </button>
              <button className="btn-secondary" onClick={handleSaveTemplate}>
                Save Template
              </button>
            </div>
          </section>

          <section className="reports-section list-section">
            <h3 className="reports-section-title">Recent Reports</h3>
            <div className="reports-list">
              {reports.map((report) => (
                <div className="report-item" key={report.id}>
                  <div className="report-item-icon">
                    <svg viewBox="0 0 24 24" width="20" height="20">
                      <path
                        d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                  <div className="report-item-info">
                    <h4>{report.title}</h4>
                    <span>
                      {report.type} &bull; {report.date}
                    </span>
                  </div>
                  <button
                    className="report-download-btn"
                    onClick={() => handleDownload(report.title)}
                  >
                    <svg viewBox="0 0 24 24" width="20" height="20">
                      <path
                        d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"
                        fill="currentColor"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
