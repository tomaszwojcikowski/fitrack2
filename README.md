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

## 📱 Installing on Your Phone

FiTrack2 can be installed on your physical device in several ways, depending on your needs and platform.

### Option 1: Development Mode (Easiest - Expo Go)

This is the quickest way to test the app on your device without building binaries.

#### Prerequisites
- Install **Expo Go** app on your phone:
  - [Android - Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)
  - [iOS - App Store](https://apps.apple.com/app/expo-go/id982107779)

#### Steps
1. Start the development server on your computer:
   ```bash
   npm start
   ```

2. Choose your connection method:
   - **Same Network (Recommended)**: Scan the QR code displayed in the terminal with:
     - **iOS**: Open the Camera app and scan the QR code
     - **Android**: Open Expo Go app and scan the QR code
   
   - **Tunnel Mode** (if on different networks):
     ```bash
     npm start -- --tunnel
     ```
     Then scan the QR code as above

3. The app will load on your phone through Expo Go

**Note**: This method requires the development server to be running. Changes you make to the code will automatically reload on your device.

### Option 2: Production Build (Android APK)

Build a standalone APK that can be installed without Expo Go.

#### Prerequisites
- [EAS CLI](https://docs.expo.dev/build/setup/): `npm install -g eas-cli`
- Expo account (free): Sign up at [expo.dev](https://expo.dev)

#### Steps

1. **Configure EAS Build** (first time only):
   ```bash
   eas build:configure
   ```

2. **Build APK for Android**:
   ```bash
   # Development build (for testing)
   eas build -p android --profile preview
   
   # Or production build
   eas build -p android --profile production
   ```

3. **Download and Install**:
   - Once the build completes (10-20 minutes), you'll receive a download link
   - Download the APK file to your Android device
   - Open the APK file and tap "Install"
   - You may need to enable "Install from Unknown Sources" in Settings

4. **Enable Installation from Unknown Sources** (if needed):
   - Go to Settings → Security → Unknown Sources
   - Or Settings → Apps → Special Access → Install Unknown Apps
   - Enable for your file manager or browser

### Option 3: Production Build (iOS - TestFlight)

Deploy to TestFlight for iOS testing (requires Apple Developer account).

#### Prerequisites
- Apple Developer Account ($99/year)
- EAS CLI: `npm install -g eas-cli`

#### Steps

1. **Configure EAS Build** (first time only):
   ```bash
   eas build:configure
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
   - Open the invitation and install the app through TestFlight

### Option 4: Development Build (Recommended for Testing)

Create a development build that includes native code but doesn't require Expo Go.

#### Steps

1. **Build Development Client**:
   ```bash
   # For Android
   eas build --profile development --platform android
   
   # For iOS (macOS only)
   eas build --profile development --platform ios
   ```

2. **Install the Development Build**:
   - Download and install the development build on your device
   - This is a standalone app that connects to your development server

3. **Run the App**:
   ```bash
   npm start --dev-client
   ```
   
4. Open the development build app on your device and it will connect to your development server

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
