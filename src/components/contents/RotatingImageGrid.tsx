import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const images = [
  `${process.env.PUBLIC_URL}/images/about/beef-brisket.jpeg`,
  `${process.env.PUBLIC_URL}/images/about/hinoki-steamed.jpeg`,
  `${process.env.PUBLIC_URL}/images/about/motsunabe.jpeg`,
  `${process.env.PUBLIC_URL}/images/about/seafood-steamed.jpeg`,
  `${process.env.PUBLIC_URL}/images/about/sea-snail-soup.jpeg`,
];

// const colors = ["red", "orange", "yellow", "green", "blue"];

const RotatingImageGrid: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [gridWidth, setGridWidth] = useState(window.innerWidth / 4);

  useEffect(() => {
    const handleResize = () => {
      setGridWidth(window.innerWidth / 4);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // 1초마다 이미지 변경

    return () => clearInterval(interval);
  }, []);

  // 이미지 순환
  const getRotatedIndex = (position: number) => {
    const order = [0, 4, 3, 2, 1];
    return order[(currentImageIndex + position) % order.length];
  };

  return (
    <div className="grid grid-cols-4 grid-rows-2 p-4 gap-1">
      {/* 왼쪽 */}
      <div className="col-span-2 row-span-2 grid grid-cols-2 grid-rows-2 gap-1">
        {/* 1 */}
        <motion.div
          key={getRotatedIndex(0)}
          className="col-span-2 bg-cover bg-center rounded"
          style={{
            backgroundImage: `url(${images[getRotatedIndex(0)]})`,
            minWidth: `${gridWidth}px`,
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
            minWidth: `${gridWidth / 2}px`,
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
            minWidth: `${gridWidth / 2}px`,
            minHeight: `${gridWidth / 2}px`,
          }}
          initial="initial"
          animate="animate"
          exit="exit"
        ></motion.div>
      </div>

      {/* 오른쪽 */}
      <div className="col-span-2 row-span-2 grid grid-cols-2 gap-9">
        {/* 3 */}
        <motion.div
          key={getRotatedIndex(3)}
          className="bg-cover bg-center rounded"
          style={{
            backgroundImage: `url(${images[getRotatedIndex(3)]})`,
            minWidth: `${gridWidth}px`,
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
            minWidth: `${gridWidth}px`,
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
