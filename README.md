# RetroTube TV Guide

A web-based retro television experience that transforms YouTube playlist viewing into a nostalgic entertainment system, complete with an EPG (Electronic Program Guide) interface and admin management system.

## Features

- 📺 YouTube playlist integration and playback
- 📋 EPG (Electronic Program Guide) interface
- 🎮 Channel management system
- 🔄 Autopilot mode for continuous playback
- 🎛️ Retro TV controls (volume, brightness, contrast)
- 📱 Responsive design
- 💾 Local storage or Firebase storage options

## Prerequisites

- Node.js 18.x or higher
- npm 9.x or higher

## Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

## Configuration

### Firebase Setup (Optional)

If you want to use Firebase instead of local storage:

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com)
2. Enable Firestore Database
3. Update the Firebase configuration in `src/config/firebase.ts` with your credentials:

```typescript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

## Running the Application

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Admin Access

To access the admin panel:

1. Click the lock icon in the bottom right corner
2. Use these credentials:
   - Username: `admin`
   - Password: `retrotv2024`

## Usage

### EPG Guide
- Browse channels in the EPG interface
- Click on a channel to preview its content
- Use the "Watch Channel" button to open the TV viewer

### TV Controls
- Power: Toggle TV on/off
- Volume: Adjust video volume
- Brightness: Adjust screen brightness
- Contrast: Adjust screen contrast

### Channel Management (Admin)
- Add new channels with YouTube playlist IDs
- Remove existing channels
- Toggle autopilot mode per channel
- Switch between local storage and Firebase storage

## Building for Production

Build the application:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## License

MIT

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request