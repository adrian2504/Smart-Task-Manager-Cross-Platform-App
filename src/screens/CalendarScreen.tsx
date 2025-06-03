import React from 'react';
import { View } from 'react-native';
import { Agenda } from 'react-native-calendars';
import useTasks from '@/hooks/useTasks';
import TaskCard from '@/components/TaskCard';

export default function CalendarScreen() {
  const { tasks, dispatch } = useTasks();

  const items = tasks.reduce<Record<string, any[]>>((acc, task) => {
    if (!task.due) return acc;
    const dateKey = task.due.split('T')[0];
    acc[dateKey] = acc[dateKey] || [];
    acc[dateKey].push({ ...task, name: task.title });
    return acc;
  }, {});

  return (
    <View className="flex-1 bg-glass-light dark:bg-glass-dark">
      <Agenda
        items={items}
        selected={new Date().toISOString().split('T')[0]}
        renderItem={(task) => (
          <TaskCard
            task={task}
            onToggle={() => dispatch({ type: 'TOGGLE', id: task.id })}
            onDelete={() => dispatch({ type: 'DELETE', id: task.id })}
          />
        )}
      />
    </View>
  );
}