// src/components/GlassContainer.tsx
import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';

type Props = { children: React.ReactNode; style?: ViewStyle };

export default function GlassContainer({ children, style }: Props) {
  return <View style={[styles.glass, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  glass: {
    backgroundColor: 'rgba(255,255,255,0.25)',   // frosted glass
    borderRadius: 16,
    padding: 16,
    // iOS / Android
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    // Web
    boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
    // Makes the blur work on Web / native (expo-blur for native is optional)
    backdropFilter: 'blur(10px)',
  },
});
