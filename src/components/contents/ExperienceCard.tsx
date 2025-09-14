import React, { useMemo } from "react";
import { motion } from "framer-motion";
import ktcsImage from "@/assets/images/experience/ktcs.jpg";
import aivleImage from "@/assets/images/experience/aivle.jpg";
import airforceImage from "@/assets/images/experience/airforce.jpg";
import messiImage from "@/assets/images/experience/messi.jpg";
import { useRenderTracking, useWhyDidYouUpdate } from "@/utils/performanceProfiler";

interface CardProps {
  id: string;
  title: string;
  subtitle: string;
  period: string;
  works: string[];
  imageUrl: string;
}

const ExperienceCard: React.FC<
  CardProps & { isHovered: boolean; onHover: () => void; onLeave: () => void }
> = React.memo(({
  id,
  title,
  subtitle,
  period,
  works,
  imageUrl,
  isHovered,
  onHover,
  onLeave,
}) => {
  // Performance tracking
  const renderCount = useRenderTracking(`ExperienceCard-${id}`);
  useWhyDidYouUpdate(`ExperienceCard-${id}`, {
    id, title, subtitle, period, works, imageUrl, isHovered, onHover, onLeave
  });

  // Local high-quality images mapping using ID (language-independent)
  const highQualityImage = useMemo(() => {
    const imageMap: { [key: string]: string } = {
      "ktcs": ktcsImage,
      "aivle": aivleImage,
      "airforce": airforceImage,
      "messi": messiImage
    };
    return imageMap[id] || imageUrl;
  }, [id, imageUrl]);

  return (
    <motion.div
      initial={{ opacity: 0, y: '50vh', scale: 0.9 }} 
      whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
        opacity: { duration: 0.6 },
        scale: { duration: 0.7, delay: 0.1 }
      }}
    >
      <div
        className="relative bg-white dark:bg-gray-800 rounded-lg overflow-hidden transform -skew-y-12 min-h-[400px] h-auto md:h-[600px]"
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
      >
      {/* Background image with counter-skew to fill the skewed container */}
      <motion.div
        className="absolute -inset-y-1/2 -inset-x-10 z-0 transform skew-y-12"
        style={{
          backgroundImage: isHovered ? `url(${highQualityImage})` : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          filter: isHovered ? "brightness(30%)" : "none",
        }}
        initial={{ opacity: 0 }}
        animate={{
          opacity: isHovered ? 1 : 0,
        }}
        transition={{ duration: 0.4 }}
      />

      {/* 경계선 */}
      <div className="absolute inset-0 border-y border-dashed border-gray-300 dark:border-gray-600 z-10" />

      {/* 텍스트 */}
      <div className="relative flex flex-col justify-end h-full py-8 px-6 md:p-8 lg:p-10 z-10 font-body transform skew-y-12 select-none">
        <div className="flex flex-col mt-16 md:mt-0">
          {/* 제목 및 부제목 */}
          <div className="font-semibold text-lg md:text-xl mb-2">
            <span className={`${isHovered ? "text-white" : "text-gray-600 dark:text-gray-300"}`}>
              {title}
            </span>
            <span className="hidden md:inline">&nbsp;</span>
            <br className="md:hidden" />
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
              isHovered ? "text-white" : "text-gray-500 dark:text-gray-400"
            } text-base md:text-lg mb-4`}
          >
            {period}
          </div>

          {/* 업무 내용 */}
          <ul className="space-y-2 list-none">
            {works.map((work, index) => (
              <li
                key={index}
                className={`${
                  isHovered ? "text-white" : "text-gray-800 dark:text-gray-200"
                } text-sm md:text-base lg:text-lg list-inside`}
              >
                {work}
              </li>
            ))}
          </ul>
        </div>
      </div>
      </div>
    </motion.div>
  );
});

ExperienceCard.displayName = 'ExperienceCard';

export default ExperienceCard;
