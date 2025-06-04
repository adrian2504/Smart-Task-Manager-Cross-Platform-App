// src/navigation/RootNavigator.tsx

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import OnboardingScreen from "../screens/OnboardingScreen";
import LoginScreen      from "../screens/LoginScreen";
import SignUpScreen     from "../screens/SignUpScreen";
import MainTabs         from "./MainTabs"; // ← now exports the stack that contains tabs + AddTask

export type RootStackParamList = {
  Onboarding: undefined;
  Login:      undefined;
  SignUp:     undefined;
  Main:       undefined; // MainTabs (which itself contains Tabs + AddTask)
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* 1) Onboarding (shown once at app start) */}
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />

        {/* 2) Auth flow */}
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />

        {/* 3) After login/sign‐up, navigate here: */}
        <Stack.Screen name="Main" component={MainTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
