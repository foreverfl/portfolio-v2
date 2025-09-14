import "./App.css";
import "./styles/accessibility.css";
import { lazy, Suspense, useEffect } from "react";
import Header from "./components/Header";
import { ScrollProgress } from "./components/ScrollProgress";
import { SkipLink } from "./components/SkipLink";
import { AudioProvider } from "./contexts/AudioContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import "./i18n";
import { logPerformanceReport } from "./utils/performanceProfiler";

// Lazy load components for better performance
const Content = lazy(() => import("./components/Content"));
const Footer = lazy(() => import("./components/Footer"));

function App() {
  useEffect(() => {
    // Add performance report button in development
    if (process.env.NODE_ENV === 'development') {
      const reportButton = document.createElement('button');
      reportButton.innerHTML = '📊';
      reportButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 20px;
        z-index: 9999;
        background: #333;
        color: white;
        border: none;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        cursor: pointer;
        font-size: 20px;
      `;
      reportButton.onclick = () => logPerformanceReport();
      document.body.appendChild(reportButton);

      return () => {
        document.body.removeChild(reportButton);
      };
    }
  }, []);

  return (
    <ThemeProvider>
      <AudioProvider>
        <SkipLink />
        <ScrollProgress />
        <Header />
        <Suspense fallback={
          <div className="flex justify-center items-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        }>
          <Content />
          <Footer />
        </Suspense>
      </AudioProvider>
    </ThemeProvider>
  );
}

export default App;
