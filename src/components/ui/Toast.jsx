"use client";

import React, { useState, useEffect, useCallback } from "react";
import { CheckCircle, XCircle, X } from "lucide-react";

/**
 * Toast notification component.
 *
 * Props:
 *   message  — string to display
 *   type     — "success" | "error"  (default "success")
 *   duration — auto-dismiss ms      (default 4000, 0 = no auto-dismiss)
 *   onClose  — called when the toast is dismissed
 */
export default function Toast({ message, type = "success", duration = 4000, onClose }) {
  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);

  const dismiss = useCallback(() => {
    setExiting(true);
    setTimeout(() => {
      setVisible(false);
      onClose?.();
    }, 300); // match exit animation duration
  }, [onClose]);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(dismiss, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, dismiss]);

  if (!visible) return null;

  const isSuccess = type === "success";

  return (
    <div
      className={`fixed top-6 right-6 z-[9999] flex items-center gap-3 min-w-[320px] max-w-[440px] px-5 py-4 rounded-2xl border shadow-2xl backdrop-blur-md transition-all duration-300 ${
        exiting
          ? "opacity-0 translate-x-8"
          : "opacity-100 translate-x-0 animate-slideIn"
      } ${
        isSuccess
          ? "bg-[#0d1a0d]/90 border-green-500/30 text-green-300"
          : "bg-[#1a0a0a]/90 border-red-500/30 text-red-300"
      }`}
    >
      {/* Icon */}
      <div
        className={`shrink-0 w-9 h-9 rounded-full flex items-center justify-center ${
          isSuccess ? "bg-green-500/15" : "bg-red-500/15"
        }`}
      >
        {isSuccess ? (
          <CheckCircle size={20} className="text-green-400" />
        ) : (
          <XCircle size={20} className="text-red-400" />
        )}
      </div>

      {/* Message */}
      <p className="flex-1 text-sm font-medium leading-snug">{message}</p>

      {/* Close */}
      <button
        onClick={dismiss}
        className="shrink-0 text-zinc-500 hover:text-white transition-colors"
      >
        <X size={16} />
      </button>

      {/* Auto-dismiss progress bar */}
      {duration > 0 && (
        <div className="absolute bottom-0 left-4 right-4 h-[2px] rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full ${
              isSuccess ? "bg-green-500/50" : "bg-red-500/50"
            }`}
            style={{
              animation: `shrinkWidth ${duration}ms linear forwards`,
            }}
          />
        </div>
      )}

      <style jsx>{`
        @keyframes shrinkWidth {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }
      `}</style>
    </div>
  );
}
