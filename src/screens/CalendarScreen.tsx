// src/screens/CalendarScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Agenda } from 'react-native-calendars';
import { palette } from '../theme/colors';
import useTasks from '../hooks/useTasks';
import TaskCard from '../components/TaskCard';

export default function CalendarScreen() {
  const { tasks, dispatch } = useTasks();

  // Build items for Agenda
  const items: Record<string, any[]> = {};
  tasks.forEach((task) => {
    if (!task.due) return;
    const dateKey = task.due.split('T')[0]; // "YYYY-MM-DD"
    if (!items[dateKey]) items[dateKey] = [];
    items[dateKey].push({ ...task, name: task.title });
  });

  const noItems = Object.keys(items).length === 0;

  return (
    <View style={styles.container}>
      {noItems ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No due-dated tasks yet.</Text>
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
          renderEmptyDate={() => (
            <View style={styles.emptyDate}>
              <Text style={styles.emptyDateText}>No tasks</Text>
            </View>
          )}
          theme={{
            selectedDayBackgroundColor: palette.blue[500],
            todayTextColor: palette.blue[600],
          }}
          style={{}}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: palette.white },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: palette.gray[500],
  },
  emptyDate: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    marginVertical: 4,
    marginHorizontal: 16,
    borderRadius: 8,
  },
  emptyDateText: {
    textAlign: 'center',
    color: palette.gray[500],
  },
});
