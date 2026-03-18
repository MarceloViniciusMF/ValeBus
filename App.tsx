import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import SplashScreen from './src/screens/splash';
import ValeBusScreen from './src/screens/home';

export default function App() {
  const [isSplashVisible, setIsSplashVisible] = useState(true);

  if (isSplashVisible) {
    return <SplashScreen onFinish={() => setIsSplashVisible(false)} />;
  }

  return <ValeBusScreen />;
}