import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

const videoFiles = [
  `${process.env.PUBLIC_URL}/videos/borame-park.mp4`,
  `${process.env.PUBLIC_URL}/videos/sky-park.mp4`,
  `${process.env.PUBLIC_URL}/videos/haeundae.mp4`,
  `${process.env.PUBLIC_URL}/videos/hanra.mp4`,
  `${process.env.PUBLIC_URL}/videos/pusan.mp4`,
  `${process.env.PUBLIC_URL}/videos/sakura.mp4`,
  `${process.env.PUBLIC_URL}/videos/tera.mp4`,
];

const gridSize = { rows: 6, cols: 8 };

const CatchPhrase: React.FC = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [showGrid, setShowGrid] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  // 격자 효과 트리거
  useEffect(() => {
    setShowGrid(true);
    const gridTimer = setTimeout(() => setShowGrid(false), 2000);

    return () => clearTimeout(gridTimer);
  }, [currentVideoIndex]);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.addEventListener("ended", handleVideoEnd);

      return () => {
        videoElement.removeEventListener("ended", handleVideoEnd);
      };
    }
  }, [currentVideoIndex]);

  const handleVideoEnd = () => {
    setCurrentVideoIndex((prevIndex) =>
      prevIndex === videoFiles.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* 격자 트랜지션 효과 */}
      {showGrid && (
        <div className="absolute inset-0 grid grid-cols-8 grid-rows-6 z-10">
          {Array.from({ length: gridSize.rows * gridSize.cols }).map(
            (_, index) => (
              <motion.div
                key={index}
                className="w-full h-full bg-black"
                initial={{ opacity: 1 }} // 시작 불투명도
                animate={{ opacity: 0 }} // 점차 투명해짐
                transition={{ duration: 3, delay: Math.random() * 0.5 }} // 속도 조정
              />
            )
          )}
        </div>
      )}

      {/* 비디오 슬라이드 효과 */}
      <motion.video
        key={currentVideoIndex}
        ref={videoRef}
        src={videoFiles[currentVideoIndex]}
        autoPlay
        muted
        loop={false}
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ x: "-100%" }}
        transition={{ duration: 1 }}
      />
    </div>
  );
};

export default CatchPhrase;
