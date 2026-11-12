
import { useEffect, useState } from "react";

function ThemeToggle() {
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    const root = document.documentElement;

    root.classList.toggle("dark", isDark);

    localStorage.setItem(
      "theme",
      isDark ? "dark" : "light"
    );
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark(prev => !prev)}
      className="rounded-lg border border-border
        bg-surface p-2 text-foreground
        hover:bg-surface-secondary"
      aria-label="Toggle theme"
    >
      {isDark ? "☀️" : "🌙"}
    </button>
  );
}

export default ThemeToggle;
