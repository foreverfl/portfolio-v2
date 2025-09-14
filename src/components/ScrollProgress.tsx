import { useEffect, useState } from "react";
import { useTheme } from "../contexts/ThemeContext";

export function ScrollProgress() {
  const [width, setWidth] = useState(0);
  const { darkMode } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      const html = document.documentElement;
      const scrollHeight = html.scrollHeight - html.clientHeight;
      const scrollTop = html.scrollTop;
      const scrollPercent = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      setWidth(scrollPercent);
    };

    // Initial calculation
    handleScroll();

    // Add scroll listener
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Cleanup
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        height: 3,
        width: `${Math.min(100, Math.max(0, width))}%`,
        background: darkMode
          ? "linear-gradient(90deg, #60a5fa, #818cf8)"
          : "linear-gradient(90deg, #3b82f6, #6366f1)",
        zIndex: 1000,
        transition: "width 0.1s ease-out",
        boxShadow: darkMode
          ? "0 0 10px rgba(96, 165, 250, 0.5)"
          : "0 0 5px rgba(59, 130, 246, 0.3)"
      }}
    />
  );
}