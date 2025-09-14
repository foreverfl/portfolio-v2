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
      <motion.header
        className={`fixed z-50 top-4 right-4 md:top-8 md:right-8 lg:top-[60px] lg:right-[80px] flex items-center space-x-2 md:space-x-4 bg-transparent ${
          isOverSection
            ? 'text-white'
            : darkMode
              ? 'text-white'
              : 'text-black'
        } p-2 rounded transition-colors duration-300`}
        initial={{ y: 0, opacity: 1 }}
        animate={controls}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        role="banner"
      >
        {/* 네비게이션 링크 */}
        <nav className="hidden md:flex space-x-4 lg:space-x-8 pe-2 md:pe-5">
          <a href="#about" className="hover:no-underline text-sm md:text-base">
            About
          </a>
          <a href="#experience" className="hover:no-underline text-sm md:text-base">
            Experience
          </a>
          <a href="#projects" className="hover:no-underline text-sm md:text-base">
            Projects
          </a>
        </nav>

        {/* 언어 선택 */}
        <div className="relative">
          <button
            onClick={() => setShowLanguageMenu(!showLanguageMenu)}
            className="p-0 m-0 border-none bg-transparent"
            aria-label="Select language"
            aria-expanded={showLanguageMenu}
            aria-haspopup="true"
          >
            <span className={getFlagClass(language)}></span>
          </button>
          {showLanguageMenu && (
            <div className="absolute top-full mt-2 left-0 z-10">
              <div className="flex items-center space-x-2 md:space-x-3 bg-white dark:bg-gray-800 px-2 md:px-3 py-2 rounded-lg shadow-lg">
                <button
                  className="p-0 m-0 border-none bg-transparent cursor-pointer hover:scale-110 transition-transform"
                  onClick={() => changeLanguage("en")}
                  aria-label="Change language to English"
                >
                  <span className="fi fi-us text-lg md:text-xl"></span>
                </button>
                <button
                  className="p-0 m-0 border-none bg-transparent cursor-pointer hover:scale-110 transition-transform"
                  onClick={() => changeLanguage("jp")}
                  aria-label="Change language to Japanese"
                >
                  <span className="fi fi-jp text-lg md:text-xl"></span>
                </button>
                <button
                  className="p-0 m-0 border-none bg-transparent cursor-pointer hover:scale-110 transition-transform"
                  onClick={() => changeLanguage("kr")}
                  aria-label="Change language to Korean"
                >
                  <span className="fi fi-kr text-lg md:text-xl"></span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 다크모드 */}
        <button
          onClick={toggleDarkMode}
          className="p-0 m-0 border-none bg-transparent"
          aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {darkMode ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}
        </button>

        {/* BGM 선택 */}
        <button
          onClick={() => setShowAudioPopup(true)}
          className="p-0 m-0 border-none bg-transparent"
          aria-label="Open audio player"
        >
          <Speaker aria-hidden="true" />
        </button>
      </motion.header>

      {/* 오디오 플레이어 */}
      {showAudioPopup && (
        <AudioPlayer onClose={() => setShowAudioPopup(false)} />
      )}
    </>
  );
};

export default Header;
