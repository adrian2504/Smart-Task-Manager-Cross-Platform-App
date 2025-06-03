import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Pressable, Text, StyleSheet } from 'react-native';

export default function BackButton() {
  const navigation = useNavigation();
  return (
    <Pressable style={styles.button} onPress={() => navigation.goBack()}>
      <Text style={styles.text}>← Back</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 20,
  },
  text: {
    fontSize: 16,
    color: '#007AFF',
  },
});
