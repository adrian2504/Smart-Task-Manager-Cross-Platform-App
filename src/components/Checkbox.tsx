// src/components/Checkbox.tsx
import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { palette } from '../theme/colors';

interface Props {
  checked: boolean;
  onPress(): void;
}

export default function Checkbox({ checked, onPress }: Props) {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      {checked ? (
        <View style={[styles.box, styles.boxChecked]}>
          <Feather name="check" size={16} color={palette.white} />
        </View>
      ) : (
        <View style={styles.box} />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 4, // extra touchable area
  },
  box: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: palette.gray[400],
    backgroundColor: palette.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxChecked: {
    backgroundColor: palette.green[500],
    borderColor: palette.green[500],
  },
});
