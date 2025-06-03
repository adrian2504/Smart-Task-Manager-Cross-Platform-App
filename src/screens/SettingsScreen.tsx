// src/screens/SettingsScreen.tsx
import React from 'react';
import { View, Pressable, Text, StyleSheet } from 'react-native';
import { useTheme } from '../hooks/useTheme';
import { palette } from '../theme/colors';

export default function SettingsScreen() {
  const { theme, toggle } = useTheme();

  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={toggle}>
        <Text style={styles.buttonText}>
          Switch to {theme === 'light' ? 'dark' : 'light'} theme
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: palette.blue[500],
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: palette.white,
    fontSize: 16,
  },
});
