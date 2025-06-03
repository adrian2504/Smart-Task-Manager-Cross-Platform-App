import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnboardingScreen from '../screens/OnboardingScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import TabsNavigator from './TabsNavigator';
export type RootStackParamList = { Onboarding: undefined; Login: undefined; SignUp: undefined; Main: undefined };
const Stack = createNativeStackNavigator<RootStackParamList>();
export default function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="Main" component={TabsNavigator} />
    </Stack.Navigator>
  );
}