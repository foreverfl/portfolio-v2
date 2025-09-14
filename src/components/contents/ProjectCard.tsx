import { FileText, Github } from "@geist-ui/icons";
import { AnimatePresence, motion } from "framer-motion";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import TechTag, { TechName } from "../atoms/TechTag";
import { use3DTilt } from "@/hooks/use3DTilt";
import { useScrollReveal } from "@/hooks/useParallax";
import { useRenderTracking, useWhyDidYouUpdate } from "@/utils/performanceProfiler";

interface ProjectCardProps {
  title: string;
  description: string;
  techStack: string[];
  imageUrl: string;
  githubUrl: string;
  siteUrl?: string;
  isLeft: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = React.memo(({
  title,
  description,
  techStack,
  imageUrl,
  githubUrl,
  siteUrl,
  isLeft,
}) => {
  // Performance tracking
  const renderCount = useRenderTracking(`ProjectCard-${title}`);
  useWhyDidYouUpdate(`ProjectCard-${title}`, {
    title, description, techStack, imageUrl, githubUrl, siteUrl, isLeft
  });

  const [isHovered, setIsHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [underlineWidth, setUnderlineWidth] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // Scroll reveal animation
  const scrollReveal = useScrollReveal();

  // 3D tilt effect hook
  const { ref: tiltRef, style: tiltStyle, glareStyle } = use3DTilt({
    maxTilt: 10,
    scale: 1.10,
    speed: 400,
    glare: true,
    maxGlare: 0.25,
    perspective: 1200,
  });

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

  const handleTouchStart = useCallback(() => {
    if (isMobile) {
      setIsHovered(prev => !prev);
    }
  }, [isMobile]);

  const handleMouseEnter = useCallback(() => {
    if (!isMobile) {
      setIsHovered(true);
    }
  }, [isMobile]);

  const handleMouseLeave = useCallback(() => {
    if (!isMobile) {
      setIsHovered(false);
    }
  }, [isMobile]);

  const handleImageClick = useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <motion.div
      ref={cardRef}
      className={`flex flex-col md:flex-row ${
        isLeft ? "md:flex-row" : "md:flex-row-reverse"
      } items-center p-4 md:p-6 lg:p-8 my-4 md:my-6`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      {...scrollReveal}
    >
      {/* 이미지 영역 - 3D Tilt Effect with stagger animation */}
      <motion.div
        className="w-full md:w-1/2 mb-4 md:mb-0"
        initial={{
          opacity: 0,
          x: isLeft ? -100 : 100,
          rotateY: isLeft ? 15 : -15
        }}
        whileInView={{
          opacity: 1,
          x: 0,
          rotateY: 0
        }}
        viewport={{ once: true, margin: '-150px' }}
        transition={{
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
          delay: 0.1
        }}
      >
        <div
          ref={tiltRef}
          onClick={handleImageClick}
          className="cursor-pointer relative"
          style={!isMobile ? tiltStyle : {}}
        >
          <div className="relative overflow-hidden rounded-lg shadow-xl">
            <motion.img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover"
              transition={{ duration: 0.3 }}
            />
            {/* Glare effect overlay */}
            {!isMobile && (
              <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                style={glareStyle}
              />
            )}
          </div>
        </div>
      </motion.div>

      {/* 텍스트 영역 with stagger animation */}
      <motion.div
        className="w-full md:w-1/2 flex flex-col justify-end text-sm space-y-4 p-0 md:p-4"
        initial={{
          opacity: 0,
          x: isLeft ? 80 : -80,
          y: 30
        }}
        whileInView={{
          opacity: 1,
          x: 0,
          y: 0
        }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{
          duration: 0.7,
          ease: [0.22, 1, 0.36, 1],
          delay: 0.3,
          y: { duration: 0.5, delay: 0.4 }
        }}
      >
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
      </motion.div>

      {/* 모달 - Framer Motion 사용 */}
      <AnimatePresence>
        {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleCloseModal}
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
              onClick={handleCloseModal}
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
    </motion.div>
  );
});

ProjectCard.displayName = 'ProjectCard';

export default ProjectCard;
