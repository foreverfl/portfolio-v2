import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpApi from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(HttpApi) // JSON 번역 파일 로드
  .use(LanguageDetector) // 언어 감지
  .use(initReactI18next) // React와 통합
  .init({
    fallbackLng: "jp",
    supportedLngs: ["en", "kr", "jp"],
    debug: false, // Disable debug logs in production
    interpolation: {
      escapeValue: false, // React에서 XSS 보호를 제공
    },
    backend: {
      loadPath: `/locales/{{lng}}/translation.json`, // 번역 파일 경로
    },
    detection: {
      order: ["querystring", "cookie", "localStorage", "navigator"], // 언어 감지 순서
      caches: ["cookie"], // 캐시에 저장
    },
  });

export default i18n;
