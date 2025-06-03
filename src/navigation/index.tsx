// src/navigation/index.tsx

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import CalendarScreen from '../screens/CalendarScreen';
import StatsScreen from '../screens/StatsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import AboutScreen from '../screens/AboutScreen';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../hooks/useTheme';

const Tab = createBottomTabNavigator();

export default function Navigation() {
  const { theme } = useTheme();
  const iconColor = theme === 'light' ? '#007aff' : '#7dc3ff';

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: iconColor,
        tabBarStyle: {
          backgroundColor: theme === 'light' ? '#ffffffcc' : '#00000088',
          // Only some browsers support backdropFilter; on iOS/Android it's fine
          backdropFilter: 'blur(20px)',
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ size }) => (
            <Feather name="check-square" size={size} color={iconColor} />
          ),
        }}
      />

      <Tab.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{
          tabBarIcon: ({ size }) => (
            <Feather name="calendar" size={size} color={iconColor} />
          ),
        }}
      />

      <Tab.Screen
        name="Stats"
        component={StatsScreen}
        options={{
          tabBarIcon: ({ size }) => (
            <Feather name="bar-chart-2" size={size} color={iconColor} />
          ),
        }}
      />

      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ size }) => (
            <Feather name="settings" size={size} color={iconColor} />
          ),
        }}
      />

      <Tab.Screen
        name="About"
        component={AboutScreen}
        options={{
          tabBarIcon: ({ size }) => (
            <MaterialIcons name="info-outline" size={size} color={iconColor} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
