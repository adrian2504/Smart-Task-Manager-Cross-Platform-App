import React from 'react';
import { View, Text } from 'react-native';
import { VictoryPie } from 'victory-native';
import useTasks from '../hooks/useTasks';

export default function StatsScreen() {
  const { tasks } = useTasks();
  const done = tasks.filter((t) => t.done).length;
  const pending = tasks.length - done;

  return (
    <View className="flex-1 items-center justify-center bg-glass-light dark:bg-glass-dark p-4">
      {tasks.length === 0 ? (
        <Text className="text-gray-500">No tasks yet</Text>
      ) : (
        <VictoryPie
          data={[
            { x: 'Done', y: done },
            { x: 'Pending', y: pending }
          ]}
          innerRadius={60}
          width={280}
          height={280}
          labels={({ datum }) => `${datum.x}\n${datum.y}`}
        />
      )}
    </View>
  );
}