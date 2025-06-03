// src/screens/AboutScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { palette } from '../theme/colors';

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>About Glass-Blue Task Manager</Text>
      <Text style={styles.body}>
        This is a demo app showcasing a sleek glass-morphism UI in React Native
        (Expo SDK 53). Build, customize, and extend as you wish!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.white,
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 12,
  },
  body: {
    fontSize: 16,
    color: palette.gray[500],
    lineHeight: 22,
  },
});
