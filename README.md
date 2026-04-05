# ⬡ Saathi — AI Companion & Emotional Support Platform

> **An AI-powered virtual companion platform designed to provide emotional support, interactive conversations, and personalized user engagement through avatars and real-time chat.**

![Saathi Banner](https://img.shields.io/badge/Saathi-AI%20Companion-8b5cf6?style=for-the-badge)

---

## 📋 Table of Contents
- Overview
- Features
- Project Structure
- Pages & Components
- AI Capabilities
- Getting Started
- Technology Stack
- Data Flow
- Customization
- Screenshots
- Limitations
- Future Enhancements
- License

---

## 🚀 Overview

**Saathi** is a modern AI companion application that simulates human-like interaction through:

- Conversational AI chat
- 3D/visual avatars
- Emotional state tracking
- Personalized onboarding experience

It is built as a **frontend-first system using React + Vite**, optimized for fast performance and scalable UI.

---

## ✨ Features

### 🤖 AI Companion Chat
- Real-time conversational interface
- Typing indicators & chat bubbles
- Multi-turn conversation memory

### 👤 Avatar System
- Multiple selectable AI companions
- Visual avatar representation
- Personality-driven interaction

### 🎤 Voice Interaction (UI Ready)
- Voice overlay interface
- Expandable for speech-to-text APIs

### 🧠 Emotional Intelligence Layer
- Relationship badges
- State indicators (mood tracking)
- Message interaction counters

### 🔐 Authentication Flow
- Entry onboarding screen
- Login / access control UI
- User journey management

### 💳 Monetization System
- Paywall modal
- Feature gating for premium users

---

## 📁 Project Structure

```
saathi-project/
├── public/
│   ├── favicon.ico
│   ├── placeholder.svg
│   └── robots.txt
│
├── src/
│   ├── assets/                # Avatars & images
│   ├── components/
│   │   ├── AuthScreen.tsx
│   │   ├── AvatarSelectScreen.tsx
│   │   ├── ChatScreen.tsx
│   │   ├── CompanionAvatar3D.tsx
│   │   ├── OnboardingScreen.tsx
│   │   ├── SplashScreen.tsx
│   │   ├── PaywallModal.tsx
│   │   ├── VoiceOverlay.tsx
│   │   └── ui/                # Reusable UI components
│   │
│   ├── App.tsx
│   ├── main.tsx
│   ├── index.css
│   └── App.css
│
├── index.html
├── package.json
├── tailwind.config.ts
├── vite.config.ts
└── README.md
```

---

## 📄 Pages & Components

### 1. Splash Screen
- Entry animation
- Branding introduction

### 2. Onboarding Screen
- User introduction flow
- Guided experience

### 3. Authentication Screen
- Login / access interface
- User session control

### 4. Avatar Selection
- Choose AI companion
- Personality-based avatars

### 5. Chat Screen
- Main interaction interface
- Chat bubbles & typing indicators
- Message counter system

### 6. AI Avatar (3D/Visual)
- Companion visualization
- Dynamic presence in UI

### 7. Voice Overlay
- UI for voice interaction
- Expandable to real-time speech AI

### 8. Paywall Modal
- Premium feature restriction
- Monetization layer

---

## 🤖 AI Capabilities

### Conversational System
- Multi-turn chat flow
- Context-aware responses (frontend simulation ready)
- Expandable to APIs (OpenAI / Claude)

### Emotional Context
- Tracks user interaction frequency
- Displays relationship progression
- Mood/state indicators

### Personalization
- Avatar-based interaction style
- Custom onboarding experience

---

## ⚙️ Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn

---

### Installation

```
npm install
```

---

### Run Development Server

```
npm run dev
```

Then open:
```
http://localhost:5173
```

---

### Build for Production

```
npm run build
```

---

## 🧱 Technology Stack

| Layer | Technology |
|------|------------|
| Frontend | React + TypeScript |
| Build Tool | Vite |
| Styling | Tailwind CSS |
| UI Components | Custom + ShadCN-style |
| State | React Hooks |
| Testing | Vitest + Playwright |
| Linting | ESLint |

---

## 🔄 Data Flow

```
User Input
   ↓
Chat Interface (ChatScreen)
   ↓
State Management (React Hooks)
   ↓
AI Processing Layer (API / Simulation)
   ↓
Response Rendering (ChatBubble)
   ↓
Avatar + UI Feedback
```

---

## 🎨 Customization

### Change Theme
Edit Tailwind config:

```ts
tailwind.config.ts
```

---

### Add New Avatar

1. Add image in `/assets`
2. Update avatar selection logic
3. Extend avatar personality mapping

---

### Modify Chat Behavior

Edit:

```
ChatScreen.tsx
```

---

## 📸 Screenshots

- Splash Screen
- Onboarding Flow
- Avatar Selection
- Chat Interface
- Voice Overlay
- Paywall Modal

---

## ⚠️ Limitations

- No backend (frontend-only prototype)
- AI responses may be simulated
- No persistent user data storage
- Voice feature is UI-only (no API yet)

---

## 🚀 Future Enhancements

- Real AI integration (OpenAI / Claude API)
- Voice-to-text & speech synthesis
- User authentication backend (Firebase/Auth)
- Database integration (MongoDB / Supabase)
- Emotion detection (sentiment analysis)
- Mobile app (React Native)
- 3D avatar with WebGL / Three.js

---

## 📜 License

This project is for educational and demonstration purposes.

---

## 💡 Final Note

⬡ **Saathi — Your AI Companion for meaningful conversations.**  
Built with React · Tailwind · Vite · AI Integration Ready
