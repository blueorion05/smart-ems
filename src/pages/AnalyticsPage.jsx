import { useEffect, useState } from "react";
import SuperAdminHeader from "../components/SuperAdminHeader";
import SuperAdminSidebar from "../components/SuperAdminSidebar";
import {
  aiInsightsData,
  analyticsMetrics,
  baselineVsActualData,
  forecastData,
  navItems,
  reductionByCategoryData,
} from "../data/superAdminData";
import "../styles/superadmin.css";

export default function AnalyticsPage() {
  const [activeNav, setActiveNav] = useState("analytics");
  const [timeLabel, setTimeLabel] = useState("");
  const [hoveredPoint, setHoveredPoint] = useState(null);

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

  const chartHeight = 260;
  const maxBaseline = 16000;

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

        <main className="sems-content analytics-page">
          <div className="content-header">
            <div>
              <h2>Advanced Analytics</h2>
              <p>Baseline comparison, forecasting, and AI-powered insights</p>
            </div>
          </div>

          {/* Top Metric Cards */}
          <section className="analytics-metrics-grid">
            {analyticsMetrics.map((card) => (
              <div key={card.id} className="analytics-metric-card">
                <div className="analytics-metric-content">
                  <div className="analytics-metric-info">
                    <span className="analytics-metric-label">{card.label}</span>
                    <div className="analytics-metric-value-wrap">
                      <span className="analytics-metric-value">
                        {card.value}
                      </span>
                      <span className="analytics-metric-unit">{card.unit}</span>
                    </div>
                  </div>
                  <div className="analytics-metric-icon">
                    <svg viewBox="0 0 24 24">
                      <path d={card.icon} fill="currentColor" />
                    </svg>
                  </div>
                </div>
                {card.delta && (
                  <div className={`analytics-metric-delta ${card.trend}`}>
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
                )}
              </div>
            ))}
          </section>

          {/* Double Line Chart Section */}
          <section className="analytics-panel-card">
            <h3>Baseline vs Actual Consumption</h3>
            <div className="custom-chart-container">
              <div className="y-axis">
                {[16000, 12000, 8000, 4000, 0].map((val) => (
                  <div key={val} className="y-tick">
                    {val}
                  </div>
                ))}
              </div>
              <div
                className="chart-canvas"
                style={{ position: "relative", height: chartHeight }}
              >
                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  style={{ position: "absolute", top: 0, left: 0 }}
                >
                  {/* Grid Lines */}
                  {[0, 0.25, 0.5, 0.75, 1].map((ratio) => (
                    <line
                      key={ratio}
                      x1="0"
                      y1={100 * ratio}
                      x2="100"
                      y2={100 * ratio}
                      stroke="rgba(255, 255, 255, 0.05)"
                      strokeWidth="1"
                      vectorEffect="non-scaling-stroke"
                    />
                  ))}

                  {/* Baseline Polyline */}
                  <polyline
                    fill="none"
                    stroke="#8c8c8c"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                    vectorEffect="non-scaling-stroke"
                    points={baselineVsActualData
                      .map((d, i) => {
                        const x = (i / (baselineVsActualData.length - 1)) * 100;
                        const y = 100 - (d.baseline / maxBaseline) * 100;
                        return `${x},${y}`;
                      })
                      .join(" ")}
                  />

                  {/* Actual Polyline */}
                  <polyline
                    fill="none"
                    stroke="#ffd400"
                    strokeWidth="3"
                    vectorEffect="non-scaling-stroke"
                    points={baselineVsActualData
                      .map((d, i) => {
                        const x = (i / (baselineVsActualData.length - 1)) * 100;
                        const y = 100 - (d.actual / maxBaseline) * 100;
                        return `${x},${y}`;
                      })
                      .join(" ")}
                  />
                </svg>

                <svg
                  width="100%"
                  height="100%"
                  style={{ position: "absolute", top: 0, left: 0 }}
                >
                  {/* Baseline Dots */}
                  {baselineVsActualData.map((d, i) => {
                    const cx = `${(i / (baselineVsActualData.length - 1)) * 100}%`;
                    const cy =
                      chartHeight - (d.baseline / maxBaseline) * chartHeight;
                    return (
                      <circle
                        key={`base-${i}`}
                        cx={cx}
                        cy={cy}
                        r="4"
                        fill="#8c8c8c"
                      />
                    );
                  })}

                  {/* Actual Dots & Hover Targets */}
                  {baselineVsActualData.map((d, i) => {
                    const cx = (i / (baselineVsActualData.length - 1)) * 100;
                    const cy =
                      chartHeight - (d.actual / maxBaseline) * chartHeight;
                    return (
                      <g
                        key={`act-${i}`}
                        onMouseEnter={() => setHoveredPoint({ ...d, cx, cy })}
                        onMouseLeave={() => setHoveredPoint(null)}
                      >
                        <circle
                          cx={`${cx}%`}
                          cy={cy}
                          r="6"
                          fill="#ffd400"
                          stroke="#141414"
                          strokeWidth="2"
                        />
                        <rect
                          x={`${cx - 5}%`}
                          y="0"
                          width="10%"
                          height={chartHeight}
                          fill="transparent"
                          style={{ cursor: "pointer" }}
                        />
                        {hoveredPoint?.label === d.label && (
                          <line
                            x1={`${cx}%`}
                            y1="0"
                            x2={`${cx}%`}
                            y2={chartHeight}
                            stroke="rgba(255, 255, 255, 0.2)"
                            strokeWidth="1"
                          />
                        )}
                      </g>
                    );
                  })}
                </svg>

                {hoveredPoint && (
                  <div
                    className="chart-custom-tooltip"
                    style={{
                      left: `${hoveredPoint.cx}%`,
                      top: hoveredPoint.cy,
                    }}
                  >
                    <div className="tooltip-title">{hoveredPoint.label}</div>
                    <div className="tooltip-row">
                      <span className="tooltip-label">Baseline :</span>
                      <span className="tooltip-val">
                        {hoveredPoint.baseline}
                      </span>
                    </div>
                    <div className="tooltip-row">
                      <span className="tooltip-label">Actual :</span>
                      <span className="tooltip-val actual">
                        {hoveredPoint.actual}
                      </span>
                    </div>
                  </div>
                )}
              </div>
              <div className="x-axis">
                {baselineVsActualData.map((d) => (
                  <div key={d.label}>{d.label}</div>
                ))}
              </div>
              <div className="chart-legend">
                <span className="legend-item">
                  <span className="legend-dot baseline"></span> Baseline
                </span>
                <span className="legend-item">
                  <span className="legend-dot actual"></span> Actual
                </span>
              </div>
            </div>
          </section>

          {/* Compare and Forecast Grid */}
          <section className="analytics-middle-grid">
            <div className="analytics-panel-card">
              <h3>Reduction by Category</h3>
              <div className="reduction-list">
                {reductionByCategoryData.map((item) => (
                  <div key={item.category} className="reduction-item">
                    <div className="reduction-header">
                      <span className="reduction-category">
                        {item.category}
                      </span>
                      <div className="reduction-stats">
                        <span className="reduction-vals">
                          {item.current}% / {item.target}%
                        </span>
                        {item.met && (
                          <span className="reduction-met">
                            <svg viewBox="0 0 24 24" width="12" height="12">
                              <path
                                fill="currentColor"
                                d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"
                              />
                            </svg>{" "}
                            Target Met
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="reduction-progress-bg">
                      <div
                        className={`reduction-progress-fill ${item.met ? "met" : "unmet"}`}
                        style={{ width: `${item.current}%` }}
                      ></div>
                      <div
                        className="reduction-target-marker"
                        style={{ left: `${item.target}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="analytics-panel-card">
              <h3>Consumption Forecast</h3>
              <div className="custom-chart-container small">
                <div className="y-axis">
                  {[14000, 10500, 7000, 3500, 0].map((val) => (
                    <div key={val} className="y-tick">
                      {val}
                    </div>
                  ))}
                </div>
                <div
                  className="chart-canvas"
                  style={{ position: "relative", height: 160 }}
                >
                  <svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                    style={{ position: "absolute", top: 0, left: 0 }}
                  >
                    {/* Grid Lines */}
                    {[0, 0.25, 0.5, 0.75, 1].map((ratio) => (
                      <line
                        key={ratio}
                        x1="0"
                        y1={100 * ratio}
                        x2="100"
                        y2={100 * ratio}
                        stroke="rgba(255, 255, 255, 0.05)"
                        strokeWidth="1"
                        vectorEffect="non-scaling-stroke"
                      />
                    ))}

                    {/* Fill actual */}
                    <polygon
                      fill="rgba(255, 212, 0, 0.25)"
                      vectorEffect="non-scaling-stroke"
                      points={`0,100 ${forecastData
                        .filter((d) => d.actual)
                        .map((d, i) => {
                          const x = (i / (forecastData.length - 1)) * 100;
                          const y = 100 - (d.actual / 14000) * 100;
                          return `${x},${y}`;
                        })
                        .join(" ")} ${(1 / 5) * 100},100`}
                    />
                    {/* Line actual */}
                    <polyline
                      fill="none"
                      stroke="#ffd400"
                      strokeWidth="2"
                      vectorEffect="non-scaling-stroke"
                      points={forecastData
                        .filter((d) => d.actual)
                        .map((d, i) => {
                          const x = (i / (forecastData.length - 1)) * 100;
                          const y = 100 - (d.actual / 14000) * 100;
                          return `${x},${y}`;
                        })
                        .join(" ")}
                    />

                    {/* Fill forecast */}
                    <polygon
                      fill="rgba(255, 159, 26, 0.1)"
                      vectorEffect="non-scaling-stroke"
                      points={`${(1 / 5) * 100},100 ${forecastData
                        .slice(1)
                        .map((d, i) => {
                          const x = ((i + 1) / (forecastData.length - 1)) * 100;
                          const y = 100 - (d.forecast / 14000) * 100;
                          return `${x},${y}`;
                        })
                        .join(" ")} 100,100`}
                    />
                    {/* Line forecast */}
                    <polyline
                      fill="none"
                      stroke="#ff9f1a"
                      strokeWidth="2"
                      strokeDasharray="4,4"
                      vectorEffect="non-scaling-stroke"
                      points={forecastData
                        .slice(1)
                        .map((d, i) => {
                          const x = ((i + 1) / (forecastData.length - 1)) * 100;
                          const y = 100 - (d.forecast / 14000) * 100;
                          return `${x},${y}`;
                        })
                        .join(" ")}
                    />
                  </svg>
                </div>
                <div className="x-axis">
                  {forecastData.map((d) => (
                    <div key={d.label}>{d.label}</div>
                  ))}
                </div>
                <div className="chart-legend center">
                  <span className="legend-item">
                    <span className="legend-dot actual"></span> Actual
                  </span>
                  <span className="legend-item">
                    <span className="legend-dot forecast"></span> Forecast
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* AI Insights Section */}
          <section className="analytics-panel-card">
            <h3 className="section-title-icon">
              <svg viewBox="0 0 24 24" width="18" height="18">
                <path
                  fill="var(--yellow)"
                  d="M9 21c0 .5.4 1 1 1h4c.6 0 1-.5 1-1v-1H9v1zm3-19C8.1 2 5 5.1 5 9c0 2.4 1.2 4.5 3 5.7V17c0 .5.4 1 1 1h6c.6 0 1-.5 1-1v-2.3c1.8-1.3 3-3.4 3-5.7 0-3.9-3.1-7-7-7z"
                />
              </svg>
              AI-Powered Insights
            </h3>
            <div className="insights-grid">
              {aiInsightsData.map((insight) => (
                <div key={insight.id} className="insight-card">
                  <div className="insight-header">
                    <h4>{insight.title}</h4>
                    <span
                      className={`severity-badge ${insight.severity.toLowerCase()}`}
                    >
                      {insight.severity}
                    </span>
                  </div>
                  <p className="insight-desc">{insight.description}</p>
                  <div className={`insight-action ${insight.type}`}>
                    {insight.action}
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
