import { useState } from "react";

export default function ChartPanel({
  title,
  tabs = [],
  activeTab,
  onTabChange,
  data,
  valueLabel = "value",
  hideLive = false,
}) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const padding = 36;
  const width = 600;
  const height = 220;
  const values = data.map((point) => point.value);
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = max - min || 1;

  const points = data.map((point, index) => {
    const x = padding + (index / (data.length - 1)) * (width - padding * 2);
    const y =
      height - padding - ((point.value - min) / range) * (height - padding * 2);
    return { ...point, x, y };
  });

  // Map data to a straight-line SVG path.
  const path = points
    .map((point, index) => `${index === 0 ? "M" : "L"}${point.x} ${point.y}`)
    .join(" ");

  return (
    <div className="chart-panel">
      <div className="chart-header">
        <h3>{title}</h3>
        <div className="chart-header-right">
          {!hideLive && (
            <span className="live-indicator">
              <span className="live-dot" />
              Live
            </span>
          )}
          {tabs.length > 0 && (
            <div className="chart-tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  className={`chart-tab ${activeTab === tab.id ? "is-active" : ""}`}
                  onClick={() => onTabChange(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="chart-body" style={{ position: "relative" }}>
        <svg
          viewBox={`0 0 ${width} ${height}`}
          role="img"
          aria-label="Energy usage"
          style={{ overflow: "visible" }}
        >
          <rect
            x="0"
            y="0"
            width={width}
            height={height}
            rx="8"
            fill="transparent"
          />

          {/* Horizontal grid lines */}
          {Array.from({ length: 4 }).map((_, index) => (
            <line
              key={`grid-h-${index}`}
              x1={padding}
              y1={padding + index * ((height - padding * 2) / 3)}
              x2={width - padding}
              y2={padding + index * ((height - padding * 2) / 3)}
              stroke="rgba(255, 255, 255, 0.06)"
              strokeDasharray="4 4"
            />
          ))}

          {/* Threshold line */}
          <line
            x1={padding}
            y1={height / 2 - 20}
            x2={width - padding}
            y2={height / 2 - 20}
            stroke="#ff4d4f"
            strokeDasharray="4 4"
          />

          {/* Main line path */}
          <path d={path} fill="none" stroke="#ffd400" strokeWidth="3" />

          {/* Hover effects inside SVG */}
          {points.map((point, index) => (
            <g key={`group-${index}`}>
              {/* Vertical line on hover */}
              {hoveredIndex === index && (
                <line
                  x1={point.x}
                  y1={point.y}
                  x2={point.x}
                  y2={height - padding}
                  stroke="#ffffff"
                  strokeWidth="1"
                />
              )}

              {/* Data point circle */}
              <circle
                cx={point.x}
                cy={point.y}
                r={hoveredIndex === index ? "6" : "4"}
                fill="#ffd400"
                stroke={hoveredIndex === index ? "#ffffff" : "#1a1a1a"}
                strokeWidth="2"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{ cursor: "pointer", transition: "all 0.2s ease" }}
              />
            </g>
          ))}
        </svg>

        {/* HTML Tooltip using absolute positioning */}
        {points.map((point, index) => {
          if (hoveredIndex !== index) return null;
          return (
            <div
              key={`tooltip-${index}`}
              className="chart-tooltip"
              style={{
                left: `calc(${(point.x / width) * 100}% + 10px)`,
                top: `${(point.y / height) * 100}%`,
              }}
            >
              <div className="tooltip-time">{point.label}</div>
              <div className="tooltip-value">
                {valueLabel} : {point.value}
              </div>
            </div>
          );
        })}

        <div className="chart-labels">
          {data.map((point) => (
            <span key={point.label}>{point.label}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
