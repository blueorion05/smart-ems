export default function Button({
  children,
  variant = "primary",
  type = "button",
  onClick,
  disabled,
  loading,
}) {
  return (
    <button
      type={type}
      className={`btn btn-${variant}`}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading ? <span className="btn-spinner" /> : null}
      <span>{children}</span>
    </button>
  );
}
