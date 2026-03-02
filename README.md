<div align="center">

# 🇹🇭 Chaothuk

**Thailand's Freelance Marketplace — Connect. Work. Grow.**

[![Expo](https://img.shields.io/badge/Expo-SDK%2051-000020?style=for-the-badge&logo=expo&logoColor=white)](https://expo.dev)
[![React Native](https://img.shields.io/badge/React%20Native-0.74-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactnative.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Redux](https://img.shields.io/badge/Redux%20Toolkit-latest-764ABC?style=for-the-badge&logo=redux&logoColor=white)](https://redux-toolkit.js.org)
[![Platform](https://img.shields.io/badge/Platform-iOS%20%7C%20Android-lightgrey?style=for-the-badge)](https://reactnative.dev)

*A modern, full-featured mobile marketplace for Thai freelancers and employers.*

</div>

---

## ✨ Features

- 🔐 **Authentication** — Register, Login, PIN Code security
- 💼 **Work Listings** — Browse, search, filter freelance jobs by province & category
- 🧑‍💼 **Recruit Listings** — Post & discover job openings
- 📅 **Booking System** — Book workers or apply for jobs with calendar scheduling
- ⭐ **Review System** — Rate and review completed jobs with star ratings
- ❤️ **Likes & Favourites** — Save works you love
- 💬 **Real-time Messenger** — In-app chat with staff and employers
- 🔔 **Notifications** — Push & in-app notification center
- 🌗 **Dark / Light Mode** — Full UI Kitten theming support
- 🇹🇭 **Localized** — Thai-first UX with Kanit & Sarabun fonts

---

## 🏗️ Architecture

```
chaotuk/
├── app/                    # Expo Router file-based routing
│   ├── (app)/
│   │   ├── (root)/         # Authenticated stack
│   │   │   └── (bottom-tab)/  # Tab navigator
│   │   ├── work/[id]/      # Work detail + booking + review
│   │   └── recruit/[id]/   # Recruit detail + booking + review
│   └── auth/               # Auth screens (login, register, PIN)
├── layouts/                # Reusable feature layouts
├── screens/                # Screen wrappers (thin glue to layouts)
├── models/                 # Domain models with createFromApi()
├── services/               # API service classes (per-domain)
├── store/                  # Redux Toolkit slices
├── components/             # Design system (atoms, molecules, organisms)
├── hooks/                  # Custom React hooks
├── constants/              # Theme tokens and app constants
└── form-data/              # Form data transfer objects
```

**Pattern:** `Expo Route → Screen → Layout → API Service → Redux Store`

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Expo SDK 51](https://expo.dev) + React Native 0.74 |
| Language | TypeScript 5 |
| Navigation | [Expo Router](https://expo.github.io/router) (file-based) |
| UI Library | [UI Kitten](https://akveo.github.io/react-native-ui-kitten/) |
| State | Redux Toolkit + React-Redux |
| HTTP | Axios |
| Fonts | Kanit, Sarabun (Google Fonts), CSPraJad |
| Build | EAS Build (Expo Application Services) |
| Backend | [chaothuk-laravel](https://github.com/danya0365/chaothuk-laravel) (Laravel 11 API) |

---

## 🚀 Getting Started

### Prerequisites

| Tool | Version |
|---|---|
| Node.js | ≥ 18 |
| Yarn | ≥ 1.22 |
| Expo CLI | `npm i -g expo-cli` |
| iOS Simulator | Xcode 15+ (macOS only) |
| Android Emulator | Android Studio |

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/danya0365/chaothul-react-native.git
cd chaothul-react-native

# 2. Install dependencies
yarn install

# 3. Configure environment
cp .env.example .env.local
# Edit .env.local and set your API URL
```

### Environment Variables

```env
# .env.local
EXPO_PUBLIC_API_URL=http://localhost/api
EXPO_PUBLIC_PUBLIC_URL=http://localhost
```

> The backend API is powered by [chaothuk-laravel](https://github.com/danya0365/chaothuk-laravel).  
> Run `sail up -d` and `sail artisan migrate` before starting the app.

### Running the App

```bash
# Start Metro bundler
yarn start

# iOS simulator
yarn ios

# Android emulator
yarn android

# Web (experimental)
yarn web
```

---

## 📱 App Structure

### Bottom Tab Navigation

| Tab | Screen | Description |
|---|---|---|
| 🏠 | Home | Featured works and announcements |
| 🗂️ | Category | Browse by work type |
| ➕ | Select Post | Create new Work or Recruit listing |
| 🔔 | Notifications | In-app notification center |
| 👤 | Profile | Account settings, bookings, reviews |

### Key User Flows

```
Browse Works → Work Detail → Book / Review
Browse Recruits → Recruit Detail → Apply / Review
Profile → My Work Bookings → Confirm/Complete
Profile → My Reviews → View all written reviews
```

---

## 🏗️ API Services

All API calls are organized into service classes in `services/api.service.ts`:

| Service Class | Endpoints |
|---|---|
| `AuthApiService` | Login, Register, Logout |
| `WorkApiService` | CRUD, Likes, Bookings, Reviews |
| `RecruitApiService` | CRUD, Likes, Bookings, Reviews |
| `MeApiService` | Profile, My works/recruits/reviews/likes/bookings |
| `NotificationApiService` | Notifications list |
| `MessengerApiService` | Chat channels & conversations |
| `UploadApiService` | Image & document upload |

---

## 🗂️ Building for Production

```bash
# Build for iOS (EAS)
eas build --platform ios --profile production

# Build for Android (EAS)
eas build --platform android --profile production

# Submit to App Store / Play Store
eas submit --platform ios
eas submit --platform android
```

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/your-feature`
3. Follow the existing patterns:
   - New screens go in `screens/` (thin wrapper)
   - Business logic goes in `layouts/`
   - API calls go in `services/api.service.ts`
   - Models live in `models/` with a `createFromApi()` static factory
4. Commit your changes: `git commit -m 'feat: add your feature'`
5. Push and open a Pull Request

---

## 🔒 Security

> **Never commit credentials or service account JSON files to this repository.**  
> All secrets must be stored in `.env.local` (gitignored) or via EAS Secrets.

```bash
# Add secrets to EAS (for CI/CD)
eas secret:create --scope project --name MY_SECRET --value "value"
```

---

## 📄 License

This project is private and proprietary.  
© 2024 Chaothuk — All rights reserved.

---

<div align="center">

**Built with ❤️ in Thailand 🇹🇭**

</div>