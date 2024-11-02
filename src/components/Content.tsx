import React from "react";
import HeroBackground from "./contents/HeroBackground";
import CatchPhrase from "./contents/CatchPhrase";
import ExperienceCard from "./contents/ExperienceCard";
import ProjectCard from "./contents/ProjectCard";
import RotatingImageGrid from "./contents/RotatingImageGrid";

const Content: React.FC = () => {
  const experiences = [
    {
      title: "풀스택 엔지니어",
      subtitle: "KT cs",
      period: "2024. 4 ~ now",
      works: [
        "Spring Framework를 활용한 백엔드 개발",
        "React를 활용한 프론트엔드 개발",
        "Thymeleaf 및 Jquery를 활용한 프론트엔드 개발",
      ],
      imageUrl: `${process.env.PUBLIC_URL}/images/experience/ktcs.jpg`,
    },
    {
      title: "기지중대장/작전통제장교",
      subtitle: "대한민국 공군",
      period: "2018. 3 ~ 2021. 5",
      works: [
        "부대의 총기탄약, 부대보급 등 전반적인 관리",
        "다수의 병력 관리",
        "교대근무를 진행하며 포대와 사령부에서의 중간 다리역할 수행",
      ],
      imageUrl: `${process.env.PUBLIC_URL}/images/experience/airforce.jpg`,
    },
    {
      title: "전임강사",
      subtitle: "Messi",
      period: "2016. 3 ~ 2018. 2",
      works: [
        "내신/수능/텝스 등의 다수의 영어 강의",
        "수업 전 강의 계획 수립",
        "수업을 위한 자체 교재 및 자료 제작",
      ],
      imageUrl: `${process.env.PUBLIC_URL}/images/experience/messi.jpg`,
    },
  ];

  const projects = [
    {
      title: "개인 프로젝트",
      projectName: "My Dictionary",
      description:
        "구글 확장프로그램을 통해 사전 사이트에서 단어를 저장하고 학습하는 웹사이트입니다. 현재 운영중인 사이트에서 수익화가 완료되면 배포할 예정입니다.",
      techStack: [
        "MySQL",
        "SpringBoot",
        "Thymeleaf",
        "HTML/CSS",
        "JavaScript",
        "Bootstrap",
      ],
      imageUrl: "./images/project/my_dictionary.png",
      githubUrl: "https://github.com/foreverfl/web-my-dictonary",
    },
    {
      title: "개인 프로젝트",
      projectName: "My Study Materials",
      description:
        "개인 공부 자료를 정리할 수 있는 웹사이트입니다. 현재 제가 정리한 리눅스 공부 정리 자료만 존재합니다. AWS를 통해서 서비스를 하고 있으며, 수익화 예정에 있습니다.",
      techStack: [
        "AWS",
        "MySQL",
        "Django",
        "HTML/CSS",
        "JavaScript",
        "Bootstrap",
      ],
      imageUrl: "./images/project/my_study_materials.png",
      githubUrl: "https://github.com/foreverfl/web-my-study-materials",
    },
    {
      title: "팀 프로젝트 / 백엔드·프론트엔드 통합",
      projectName: "O :D",
      description:
        "사용자가 원하는 책을 신청받아서 등록하고 해당 책을 TTS와 RVC를 활용한 AI를 통해 원하는 목소리로 읽어주는 서비스입니다. 온프레미스로 배포 예정에 있습니다.",
      techStack: [
        "PyTorch",
        "PostgreSQL",
        "Redis",
        "Django",
        "HTML/CSS",
        "SCSS",
        "JavaScript",
        "Bootstrap",
      ],
      imageUrl: "./images/project/od.png",
      githubUrl: "https://github.com/foreverfl/web-od",
    },
    {
      title: "개인 프로젝트",
      projectName: "mogumogu's sundries",
      description:
        "기존의 Wordpress 블로그에서 커스터마이징의 한계를 느끼고, Next.js로 직접 구현한 블로그입니다. 한국어/일본어 다국어 처리를 지원하고 Markdown으로 포스트를 작성합니다.",
      techStack: [
        "Vercel",
        "Cloudflare R2",
        "MongoDB",
        "Next.js",
        "React",
        "Tailwind CSS",
      ],
      imageUrl: "./images/project/blog.png",
      githubUrl: "https://mogumogu.dev/",
      websiteUrl: "https://mogumogu.dev/",
    },
    {
      title: "개인 프로젝트",
      projectName: "Manage Words",
      description:
        "과외를 할 때 학생들의 단어를 체계적으로 관리하기 위해서 만든 개인 용도 프로그램입니다.",
      techStack: ["SQLite", "JavaFX"],
      imageUrl: "./images/project/manage_words.png",
      githubUrl: "https://github.com/foreverfl/desktop-manage-words",
    },
  ];

  return (
    <>
      <HeroBackground />

      <div className="text-lg">About</div>
      <CatchPhrase />
      <RotatingImageGrid />

      <div className="text-lg">Expereince</div>
      <div>
        {experiences.map((experience, index) => (
          <ExperienceCard
            key={index}
            title={experience.title}
            subtitle={experience.subtitle}
            period={experience.period}
            works={experience.works}
            imageUrl={experience.imageUrl}
          />
        ))}
      </div>

      <div className="text-lg">Project</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8">
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            title={project.title}
            projectName={project.projectName}
            description={project.description}
            techStack={project.techStack}
            imageUrl={project.imageUrl}
            githubUrl={project.githubUrl}
          />
        ))}
      </div>
    </>
  );
};

export default Content;
