import { useEffect } from "react";

export default function Toast({ message, variant = "success", onClose }) {
  useEffect(() => {
    if (!message) return undefined;

    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className={`toast toast-${variant}`} role="status">
      <span>{message}</span>
      <button type="button" onClick={onClose} aria-label="Close">
        Close
      </button>
    </div>
  );
}
