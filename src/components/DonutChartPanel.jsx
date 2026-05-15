export default function DonutChartPanel({ title, data }) {
  const size = 210;
  const center = size / 2;
  const labelRadius = 135;
  let runningTotal = 0;

  const gradient = data
    .map((item, index) => {
      const start = data
        .slice(0, index)
        .reduce((sum, cur) => sum + cur.value, 0);
      const end = start + item.value;
      return `${item.color} ${start}% ${end}%`;
    })
    .join(", ");

  return (
    <div className="panel-card">
      <h3>{title}</h3>
      <div className="donut-layout">
        <div className="donut-ring" style={{ width: size, height: size }}>
          <div
            className="donut"
            style={{ background: `conic-gradient(${gradient})` }}
          >
            <div className="donut-hole" />
          </div>
          {data.map((item) => {
            const midPoint = runningTotal + item.value / 2;
            runningTotal += item.value;
            const angle = (midPoint / 100) * Math.PI * 2 - Math.PI / 2;
            const left = center + Math.cos(angle) * labelRadius;
            const top = center + Math.sin(angle) * labelRadius;
            const isLeft = angle > Math.PI / 2 || angle < -Math.PI / 2;
            const isBottom =
              angle > Math.PI / 2 - 0.45 && angle < Math.PI / 2 + 0.45;
            const offset = isBottom ? 0 : isLeft ? -18 : 18;

            return (
              <div
                key={item.label}
                className={`donut-label-float ${isBottom ? "center" : isLeft ? "left" : "right"}`}
                style={{ left: left + offset, top: isBottom ? top + 8 : top }}
              >
                <span className="dot" style={{ background: item.color }} />
                <span>{item.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
