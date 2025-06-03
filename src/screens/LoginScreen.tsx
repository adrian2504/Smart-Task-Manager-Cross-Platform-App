import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useAuth } from '../hooks/useAuth';
import { palette } from '../theme/colors';

export default function LoginScreen() {
  const navigation = useNavigation();
  const { login, loading, error } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = async () => {
    const user = await login(email, password);
    if (user) {
      Alert.alert('Success', `Welcome back ${user.name || ''}`);
      navigation.navigate('Dashboard' as never);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Pressable style={styles.button} onPress={onLogin} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Login</Text>
        )}
      </Pressable>

      <Pressable onPress={() => navigation.navigate('SignUpScreen' as never)}>
        <Text style={styles.switchText}>Don't have an account? Sign up</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.white,
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    backgroundColor: palette.gray[100],
    borderRadius: 10,
    padding: 14,
    marginBottom: 16,
    fontSize: 16,
  },
  button: {
    backgroundColor: palette.blue[500],
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: palette.white,
    fontSize: 16,
    fontWeight: '600',
  },
  error: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
  switchText: {
    marginTop: 20,
    textAlign: 'center',
    color: palette.blue[500],
  },
});
