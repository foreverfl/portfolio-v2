import { AnimatePresence, motion } from "framer-motion";
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

const InextPhoto: React.FC = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [showGrid, setShowGrid] = useState(true);
  const [showCurtain, setShowCurtain] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // 격자 효과 트리거 (비디오 인덱스가 변경될 때)
    setShowGrid(true);
    const gridTimer = setTimeout(() => setShowGrid(false), 2000); // 격자 효과 2초 지속

    return () => clearTimeout(gridTimer);
  }, [currentVideoIndex]);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      // 비디오 메타데이터가 로드되었을 때만 duration을 사용할 수 있음
      const handleMetadataLoaded = () => {
        const duration = videoElement.duration;
        if (!isNaN(duration)) {
          const curtainTimer = setTimeout(
            () => setShowCurtain(true),
            (duration - 1) * 1000
          );
          videoElement.addEventListener("ended", handleVideoEnd);

          return () => {
            clearTimeout(curtainTimer);
            videoElement.removeEventListener("ended", handleVideoEnd);
          };
        }
      };

      videoElement.addEventListener("loadedmetadata", handleMetadataLoaded);

      return () => {
        videoElement.removeEventListener(
          "loadedmetadata",
          handleMetadataLoaded
        );
      };
    }
  }, [currentVideoIndex]);

  const handleVideoEnd = () => {
    setShowCurtain(false); // 커튼 효과 숨김
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
      <AnimatePresence>
        <motion.video
          key={currentVideoIndex}
          ref={videoRef}
          src={videoFiles[currentVideoIndex]}
          autoPlay
          muted
          loop={false}
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          transition={{ duration: 1 }}
        />
      </AnimatePresence>
    </div>
  );
};

export default InextPhoto;
