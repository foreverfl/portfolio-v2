import React from "react";
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
} from "react-icons/si";

// 기술 스택 타입 지정
export type TechName =
  | "Vercel"
  | "Cloudflare"
  | "GitHub Actions"
  | "AWS"
  | "MongoDB"
  | "MySQL"
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
  Vercel: <SiVercel />,
  Cloudflare: <SiCloudflare />,
  "GitHub Actions": <SiGithubactions />,
  AWS: <SiAmazonwebservices />,

  // 데이터베이스
  MongoDB: <SiMongodb />,
  MySQL: <SiMysql />,

  // 백엔드
  "Spring Framework": <SiSpring />,
  Django: <SiDjango />,

  // 프론트엔드
  "Next.js": <SiNextdotjs />,
  React: <SiReact />,
  Thymeleaf: <SiThymeleaf />,

  // 프로그래밍 언어
  HTML: <SiHtml5 />,
  CSS: <SiCss3 />,
  JavaScript: <SiJavascript />,
  TypeScript: <SiTypescript />,
  Java: <SiOpenjdk />,
  Python: <SiPython />,

  // 스타일링
  Bootstrap: <SiBootstrap />,
  "Tailwind CSS": <SiTailwindcss />,
  "Framer Motion": <SiFramer />,
};
interface TechTagProps {
  name: TechName;
}

// 기술 스택 태그 컴포넌트
const TechTag: React.FC<TechTagProps> = ({ name }) => {
  return (
    <div className="flex items-center space-x-2 p-2 bg-gray-100 rounded-md shadow-sm">
      <span className="text-blue-500">{techIcons[name]}</span>
      <span className="text-sm font-medium">{name}</span>
    </div>
  );
};

export default TechTag;
