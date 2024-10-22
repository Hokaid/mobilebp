# MobileBP

MobileBP is a mobile application built with Expo React Native, featuring a Node.js backend API.

## Project Structure

The project is divided into two main parts:

- `frontend/`: Expo React Native application
- `backend/`: Node.js API

### Frontend Structure

- `__tests__/`: Test files for the React Native components
- `.expo/`: Expo configuration files
- `assets/`: Static assets like images and fonts
- `components/`: Reusable React components
- `node_modules/`: Frontend dependencies
- `screens/`: Main application screens
- `.env`: Environment variables
- `App.tsx`: Main application component
- `babel.config.js`: Babel configuration
- `tsconfig.json`: TypeScript configuration

### Backend Structure

- `node_modules/`: Backend dependencies
- `src/`: Source code for the Node.js API
- `.gitignore`: Git ignore file
- `package.json`: Backend package configuration
- `tsconfig.json`: TypeScript configuration for the backend

## Prerequisites

- Node.js (v14 or later recommended)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)

## Getting Started

### Setting up the Backend

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the server:
   ```
   npm run start:dev
   ```

### Setting up the Frontend

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the Expo development server:
   ```
   npx expo start
   ```

4. Use the Expo Go app on your mobile device to scan the QR code and run the app, or run it on an emulator.

## Running Tests

To run tests for the frontend:

```
cd frontend
npm test
```

To generate a coverage report:

```
npm run test:coverage
```

## Environment Variables

Make sure to set up your `.env` file in the frontend directory with the necessary environment variables. Sample variables might include:

```
API_URL=http://your-backend-api-url
```

Ensure the backend and frontend URLs are properly set up in the `.env` file.
