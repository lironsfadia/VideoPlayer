# Video Editor App

## Overview

This is a React Native application built with Expo for video editing. It allows users to trim videos, add text overlays, and save their edits. The app leverages various React Native libraries and custom hooks for video manipulation and user interface management.

## Features

1. **Video Playback**:

   - Play and pause videos
   - Scrub through the video timeline

2. **Text Overlays**:

   - Add text overlays to the video
   - Edit existing text overlays (position and content)
   - Delete text overlays

3. **Video Trimming**:

   - Set start and end points for trimming
   - Preview trimmed video

4. **Thumbnail Generation**:

   - Generate thumbnails for specific video frames
   - Display thumbnails on the timeline

5. **Save Edits**:

   - Save all edits made to the video
   - Export edited video

6. **Responsive Design**:

   - Adapts to different screen orientations and sizes

7. **Real-time Preview**:

   - See text overlays in real-time as you edit

8. **Undo/Redo Functionality**:
   - Ability to undo and redo edits (to be implemented)

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
   git clone https://github.com/your-repo/video-editor-app.git
   cd video-editor-app
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

   - Follow the setup instructions for `ffmpeg-kit-react-native` in their documentation

5. **Run the project**:

   ```
   expo start
   ```

6. **Running on a device/simulator**:

   - For iOS: Press 'i' in the terminal or run on Xcode
   - For Android: Press 'a' in the terminal or run on Android Studio

7. **Building for production**:
   ```
   expo build:android
   ```
   or
   ```
   expo build:ios
   ```
