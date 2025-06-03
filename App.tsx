import React, { useState, createContext, useContext } from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import Navigation from '@/navigation';

export type Theme = 'light' | 'dark';

const ThemeContext = createContext<{ theme: Theme; toggle: () => void }>({
  theme: 'light',
  toggle: () => {}
});

export const useTheme = () => useContext(ThemeContext);

export default function App() {
  const [theme, setTheme] = useState<Theme>('light');
  const toggle = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'));

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      <NavigationContainer theme={theme === 'light' ? DefaultTheme : DarkTheme}>
        <Navigation />
        <StatusBar style={theme === 'light' ? 'dark' : 'light'} />
      </NavigationContainer>
    </ThemeContext.Provider>
  );
}