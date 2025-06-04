import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AddTaskScreen from '../screens/AddTaskScreen';

const Stack = createStackNavigator();

export default function AddTaskStack() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, presentation: 'modal' }}
    >
      <Stack.Screen name="AddTask" component={AddTaskScreen} />
    </Stack.Navigator>
  );
}
