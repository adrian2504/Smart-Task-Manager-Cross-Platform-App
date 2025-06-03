// src/screens/CalendarScreen.tsx

import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Agenda } from 'react-native-calendars';
import useTasks from '../hooks/useTasks';
import TaskCard from '../components/TaskCard';

export default function CalendarScreen() {
  const { tasks, dispatch } = useTasks();

  // Build the items map for Agenda: only include tasks that have a valid due date
  const items: Record<string, any[]> = {};
  tasks.forEach((task) => {
    if (!task.due) return;
    const dateKey = task.due.split('T')[0]; // "YYYY-MM-DD"
    if (!items[dateKey]) items[dateKey] = [];
    items[dateKey].push({ ...task, name: task.title });
  });

  // If there are no items at all, show a placeholder message
  const noItems = Object.keys(items).length === 0;

  return (
    <View style={styles.container}>
      {noItems ? (
        <View style={styles.emptyMessageContainer}>
          <Text style={styles.emptyMessageText}>
            No due‐dated tasks yet.
          </Text>
        </View>
      ) : (
        <Agenda
          items={items}
          selected={new Date().toISOString().split('T')[0]}
          renderItem={(task: any) => (
            <TaskCard
              task={task}
              onToggle={() => dispatch({ type: 'TOGGLE', id: task.id })}
              onDelete={() => dispatch({ type: 'DELETE', id: task.id })}
            />
          )}
          // optional: show placeholder for empty dates in agenda
          renderEmptyDate={() => (
            <View style={styles.emptyDateContainer}>
              <Text style={styles.emptyDateText}>No tasks</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#e8f5ff' },
  emptyMessageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyMessageText: {
    fontSize: 16,
    color: '#666',
  },
  emptyDateContainer: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    marginVertical: 4,
    marginHorizontal: 16,
    borderRadius: 8,
  },
  emptyDateText: {
    textAlign: 'center',
    color: '#999',
  },
});
