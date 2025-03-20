# Glucose Tracker

A mobile application built with React Native and Expo for tracking blood glucose levels. This app helps users monitor their blood sugar readings and maintain a detailed history of their measurements.

## Features

- 📝 Record blood glucose readings with timestamps
- 📋 Add optional notes to each reading
- 📊 View complete history of readings
- 📱 User-friendly interface with Material Design components
- 💾 Local storage for data persistence

## Tech Stack

- React Native
- Expo
- React Native Paper (UI components)
- SQLite (local database)
- TypeScript
- Moment.js (date handling)

## Getting Started

### Prerequisites

- Node.js (v12 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS development) or Android Emulator (for Android development)

### Installation

1. Clone the repository:

```bash
git clone [your-repository-url]
cd GlucoseTracker
```

2. Install dependencies:

```bash
yarn install
# or
npm install
```

3. Start the development server:

```bash
yarn start
# or
npm start
```

4. Follow the Expo CLI instructions to run the app on your preferred platform (iOS/Android)

## Usage

1. **Adding a Reading**

   - Tap the main input screen
   - Enter your blood glucose level
   - Optionally add notes about the reading
   - Tap "Save Reading"

2. **Viewing History**
   - Tap the "View History" button to see all your past readings
   - Readings are displayed in chronological order with timestamps

## Project Structure

```
src/
├── screens/
│   ├── InputScreen.tsx    # Main screen for entering readings
│   └── ListScreen.tsx     # History view of all readings
├── utils/
│   └── db.ts             # Database operations
└── types/
    └── navigation.ts     # Navigation type definitions
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built with React Native and Expo
- UI components from React Native Paper
- Local storage implementation using SQLite
