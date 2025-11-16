# FiTrack2 - High-Performance Fitness Tracking Application

A modern, high-performance fitness tracking application built with React Native and Expo, optimized for the OnePlus 12 and 120Hz displays.

## 🎯 Project Overview

FiTrack2 is a comprehensive fitness application designed following enterprise-grade architectural principles outlined in the [Fitness App Development Plan](Fitness%20App%20Development%20Plan.md). The app provides:

- **Comprehensive Workout Tracking**: Log sets, reps, weight, RPE, and RIR
- **Flexible Exercise Library**: Built-in exercises with substitutions and progressions
- **Progress Visualization**: Track your E1RM, volume, and performance over time
- **Offline-First Architecture**: All data stored locally with WatermelonDB
- **120Hz Optimized**: Designed for smooth, buttery performance on high-refresh displays

## 🚀 Live Demo

Visit the deployed web version: [https://tomaszwojcikowski.github.io/fitrack2](https://tomaszwojcikowski.github.io/fitrack2)

## 🛠️ Tech Stack

### Core Framework
- **React Native** - Native mobile app framework
- **Expo** - Development platform and tooling
- **React Navigation** - Navigation library

### Data Layer
- **WatermelonDB** - High-performance reactive database
- **SQLite** - Local storage (for native platforms)

### UI & Graphics
- **Tamagui** - High-performance UI library
- **@shopify/flash-list** - Optimized list rendering for 120Hz displays
- **react-native-svg** - Vector graphics
- **victory-native** - Interactive data visualization and charts
- **@shopify/react-native-skia** - High-performance graphics engine
- **lottie-react-native** - Complex celebration animations
- **@expo/vector-icons** - Icon library
- **PixelRatio API** - High-DPI optimization utilities

## 📱 Features

### Current Implementation (Phase 1-4)

#### Home Screen
- Today's workout overview
- Quick start workout button
- Activity feed with recent achievements
- Stats cards showing monthly progress
- Achievement unlock animations

#### Workout Logger
- Real-time workout tracking
- Set-by-set logging with reps, weight, and RPE
- Exercise substitution support
- Add/remove sets dynamically
- Timer for workout duration
- Celebration animation on workout completion

#### Exercise Library
- Searchable exercise database
- Category filtering (Legs, Chest, Back, Shoulders, Arms)
- Exercise details and descriptions
- Add custom exercises

#### Progress Tracking
- Interactive Victory Native charts
- Volume over time bar chart with gradients
- E1RM (Estimated 1-Rep Max) multi-line chart
- Touch-interactive tooltips on charts
- Weekly workout summaries
- Performance metrics

#### Profile
- User information and stats
- Total workouts and streak tracking
- Personal records (PRs)
- Display information (Pixel Ratio, High-DPI detection)
- Settings and preferences

## 🗄️ Database Schema

The app uses a comprehensive relational schema designed for flexibility and performance:

### Core Tables
- **users** - User account information
- **exercises** - Exercise library (built-in + custom)
- **exercise_categories** - Exercise categorization
- **exercise_substitutions** - Exercise alternatives
- **exercise_progressions** - Progressive overload chains

### Template System
- **program_templates** - Structured workout programs
- **phase_templates** - Training phases/mesocycles
- **workout_templates** - Individual workout plans
- **template_exercises** - Prescribed exercises with sets/reps/RPE

### Logging System
- **workout_logs** - Completed workout sessions
- **logged_sets** - Individual set performance data
- **user_e1rms** - Estimated 1RM tracking

## 🏗️ Architecture Principles

Following the architectural blueprint, FiTrack2 implements:

1. **Native-First JavaScript**: React Native with real native components
2. **Granular, Relational Data Core**: Template vs. Log separation
3. **UI-Thread-Centric Interaction**: FlashList and future Reanimated integration
4. **Hardware-Specific Optimization**: 120Hz and 510 PPI OnePlus 12 target

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/tomaszwojcikowski/fitrack2.git
cd fitrack2

# Install dependencies
npm install --legacy-peer-deps

# Start development server
npm start

# Run on web
npm run web

# Build for web
npm run build:web
```

### Platform-Specific Commands

```bash
# Run on Android
npm run android

# Run on iOS (macOS only)
npm run ios

# Run on Web
npm run web
```

## 📦 Deployment

The app is automatically deployed to GitHub Pages on every push to the main or feature branches via GitHub Actions.

### Manual Deployment

```bash
# Build and deploy
npm run deploy
```

## 🎨 Design System

### Color Palette
- **Primary**: `#FF6B35` (Vibrant Orange)
- **Secondary**: `#004E89` (Deep Blue)
- **Accent**: `#00D9C0` (Turquoise)
- **Success**: `#22C55E` (Green)
- **Error**: `#EF4444` (Red)
- **Warning**: `#F59E0B` (Amber)

### Typography
- System fonts optimized for each platform
- Clear hierarchy with bold headings
- 16px base font size for readability

## 📈 Roadmap

### Phase 3: UI Library & Styling (✅ Completed)
- [x] Full Tamagui theme integration
- [x] React Native Reanimated for animations
- [x] Enhanced component library
- [x] All screens converted to Tamagui styled components
- [x] Smooth entrance animations on all screens
- [x] Press interactions with haptic feedback
- [x] Consistent theme tokens across app

### Phase 4: Graphics & Visualization (✅ Completed)
- [x] Victory Native chart integration
- [x] Real-time progress graphs (Volume over time, E1RM progress)
- [x] Lottie celebration animations (Workout completion, Achievement unlock)
- [x] PixelRatio optimization for high-DPI displays

### Phase 5: Core Functionality
- [ ] Database integration with UI
- [ ] Real workout logging with persistence
- [ ] Exercise substitution in-app
- [ ] E1RM calculations
- [ ] Workout template system

### Phase 6: Advanced Features
- [ ] Workout programs
- [ ] Progressive overload tracking
- [ ] Rest timer with notifications
- [ ] Offline sync
- [ ] Export/import data

### Phase 7: Performance & Polish
- [ ] 120Hz optimization testing
- [ ] Memory profiling
- [ ] Bundle size optimization
- [ ] Comprehensive testing

## 🤝 Contributing

Contributions are welcome! Please read the [Fitness App Development Plan](Fitness%20App%20Development%20Plan.md) to understand the architectural decisions and requirements.

## 📄 License

This project is private and proprietary.

## 🙏 Acknowledgments

- Architectural design based on industry best practices
- UI/UX inspired by leading fitness apps
- Built with modern React Native ecosystem tools

---

Built with ❤️ using React Native and Expo
