import React, { useState } from "react";

const Header: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("EN");
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);

  const toggleDarkMode = () => setDarkMode(!darkMode);
  const changeLanguage = (lang: string) => {
    setLanguage(lang);
    setShowLanguageMenu(false); // 메뉴 닫기
  };

  return (
    <div
      className={`fixed z-50 top-[60px] right-[80px] flex items-center space-x-4 bg-transparent 
         text-white p-2 rounded`}
    >
      {/* 네비게이션 링크 */}
      <nav className="flex space-x-4">
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
          className="bg-transparent border border-gray-300 rounded px-2 py-1"
        >
          {language}
        </button>
        {showLanguageMenu && (
          <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-300 rounded shadow-lg z-10">
            <ul className="py-1">
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => changeLanguage("EN")}
              >
                English
              </li>
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => changeLanguage("JP")}
              >
                Japanese
              </li>
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => changeLanguage("KR")}
              >
                Korean
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* 다크모드 */}
      <button
        onClick={toggleDarkMode}
        className="border border-gray-300 rounded px-2 py-1"
      >
        {darkMode ? "Light" : "Dark"}
      </button>
    </div>
  );
};

export default Header;
