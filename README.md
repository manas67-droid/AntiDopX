# AntiDopX — Youth Athlete Anti-Doping Education & Mentorship Platform

> **Empowering young athletes with clean sport education, real-time medicine safety checking, grounded AI mentorship, and interactive gamification.**

Built with **React Native**, **Expo SDK 57**, **Expo Router**, **TypeScript**, and **Firebase** (Auth, Firestore, Cloud Functions).

---

## 🌟 Key Features

### 1. 📚 16-Module Interactive Curriculum
- Full anti-doping curriculum based on WADA regulations (Strict Liability, Prohibited Lists, TUE, DCO interactions, Supplements, Whistleblowing, Mental Health, and more).
- Structured lessons with key takeaways, pro tips, and review question banks.
- Dynamic lesson routing via `/modules/[slug]` and visual progress tracking.

### 2. ⚡ Adaptive Quiz Arena & Micro-Interactions
- Real-time countdown timer with haptic feedback on answers.
- Instant rationale and explanation reveal on correct and incorrect selections.
- Multi-tier difficulty progression (Easy, Medium, Hard, Scenario, Rapid-Fire).
- Anti-tamper server-side score calculation and XP award via Firebase Cloud Functions.

### 3. 🔍 Medicine Barcode Scanner & Safety Reference Engine
- Real-time barcode scanning using Expo 57 `CameraView` with animated laser reticle.
- Comprehensive reference database mapping active ingredients, ATC codes, and WADA prohibited statuses (`ALLOWED`, `CAUTION`, `PROHIBITED_IN_COMPETITION`, `PROHIBITED_ALWAYS`, `VERIFICATION_REQUIRED`).
- Manual medicine search fallback with sample queries.
- Strict liability anti-doping warnings on every scan result.

### 4. 🤖 Grounded AI Doping Coach (English & Hindi)
- Conversational youth-oriented learning coach grounded in official WADA references.
- Athlete context injection (XP, level, sport, recent mistakes).
- Quick prompt chips for fast access to common doping topics (TUE, Strict Liability, Supplements).
- Strict guardrails: Never hallucinates medicine safety; always directs athletes to official sources.

### 5. 👥 Coach Portal & Real-Time Athlete-Coach Messaging
- Dedicated Coach Dashboard with team KPIs, average quiz scores, and high-risk athlete identification.
- Searchable athlete roster with progress breakdowns and weak topic tracking.
- Real-time 1-on-1 athlete-coach messaging powered by Cloud Firestore `onSnapshot` listeners.

### 6. 🌐 Native Multilingual Support (English 🇬🇧 & हिंदी 🇮🇳)
- Built-in localization architecture with instant in-app language switching.
- Persistent language preference stored via `@react-native-async-storage/async-storage`.

### 7. 🎰 Supplement Roulette Simulator
- Interactive risk discovery wheel demonstrating supplement contamination hazards.
- Ability to save supplements to athlete library with +15 XP reward.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Framework** | Expo SDK 57 (`57.0.25`), React Native 0.76+ |
| **Routing** | Expo Router (File-based routing) |
| **Language** | TypeScript (Strict Mode) |
| **State & Local Storage** | React Context, AsyncStorage |
| **Backend & Database** | Firebase Authentication, Cloud Firestore |
| **Server Logic** | Firebase Cloud Functions v2 (TypeScript, Node 20) |
| **Animations** | React Native Reanimated, Expo Haptics |
| **Camera & Hardware** | Expo Camera (`CameraView`), Expo Barcode Scanner |

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v20 or v22)
- npm or yarn
- Expo Go app on iOS/Android or an Expo Development Build

### 1. Install Dependencies
```bash
# Install root project dependencies
npm install

# Install Cloud Functions dependencies
npm --prefix functions install
```

### 2. Environment Configuration
Create a `.env` file in the root directory (or configure `src/firebase/config.ts`):
```env
EXPO_PUBLIC_FIREBASE_API_KEY=your_api_key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
EXPO_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 3. Build & Run
```bash
# Type check application code
npx tsc --noEmit

# Build Cloud Functions
npm run --prefix functions build

# Start Expo development server
npx expo start
```

---

## 📱 Hardware & Expo Go Compatibility

| Feature | Expo Go Support | Development Build (`npx expo run:*`) |
|---|---|---|
| Camera & Barcode Scanner | ✅ Fully supported via `CameraView` | ✅ Fully supported |
| Haptic Feedback | ✅ Fully supported | ✅ Fully supported |
| Real-time Firestore Chat | ✅ Fully supported | ✅ Fully supported |
| Audio/Video Modules | ✅ Fully supported | ✅ Fully supported |
| Remote Push Notifications (FCM/APNs) | ⚠️ Simulation only in Expo Go | ✅ Native build required |

---

## 🔒 Security & Data Integrity

- Complete role-based access control (RBAC) enforced via `firestore.rules`.
- Athletes can only read and write their authorized conversations.
- Cloud Functions perform verified transactions for sensitive gamification XP operations and immutable audit logging in `/auditLogs`.
- Review [SECURITY.md](file:///c:/Users/manas/athlete-training-academy-v2/SECURITY.md) and [ARCHITECTURE.md](file:///c:/Users/manas/athlete-training-academy-v2/ARCHITECTURE.md) for detailed policies.
