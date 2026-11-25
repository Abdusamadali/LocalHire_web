import React, { useEffect, useState } from "react";
import { X, CheckCircle, AlertCircle, Info } from "lucide-react";

function Snackbar({
  open,
  onClose,
  message,
  severity = "error", // "error" | "success" | "info" | "warning"
  duration = 5000,
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (open) {
      setVisible(true);
    }
  }, [open]);

  useEffect(() => {
    if (visible && duration > 0) {
      const timer = setTimeout(() => {
        setVisible(false);
        onClose?.();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [visible, duration, onClose]);

  if (!visible) return null;

  const configs = {
    error: {
      icon: AlertCircle,
      iconColor: "text-red-500",
      bg: "bg-red-50 dark:bg-red-950/30",
      border: "border-red-200 dark:border-red-800",
      text: "text-red-700 dark:text-red-300",
      buttonHover: "hover:bg-red-100 dark:hover:bg-red-800",
    },
    success: {
      icon: CheckCircle,
      iconColor: "text-emerald-500",
      bg: "bg-emerald-50 dark:bg-emerald-950/30",
      border: "border-emerald-200 dark:border-emerald-800",
      text: "text-emerald-700 dark:text-emerald-300",
      buttonHover: "hover:bg-emerald-100 dark:hover:bg-emerald-800",
    },
    warning: {
      icon: AlertCircle,
      iconColor: "text-amber-500",
      bg: "bg-amber-50 dark:bg-amber-950/30",
      border: "border-amber-200 dark:border-amber-800",
      text: "text-amber-700 dark:text-amber-300",
      buttonHover: "hover:bg-amber-100 dark:hover:bg-amber-800",
    },
    info: {
      icon: Info,
      iconColor: "text-blue-500",
      bg: "bg-blue-50 dark:bg-blue-950/30",
      border: "border-blue-200 dark:border-blue-800",
      text: "text-blue-700 dark:text-blue-300",
      buttonHover: "hover:bg-blue-100 dark:hover:bg-blue-800",
    },
  };

  const config = configs[severity];
  const Icon = config.icon;

  return (
    <div
      className={`fixed bottom-5 right-5 z-[9999] flex items-center gap-3 w-full max-w-md p-4 rounded-xl border shadow-xl animate-slide-in ${config.bg} ${config.border} ${config.text}`}
      role="alert"
      aria-live="polite"
    >
      <Icon size={20} className={`shrink-0 ${config.iconColor}`} />
      <p className="flex-1 text-sm font-medium">{message}</p>
      <button
        onClick={() => {
          setVisible(false);
          onClose?.();
        }}
        className={`shrink-0 p-1 rounded-lg transition-colors ${config.buttonHover}`}
        aria-label="Dismiss"
      >
        <X size={18} className={config.iconColor} />
      </button>
    </div>
  );
}

export default Snackbar;