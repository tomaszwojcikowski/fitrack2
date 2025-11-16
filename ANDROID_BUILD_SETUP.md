# Android Build Setup Guide

This document explains how the automated Android build system works and how to set it up for the first time.

## Overview

FiTrack2 uses **GitHub Actions** with **Expo Application Services (EAS)** to automatically build Android APK files whenever code is pushed to the `main` branch or when a version tag is created.

## Prerequisites

To enable automated builds, you need:

1. **Expo Account** (free)
   - Sign up at [expo.dev](https://expo.dev)
   - No credit card required for building Android APKs

2. **EXPO_TOKEN Secret** configured in GitHub
   - This allows GitHub Actions to authenticate with EAS

## Initial Setup

### 1. Create an Expo Account

```bash
# Install EAS CLI globally
npm install -g eas-cli

# Login to your Expo account
eas login
```

### 2. Configure the Project

The project is already configured with `eas.json` and `app.json` (with the `owner` field set). The GitHub Actions workflow will automatically initialize the project with EAS on the first build.

**Optional**: If you want to build locally, you can initialize the project manually:

```bash
# Initialize EAS project (optional for local builds)
eas build:configure
```

This will:
- Create or update `eas.json` 
- Link the project to your Expo account
- Set up the project ID in `app.json`

### 3. Generate an Expo Access Token

1. Go to [https://expo.dev/accounts/[username]/settings/access-tokens](https://expo.dev/settings/access-tokens)
2. Click "Create Token"
3. Name it something like "GitHub Actions"
4. Copy the token (you won't see it again!)

### 4. Get Your Expo App ID

After linking your project to Expo (either locally via `eas build:configure` or through the Expo dashboard), you need to get your project's App ID:

1. Go to [https://expo.dev](https://expo.dev) and log in
2. Navigate to your project
3. Find your Project ID (also called App ID) in the project settings
4. Copy this ID - it will look like a UUID (e.g., `12345678-1234-1234-1234-123456789abc`)

### 5. Add Secrets to GitHub

You need to add two secrets to your GitHub repository:

1. Go to your GitHub repository
2. Navigate to **Settings → Secrets and variables → Actions**
3. Click **New repository secret**

**First Secret - EXPO_TOKEN:**
1. Name: `EXPO_TOKEN`
2. Value: Paste your Expo access token (from step 3)
3. Click **Add secret**

**Second Secret - EXPO_APP_ID:**
1. Click **New repository secret** again
2. Name: `EXPO_APP_ID`
3. Value: Paste your Expo Project ID / App ID (from step 4)
4. Click **Add secret**

### 6. Update app.json

Ensure your `app.json` has the correct configuration:

```json
{
  "expo": {
    "name": "FiTrack2",
    "slug": "fitrack2",
    "version": "1.0.0",
    "owner": "your-expo-username",
    "android": {
      "package": "com.yourcompany.fitrack2",
      "versionCode": 1,
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#FFFFFF"
      }
    }
  }
}
```

**Important**: Replace:
- `owner` with your Expo username or organization
- `android.package` with your unique package identifier

## Build Profiles

The project has three build profiles defined in `eas.json`:

### 1. Development
```json
{
  "developmentClient": true,
  "distribution": "internal",
  "android": {
    "gradleCommand": ":app:assembleDebug",
    "buildType": "apk"
  }
}
```
- For development and testing
- Includes dev tools
- Faster build times
- **Usage**: `eas build --profile development --platform android`

### 2. Preview
```json
{
  "distribution": "internal",
  "android": {
    "buildType": "apk",
    "gradleCommand": ":app:assembleRelease"
  }
}
```
- For internal testing and QA
- Release build without app store submission
- **Default for automatic builds on `main` branch**
- **Usage**: `eas build --profile preview --platform android`

### 3. Production
```json
{
  "android": {
    "buildType": "apk",
    "gradleCommand": ":app:assembleRelease"
  }
}
```
- For production releases
- Triggered by version tags (e.g., `v1.0.0`)
- **Usage**: `eas build --profile production --platform android`

## Automated Build Workflow

### Workflow File: `.github/workflows/build-android.yml`

The workflow automatically triggers on:

1. **Push to `main`**: Creates a preview build
2. **Version tags** (e.g., `v1.0.0`): Creates a production build
3. **Manual dispatch**: Choose any profile via GitHub Actions UI

### Workflow Steps

1. **Checkout**: Gets the latest code
2. **Setup Node.js**: Installs Node.js 18
3. **Setup Expo/EAS**: Installs EAS CLI and authenticates
4. **Install Dependencies**: Runs `npm install`
5. **Initialize EAS Project**: Automatically initializes the project with EAS (first time only)
6. **Build**: Starts the EAS build process
7. **Report**: Posts build status and link

### Build Process

When triggered, the workflow:

1. Initializes the EAS project automatically (if not already initialized)
2. Starts a build on EAS servers (not in GitHub Actions)
3. EAS handles the actual compilation
4. Returns immediately with a build ID
5. Build continues on EAS (typically 10-20 minutes)
6. You receive an email when the build completes

### Getting Your APK

After the workflow runs:

1. Check your email for EAS build notification
2. Or go to the [GitHub Actions page](https://github.com/tomaszwojcikowski/fitrack2/actions/workflows/build-android.yml)
3. Click on the latest workflow run
4. Look for the EAS build link in the summary
5. Download the APK from the EAS build page

## Manual Builds

You can also trigger builds manually:

### Via GitHub Actions UI

1. Go to **Actions** tab in GitHub
2. Select **Build Android APK** workflow
3. Click **Run workflow**
4. Choose a build profile
5. Click **Run workflow**

### Via Command Line

```bash
# Preview build
eas build -p android --profile preview

# Production build  
eas build -p android --profile production

# Check build status
eas build:list
```

## Versioning

To create a production build with a version:

```bash
# Update version in app.json
# "version": "1.0.1"
# "android.versionCode": 2

# Commit changes
git add app.json
git commit -m "Bump version to 1.0.1"

# Create and push version tag
git tag v1.0.1
git push origin main --tags
```

This triggers the workflow with the `production` profile.

## Troubleshooting

### Build Fails with "No Expo Token"

**Solution**: Make sure `EXPO_TOKEN` secret is set in GitHub Settings → Secrets → Actions

### Build Fails with "Missing App ID" or "EAS project not configured"

**Solution**: Make sure both required secrets are set:
- `EXPO_TOKEN` - Your Expo access token
- `EXPO_APP_ID` - Your Expo Project ID / App ID

If the secrets are set but build still fails:
- Verify the `owner` field in `app.json` matches your Expo username
- Verify the `EXPO_APP_ID` secret contains the correct Project ID from your Expo dashboard
- Check that the `EXPO_TOKEN` secret is valid and has the correct permissions
- Try running `eas build:configure` locally first to manually link the project

### Build Times Out or Fails

**Solution**: 
- Check the EAS build logs on expo.dev
- Common issues: dependency conflicts, gradle errors
- Try building locally first to debug: `eas build -p android --profile preview --local`

### APK Won't Install on Device

**Solution**:
- Enable "Install from Unknown Sources" in Android settings
- Check that the APK downloaded completely
- Try a different file transfer method

### Can't Find APK Download Link

**Solution**:
- Check your email for EAS build notification
- Or go to [expo.dev](https://expo.dev) → Projects → fitrack2 → Builds
- The APK is linked in the build details

## Build Monitoring

Monitor your builds at:

- **EAS Dashboard**: [https://expo.dev](https://expo.dev)
- **GitHub Actions**: Repository → Actions tab
- **Email**: EAS sends notifications on build completion

## Cost

- **APK builds**: Free on EAS (unlimited for internal distribution)
- **AAB builds for Play Store**: Free
- **Priority builds**: Available with paid plans (faster queue times)

## Best Practices

1. **Test locally first**: Run `eas build --local` to catch issues early
2. **Use preview for testing**: Save production profile for releases
3. **Version correctly**: Update both `version` and `versionCode` in `app.json`
4. **Monitor build queue**: Check EAS dashboard for queue times
5. **Keep dependencies updated**: Outdated packages can cause build failures

## Additional Resources

- [EAS Build Documentation](https://docs.expo.dev/build/introduction/)
- [EAS Build Configuration](https://docs.expo.dev/build/eas-json/)
- [Android App Signing](https://docs.expo.dev/app-signing/app-credentials/)
- [GitHub Actions for Expo](https://docs.expo.dev/build/building-on-ci/)

## Support

If you encounter issues:

1. Check [EAS Build Docs](https://docs.expo.dev/build/introduction/)
2. Search [Expo Forums](https://forums.expo.dev/)
3. Check build logs in the EAS dashboard
4. Contact: [Expo Support](https://expo.dev/support)
