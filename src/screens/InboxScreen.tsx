import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, Image, StyleSheet } from 'react-native';
import axios from 'axios';
import BASE_URL from '../config/api';
import { useAuth } from '../hooks/useAuth';
import { palette } from '../theme/colors';

export default function InboxScreen() {
  const { user } = useAuth();          // contains token
  const [msgs, setMsgs] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await axios.get(`${BASE_URL}/messages`, {
        headers: { Authorization: `Bearer ${user?.token}` },
      });
      setMsgs(res.data);
    })();
  }, []);

  return (
    <FlatList
      style={styles.container}
      data={msgs}
      keyExtractor={m => m._id}
      renderItem={({ item }) => (
        <View style={styles.row}>
          <Image
            source={{ uri: item.from?.avatarUrl || 'https://i.pravatar.cc/40' }}
            style={styles.avatar}
          />
          <View style={{ marginLeft: 12 }}>
            <Text style={styles.name}>{item.from?.username || 'System'}</Text>
            <Text style={styles.text}>{item.text}</Text>
          </View>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: palette.white },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: palette.gray[100],
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
  },
  avatar: { width: 40, height: 40, borderRadius: 20 },
  name: { fontWeight: '600' },
  text: { color: palette.gray[600], marginTop: 2 },
});
