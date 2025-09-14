import { useEffect } from "react";
import "./App.css";
import Content from "./components/Content";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { AudioProvider } from "./contexts/AudioContext";
import "./i18n";

function App() {
  // 이미지/비디오 프리 로드
  useEffect(() => {
    const preloadAssets = async () => {
      const response = await fetch(`/assets.json`);
      const assets = await response.json();

      if (Array.isArray(assets.images)) {
        assets.images.forEach((src: string) => {
          const img = new Image();
          img.src = src; // 이미지 미리 로드
        });
      }

      if (Array.isArray(assets.videos)) {
        assets.videos.forEach((src: string) => {
          const video = document.createElement("video");
          video.src = src; // 비디오 미리 로드
        });
      }
    };

    preloadAssets();
  }, []);

  return (
    <AudioProvider>
      <Header />
      <Content />
      <Footer />
    </AudioProvider>
  );
}

export default App;
