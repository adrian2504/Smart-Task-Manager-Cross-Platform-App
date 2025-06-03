// src/screens/SignUpScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Image } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { RootStackParamList } from '../navigation/RootNavigator';
import { palette } from '../theme/colors';
import { useUser } from '../hooks/UserContext';

export default function SignUpScreen({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'SignUp'>) {
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const { setUserName } = useUser();

  const onSignUp = () => {
    // In a real app, validate and create account here…
    setUserName(user.trim());
    navigation.replace('Main');
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
        value={user}
        onChangeText={setUser}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        keyboardType="email-address"
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={pass}
        onChangeText={setPass}
      />
      <Pressable style={styles.button} onPress={onSignUp}>
        <Text style={styles.buttonText}>Sign up</Text>
      </Pressable>
      <Pressable style={{ marginTop: 20 }} onPress={() => navigation.goBack()}>
        <Text>
          Already have an account? <Text style={{ color: palette.blue[600] }}>Sign in</Text>
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: palette.white },
  image: { width: '100%', height: 200, alignSelf: 'center', marginTop: 30 },
  h1: { fontSize: 28, fontWeight: '700', marginVertical: 24 },
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
  },
  buttonText: { color: palette.white, fontSize: 16, fontWeight: '600' },
});
