import { FileText, Github } from "@geist-ui/icons";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import TechTag, { TechName } from "../atoms/TechTag";

interface ProjectCardProps {
  title: string;
  description: string;
  techStack: string[];
  imageUrl: string;
  videoUrl?: string;
  githubUrl: string;
  siteUrl?: string;
  isLeft: boolean;
  maxHeight: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  techStack,
  imageUrl,
  videoUrl,
  githubUrl,
  siteUrl,
  isLeft,
  maxHeight,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [underlineWidth, setUnderlineWidth] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if mobile device
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(max-width: 768px)').matches ||
                  'ontouchstart' in window ||
                  navigator.maxTouchPoints > 0);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (titleRef.current) {
      const titleWidth = titleRef.current.offsetWidth;
      setUnderlineWidth(titleWidth);
    }
  }, [title]);

  useEffect(() => {
    // Handle click outside for mobile
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (isMobile && isHovered && cardRef.current && !cardRef.current.contains(event.target as Node)) {
        setIsHovered(false);
      }
    };

    if (isMobile) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isMobile, isHovered]);

  const handleTouchStart = () => {
    if (isMobile && videoUrl) {
      setIsHovered(!isHovered);
    }
  };

  const handleMouseEnter = () => {
    if (!isMobile) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      setIsHovered(false);
    }
  };

  return (
    <div
      ref={cardRef}
      className={`flex flex-col md:flex-row ${
        isLeft ? "md:flex-row" : "md:flex-row-reverse"
      } items-center p-4 md:p-6 lg:p-8 my-4 md:my-6`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
    >
      {/* 이미지 영역 */}
      <div onClick={() => setIsOpen(true)} className="w-full md:w-1/2 mb-4 md:mb-0 cursor-pointer">
        {videoUrl && isHovered ? (
          <motion.video
            src={videoUrl}
            className="w-full h-full object-cover rounded-lg"
            autoPlay
            loop
            muted
          />
        ) : (
          <motion.img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover rounded-lg"
            transition={{ duration: 0.3 }}
          />
        )}
      </div>

      {/* 텍스트 영역 */}
      <div className="w-full md:w-1/2 flex flex-col justify-end text-sm space-y-4 p-0 md:p-4">
        <div
          className={`font-body font-semibold	text-xl md:text-2xl relative ${
            isLeft ? "text-left md:text-right" : "text-left"
          }`}
        >
          <span ref={titleRef}>{title}</span>
          {/* 밑줄 애니메이션 */}
          {isHovered && (
            <motion.div
              className="absolute bottom-[-4px] h-[2px] bg-black dark:bg-white"
              initial={{ width: 0 }}
              animate={{ width: underlineWidth }} // a에서 b로 생성
              exit={{ width: 0, x: -underlineWidth }} // b에서 왼쪽으로 이동하며 사라지기
              transition={{
                repeat: Infinity,
                repeatType: "loop",
                duration: 1,
                ease: "easeInOut",
              }}
              style={{
                display: "block",
                left: isLeft ? "auto" : "0",
                right: isLeft ? "0" : "auto",
              }}
            />
          )}
        </div>
        <p className="font-body text-sm md:text-base text-gray-600 dark:text-gray-300 leading-relaxed">{description}</p>
        <div className="flex flex-wrap gap-2">
          {techStack.map((tech) => (
            <TechTag key={tech} name={tech as TechName} />
          ))}
        </div>
        <div
          className={`flex mt-4 ${isLeft ? "justify-start md:justify-end" : "justify-start"}`}
        >
          {/* GitHub */}
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200"
          >
            <Github className="w-6 h-6 md:w-8 md:h-8 transition-transform transform hover:scale-110" />
          </a>
          {/* Website */}
          {siteUrl && (
            <a
              href={siteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200 ml-4"
            >
              <FileText className="w-6 h-6 md:w-8 md:h-8 transition-transform transform hover:scale-110" />
            </a>
          )}
        </div>
      </div>

      {/* 모달 - Framer Motion 사용 */}
      <AnimatePresence>
        {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
        >
          <motion.div
            className="relative"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button - positioned outside the image */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute -top-12 right-0 text-white text-3xl hover:text-gray-300 bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center transition-all hover:bg-opacity-70"
              aria-label="Close modal"
            >
              ✕
            </button>
            <img
              src={imageUrl}
              alt={title}
              className="max-w-[90vw] max-h-[85vh] w-auto h-auto rounded-lg"
            />
          </motion.div>
        </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectCard;
