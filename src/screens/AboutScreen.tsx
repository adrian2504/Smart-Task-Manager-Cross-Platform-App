import React from 'react';
import { View, Text, Linking, Pressable } from 'react-native';

export default function AboutScreen() {
  return (
    <View className="flex-1 items-center justify-center p-6 bg-glass-light dark:bg-glass-dark">
      <Text className="text-xl font-bold mb-2">Glass Task Manager</Text>
      <Text className="text-center mb-4">A demo cross‑platform task manager built with Expo SDK 53.</Text>
      <Pressable onPress={() => Linking.openURL('https://github.com/your-handle/glass-task-manager')}>
        <Text className="text-blue-500">Source code on GitHub</Text>
      </Pressable>
    </View>
  );
}   