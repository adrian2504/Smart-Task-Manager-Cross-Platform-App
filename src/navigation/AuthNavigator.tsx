// src/navigation/AuthNavigator.tsx
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import OnboardingScreen from "../screens/OnboardingScreen";
import LoginScreen      from "../screens/LoginScreen";
import SignUpScreen     from "../screens/SignUpScreen";
import MainTabs         from "./MainTabs";   // your bottom-tabs navigator

// Define the types for this stack’s params
export type AuthStackParamList = {
  Onboarding: undefined;
  Login:      undefined;
  SignUp:     undefined;
  Main:       undefined;  // “Main” will render MainTabs
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen 
        name="Onboarding" 
        component={OnboardingScreen} 
      />
      <Stack.Screen 
        name="Login" 
        component={LoginScreen} 
      />
      <Stack.Screen 
        name="SignUp" 
        component={SignUpScreen} 
      />
      {/* Once logged in, replace stack with the bottom-tab navigator */}
      <Stack.Screen 
        name="Main" 
        component={MainTabs} 
      />
    </Stack.Navigator>
  );
}
