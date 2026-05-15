export default function MetricCard({ card }) {
  const iconPaths = {
    bolt: "M13 2 5 14h6l-2 8 10-14h-6l2-6z",
    fuel: "M9 4h6l3 4v11a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3zm6 4H9v11h6V8zm4-1h2v7a2 2 0 0 1-2 2h-1v-2h1V7z",
    trend: "M4 17h3l4-4 4 4 5-5v3h2V8h-7v2h3l-3 3-4-4-6 6z",
    gauge: "M4 18a8 8 0 1 1 16 0H4zm8-5 4-4",
  };

  const isUp = card.trend === "up";
  const arrow = isUp ? "↗" : "↘";

  return (
    <div className="metric-card">
      <div className="metric-header">
        <div>
          <p className="metric-label">{card.label}</p>
          <div className="metric-value">
            <span>{card.value}</span>
            <span className="metric-unit">{card.unit}</span>
          </div>
        </div>
        <span className="metric-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <path d={iconPaths[card.icon]} fill="currentColor" />
          </svg>
        </span>
      </div>
      <p className={`metric-delta ${isUp ? "up" : "down"}`}>
        {arrow} {card.delta}
      </p>
    </div>
  );
}
