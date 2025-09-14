import { motion, useScroll, useTransform } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import TypingText from "../animation/TypingText";
import { useTranslation } from "react-i18next";
import { assets } from "@/hooks/useAssets";

// Get videos from centralized asset loader
const videoFiles = [
  assets.videos['borame-park'],
  assets.videos['sky-park'],
  assets.videos['haeundae'],
  assets.videos['hanra'],
  assets.videos['pusan'],
  assets.videos['sakura'],
  assets.videos['tera'],
];

const gridSize = { rows: 6, cols: 8 };

const CatchPhrase: React.FC = () => {
  const { t } = useTranslation();
  const videoTexts = t("videoTexts", { returnObjects: true }) as string[];
  const videoQuestion = t("videoQuestion");

  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [showGrid, setShowGrid] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Enhanced Parallax scroll effects
  const { scrollY } = useScroll();
  const videoScale = useTransform(scrollY, [0, 600], [1, 1.3]);
  const textY = useTransform(scrollY, [0, 400], [0, -300]);
  const textOpacity = useTransform(scrollY, [0, 200, 400], [1, 0.7, 0]);
  const videoBlur = useTransform(scrollY, [0, 500], [0, 3]);

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
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-black">
      {/* 격자 트랜지션 효과 */}
      {showGrid && (
        <div className="absolute inset-0 grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 grid-rows-4 md:grid-rows-5 lg:grid-rows-6 z-10">
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

      {/* 비디오 with enhanced parallax and blur */}
      <motion.video
        key={currentVideoIndex}
        ref={videoRef}
        src={videoFiles[currentVideoIndex]}
        autoPlay
        muted
        loop={false}
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          scale: videoScale,
          filter: useTransform(
            videoBlur,
            (value) => `blur(${value}px)`
          )
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ x: "-100%" }}
        transition={{ duration: 1 }}
      />

      {/* 동영상에 따른 텍스트 with enhanced parallax */}
      <motion.div
        className="absolute left-4 md:left-16 lg:left-[8rem] bottom-16 md:bottom-24 lg:bottom-[10rem] text-white z-20 h-20 select-none px-4 md:px-0"
        style={{ y: textY, opacity: textOpacity }}
      >
        <div className="font-body text-sm md:text-base pb-2 md:pb-5">{videoQuestion}</div>
        <div className="font-title text-3xl md:text-5xl lg:text-8xl">
          <TypingText text={videoTexts[currentVideoIndex]} />
        </div>
      </motion.div>
    </div>
  );
};

export default CatchPhrase;
