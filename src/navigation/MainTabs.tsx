// src/navigation/MainTabs.tsx

import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Feather } from "@expo/vector-icons";
import { palette } from "../theme/colors";

import DashboardScreen from "../screens/DashboardScreen";
import CalendarScreen  from "../screens/CalendarScreen";
import StatsScreen     from "../screens/StatsScreen";
import ProfileScreen   from "../screens/ProfileScreen";
import AddTaskScreen   from "../screens/AddTaskScreen";

// ─── 1) Define the bottom‐tabs param list ──────────────────────────────────────
export type MainTabParamList = {
  Dashboard: undefined;
  Calendar:  undefined;
  Stats:     undefined;
  Profile:   undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: palette.blue[600],
        tabBarInactiveTintColor: palette.gray[500],
        tabBarStyle: {
          backgroundColor: palette.white,
          borderTopColor: palette.gray[200],
          height: 60,
        },
        tabBarIcon: ({ color, size }) => {
          switch (route.name) {
            case "Dashboard":
              return <Feather name="home" size={size} color={color} />;
            case "Calendar":
              return <Feather name="calendar" size={size} color={color} />;
            case "Stats":
              return <Feather name="bar-chart" size={size} color={color} />;
            case "Profile":
              return <Feather name="user" size={size} color={color} />;
            default:
              return null;
          }
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Calendar"  component={CalendarScreen}  />
      <Tab.Screen name="Stats"     component={StatsScreen}     />
      <Tab.Screen name="Profile"   component={ProfileScreen}   />
    </Tab.Navigator>
  );
}

// ─── 2) Define the stack that wraps the tabs + AddTask ─────────────────────────
export type MainStackParamList = {
  Tabs:    undefined; // shows the bottom tabs
  AddTask: undefined; // navigated from Dashboard
};

const Stack = createNativeStackNavigator<MainStackParamList>();

export default function MainTabs() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* 1) Render the tabs first */}
      <Stack.Screen name="Tabs" component={TabNavigator} />

      {/* 2) AddTask is a sibling to the tab navigator */}
      <Stack.Screen name="AddTask" component={AddTaskScreen} />
    </Stack.Navigator>
  );
}
