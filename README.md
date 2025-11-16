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
npm install

# Start development server
npm start

# Run on web
npm run web

# Build for web
npm run build:web
```

> **Note**: The project includes a `.npmrc` file that configures npm to use legacy peer dependency resolution. This allows React 19 to work alongside dependencies that don't yet officially support it.

### Platform-Specific Commands

```bash
# Run on Android
npm run android

# Run on iOS (macOS only)
npm run ios

# Run on Web
npm run web
```

## 📱 Installing on Your Phone

### 🎯 Recommended: Download Pre-built APK (Android)

**This is the easiest and most convenient method for Android devices!**

The app is automatically built and available for download whenever changes are pushed to the main branch.

#### Steps:

1. **Get the APK**:
   - Go to the [GitHub Actions page](https://github.com/tomaszwojcikowski/fitrack2/actions/workflows/build-android.yml)
   - Click on the latest successful build
   - Follow the EAS build link in the summary
   - Download the APK file (approximately 50-100 MB)

2. **Install on Your Android Device**:
   - Transfer the APK to your phone (via USB, email, cloud storage, or direct download)
   - Open the APK file on your Android device
   - Tap "Install" (you may need to enable "Install from Unknown Sources")
   - Launch FiTrack2 and start tracking your workouts! 💪

3. **Enable Installation from Unknown Sources** (if needed):
   - Go to **Settings → Security → Unknown Sources** and enable it
   - Or **Settings → Apps → Special Access → Install Unknown Apps** and enable for your browser/file manager

**Automatic Builds**: Every push to `main` triggers a new build, so you always have access to the latest version!

---

### Alternative Methods

<details>
<summary><b>Option 1: Development Mode with Expo Go</b> (Quick Testing)</summary>

Use this if you want to test the app during development without building binaries.

#### Prerequisites
- Install **Expo Go** app on your phone:
  - [Android - Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)
  - [iOS - App Store](https://apps.apple.com/app/expo-go/id982107779)

#### Steps
1. Start the development server on your computer:
   ```bash
   npm start
   ```

2. Scan the QR code:
   - **iOS**: Open the Camera app and scan the QR code
   - **Android**: Open Expo Go app and scan the QR code
   
   If on different networks, use tunnel mode:
   ```bash
   npm start -- --tunnel
   ```

3. The app loads on your phone through Expo Go

**Note**: Development server must be running. Code changes reload automatically.

</details>

<details>
<summary><b>Option 2: Build Your Own APK</b> (Custom Builds)</summary>

Build a standalone APK yourself using EAS Build.

#### Prerequisites
- [EAS CLI](https://docs.expo.dev/build/setup/): `npm install -g eas-cli`
- Expo account (free): Sign up at [expo.dev](https://expo.dev)

#### Steps

1. **Login to EAS**:
   ```bash
   eas login
   ```

2. **Build APK for Android**:
   ```bash
   # Preview build (recommended for testing)
   eas build -p android --profile preview
   
   # Or production build
   eas build -p android --profile production
   ```

3. **Download and Install**:
   - Build completes in 10-20 minutes
   - Download the APK from the provided link
   - Install on your Android device

</details>

<details>
<summary><b>Option 3: iOS Installation via TestFlight</b></summary>

Deploy to TestFlight for iOS testing (requires Apple Developer account).

#### Prerequisites
- Apple Developer Account ($99/year)
- EAS CLI: `npm install -g eas-cli`

#### Steps

1. **Login to EAS**:
   ```bash
   eas login
   ```

2. **Build for iOS**:
   ```bash
   eas build -p ios --profile production
   ```

3. **Submit to TestFlight**:
   ```bash
   eas submit -p ios
   ```

4. **Install on Device**:
   - Install [TestFlight](https://apps.apple.com/app/testflight/id899247664) from App Store
   - You'll receive an email invitation to test the app
   - Open the invitation and install through TestFlight

</details>

---

### 🔧 For Developers: Development Build

<details>
<summary><b>Advanced: Development Build with Hot Reload</b></summary>

Create a development build for native code testing with hot reload capabilities.

#### Steps

1. **Build Development Client**:
   ```bash
   # For Android
   eas build --profile development --platform android
   
   # For iOS (macOS only)
   eas build --profile development --platform ios
   ```

2. **Install on Device**:
   - Download and install the development build
   - This is a standalone app that connects to your dev server

3. **Run the Development Server**:
   ```bash
   npm start --dev-client
   ```
   
4. **Connect**: Open the development build app and it will auto-connect to your server

</details>

### Troubleshooting

#### Android APK Won't Install
- **Solution**: Enable "Install from Unknown Sources" in your device settings
- Check if the APK file downloaded completely
- Try downloading again or using a different browser

#### Expo Go Shows Connection Error
- **Solution**: Ensure your computer and phone are on the same WiFi network
- Try using tunnel mode: `npm start -- --tunnel`
- Disable any VPN on your computer or phone
- Check firewall settings aren't blocking port 19000

#### iOS TestFlight Not Receiving Invitation
- **Solution**: Check spam folder for invitation email
- Verify the email address in your Apple Developer account
- Wait up to 24 hours for processing

#### Build Fails on EAS
- **Solution**: Check your `eas.json` configuration
- Ensure all dependencies are compatible
- Review build logs for specific errors
- Try clearing cache: `eas build --clear-cache`

#### App Crashes on Startup
- **Solution**: Check if all native dependencies are properly linked
- Verify the build profile matches your app configuration
- Review device logs using ADB (Android) or Xcode (iOS)

### Performance Optimization for OnePlus 12

FiTrack2 is specifically optimized for the OnePlus 12's 120Hz display. To ensure the best performance:

1. **Enable High Refresh Rate**:
   - Settings → Display → Screen Refresh Rate → 120Hz

2. **Disable Power Saving Mode**: Power saving can limit refresh rate to 60Hz

3. **Close Background Apps**: For the smoothest 120 FPS experience

4. **Enable Developer Options** (for advanced users):
   - Settings → About Phone → Tap Build Number 7 times
   - Settings → System → Developer Options → Force Peak Refresh Rate

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
