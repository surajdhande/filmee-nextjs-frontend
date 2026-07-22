"use client";

import { useEffect, useState } from "react";
import { CheckCircle, XCircle, X } from "lucide-react";

/**
 * Toast notification component.
 *
 * Props:
 *  - message   {string}            Text to display
 *  - type      {"success"|"error"} Visual variant
 *  - onClose   {() => void}        Called when the toast is dismissed
 *  - duration  {number}            Auto-dismiss ms (default 3500)
 */
const Toast = ({ message, type = "success", onClose, duration = 3500 }) => {
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);

  // Trigger enter animation on mount
  useEffect(() => {
    const show = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(show);
  }, []);

  // Auto-dismiss after `duration` ms
  useEffect(() => {
    const timer = setTimeout(() => handleClose(), duration);
    return () => clearTimeout(timer);
  }, [duration]);

  const handleClose = () => {
    setLeaving(true);
    setTimeout(() => {
      setVisible(false);
      onClose?.();
    }, 350);
  };

  const isSuccess = type === "success";

  return (
    <div
      style={{
        position: "fixed",
        top: "1.5rem",
        left: "50%",
        transform: visible && !leaving
          ? "translateX(-50%) translateY(0) scale(1)"
          : "translateX(-50%) translateY(-20px) scale(0.95)",
        opacity: visible && !leaving ? 1 : 0,
        zIndex: 9999,
        transition: "transform 0.35s cubic-bezier(0.34,1.56,0.64,1), opacity 0.35s ease",
        pointerEvents: "auto",
      }}
      role="alert"
      aria-live="assertive"
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "0.75rem",
          minWidth: "320px",
          maxWidth: "420px",
          borderRadius: "1rem",
          padding: "1rem 1.25rem",
          background: isSuccess
            ? "linear-gradient(135deg, rgba(15,15,15,0.98) 0%, rgba(20,20,20,0.98) 100%)"
            : "linear-gradient(135deg, rgba(15,15,15,0.98) 0%, rgba(20,20,20,0.98) 100%)",
          border: isSuccess ? "1px solid rgba(34,197,94,0.35)" : "1px solid rgba(239,68,68,0.35)",
          boxShadow: isSuccess
            ? "0 8px 40px rgba(0,0,0,0.6), 0 0 20px rgba(34,197,94,0.12), inset 0 1px 0 rgba(255,255,255,0.05)"
            : "0 8px 40px rgba(0,0,0,0.6), 0 0 20px rgba(239,68,68,0.12), inset 0 1px 0 rgba(255,255,255,0.05)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      >
        {/* Icon */}
        <div
          style={{
            flexShrink: 0,
            width: "2.25rem",
            height: "2.25rem",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: isSuccess ? "rgba(34,197,94,0.15)" : "rgba(239,68,68,0.15)",
            border: isSuccess ? "1px solid rgba(34,197,94,0.3)" : "1px solid rgba(239,68,68,0.3)",
          }}
        >
          {isSuccess ? (
            <CheckCircle size={18} color="#22c55e" strokeWidth={2.5} />
          ) : (
            <XCircle size={18} color="#ef4444" strokeWidth={2.5} />
          )}
        </div>

        {/* Text */}
        <div style={{ flex: 1, paddingTop: "0.125rem" }}>
          <p
            style={{
              margin: 0,
              fontFamily: "'Inter', 'Segoe UI', sans-serif",
              fontSize: "0.8rem",
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: isSuccess ? "#22c55e" : "#ef4444",
              marginBottom: "0.2rem",
            }}
          >
            {isSuccess ? "Success" : "Error"}
          </p>
          <p
            style={{
              margin: 0,
              fontFamily: "'Inter', 'Segoe UI', sans-serif",
              fontSize: "0.9rem",
              color: "#d4d4d8",
              lineHeight: 1.5,
            }}
          >
            {message}
          </p>
        </div>

        {/* Close button */}
        <button
          onClick={handleClose}
          aria-label="Dismiss notification"
          style={{
            flexShrink: 0,
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "0.2rem",
            borderRadius: "0.375rem",
            color: "#71717a",
            lineHeight: 0,
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#71717a")}
        >
          <X size={16} />
        </button>
      </div>

      {/* Progress bar */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: "1.25rem",
          right: "1.25rem",
          height: "2px",
          borderRadius: "0 0 1rem 1rem",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: "100%",
            background: isSuccess
              ? "linear-gradient(90deg, #22c55e, #4ade80)"
              : "linear-gradient(90deg, #ef4444, #f87171)",
            transformOrigin: "left",
            animation: `shrink ${duration}ms linear forwards`,
          }}
        />
      </div>

      <style>{`
        @keyframes shrink {
          from { transform: scaleX(1); }
          to   { transform: scaleX(0); }
        }
      `}</style>
    </div>
  );
};

export default Toast;
