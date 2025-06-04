// App.tsx
import React, { useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar }           from 'expo-status-bar';

import RootNavigator    from './src/navigation/RootNavigator';
import { AuthProvider } from './src/hooks/useAuth';
import { UserProvider } from './src/hooks/UserContext';
import { TasksProvider } from './src/hooks/TasksContext';
import { ThemeContext } from './src/hooks/useTheme';

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const toggle            = () => setTheme(t => (t === 'light' ? 'dark' : 'light'));

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeContext.Provider value={{ theme, toggle }}>
        <AuthProvider>
          <UserProvider>
            <TasksProvider>
              <StatusBar style={theme === 'light' ? 'dark' : 'light'} />
              <RootNavigator />
            </TasksProvider>
          </UserProvider>
        </AuthProvider>
      </ThemeContext.Provider>
    </GestureHandlerRootView>
  );
}
