import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import ValeBusScreen from './src/screens/home'; 

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="light" translucent={true} />
      <ValeBusScreen />
    </View>
  );
}