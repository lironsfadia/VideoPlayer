# Video Player App

## Overview

This is a React Native application built with Expo for video editing. It allows users to trim videos, add text overlays, and save their edits. The app leverages various React Native libraries and custom hooks for video manipulation and user interface management.

VideoPlayer
├─ .git
├─ .gitignore
├─ .npmrc
├─ .prettierrc.js
├─ README.md
├─ app
│ ├─ (Splash)
│ │ ├─ SplashScreen.tsx
│ │ ├─ consts.ts
│ │ └─ useSplashScreen.ts
│ ├─ (tabs)
│ │ ├─ \_layout.tsx
│ │ ├─ about.tsx
│ │ └─ index.tsx
│ ├─ (uploadVideo)
│ │ ├─ UploadVideo.tsx
│ │ ├─ UploadVideoButton.tsx
│ │ ├─ consts.ts
│ │ ├─ types.ts
│ │ ├─ useUploadVideo.ts
│ │ └─ useUploadVideoButton.ts
│ ├─ (videoPlayer)
│ │ ├─ VideoPlayerPage.tsx
│ │ ├─ core
│ │ │ └─ utils.ts
│ │ ├─ textOverlay
│ │ │ ├─ AddTextOverlay.tsx
│ │ │ ├─ OverlayManager.tsx
│ │ │ ├─ TextOverlay.tsx
│ │ │ ├─ consts.ts
│ │ │ ├─ types.ts
│ │ │ ├─ useAddTextOverlay.ts
│ │ │ ├─ useOverlayManager.ts
│ │ │ └─ useTextOverlay.ts
│ │ ├─ thumbnail
│ │ │ ├─ Thumbnail.tsx
│ │ │ ├─ types.ts
│ │ │ └─ useThumbnail.ts
│ │ ├─ timeline
│ │ │ ├─ .Timeline.tsx.swp
│ │ │ ├─ OverlayTimeline.tsx
│ │ │ ├─ PlayPauseButton.tsx
│ │ │ ├─ TimeDisplay.tsx
│ │ │ ├─ Timeline.tsx
│ │ │ ├─ TimelineScrubber.tsx
│ │ │ ├─ constants.ts
│ │ │ ├─ types.ts
│ │ │ └─ useTimeline.ts
│ │ ├─ trim
│ │ │ ├─ TrimInputModal.tsx
│ │ │ ├─ UseTrimInputLogic.ts
│ │ │ └─ types.ts
│ │ ├─ ui
│ │ │ └─ ActionButton.tsx
│ │ └─ videoPlayer
│ │ ├─ ActionButtons.tsx
│ │ ├─ ControlPanel.tsx
│ │ ├─ VideoComponent.tsx
│ │ ├─ VideoPlayer.tsx
│ │ ├─ helpers
│ │ │ └─ helpers.ts
│ │ ├─ styles.ts
│ │ ├─ types.ts
│ │ ├─ useVideoActions.ts
│ │ ├─ useVideoPlayer.ts
│ │ └─ useVideoState.ts
│ ├─ +html.tsx
│ ├─ +not-found.tsx
│ ├─ \_layout.tsx
│ └─ components
│ ├─ ThemedText.tsx
│ ├─ ThemedView.tsx
│ ├─ **tests**
│ │ ├─ ThemedText-test.tsx
│ │ └─ **snapshots**
│ │ └─ ThemedText-test.tsx.snap
│ ├─ navigation
│ │ └─ TabBarIcon.tsx
│ └─ ui
│ ├─ AnimatedDots.tsx
│ ├─ CustomHeader.tsx
│ ├─ Snow.tsx
│ ├─ UploadingIndicator.tsx
│ ├─ box
│ │ ├─ index.tsx
│ │ ├─ index.web.tsx
│ │ └─ styles.tsx
│ ├─ button
│ │ └─ index.tsx
│ ├─ gluestack-ui-provider
│ │ ├─ config.ts
│ │ ├─ index.tsx
│ │ ├─ index.web.tsx
│ │ └─ script.ts
│ ├─ hstack
│ │ ├─ index.tsx
│ │ ├─ index.web.tsx
│ │ └─ styles.tsx
│ ├─ image
│ │ └─ index.tsx
│ ├─ spinner
│ │ └─ index.tsx
│ ├─ text
│ │ ├─ index.tsx
│ │ ├─ index.web.tsx
│ │ └─ styles.tsx
│ ├─ toast
│ │ └─ index.tsx
│ └─ vstack
│ ├─ index.tsx
│ ├─ index.web.tsx
│ └─ styles.tsx
├─ app.json
├─ assets
│ ├─ fonts
│ │ └─ SpaceMono-Regular.ttf
│ └─ images
│ ├─ adaptive-icon.png
│ ├─ favicon.png
│ ├─ icon.png
│ ├─ partial-react-logo.png
│ ├─ react-logo.png
│ ├─ react-logo@2x.png
│ ├─ react-logo@3x.png
│ └─ splash.png
├─ babel.config.js
├─ constants
│ └─ Colors.ts
├─ global.css
├─ gluestack-ui.config.json
├─ hooks
│ ├─ useAppReady.ts
│ ├─ useColorScheme.ts
│ ├─ useColorScheme.web.ts
│ └─ useThemeColor.ts

## Features

1. **Video Playback**:

   - Play and pause videos
   - Scrub through the video timeline

2. **Text Overlays**:

   - Add text overlays to the video
   - Edit existing text overlays (position and content)
   - Delete text overlays
   - Text overlays are displayed in real-time but only saved permanently when "Save Effects" is clicked

3. **Video Trimming**:

   - Set start and end points for trimming
   - Preview trimmed video
   - Trimmed version is created but only saved and displayed after clicking "Save Effects"

4. **Thumbnail Generation**:

   - Generate thumbnails for specific video frames
   - Display thumbnails on the timeline

5. **Save Effects**:

   - Click "Save Effects" to permanently apply all edits (text overlays and trimming)
   - Edited video is exported only after saving effects

6. **Responsive Design**:

   - Adapts to different screen orientations and sizes

7. **Real-time Preview**:

   - See text overlays and trimming effects in real-time as you edit
   - Changes are temporary until "Save Effects" is clicked

8. **Undo/Redo Functionality**:
   - Ability to undo and redo edits (to be implemented)

## How Edits Are Applied

### Text Overlays

- When you add a text overlay, it will immediately appear on the video preview.
- You can edit, move, or delete these overlays as needed.
- These changes are temporary and for preview purposes only.
- To permanently save the text overlays, you must click the "Save Effects" button.

### Video Trimming

- When you use the trim function, you'll see a preview of the trimmed video.
- The original video file remains unchanged at this stage.
- The trim points are remembered by the app but not yet applied to the video file.
- Clicking "Save Effects" will apply the trim to the video and create a new, trimmed video file.

### Save Effects Button

- The "Save Effects" button is crucial for finalizing your edits.
- Clicking this button will:
  1. Permanently apply all text overlays to the video.
  2. Create a new video file with the applied trim points.
  3. Combine all effects into a final, edited video.
- After saving effects, the new edited video will be displayed and available for further editing or export.

### Important Note

Always remember to click "Save Effects" before exiting the editor or if you want to make your changes permanent. Unsaved edits will be lost if you close the app or start editing a new video.

## Libraries Used

1. **Expo**: Framework and platform for universal React applications
2. **React Native**: Core framework for building the mobile app
3. **FFmpeg**: For video processing tasks (via `ffmpeg-kit-react-native`)
4. **react-native-video**: For video playback functionality
5. **react-native-create-thumbnail**: For generating video thumbnails
6. **@expo/vector-icons**: For using icons in the UI
7. **react-native-reanimated**: For smooth animations (used in timeline)
8. **expo-router**: For navigation within the app

### Key Components:

- `ControlPanel`: Main control interface for the video editor
- `Timeline`: Displays video timeline and allows scrubbing
- `TextOverlay`: Manages text overlays on the video
- `TrimInputModal`: Interface for inputting trim times

### Custom Hooks:

- `useVideoPlayer`: Manages overall video player state and actions
- `useVideoActions`: Handles video-specific actions (trim, save)
- `useTimeline`: Manages timeline state and interactions

### Utilities:

- `FFmpegUtils`: Provides utility functions for video processing using FFmpeg

## Setup

To set up this Expo project:

1. **Prerequisites**:

   - Node.js (v14 or later)
   - npm or yarn
   - Expo CLI (`npm install -g expo-cli`)

2. **Clone the repository**:

   ```
   git clone https://github.com/lironsfadia/VideoPlayer.git
   cd VideoPlayer
   ```

3. **Install dependencies**:

   ```
   npm install
   ```

   or if you're using yarn:

   ```
   yarn install
   ```

4. **Set up FFmpeg**:

   - Follow the setup instructions for `ffmpeg-kit-react-native` in their documentation:
     Add this line to podfile: pod 'ffmpeg-kit-react-native', :subspecs => ['https'], :podspec => '../node_modules/ffmpeg-kit-react-native/ffmpeg-kit-react-native.podspec'

5. **Run the project**:

   ```
   npx expo prebuild
   npx expo run -c
   npx expo run:ios --device
   ```

   NOTE - This project was tested only on a real iOS device.

```

```
