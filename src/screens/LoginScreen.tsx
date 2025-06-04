import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { palette } from '../theme/colors';
import { useAuth }   from '../hooks/useAuth';
import { useUser }   from '../hooks/UserContext';

export default function LoginScreen() {
  const navigation = useNavigation<any>();
  const { login, loading, error } = useAuth();
  const { setUserName } = useUser();

  const [email, setEmail] = useState('');
  const [pass,  setPass ] = useState('');

  const onLogin = async () => {
    if (!email.trim() || !pass) return;
    const name = await login(email.trim(), pass);
    if (name) {
      setUserName(name);
      navigation.replace('Main');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Sign in</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={pass}
        onChangeText={setPass}
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Pressable
        style={[styles.button, loading && { opacity: 0.5 }]}
        onPress={onLogin}
        disabled={loading}
      >
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Sign in</Text>}
      </Pressable>

      <Pressable style={{ marginTop: 20 }} onPress={() => navigation.navigate('SignUp')}>
        <Text>Don’t have an account? <Text style={{ color: palette.blue[600] }}>Sign up</Text></Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: palette.white, justifyContent: 'center' },
  h1: { fontSize: 28, fontWeight: '700', textAlign: 'center', marginBottom: 24 },
  input: {
    backgroundColor: palette.blue[100],
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  button: {
    backgroundColor: palette.blue[500],
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 4,
  },
  buttonText: { color: palette.white, fontSize: 16, fontWeight: '600' },
  error: { color: 'red', textAlign: 'center', marginBottom: 8 },
});
