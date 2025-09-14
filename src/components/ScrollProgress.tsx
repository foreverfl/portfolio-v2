import React, { useCallback, useEffect, useState } from "react";
import { useTheme } from "../contexts/ThemeContext";

export const ScrollProgress = React.memo(() => {
  const [width, setWidth] = useState(0);
  const { darkMode } = useTheme();

  // Throttle function for performance
  const throttle = useCallback((func: Function, delay: number) => {
    let lastCall = 0;
    let timeoutId: NodeJS.Timeout | null = null;

    return (...args: any[]) => {
      const now = Date.now();

      if (now - lastCall >= delay) {
        lastCall = now;
        func(...args);
      } else {
        // Schedule the final call
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          lastCall = Date.now();
          func(...args);
        }, delay - (now - lastCall));
      }
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const html = document.documentElement;
      const scrollHeight = html.scrollHeight - html.clientHeight;
      const scrollTop = html.scrollTop;
      const scrollPercent = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      setWidth(scrollPercent);
    };

    // Throttled scroll handler (16ms ≈ 60fps)
    const throttledScroll = throttle(handleScroll, 16);

    // Initial calculation
    handleScroll();

    // Add scroll listener
    window.addEventListener("scroll", throttledScroll, { passive: true });

    // Cleanup
    return () => window.removeEventListener("scroll", throttledScroll);
  }, [throttle]);

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
});

ScrollProgress.displayName = 'ScrollProgress';