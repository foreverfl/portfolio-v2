import React from "react";
import { motion } from "framer-motion";

interface CardProps {
  title: string;
  subtitle: string;
  period: string;
  works: string[];
  imageUrl: string;
}

const ExperienceCard: React.FC<
  CardProps & { isHovered: boolean; onHover: () => void; onLeave: () => void }
> = ({
  title,
  subtitle,
  period,
  works,
  imageUrl,
  isHovered,
  onHover,
  onLeave,
}) => {
  return (
    <div
      className="relative bg-white rounded-lg overflow-hidden transform -skew-y-12 h-[500px]"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {/* 배경 이미지 */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: isHovered ? `url(${imageUrl})` : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: isHovered ? "brightness(30%)" : "none",
        }}
        initial={{ opacity: 0 }}
        animate={{
          opacity: isHovered ? 1 : 0,
        }}
        transition={{ duration: 0.4 }}
      />

      {/* 경계선 */}
      <div className="absolute inset-0 border-y border-dashed border-gray-300 z-10" />

      {/* 텍스트 */}
      <div className="relative flex flex-col justify-end h-full p-10 z-10 font-body transform skew-y-12 select-none">
        {/* 제목 및 부제목 */}
        <div className="font-semibold text-xl mb-2">
          <span className={`${isHovered ? "text-white" : "text-gray-600"}`}>
            {title}
          </span>
          &nbsp;
          <span
            className={`${
              isHovered ? "text-blue-300" : "text-primary text-blue-500"
            }`}
          >
            @ {subtitle}
          </span>
        </div>

        {/* 기간 */}
        <div
          className={`${
            isHovered ? "text-white" : "text-gray-500"
          } text-lg mb-4`}
        >
          {period}
        </div>

        {/* 업무 내용 */}
        <ul className="space-y-2 list-none">
          {works.map((work, index) => (
            <li
              key={index}
              className={`${
                isHovered ? "text-white" : "text-gray-800"
              } text-lg list-inside`}
            >
              {work}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ExperienceCard;
