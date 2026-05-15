export default function BarChartPanel({ title, data }) {
  const maxValue = Math.max(...data.map((item) => item.value));
  const tickMax = Math.ceil(maxValue / 100) * 100 || 100;
  const ticks = Array.from(
    { length: 5 },
    (_, index) => tickMax - index * (tickMax / 4),
  );

  return (
    <div className="panel-card">
      <h3>{title}</h3>
      <div className="bar-chart">
        <div className="bar-grid">
          {ticks.map((tick) => (
            <div key={tick} className="bar-grid-row">
              <span>{tick}</span>
              <div className="bar-line" />
            </div>
          ))}
        </div>
        <div className="bar-series">
          <div
            className="bar-area"
            style={{
              gridTemplateColumns: `repeat(${data.length}, minmax(0, 1fr))`,
            }}
          >
            {data.map((item) => (
              <div key={item.label} className="bar-item">
                <div
                  className="bar"
                  style={{ height: `${(item.value / tickMax) * 100}%` }}
                />
                <div className="bar-tooltip">
                  <strong>{item.label}</strong>
                  <span>consumption : {item.value}</span>
                </div>
              </div>
            ))}
          </div>
          <div
            className="bar-labels"
            style={{
              gridTemplateColumns: `repeat(${data.length}, minmax(0, 1fr))`,
            }}
          >
            {data.map((item) => (
              <span key={item.label}>{item.label}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
