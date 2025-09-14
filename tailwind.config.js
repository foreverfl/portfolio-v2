/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Enable dark mode with class strategy
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Tailwind가 파일을 감시할 경로
  ],
  theme: {
    extend: {
      fontFamily: {
        // 대제목용
        title: ['Lilita One', 'Black Han Sans', 'Noto Sans Korean'],
        // 제목 및 본문용
        body: ['Roboto', 'Noto Sans Japanese', 'Mochiy Pop One'],
      },
    },
  },
  plugins: [],
};