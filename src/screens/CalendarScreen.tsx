// src/screens/CalendarScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image, // in case you want to show an icon—no tintColor usage
} from 'react-native';
import { Calendar, DateObjectType } from 'react-native-calendars';
import { palette } from '../theme/colors';
import { useTasks } from '../hooks/TasksContext';
import TaskCard from '../components/TaskCard';

export default function CalendarScreen() {
  const { tasks, dispatch } = useTasks();

  // 1) Track selected date (YYYY-MM-DD). Default: today.
  const todayKey = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState<string>(todayKey);

  // 2) Build “markedDates”: every date with ≥1 task gets a dot
  const markedDates: Record<string, any> = {};
  tasks.forEach((task) => {
    if (!task.due) return;
    const key = task.due.split('T')[0];
    markedDates[key] = { marked: true, dotColor: palette.blue[500] };
  });
  // Highlight the selected date as well
  markedDates[selectedDate] = {
    ...(markedDates[selectedDate] || { marked: false }),
    selected: true,
    selectedColor: palette.blue[500],
  };

  // 3) Filter tasks for the selected date
  const tasksForDay = tasks.filter((task) => {
    return task.due?.split('T')[0] === selectedDate;
  });

  return (
    <View style={styles.container}>
      {/* ===== Calendar header ===== */}
      <Calendar
        onDayPress={(day: DateObjectType) => {
          setSelectedDate(day.dateString);
        }}
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

      {/* ===== Task list for that day ===== */}
      <View style={styles.listContainer}>
        {tasksForDay.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No tasks for {selectedDate}</Text>
          </View>
        ) : (
          <FlatList
            data={tasksForDay}
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
  },
  emptyText: {
    fontSize: 16,
    color: palette.gray[500],
  },
});
