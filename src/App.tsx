import "./App.css";
import Content from "./components/Content";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { ScrollProgress } from "./components/ScrollProgress";
import { AudioProvider } from "./contexts/AudioContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import "./i18n";

function App() {
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
