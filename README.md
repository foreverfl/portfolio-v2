# 🎨 Portfolio V2

<div align="center">
  <img src="https://img.shields.io/badge/React-19.0.0-61DAFB?style=for-the-badge&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-5.7.2-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-7.1.5-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/TailwindCSS-3.4.16-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
</div>

## 📖 Introduction

An interactive portfolio website built with React and TypeScript. Features multilingual support, dark mode, BGM player, and various user experience enhancements.

### ✨ Key Features

- 🌏 **Multilingual Support** (English/Korean/Japanese)
- 🌓 **Dark Mode** Toggle
- 🎵 **BGM Player** (Music Selection Available)
- 📱 **Responsive Design**
- ⚡ **Vite-based** Fast Development Environment
- 🎨 **Animations** (Framer Motion, GSAP)
- 🖼️ **Dynamic Image Grid**
- ⌨️ **Typing Animation**

## 🛠 Tech Stack

### Core
- **React 19.0.0** - Latest React version
- **TypeScript 5.7.2** - Type safety
- **Vite 7.1.5** - Fast build and HMR

### Styling
- **TailwindCSS 3.4.16** - Utility-first CSS framework
- **PostCSS** - CSS preprocessing
- **Various Fonts** (@fontsource packages)

### Animation & UX
- **Framer Motion 11.15.0** - React animation library
- **GSAP 3.12.5** - Advanced animations
- **React Icons 5.4.0** - Icon library

### Internationalization
- **i18next 24.1.0** - Multilingual support
- **react-i18next 15.2.0** - React integration
- **i18next-browser-languagedetector** - Browser language detection
- **i18next-http-backend** - Translation file loading

### Others
- **React Audio Player** - Audio playback
- **Flag Icons** - Country flag icons

## 📁 Project Structure

```
portfolio-v2/
├── public/
│   ├── assets/          # Images, videos, audio files
│   └── locales/         # Translation files (en/kr/jp)
├── src/
│   ├── components/      # React components
│   │   ├── animation/   # Animation components
│   │   ├── atoms/       # Basic UI components
│   │   ├── audio/       # Audio-related components
│   │   └── contents/    # Content components
│   ├── contexts/        # React Context (theme, audio)
│   ├── hooks/           # Custom hooks
│   ├── App.tsx          # Main app component
│   ├── i18n.ts          # i18n configuration
│   └── index.tsx        # Entry point
├── vite.config.ts       # Vite configuration
├── tailwind.config.js   # TailwindCSS configuration
└── package.json         # Project dependencies
```

## 🚀 Getting Started

### Requirements
- Node.js 18+
- npm or yarn

### Installation & Running

```bash
# Install dependencies
npm install

# Run development server (http://localhost:3000)
npm run dev

# Production build
npm run build

# Preview build
npm run preview

# Deploy to GitHub Pages
npm run deploy
```

## 🎯 Main Components

### Header
- Navigation menu
- Language selector
- Dark mode toggle
- BGM player controls
- Scroll-responsive header

### Content
- About Section (Catchphrase, Rotating image grid)
- Experience Section (Career cards)
- Projects Section (Project cards)

### Context Providers
- **ThemeContext**: Dark mode state management
- **AudioContext**: BGM playback state management

## 🌟 Features

### Performance Optimization
- Fast build and HMR with Vite
- Code splitting
- Image optimization

### User Experience
- Smooth scroll animations
- Interactive hover effects
- Responsive layout
- Accessibility considerations

### Developer Experience
- TypeScript type safety
- Modular component structure
- Reusable custom hooks
- Clear folder structure

## 📝 License

This project was created for personal portfolio use.

## 🔗 Links

- [Live Demo](https://foreverfl.github.io/portfolio-v2)
- [GitHub Repository](https://github.com/foreverfl/portfolio-v2)
