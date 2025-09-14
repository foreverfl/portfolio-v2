import React, { useEffect, useRef, useState } from "react";
import HeroBackground from "./contents/HeroBackground";
import CatchPhrase from "./contents/CatchPhrase";
import ExperienceCard from "./contents/ExperienceCard";
import ProjectCard from "./contents/ProjectCard";
import RotatingImageGrid from "./contents/RotatingImageGrid";
import Title from "./contents/Title";
import { useTranslation } from "react-i18next";
import { getAssetUrl } from "@/hooks/useAssets";

const Content: React.FC = () => {
  const { t } = useTranslation();
  const experiences = t("experiences", { returnObjects: true }) as Array<{
    id: string;
    title: string;
    subtitle: string;
    period: string;
    works: string[];
    imageUrl: string;
  }>;

  const projects = t("projects", { returnObjects: true }) as Array<{
    title: string;
    description: string;
    techStack: string[];
    imageUrl: string;
    videoUrl?: string;
    githubUrl: string;
    siteUrl?: string;
  }>;

  const [hoveredExperienceCard, setHoveredExperienceCard] = useState<
    number | null
  >(null);
  const [maxProjectCardHeight, setMaxProjectCardHeight] = useState<number>(0);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const heights = cardRefs.current.map((ref) => ref?.clientHeight || 0);
    setMaxProjectCardHeight(Math.max(...heights));
  }, [projects.length]);

  const handleHover = (index: number) => {
    setHoveredExperienceCard(index);
  };

  const handleLeave = () => {
    setHoveredExperienceCard(null);
  };

  return (
    <>
      <HeroBackground />

      <Title title="About" />
      <CatchPhrase />

      <Title />
      <RotatingImageGrid />

      <Title title="Experience" />

      <div className="container mx-auto font-title text-8xl mt-10 dark:text-gray-200">
        <span>{t("experience.title1")}</span>
        <br />
        <span>{t("experience.title2")}</span>
      </div>
      <Title />

      {experiences.map((experience, index) => (
        <ExperienceCard
          key={index}
          id={experience.id}
          title={experience.title}
          subtitle={experience.subtitle}
          period={experience.period}
          works={experience.works}
          imageUrl={getAssetUrl(experience.imageUrl)}
          isHovered={hoveredExperienceCard === index}
          onHover={() => handleHover(index)}
          onLeave={handleLeave} // onLeave 핸들러 추가
        />
      ))}
      <Title />

      <Title title="Projects" />
      <div className="container mx-auto mt-10 space-y-8">
        {projects.map((project, index) => (
          <div
            key={index}
            ref={(el: HTMLDivElement | null) => {
              cardRefs.current[index] = el;
            }} // 각 카드의 ref 저장
            className={`${index % 2 === 0 ? "ml-0" : "ml-auto"} w-3/4`} // 홀수는 오른쪽, 짝수는 왼쪽
          >
            <ProjectCard
              title={project.title}
              description={project.description}
              techStack={project.techStack}
              imageUrl={getAssetUrl(project.imageUrl)}
              videoUrl={project.videoUrl ? getAssetUrl(project.videoUrl) : undefined}
              githubUrl={project.githubUrl}
              siteUrl={project.siteUrl}
              isLeft={index % 2 === 0}
              maxHeight={maxProjectCardHeight}
            />
          </div>
        ))}
      </div>

      <Title />
    </>
  );
};

export default Content;
