// src/screens/ProfileScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Pressable } from 'react-native';
import { palette } from '../theme/colors';

export default function ProfileScreen() {
  const menuItems = [
    'Account Information',
    'Notification',
    'Terms & conditions',
    'Ask a question',
    'Email notification',
    'Meetings',
    'Task',
    'Help',
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../../assets/avatars/john.png')}
          style={styles.avatarLarge}
        />
        <Text style={styles.name}>John Doe</Text>
        <Text style={styles.subtitle}>Profile Details</Text>
      </View>

      <ScrollView style={styles.menuContainer}>
        {menuItems.map((item, idx) => (
          <View key={idx} style={styles.menuRow}>
            <Text style={styles.menuText}>{item}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.white,
  },
  header: {
    backgroundColor: palette.blue[500],
    paddingTop: 60,
    paddingBottom: 32,
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  avatarLarge: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: palette.gray[300], // placeholder
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    color: palette.white,
    marginTop: 12,
  },
  subtitle: {
    color: palette.white,
    fontSize: 14,
    marginTop: 4,
  },
  menuContainer: {
    paddingHorizontal: 16,
    marginTop: 16,
  },
  menuRow: {
    borderBottomWidth: 1,
    borderBottomColor: palette.gray[300],
    paddingVertical: 12,
  },
  menuText: {
    fontSize: 16,
    color: palette.gray[500],
  },
});
