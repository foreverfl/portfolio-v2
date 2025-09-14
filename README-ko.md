# 🎨 Portfolio V2

<div align="center">
  <img src="https://img.shields.io/badge/React-19.0.0-61DAFB?style=for-the-badge&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-5.7.2-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-7.1.5-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/TailwindCSS-3.4.16-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
</div>

## 📖 소개

React와 TypeScript를 기반으로 구축된 인터랙티브 포트폴리오 웹사이트입니다. 다국어 지원, 다크모드, BGM 재생 등 다양한 사용자 경험 기능을 제공합니다.

### ✨ 주요 기능

- 🌏 **다국어 지원** (영어/한국어/일본어)
- 🌓 **다크모드** 토글
- 🎵 **BGM 플레이어** (음악 선택 가능)
- 📱 **반응형 디자인**
- ⚡ **Vite 기반** 빠른 개발 환경
- 🎨 **애니메이션** (Framer Motion, GSAP)
- 🖼️ **동적 이미지 그리드**
- ⌨️ **타이핑 애니메이션**

## 🛠 기술 스택

### Core
- **React 19.0.0** - 최신 React 버전 사용
- **TypeScript 5.7.2** - 타입 안정성 확보
- **Vite 7.1.5** - 빠른 빌드 및 HMR

### Styling
- **TailwindCSS 3.4.16** - 유틸리티 우선 CSS 프레임워크
- **PostCSS** - CSS 전처리
- **다양한 폰트** (@fontsource 패키지)

### 애니메이션 & UX
- **Framer Motion 11.15.0** - React 애니메이션 라이브러리
- **GSAP 3.12.5** - 고급 애니메이션
- **React Icons 5.4.0** - 아이콘 라이브러리

### 국제화
- **i18next 24.1.0** - 다국어 지원
- **react-i18next 15.2.0** - React 통합
- **i18next-browser-languagedetector** - 브라우저 언어 감지
- **i18next-http-backend** - 번역 파일 로드

### 기타
- **React Audio Player** - 오디오 재생
- **Flag Icons** - 국가 플래그 아이콘

## 📁 프로젝트 구조

```
portfolio-v2/
├── public/
│   ├── assets/          # 이미지, 비디오, 오디오 파일
│   └── locales/         # 번역 파일 (en/kr/jp)
├── src/
│   ├── components/      # React 컴포넌트
│   │   ├── animation/   # 애니메이션 컴포넌트
│   │   ├── atoms/       # 기본 UI 컴포넌트
│   │   ├── audio/       # 오디오 관련 컴포넌트
│   │   └── contents/    # 콘텐츠 컴포넌트
│   ├── contexts/        # React Context (테마, 오디오)
│   ├── hooks/           # 커스텀 훅
│   ├── App.tsx          # 메인 앱 컴포넌트
│   ├── i18n.ts          # 다국어 설정
│   └── index.tsx        # 엔트리 포인트
├── vite.config.ts       # Vite 설정
├── tailwind.config.js   # TailwindCSS 설정
└── package.json         # 프로젝트 의존성
```

## 🚀 시작하기

### 요구사항
- Node.js 18+
- npm 또는 yarn

### 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행 (http://localhost:3000)
npm run dev

# 프로덕션 빌드
npm run build

# 빌드 미리보기
npm run preview

# GitHub Pages 배포
npm run deploy
```

## 🎯 주요 컴포넌트

### Header
- 네비게이션 메뉴
- 언어 선택기
- 다크모드 토글
- BGM 플레이어 컨트롤
- 스크롤 반응형 헤더

### Content
- About 섹션 (캐치프레이즈, 회전 이미지 그리드)
- Experience 섹션 (경력 카드)
- Projects 섹션 (프로젝트 카드)

### Context Providers
- **ThemeContext**: 다크모드 상태 관리
- **AudioContext**: BGM 재생 상태 관리

## 🌟 특징

### 성능 최적화
- Vite를 통한 빠른 빌드 및 HMR
- 코드 스플리팅
- 이미지 최적화

### 사용자 경험
- 부드러운 스크롤 애니메이션
- 인터랙티브 호버 효과
- 반응형 레이아웃
- 접근성 고려

### 개발자 경험
- TypeScript 타입 안정성
- 모듈식 컴포넌트 구조
- 재사용 가능한 커스텀 훅
- 명확한 폴더 구조

## 📝 라이센스

이 프로젝트는 개인 포트폴리오용으로 제작되었습니다.

## 🔗 링크

- [라이브 데모](https://foreverfl.github.io/portfolio-v2)
- [GitHub Repository](https://github.com/foreverfl/portfolio-v2)