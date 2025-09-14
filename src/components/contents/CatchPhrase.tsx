import React from "react";
import { useTranslation } from "react-i18next";

const CatchPhrase: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto">
      <div className="font-title text-8xl mt-10 dark:text-gray-200">{t("about.title")}</div>
      <div className="font-text text-3xl font-semibold text-gray-400 dark:text-gray-500 mt-5">
        Who am I? What experiences have I had so far?
      </div>
      <div className="font-text text-2xl mt-4 whitespace-pre-line leading-relaxed mt-20 dark:text-gray-300">
        {t("about.description")}
      </div>
    </div>
  );
};

export default CatchPhrase;
