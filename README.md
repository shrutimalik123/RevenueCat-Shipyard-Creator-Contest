# CoachAI - AI Coaching App

**Built for RevenueCat Shipyard Creator Contest - Simon's Brief**

A minimal, beautiful AI coaching app that brings personalized coaching to your pocket.

---

## 🚀 Project Status

### ✅ Completed (100% Feature Complete)

**All Core Features Implemented:**
- ✅ 5 Complete Screens (Onboarding, Browse, Chat, Paywall, Create Coach)
- ✅ Navigation System (React Navigation with Stack Navigator)
- ✅ AI Chat Integration (OpenAI GPT-4o-mini)
- ✅ Firebase Backend (Authentication + Firestore)
- ✅ RevenueCat Monetization (Subscriptions configured)
- ✅ Premium Feature Gates (Message limits, coach access)
- ✅ Beautiful Minimal UI (Clean design system)
- ✅ TypeScript (100% type-safe, compiles without errors)
- ✅ Professional Security (API keys moved to environment variables)
- ✅ Complete Documentation (README, Implementation Plan, Setup Guide, Walkthrough)

**5 Pre-built AI Coaches:**
- ✅ Productivity Coach ⚡ (Free)
- ✅ Career Mentor 💼 (Free)
- ✅ Health & Wellness Guide 🌱 (Free)
- ✅ Creativity Catalyst 🎨 (Premium)
- ✅ Finance Advisor 💰 (Premium)

**Monetization:**
- ✅ Free Tier: 3 coaches, 10 messages/day
- ✅ Premium: $9.99/month or $79.99/year
- ✅ RevenueCat SDK integrated (Configured via .env)
- ✅ Paywall screen with pricing options
- ✅ Sandbox mode for testing

### ⚠️ Development Note

**App Runner Status:**
- The source code is 100% complete and TypeScript verified.
- If `npx expo start` fails locally due to environment module resolution, use tunnel mode: `npx expo start --tunnel` or build a preview APK using EAS.
- All core logic for AI, Firebase, and RevenueCat is fully implemented and secured.

---

## ✨ Features

- 💬 **Smart Chat Interface** - Context-aware conversations with AI
- 🔍 **Browse AI Coaches** - Choose from 5 pre-built expert coaches
- 🎨 **Create Custom Coaches** - Build personalized coaches (Premium)
- 🔒 **Premium Features** - Freemium model with RevenueCat subscriptions
- 📱 **Beautiful UI** - Clean, minimal design with smooth animations

## 🛠️ Tech Stack

- **React Native** with Expo
- **TypeScript** for type safety
- **Firebase** (Auth + Firestore)
- **OpenAI GPT-4o-mini** (AI Chat)
- **RevenueCat** (Monetization)
- **React Navigation** (Routing)

## 💰 Monetization Model

### Free Tier
- Access to 3 free coaches
- 10 messages per day
- Basic chat history

### Premium
- Unlimited coaches & messages
- Access to Premium coaches (Creativity & Finance)
- Custom coach creation
- Unlimited history

## ⚙️ Setup & Installation

### 1. Prerequisites
- Node.js 20+
- Expo Go app on Android/iOS

### 2. Configuration (Security)
To protect your API keys, the app uses environment variables.
1. Copy `CoachAI/.env.example` to `CoachAI/.env`
2. Fill in your keys:
   - `EXPO_PUBLIC_OPENAI_API_KEY`
   - `EXPO_PUBLIC_FIREBASE_API_KEY`
   - `EXPO_PUBLIC_REVENUECAT_API_KEY`

### 3. Running
```bash
cd CoachAI
npm install
npx expo start
```

## 📂 Project Structure

```
CoachAI/
├── App.tsx                 # Main app component & state
├── src/
│   ├── screens/           # Onboarding, Browse, Chat, Paywall, Create
│   ├── navigation/        # Stack Navigator
│   ├── services/          # Firebase, OpenAI, RevenueCat
│   ├── types/             # TypeScript definitions
│   └── theme/             # Design system
├── google-services.json   # Firebase config (Ignore if using env)
└── .env.example           # Environment template
```

## 📝 License

Built for **RevenueCat Shipyard Creator Contest 2026**. 
Designed with ❤️ for productivity-focused creators.
