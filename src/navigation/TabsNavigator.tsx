import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DashboardScreen from '../screens/DashboardScreen';
import CalendarScreen from '../screens/CalendarScreen';
import StatsScreen from '../screens/StatsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import AboutScreen from '../screens/AboutScreen';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../hooks/useTheme';
import { palette } from '../theme/colors';

const Tab = createBottomTabNavigator();
export default function TabsNavigator() {
  const { theme } = useTheme();
  const active = palette.blue[600];
  return (
    <Tab.Navigator screenOptions={{ headerShown: false, tabBarActiveTintColor: active, tabBarStyle: { backgroundColor: '#ffffffaa', backdropFilter: 'blur(20px)' } }}>
      <Tab.Screen name="Home" component={DashboardScreen} options={{ tabBarIcon: ({ size, color }) => <Feather name="home" size={size} color={color} /> }} />
      <Tab.Screen name="Calendar" component={CalendarScreen} options={{ tabBarIcon: ({ size, color }) => <Feather name="calendar" size={size} color={color} /> }} />
      <Tab.Screen name="Stats" component={StatsScreen} options={{ tabBarIcon: ({ size, color }) => <Feather name="bar-chart" size={size} color={color} /> }} />
      <Tab.Screen name="Settings" component={SettingsScreen} options={{ tabBarIcon: ({ size, color }) => <Feather name="settings" size={size} color={color} /> }} />
      <Tab.Screen name="About" component={AboutScreen} options={{ tabBarIcon: ({ size, color }) => <MaterialIcons name="info-outline" size={size} color={color} /> }} />
    </Tab.Navigator>
  );
}
