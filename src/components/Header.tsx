import React, { useState } from "react";
import AudioPlayer from "./audio/AudioPlayer";
import { Speaker, Moon, Sun } from "@geist-ui/icons";
import "flag-icons/css/flag-icons.min.css";

const Header: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("EN");
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [showAudioPopup, setShowAudioPopup] = useState(false);

  const getFlagClass = (lang: string) => {
    switch (lang) {
      case "EN":
        return "fi fi-us"; // 미국 국기
      case "JP":
        return "fi fi-jp"; // 일본 국기
      case "KR":
        return "fi fi-kr"; // 한국 국기
      default:
        return "fi fi-us"; // 기본값
    }
  };

  const toggleDarkMode = () => setDarkMode(!darkMode);
  const changeLanguage = (lang: string) => {
    setLanguage(lang);
    setShowLanguageMenu(false); // 메뉴 닫기
  };

  return (
    <>
      <div
        className={`fixed z-50 top-[60px] right-[80px] flex items-center space-x-4 bg-transparent 
         text-white p-2 rounded`}
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
            <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-300 rounded shadow-lg z-10">
              <ul className="py-1">
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center space-x-2"
                  onClick={() => changeLanguage("EN")}
                >
                  <span className="fi fi-us"></span>
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center space-x-2"
                  onClick={() => changeLanguage("JP")}
                >
                  <span className="fi fi-jp"></span>
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center space-x-2"
                  onClick={() => changeLanguage("KR")}
                >
                  <span className="fi fi-kr"></span>
                </li>
              </ul>
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
      </div>

      {/* 오디오 플레이어 */}
      {showAudioPopup && (
        <AudioPlayer onClose={() => setShowAudioPopup(false)} />
      )}
    </>
  );
};

export default Header;
