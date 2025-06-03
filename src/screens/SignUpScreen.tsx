// src/screens/SignUpScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { palette } from '../theme/colors';
import { useAuth } from '../hooks/useAuth';
import { useUser } from '../hooks/UserContext';   // <— to store username in global ctx

export default function SignUpScreen() {
  const navigation = useNavigation();
  const { signup, loading, error } = useAuth();
  const { setUserName } = useUser();

  const [username, setUsername] = useState('');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');

  const onSignUp = async () => {
    try {
      const data = await signup(username.trim(), email.trim(), password);
      setUserName(data.username);            // store name globally
      Alert.alert('Welcome!', `Hello ${data.username}`);
      navigation.replace('Main' as never);   // <-- change if your main screen differs
    } catch (err: any) {
      console.error('Signup failed', err);
      Alert.alert('Signup failed', 'Please check your details and try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/illustrations/blue_signup.png')}
        style={styles.image}
        resizeMode="contain"
      />

      <Text style={styles.h1}>Sign up</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
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
        value={password}
        onChangeText={setPassword}
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Pressable style={styles.button} onPress={onSignUp} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Sign up</Text>
        )}
      </Pressable>

      <Pressable style={{ marginTop: 20 }} onPress={() => navigation.goBack()}>
        <Text>
          Already have an account?{' '}
          <Text style={{ color: palette.blue[600] }}>Sign in</Text>
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: palette.white,
    justifyContent: 'center',
  },
  image: { width: '100%', height: 200, alignSelf: 'center', marginBottom: 20 },
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
