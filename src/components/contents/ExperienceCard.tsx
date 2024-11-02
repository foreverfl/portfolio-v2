import React from "react";
import { motion } from "framer-motion";

interface CardProps {
  title: string;
  subtitle: string;
  period: string;
  works: string[];
  imageUrl: string; // 배경 이미지 URL
}

const ExperienceCard: React.FC<CardProps> = ({
  title,
  subtitle,
  period,
  works,
  imageUrl,
}) => {
  return (
    <motion.div
      className="relative bg-white text-black rounded-lg overflow-hidden transform -skew-y-2 transition-all duration-300 border-t border-dashed border-gray-300"
      whileHover={{ scale: 1.0 }}
    >
      {/* 배경 */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center opacity-0 transition-opacity duration-300"
        style={{ backgroundImage: `url(${imageUrl})` }}
        whileHover={{ opacity: 1 }}
      ></motion.div>

      {/* 컨텐츠 */}
      <div className="relative p-10 z-10">
        <div className="transform skew-y-2">
          {/* 제목 및 부제목 */}
          <div className="font-bold text-xl mb-2">
            <span>{title}</span>&nbsp;
            <span className="text-primary text-blue-500">@ {subtitle}</span>
          </div>
          <div className="text-gray-500 text-lg mb-4">{period}</div>

          {/* 업무 내용 */}
          <ul className="space-y-2">
            {works.map((work, index) => (
              <li key={index} className="text-lg list-disc list-inside">
                {work}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default ExperienceCard;
