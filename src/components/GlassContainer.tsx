// src/components/GlassContainer.tsx

import React from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';

interface Props {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export default function GlassContainer({ children, style }: Props) {
  return (
    <BlurView intensity={50} tint="light" style={[{ borderRadius: 24, overflow: 'hidden' }, style]}>
      <LinearGradient
        // adjust these colors if you want a slightly darker/light glass effect
        colors={['#ffffff33', '#ffffff11']}
        style={{ padding: 16 }}
      >
        {children}
      </LinearGradient>
    </BlurView>
  );
}
