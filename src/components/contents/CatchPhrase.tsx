import React from "react";
import { useTranslation } from "react-i18next";

const CatchPhrase: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto">
      <div className="font-title text-8xl mt-10">{t("about.title")}</div>
      <div className="font-text text-3xl font-semibold text-gray-400 mt-5">
        Who am I? What experiences have I had so far?
      </div>
      <div className="font-text text-2xl mt-4 whitespace-pre-line leading-relaxed mt-20">
        {t("about.description")}
      </div>
    </div>
  );
};

export default CatchPhrase;
