// src/screens/CalendarScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
} from 'react-native';
import { Calendar } from 'react-native-calendars';

import { palette } from '../theme/colors';
import { useTasks } from '../hooks/TasksContext';
import TaskCard from '../components/TaskCard';

export default function CalendarScreen() {
  const { tasks, dispatch } = useTasks();

  // Track selected date (YYYY-MM-DD). Default to today.
  const todayString = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState<string>(todayString);

  // Mark all task due dates with a dot.
  const markedDates: Record<string, any> = {};
  tasks.forEach((task) => {
    if (!task.due) return;
    const dateKey = task.due.split('T')[0];
    markedDates[dateKey] = { marked: true, dotColor: palette.blue[500] };
  });

  // Mark selected date specially
  markedDates[selectedDate] = {
    ...(markedDates[selectedDate] || {}),
    selected: true,
    selectedColor: palette.blue[500],
  };

  // Filter tasks strictly matching selected YYYY-MM-DD
  const filteredTasks = tasks.filter(
    (task) => task.due?.startsWith(selectedDate)
  );

  return (
    <View style={styles.container}>
      {/* Calendar Component */}
      <Calendar
        onDayPress={(day) => setSelectedDate(day.dateString)}
        markedDates={markedDates}
        theme={{
          selectedDayBackgroundColor: palette.blue[500],
          todayTextColor: palette.blue[600],
          arrowColor: palette.blue[600],
          dotColor: palette.blue[500],
        }}
        firstDay={1}
        style={styles.calendar}
      />

      {/* Task List for Selected Date */}
      <View style={styles.listContainer}>
        {filteredTasks.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              No tasks for {selectedDate}
            </Text>
          </View>
        ) : (
          <FlatList
            data={filteredTasks}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TaskCard
                task={item}
                onToggle={() => dispatch({ type: 'TOGGLE', id: item.id })}
                onDelete={() => dispatch({ type: 'DELETE', id: item.id })}
              />
            )}
            contentContainerStyle={{ paddingBottom: 32 }}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: palette.white },

  calendar: {
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    elevation: 2,
    backgroundColor: palette.white,
  },

  listContainer: {
    flex: 1,
    marginTop: 12,
    paddingHorizontal: 16,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    color: palette.gray[500],
  },
});
