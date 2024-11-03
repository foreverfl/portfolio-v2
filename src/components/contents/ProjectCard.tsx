import { FileText, Github } from "@geist-ui/icons";
import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import Modal from "react-modal";
import TechTag, { TechName } from "../atoms/TechTag";

Modal.setAppElement("#root");

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
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (titleRef.current) {
      const titleWidth = titleRef.current.offsetWidth;
      setUnderlineWidth(titleWidth);
    }
  }, [title]);

  return (
    <div
      className={`flex ${
        isLeft ? "flex-row" : "flex-row-reverse"
      } items-center p-8 my-6`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 이미지 영역 */}
      <div onClick={() => setIsOpen(true)} className="w-1/2 cursor-pointer">
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
      <div className="w-1/2 flex flex-col justify-end text-sm space-y-4 p-4">
        <div
          className={`font-body font-semibold	text-2xl relative ${
            isLeft ? "text-right" : "text-left"
          }`}
        >
          <span ref={titleRef}>{title}</span>
          {/* 밑줄 애니메이션 */}
          {isHovered && (
            <motion.div
              className="absolute bottom-[-4px] h-[2px] bg-black"
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
        <p className="font-body text-gray-600 leading-relaxed">{description}</p>
        <div className="flex flex-wrap gap-2">
          {techStack.map((tech) => (
            <TechTag key={tech} name={tech as TechName} />
          ))}
        </div>
        <div
          className={`flex mt-4 ${isLeft ? "justify-end" : "justify-start"}`}
        >
          {/* GitHub */}
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-blue-500 transition-colors duration-200"
          >
            <Github className="w-8 h-8 transition-transform transform hover:scale-110" />
          </a>
          {/* Website */}
          {siteUrl && (
            <a
              href={siteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-500 transition-colors duration-200 ml-4"
            >
              <FileText className="w-8 h-8 transition-transform transform hover:scale-110" />
            </a>
          )}
        </div>
      </div>

      {/* 모달 */}
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        contentLabel="Image Modal"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            zIndex: 60,
          },
          content: {
            overflow: "hidden",
            border: "none",
            background: "none",
            inset: "50% auto auto 50%",
            transform: "translate(-50%, -50%)",
            maxWidth: "100%",
            maxHeight: "100%",
          },
        }}
      >
        <div onClick={() => setIsOpen(false)} className="cursor-pointer">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-auto rounded-lg"
          />
        </div>
      </Modal>
    </div>
  );
};

export default ProjectCard;
