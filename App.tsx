// App.tsx

import React, { useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import Navigation from './src/navigation';
import { ThemeContext, Theme } from './src/hooks/useTheme';

export default function App() {
  const [theme, setTheme] = useState<Theme>('light');
  const toggle = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'));

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeContext.Provider value={{ theme, toggle }}>
        <NavigationContainer theme={theme === 'light' ? DefaultTheme : DarkTheme}>
          <Navigation />
          <StatusBar style={theme === 'light' ? 'dark' : 'light'} />
        </NavigationContainer>
      </ThemeContext.Provider>
    </GestureHandlerRootView>
  );
}
