import React from 'react';
import { Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../hooks/useAuth';

export default function LogoutButton() {
  const navigation = useNavigation();
  const { logout } = useAuth();

  const onLogout = () => {
    logout();                       // clear ctx (and token if you add persistence)
    navigation.reset({              // wipe history & go back to auth flow
      index: 0,
      routes: [{ name: 'Login' as never }],
    });
  };

  return (
    <Pressable onPress={onLogout} hitSlop={8} style={{ marginRight: 16 }}>
      <Feather name="log-out" size={20} color="#000" />
    </Pressable>
  );
}
