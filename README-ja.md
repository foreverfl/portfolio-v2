# 🎨 Portfolio V2

<div align="center">
  <img src="https://img.shields.io/badge/React-19.0.0-61DAFB?style=for-the-badge&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-5.7.2-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-7.1.5-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/TailwindCSS-3.4.16-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
</div>

## 📖 はじめに

ReactとTypeScriptをベースに構築されたインタラクティブなポートフォリオウェブサイトです。多言語対応、ダークモード、BGM再生など、様々なユーザーエクスペリエンス機能を提供します。

### ✨ 主な機能

- 🌏 **多言語対応** (英語/韓国語/日本語)
- 🌓 **ダークモード** トグル
- 🎵 **BGMプレイヤー** (音楽選択可能)
- 📱 **レスポンシブデザイン**
- ⚡ **Viteベース** の高速開発環境
- 🎨 **アニメーション** (Framer Motion, GSAP)
- 🖼️ **ダイナミックイメージグリッド**
- ⌨️ **タイピングアニメーション**

## 🛠 技術スタック

### Core
- **React 19.0.0** - 最新のReactバージョン使用
- **TypeScript 5.7.2** - タイプセーフティの確保
- **Vite 7.1.5** - 高速ビルドとHMR

### Styling
- **TailwindCSS 3.4.16** - ユーティリティファーストCSSフレームワーク
- **PostCSS** - CSS前処理
- **各種フォント** (@fontsourceパッケージ)

### アニメーション & UX
- **Framer Motion 11.15.0** - Reactアニメーションライブラリ
- **GSAP 3.12.5** - 高度なアニメーション
- **React Icons 5.4.0** - アイコンライブラリ

### 国際化
- **i18next 24.1.0** - 多言語対応
- **react-i18next 15.2.0** - React統合
- **i18next-browser-languagedetector** - ブラウザ言語検出
- **i18next-http-backend** - 翻訳ファイルローディング

### その他
- **React Audio Player** - オーディオ再生
- **Flag Icons** - 国旗アイコン

## 📁 プロジェクト構造

```
portfolio-v2/
├── public/
│   ├── assets/          # 画像、動画、音声ファイル
│   └── locales/         # 翻訳ファイル (en/kr/jp)
├── src/
│   ├── components/      # Reactコンポーネント
│   │   ├── animation/   # アニメーションコンポーネント
│   │   ├── atoms/       # 基本UIコンポーネント
│   │   ├── audio/       # オーディオ関連コンポーネント
│   │   └── contents/    # コンテンツコンポーネント
│   ├── contexts/        # React Context (テーマ、オーディオ)
│   ├── hooks/           # カスタムフック
│   ├── App.tsx          # メインアプリコンポーネント
│   ├── i18n.ts          # 多言語設定
│   └── index.tsx        # エントリーポイント
├── vite.config.ts       # Vite設定
├── tailwind.config.js   # TailwindCSS設定
└── package.json         # プロジェクト依存関係
```

## 🚀 はじめ方

### 必要条件
- Node.js 18+
- npmまたはyarn

### インストールと実行

```bash
# 依存関係のインストール
npm install

# 開発サーバー起動 (http://localhost:3000)
npm run dev

# プロダクションビルド
npm run build

# ビルドプレビュー
npm run preview

# GitHub Pagesデプロイ
npm run deploy
```

## 🎯 主要コンポーネント

### Header
- ナビゲーションメニュー
- 言語セレクター
- ダークモードトグル
- BGMプレイヤーコントロール
- スクロール反応型ヘッダー

### Content
- Aboutセクション (キャッチフレーズ、回転イメージグリッド)
- Experienceセクション (経歴カード)
- Projectsセクション (プロジェクトカード)

### Context Providers
- **ThemeContext**: ダークモード状態管理
- **AudioContext**: BGM再生状態管理

## 🌟 特徴

### パフォーマンス最適化
- Viteによる高速ビルドとHMR
- コードスプリッティング
- イメージ最適化

### ユーザーエクスペリエンス
- スムーズなスクロールアニメーション
- インタラクティブなホバーエフェクト
- レスポンシブレイアウト
- アクセシビリティ考慮

### 開発者エクスペリエンス
- TypeScriptタイプセーフティ
- モジュール式コンポーネント構造
- 再利用可能なカスタムフック
- 明確なフォルダ構造

## 📝 ライセンス

このプロジェクトは個人ポートフォリオ用に制作されました。

## 🔗 リンク

- [ライブデモ](https://foreverfl.github.io/portfolio-v2)
- [GitHub Repository](https://github.com/foreverfl/portfolio-v2)