// src/screens/InboxScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, Image } from 'react-native';
import { palette } from '../theme/colors';

interface Message {
  id: string;
  name: string;
  status: string;
  avatar: any;
}

const data: Message[] = [
  { id: '1', name: 'John Doe', status: 'Hello there!', avatar: require('../../assets/avatars/john.png') },
  { id: '2', name: 'Jane Smith', status: 'Busy', avatar: require('../../assets/avatars/jane.png') },
  { id: '3', name: 'Michael Johnson', status: 'Available', avatar: require('../../assets/avatars/michael.png') },
  { id: '4', name: 'Emily Williams', status: 'Away', avatar: require('../../assets/avatars/emily.png') },
  { id: '5', name: 'David Brown', status: 'On a call', avatar: require('../../assets/avatars/david.png') },
];

export default function InboxScreen() {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.search}
        placeholder="Search Member"
        placeholderTextColor={palette.gray[500]}
      />

      <Text style={styles.todayText}>Today</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.msgRow}>
            <Image source={item.avatar} style={styles.avatar} />
            <View style={{ marginLeft: 12 }}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.status}>{item.status}</Text>
            </View>
          </View>
        )}
      />

      <Text style={styles.todayText}>Yesterday</Text>
      {/* You can duplicate older messages or leave blank */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.white,
    padding: 16,
  },
  search: {
    backgroundColor: palette.blue[50],
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 16,
  },
  todayText: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  msgRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: palette.blue[50],
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
  },
  status: {
    fontSize: 12,
    color: palette.gray[500],
  },
});
