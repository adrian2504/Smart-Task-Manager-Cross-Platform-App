import React from 'react';
import { ViewStyle } from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';

interface Props { children: React.ReactNode; style?: ViewStyle | ViewStyle[]; }
export default function GlassContainer({ children, style }: Props) {
  return (
    <BlurView intensity={50} tint="light" style={[{ borderRadius: 20, overflow: 'hidden' }, style]}>
      <LinearGradient
        colors={["#ffffff33", "#ffffff11"]}
        style={{ padding: 16 }}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {children}
      </LinearGradient>
    </BlurView>
  );
}