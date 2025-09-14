import { Moon, Speaker, Sun } from "@geist-ui/icons";
import "flag-icons/css/flag-icons.min.css";
import { motion, useAnimation } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "../contexts/ThemeContext";
import AudioPlayer from "./audio/AudioPlayer";

const Header: React.FC = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [showAudioPopup, setShowAudioPopup] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const controls = useAnimation();
  const [isOverSection, setIsOverSection] = useState(false);

  const getFlagClass = (lang: string) => {
    switch (lang.toUpperCase()) {
      case "EN":
        return "fi fi-us";
      case "JP":
        return "fi fi-jp";
      case "KR":
        return "fi fi-kr";
      default:
        return "fi fi-us";
    }
  };

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setLanguage(lang.toUpperCase());
    setShowLanguageMenu(false);
  };

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>(
      "#about, #experience, #projects"
    );

    const observer = new IntersectionObserver(
      (entries) => {
        let isAnySectionVisible = false;
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            isAnySectionVisible = true;
          }
        });

        setIsOverSection(isAnySectionVisible);
      },
      {
        threshold: 0.1,
        rootMargin: "-100px 0px 0px 0px",
      }
    );

    sections.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  // 스크롤 이벤트에 따른 헤더 숨김/표시
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        // 스크롤 다운
        setIsVisible(false);
      } else {
        // 스크롤 업
        setIsVisible(true);
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      controls.start({ y: 0, opacity: 1 });
    } else {
      controls.start({ y: -100, opacity: 0 });
    }
  }, [isVisible, controls]);

  return (
    <>
      <motion.div
        className={`fixed z-50 top-[60px] right-[80px] flex items-center space-x-4 bg-transparent ${
          isOverSection
            ? 'text-white'
            : darkMode
              ? 'text-white'
              : 'text-black'
        } p-2 rounded transition-colors duration-300`}
        initial={{ y: 0, opacity: 1 }}
        animate={controls}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* 네비게이션 링크 */}
        <nav className="flex space-x-8 pe-5">
          <a href="#about" className="hover:no-underline">
            About
          </a>
          <a href="#experience" className="hover:no-underline">
            Experience
          </a>
          <a href="#projects" className="hover:no-underline">
            Projects
          </a>
        </nav>

        {/* 언어 선택 */}
        <div className="relative">
          <button
            onClick={() => setShowLanguageMenu(!showLanguageMenu)}
            className="p-0 m-0 border-none bg-transparent"
          >
            <span className={getFlagClass(language)}></span>
          </button>
          {showLanguageMenu && (
            <div className="absolute top-full mt-2 left-0 z-10">
              <div className="flex items-center space-x-3 bg-white dark:bg-gray-800 px-3 py-2 rounded-lg shadow-lg">
                <button
                  className="p-0 m-0 border-none bg-transparent cursor-pointer hover:scale-110 transition-transform"
                  onClick={() => changeLanguage("en")}
                >
                  <span className="fi fi-us text-xl"></span>
                </button>
                <button
                  className="p-0 m-0 border-none bg-transparent cursor-pointer hover:scale-110 transition-transform"
                  onClick={() => changeLanguage("jp")}
                >
                  <span className="fi fi-jp text-xl"></span>
                </button>
                <button
                  className="p-0 m-0 border-none bg-transparent cursor-pointer hover:scale-110 transition-transform"
                  onClick={() => changeLanguage("kr")}
                >
                  <span className="fi fi-kr text-xl"></span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 다크모드 */}
        <button
          onClick={toggleDarkMode}
          className="p-0 m-0 border-none bg-transparent"
        >
          {darkMode ? <Sun /> : <Moon />}
        </button>

        {/* BGM 선택 */}
        <button
          onClick={() => setShowAudioPopup(true)}
          className="p-0 m-0 border-none bg-transparent"
        >
          <Speaker />
        </button>
      </motion.div>

      {/* 오디오 플레이어 */}
      {showAudioPopup && (
        <AudioPlayer onClose={() => setShowAudioPopup(false)} />
      )}
    </>
  );
};

export default Header;
