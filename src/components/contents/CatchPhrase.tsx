import React from "react";
import { useTranslation } from "react-i18next";

const CatchPhrase: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-4">
      <div className="font-title text-4xl md:text-6xl lg:text-8xl mt-10 dark:text-gray-200">{t("about.title")}</div>
      <div className="font-text text-lg md:text-2xl lg:text-3xl font-semibold text-gray-600 dark:text-gray-400 mt-5">
        Who am I? What experiences have I had so far?
      </div>
      <div className="font-text text-base md:text-xl lg:text-2xl mt-10 md:mt-16 lg:mt-20 whitespace-pre-line leading-relaxed dark:text-gray-300">
        {t("about.description")}
      </div>
    </div>
  );
};

export default CatchPhrase;
