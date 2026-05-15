export default function AlertCard({ alert }) {
  const icons = {
    critical: "M12 3 2 21h20L12 3zm-1 6h2v6h-2V9zm0 9h2v-2h-2v2z",
    warning: "M12 3 2 21h20L12 3zm-1 6h2v6h-2V9zm0 9h2v-2h-2v2z",
    info: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 5a1.6 1.6 0 1 1 0 3.2 1.6 1.6 0 0 1 0-3.2zm2 11h-4v-2h1v-5h-1v-2h3v7h1v2z",
  };

  return (
    <div className={`alert-card ${alert.severity}`}>
      <div className="alert-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24">
          <path d={icons[alert.severity]} fill="currentColor" />
        </svg>
      </div>
      <div>
        <p>{alert.title}</p>
        <span>{alert.time}</span>
      </div>
    </div>
  );
}
