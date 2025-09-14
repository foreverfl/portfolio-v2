import React, { JSX } from "react";
import { useRenderTracking } from "@/utils/performanceProfiler";
import {
  SiAmazonwebservices,
  SiMysql,
  SiDjango,
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiBootstrap,
  SiThymeleaf,
  SiOpenjdk,
  SiPython,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiMongodb,
  SiFramer,
  SiGithubactions,
  SiCloudflare,
  SiSpring,
  SiTypescript,
  SiVercel,
  SiPostgresql,
} from "react-icons/si";

// 기술 스택 타입 지정
export type TechName =
  | "Vercel"
  | "Cloudflare"
  | "GitHub Actions"
  | "AWS"
  | "MongoDB"
  | "MySQL"
  | "PostgreSQL"
  | "Spring Framework"
  | "Django"
  | "Next.js"
  | "React"
  | "Thymeleaf"
  | "HTML"
  | "CSS"
  | "JavaScript"
  | "TypeScript"
  | "Java"
  | "Python"
  | "Bootstrap"
  | "Tailwind CSS"
  | "Framer Motion";

// 아이콘 매핑
const techIcons: Record<TechName, JSX.Element> = {
  // 인프라/배포
  Vercel: <SiVercel aria-hidden="true" />,
  Cloudflare: <SiCloudflare aria-hidden="true" />,
  "GitHub Actions": <SiGithubactions aria-hidden="true" />,
  AWS: <SiAmazonwebservices aria-hidden="true" />,

  // 데이터베이스
  MongoDB: <SiMongodb aria-hidden="true" />,
  MySQL: <SiMysql aria-hidden="true" />,
  PostgreSQL: <SiPostgresql aria-hidden="true" />,

  // 백엔드
  "Spring Framework": <SiSpring aria-hidden="true" />,
  Django: <SiDjango aria-hidden="true" />,

  // 프론트엔드
  "Next.js": <SiNextdotjs aria-hidden="true" />,
  React: <SiReact aria-hidden="true" />,
  Thymeleaf: <SiThymeleaf aria-hidden="true" />,

  // 프로그래밍 언어
  HTML: <SiHtml5 aria-hidden="true" />,
  CSS: <SiCss3 aria-hidden="true" />,
  JavaScript: <SiJavascript aria-hidden="true" />,
  TypeScript: <SiTypescript aria-hidden="true" />,
  Java: <SiOpenjdk aria-hidden="true" />,
  Python: <SiPython aria-hidden="true" />,

  // 스타일링
  Bootstrap: <SiBootstrap aria-hidden="true" />,
  "Tailwind CSS": <SiTailwindcss aria-hidden="true" />,
  "Framer Motion": <SiFramer aria-hidden="true" />,
};
interface TechTagProps {
  name: TechName;
}

// 기술 스택 태그 컴포넌트
const TechTag: React.FC<TechTagProps> = React.memo(({ name }) => {
  // Performance tracking
  useRenderTracking(`TechTag-${name}`);

  return (
    <div className="flex items-center space-x-2 p-2 bg-gray-100 dark:bg-gray-800 rounded-md shadow-sm">
      <span className="text-blue-600">{techIcons[name]}</span>
      <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{name}</span>
    </div>
  );
});

TechTag.displayName = 'TechTag';

export default TechTag;
