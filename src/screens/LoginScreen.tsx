// src/screens/LoginScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Image } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import { palette } from '../theme/colors';

export default function LoginScreen({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'Login'>) {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/illustrations/blue_login.png')}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.h1}>Hello,{'\n'}Welcome back again</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={user}
        onChangeText={setUser}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={pass}
        onChangeText={setPass}
      />
      <Pressable style={styles.link} onPress={() => {}}>
        <Text style={styles.linkText}>Forget Password</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => navigation.replace('Main')}>
        <Text style={styles.buttonText}>Sign in</Text>
      </Pressable>
      <Pressable style={{ marginTop: 20 }} onPress={() => navigation.navigate('SignUp')}>
        <Text>
          Don't have an account? <Text style={{ color: palette.blue[600] }}>Sign up</Text>
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
  },
  image: {
    width: '100%',
    height: 220,
    alignSelf: 'center',
    marginTop: 40,
  },
  h1: {
    fontSize: 28,
    fontWeight: '700',
    marginVertical: 24,
  },
  input: {
    backgroundColor: palette.blue[100],
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  link: {
    alignSelf: 'flex-end',
    marginBottom: 32,
  },
  linkText: {
    color: palette.blue[600],
  },
  button: {
    backgroundColor: palette.blue[500],
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: palette.white,
    fontSize: 16,
    fontWeight: '600',
  },
});
