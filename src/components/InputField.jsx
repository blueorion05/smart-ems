export default function InputField({
  label,
  type,
  name,
  value,
  onChange,
  placeholder,
  error,
  rightSlot,
  autoComplete,
}) {
  return (
    <label className="field">
      <span className="field-label">{label}</span>
      <span className={`field-control ${error ? "has-error" : ""}`}>
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${name}-error` : undefined}
        />
        {rightSlot}
      </span>
      {error ? (
        <span className="field-error" id={`${name}-error`}>
          {error}
        </span>
      ) : null}
    </label>
  );
}
