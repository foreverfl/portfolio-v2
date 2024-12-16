import React, { useEffect, useRef, useState } from "react";
import HeroBackground from "./contents/HeroBackground";
import CatchPhrase from "./contents/CatchPhrase";
import ExperienceCard from "./contents/ExperienceCard";
import ProjectCard from "./contents/ProjectCard";
import RotatingImageGrid from "./contents/RotatingImageGrid";
import Title from "./contents/Title";

const Content: React.FC = () => {
  const experiences = [
    {
      title: "풀스택 엔지니어",
      subtitle: "KT cs",
      period: "2024. 4 ~ now",
      works: [
        "Spring Framework를 활용한 안정적이고 확장 가능한 백엔드 시스템 개발",
        "React로 사용자 경험을 고려한 동적 프론트엔드 구현",
        "Thymeleaf 및 jQuery를 통해 효율적인 사용자 인터페이스 설계",
      ],
      imageUrl: `${process.env.PUBLIC_URL}/images/experience/skewed_ktcs.jpg`,
    },
    {
      title: "AI 엔지니어 교육생",
      subtitle: "KT Aivle School",
      period: "2023. 8 ~ 2024. 1",
      works: [
        "TTS와 RVC AI 모델링을 활용한 사용자 맞춤 음성 서비스 개발",
        "백엔드와 프론트엔드 통합 및 코드 리뷰를 통해 전체적인 품질 관리",
        "Django 및 Bootstrap 기반 프론트엔드와 백엔드 설계 및 개발",
        "프로젝트 관리 도구(Jira)를 통한 일정 관리와 팀 리딩",
      ],
      imageUrl: `${process.env.PUBLIC_URL}/images/experience/skewed_aivle.jpg`,
    },
    {
      title: "기지중대장/작전통제장교",
      subtitle: "대한민국 공군",
      period: "2018. 3 ~ 2021. 5",
      works: [
        "부대의 총기 및 탄약 관리, 물자 보급 등 종합적인 운영 관리",
        "다수의 병력 관리 및 훈련 감독",
        "교대근무를 통해 포대와 사령부 간 원활한 소통 및 협력 역할 수행",
      ],
      imageUrl: `${process.env.PUBLIC_URL}/images/experience/skewed_airforce.jpg`,
    },
    {
      title: "전임강사",
      subtitle: "Messi",
      period: "2016. 3 ~ 2018. 2",
      works: [
        "내신, 수능, 텝스 등 다양한 영어 강의 진행 및 학생 성과 향상 기여",
        "효과적인 수업을 위한 세밀한 강의 계획 및 자료 준비",
        "자체 교재 및 교육 자료 개발로 학생 맞춤형 학습 환경 조성",
      ],
      imageUrl: `${process.env.PUBLIC_URL}/images/experience/skewed_messi.jpg`,
    },
  ];

  const projects = [
    {
      title: "My Dictionary",
      description:
        "개발을 시작한 후 처음으로 만든 사이트입니다. 크롬 확장 프로그램을 통해 단어를 데이터베이스에 저장하고, 해당 단어를 학습할 수 있는 웹사이트입니다. Spring Data JPA 및 Spring Security 를 활용했습니다. 저작권 문제로 인해 배포는 하지 않았습니다. 추후 Rust와 AI 기반 API 서버를 구축하여 확장 프로그램과 앱을 통한 서비스를 제공할 예정입니다.",
      techStack: [
        // 데이터베이스
        "MySQL",

        // 백엔드
        "Spring Framework",

        // 프론트엔드
        "Thymeleaf",

        // 프로그래밍 언어
        "Java",
        "JavaScript",
        "HTML",
        "CSS",

        // 스타일링
        "Bootstrap",
      ],
      imageUrl: `${process.env.PUBLIC_URL}/images/projects/my_dictionary.png`,
      githubUrl: "https://github.com/foreverfl/web-my-dictonary",
    },
    {
      title: "My Study Materials",
      description:
        "개인 학습 자료를 체계적으로 정리하기 위해 만든 웹사이트입니다. 리눅스 학습 자료를 주로 정리했으며, 반년 동안 AWS에서 서비스로 운영했습니다. 현재는 서비스가 중단된 상태이며, 향후 문서 번역 프로젝트가 있기 때문에 재배포는 하지 않을 계획입니다.",
      techStack: [
        // 인프라/배포
        "AWS",

        // 데이터베이스
        "MySQL",

        // 백엔드
        "Django",

        // 프론트엔드

        // 프로그래밍 언어
        "Python",
        "JavaScript",
        "HTML",
        "CSS",

        // 스타일링
        "Bootstrap",
      ],
      imageUrl: `${process.env.PUBLIC_URL}/images/projects/my_study_materials.png`,
      githubUrl: "https://github.com/foreverfl/web-my-study-materials",
    },
    {
      title: "mogumogu's sundries",
      description:
        "커스터마이징에 제한이 있던 Wordpress 블로그를 대체하기 위해 React와 Next.js로 직접 제작한 블로그입니다. 다국어 지원과 마크다운 작성 방식을 채택했으며, GitHub에 게시글을 push하면 자동으로 업로드됩니다. Vercel을 통해 배포 중입니다.",
      techStack: [
        // 인프라/배포
        "Vercel",
        "Cloudflare",
        "GitHub Actions",

        // 데이터베이스
        "MongoDB",

        // 백엔드
        "Next.js",
        "MDX",

        // 프론트엔드
        "React",
        "Framer Motion",

        // 프로그래밍 언어
        "TypeScript",
        "JavaScript",
        "HTML",
        "CSS",

        // 스타일링
        "Tailwind CSS",
      ],
      imageUrl: `${process.env.PUBLIC_URL}/images/projects/blog-3.png`,
      videoUrl: `${process.env.PUBLIC_URL}/videos/blog.mp4`,
      githubUrl: "https://github.com/foreverfl/blog",
      siteUrl: "https://mogumogu.dev/",
    },
    {
      title: "mogumogu's docs",
      description:
        "개발 참조 문서를 한 곳에 모아놓은 사이트입니다. 일부 문서는 직접 번역하여 서브도메인에서 배포하고 있습니다. 향후 가능한 모든 문서를 번역하는 것을 목표로 하고 있으며, Vercel에서 배포 중입니다.",
      techStack: [
        // 인프라/배포
        "Vercel",

        // 백엔드
        "Next.js",

        // 프론트엔드
        "React",
        "Framer Motion",

        // 프로그래밍 언어
        "TypeScript",
        "JavaScript",
        "HTML",
        "CSS",

        // 스타일링
        "Tailwind CSS",
      ],
      imageUrl: `${process.env.PUBLIC_URL}/images/projects/docs-1.png`,
      videoUrl: `${process.env.PUBLIC_URL}/videos/docs.mp4`,
      githubUrl: "https://github.com/foreverfl/docs",
      siteUrl: "https://docs.mogumogu.dev/",
    },
  ];

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

      <div className="container mx-auto font-title text-8xl mt-10">
        지금까지의 커리어를
        <br />
        살펴보세요
      </div>
      <Title />

      {experiences.map((experience, index) => (
        <ExperienceCard
          key={index}
          title={experience.title}
          subtitle={experience.subtitle}
          period={experience.period}
          works={experience.works}
          imageUrl={experience.imageUrl}
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
              imageUrl={project.imageUrl}
              videoUrl={project.videoUrl}
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
