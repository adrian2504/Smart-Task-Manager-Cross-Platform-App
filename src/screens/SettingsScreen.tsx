// src/screens/SettingsScreen.tsx

import React from 'react';
import { View, Pressable, Text } from 'react-native';
// ← point at the standalone hook, not App.tsx
import { useTheme } from '../hooks/useTheme';

export default function SettingsScreen() {
  const { theme, toggle } = useTheme();

  return (
    <View className="flex-1 items-center justify-center bg-glass-light dark:bg-glass-dark">
      <Pressable
        onPress={toggle}
        className="px-4 py-2 bg-blue-500 rounded-md"
      >
        <Text className="text-white">
          Switch to {theme === 'light' ? 'dark' : 'light'} theme
        </Text>
      </Pressable>
    </View>
  );
}
