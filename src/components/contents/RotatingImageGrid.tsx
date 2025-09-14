import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { assets } from "@/hooks/useAssets";

// Get images from centralized asset loader
const images = [
  assets.about['beef-brisket'],
  assets.about['hinoki-steamed'],
  assets.about['motsunabe'],
  assets.about['seafood-steamed'],
  assets.about['sea-snail-soup'],
];

// const colors = ["red", "orange", "yellow", "green", "blue"];

const RotatingImageGrid: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [gridWidth, setGridWidth] = useState(window.innerWidth < 768 ? window.innerWidth / 2 : window.innerWidth / 4);

  useEffect(() => {
    const handleResize = () => {
      setGridWidth(window.innerWidth < 768 ? window.innerWidth / 2 : window.innerWidth / 4);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // 이미지 순환
  const getRotatedIndex = (position: number) => {
    const order = [0, 4, 3, 2, 1];
    return order[(currentImageIndex + position) % order.length];
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-2 p-1 gap-1 overflow-hidden">
      {/* 왼쪽 */}
      <div className="col-span-1 md:col-span-2 row-span-2 grid grid-cols-2 grid-rows-2 gap-1">
        {/* 1 */}
        <motion.div
          key={getRotatedIndex(0)}
          className="col-span-2 bg-cover bg-center rounded"
          style={{
            backgroundImage: `url(${images[getRotatedIndex(0)]})`,
            minWidth: `calc(${gridWidth}px - 4px)`,
            minHeight: `${gridWidth / 2}px`,
          }}
          initial="initial"
          animate="animate"
          exit="exit"
        ></motion.div>

        {/* 5 */}
        <motion.div
          key={getRotatedIndex(1)}
          className="bg-cover bg-center rounded"
          style={{
            backgroundImage: `url(${images[getRotatedIndex(1)]})`,
            minWidth: `calc(${gridWidth / 2}px - 4px)`,
            minHeight: `${gridWidth / 2}px`,
          }}
          initial="initial"
          animate="animate"
          exit="exit"
        ></motion.div>

        {/* 4 */}
        <motion.div
          key={getRotatedIndex(2)}
          className="bg-cover bg-center rounded"
          style={{
            backgroundImage: `url(${images[getRotatedIndex(2)]})`,
            minWidth: `calc(${gridWidth / 2}px - 4px)`,
            minHeight: `${gridWidth / 2}px`,
          }}
          initial="initial"
          animate="animate"
          exit="exit"
        ></motion.div>
      </div>

      {/* 오른쪽 */}
      <div className="col-span-1 md:col-span-2 row-span-2 grid grid-cols-1 md:grid-cols-2 gap-1">
        {/* 3 */}
        <motion.div
          key={getRotatedIndex(3)}
          className="bg-cover bg-center rounded"
          style={{
            backgroundImage: `url(${images[getRotatedIndex(3)]})`,
            minWidth: `calc(${gridWidth}px - 12px)`,
            minHeight: `${gridWidth / 2}px`,
          }}
          initial="initial"
          animate="animate"
          exit="exit"
        ></motion.div>

        {/* 2 */}
        <motion.div
          key={getRotatedIndex(4)}
          className="bg-cover bg-center rounded"
          style={{
            backgroundImage: `url(${images[getRotatedIndex(4)]})`,
            minWidth: `calc(${gridWidth}px - 12px)`,
            minHeight: `${gridWidth / 2}px`,
          }}
          initial="initial"
          animate="animate"
          exit="exit"
        ></motion.div>
      </div>
    </div>
  );
};

export default RotatingImageGrid;
