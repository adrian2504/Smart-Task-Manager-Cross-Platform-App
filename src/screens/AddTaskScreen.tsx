// src/screens/AddTaskScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Platform,
  ScrollView,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import { palette } from '../theme/colors';
import useTasks from '../hooks/useTasks';

export default function AddTaskScreen() {
  const navigation = useNavigation();
  const { dispatch } = useTasks();
  const [title, setTitle] = useState('');
  const [overview, setOverview] = useState('');
  const [due, setDue] = useState<Date | undefined>(undefined);
  const [showPicker, setShowPicker] = useState(false);

  const create = () => {
    if (!title.trim()) return;
    dispatch({
      type: 'ADD',
      payload: {
        id: Date.now().toString(),
        title: title.trim(),
        notes: overview,
        due: due?.toISOString(),
        done: false,
      },
    });
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.h1}>Add Task</Text>

      <Text style={styles.label}>Task Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Task Name"
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>Date of Due</Text>
      <Pressable style={styles.input} onPress={() => setShowPicker(true)}>
        <Text style={{ color: due ? '#000' : '#888' }}>
          {due ? due.toDateString() : 'Select due date'}
        </Text>
      </Pressable>

      {showPicker && (
        <DateTimePicker
          value={due || new Date()}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowPicker(false);
            if (selectedDate) setDue(selectedDate);
          }}
        />
      )}

      <Text style={styles.label}>Overview</Text>
      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Overview"
        multiline
        value={overview}
        onChangeText={setOverview}
      />

      <Pressable style={styles.button} onPress={create}>
        <Text style={styles.buttonText}>Create a task</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: palette.white,
  },
  h1: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    marginBottom: 6,
    color: palette.gray[500],
  },
  input: {
    backgroundColor: palette.blue[50],
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    backgroundColor: palette.blue[500],
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: palette.white,
    fontSize: 16,
    fontWeight: '600',
  },
});
