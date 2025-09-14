import "./App.css";
import Content from "./components/Content";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { ScrollProgress } from "./components/ScrollProgress";
import { AudioProvider } from "./contexts/AudioContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import "./i18n";
import { useEffect } from "react";
import { logPerformanceReport } from "./utils/performanceProfiler";

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
        <ScrollProgress />
        <Header />
        <Content />
        <Footer />
      </AudioProvider>
    </ThemeProvider>
  );
}

export default App;
