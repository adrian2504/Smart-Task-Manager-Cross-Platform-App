// App.tsx
import React, { useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

import RootNavigator from './src/navigation/RootNavigator';
import { ThemeContext, Theme } from './src/hooks/useTheme';
import { TasksProvider } from './src/hooks/TasksContext';
import { UserProvider } from './src/hooks/UserContext';

export default function App() {
  const [theme, setTheme] = useState<Theme>('light');
  const toggle = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'));

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeContext.Provider value={{ theme, toggle }}>
        <UserProvider>
          <TasksProvider>
            <NavigationContainer theme={theme === 'light' ? DefaultTheme : DarkTheme}>
              <StatusBar style={theme === 'light' ? 'dark' : 'light'} />
              <RootNavigator />
            </NavigationContainer>
          </TasksProvider>
        </UserProvider>
      </ThemeContext.Provider>
    </GestureHandlerRootView>
  );
}
