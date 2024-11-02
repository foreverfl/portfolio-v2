import React from "react";

interface ProjectCardProps {
  title: string;
  projectName: string;
  description: string;
  techStack: string[];
  imageUrl: string;
  githubUrl: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  projectName,
  description,
  techStack,
  imageUrl,
  githubUrl,
}) => {
  return (
    <div className="grid grid-cols-3 gap-4 border rounded-lg p-4 bg-white shadow-md">
      {/* 이미지 영역 */}
      <div className="col-span-1">
        <img
          src={imageUrl}
          alt={projectName}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      {/* 텍스트 영역 */}
      <div className="col-span-2 flex flex-col justify-end text-sm space-y-2">
        <div className="font-bold text-lg">{title}</div>
        <div className="text-blue-500 font-semibold">{projectName}</div>
        <p className="text-gray-600">{description}</p>
        <div className="flex flex-wrap gap-2">
          {techStack.map((tech, index) => (
            <span
              key={index}
              className="bg-gray-200 text-gray-700 rounded px-2 py-1 text-xs"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="text-right mt-2">
          <a href={githubUrl} target="_blank" rel="noopener noreferrer">
            <svg
              className="w-6 h-6 inline-block text-gray-700"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 100 100"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
