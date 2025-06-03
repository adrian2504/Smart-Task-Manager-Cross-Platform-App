import React from 'react';
import { BlurView } from '@react-native-community/blur';
import { View, StyleProp, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface Props {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export default function GlassContainer({ children, style }: Props) {
  return (
    <BlurView style={[{ overflow: 'hidden', borderRadius: 24 }, style]} blurType="light" blurAmount={20}>
      <LinearGradient colors={["#ffffff33", "#ffffff11"]} style={{ padding: 16 }}>{children}</LinearGradient>
    </BlurView>
  );
}