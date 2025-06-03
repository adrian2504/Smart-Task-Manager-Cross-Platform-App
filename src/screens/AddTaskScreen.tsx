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
import { Picker } from '@react-native-picker/picker';
import { Feather } from '@expo/vector-icons';  // using Feather arrow icon

import { palette } from '../theme/colors';
import { useTasks } from '../hooks/TasksContext';

export default function AddTaskScreen() {
  const navigation = useNavigation();
  const { dispatch } = useTasks();

  const [title, setTitle] = useState('');
  const [overview, setOverview] = useState('');
  const [due, setDue] = useState<Date | undefined>();
  const [showPicker, setShowPicker] = useState(false);
  const [category, setCategory] = useState<string>('');

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
        category,
      },
    });
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* ← Custom “back arrow” at top-left */}
      <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
        <Feather name="arrow-left" size={24} color={palette.blue[500]} />
      </Pressable>

      <Text style={styles.h1}>Add Task</Text>

      {/* Task Name */}
      <Text style={styles.label}>Task Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Task Name"
        value={title}
        onChangeText={setTitle}
      />

      {/* Date of Due */}
      <Text style={styles.label}>Date of Due</Text>
      {Platform.OS === 'web' ? (
        <input
          type="date"
          style={styles.webInput as any}
          onChange={(e) => {
            const val = e.currentTarget.value;
            if (val) setDue(new Date(val));
          }}
        />
      ) : (
        <>
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
              onChange={(_, selectedDate) => {
                setShowPicker(false);
                if (selectedDate) setDue(selectedDate);
              }}
            />
          )}
        </>
      )}

      {/* Category dropdown */}
      <Text style={styles.label}>Category</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={category}
          onValueChange={(val) => setCategory(val)}
          style={styles.picker}
        >
          <Picker.Item label="— None —" value="" />
          <Picker.Item label="Work" value="Work" />
          <Picker.Item label="Personal" value="Personal" />
          <Picker.Item label="Shopping" value="Shopping" />
          <Picker.Item label="Other" value="Other" />
        </Picker>
      </View>

      {/* Overview */}
      <Text style={styles.label}>Overview</Text>
      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Overview"
        multiline
        value={overview}
        onChangeText={setOverview}
      />

      {/* Save */}
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
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    zIndex: 10,
  },
  h1: {
    marginTop: 48,  // leave space for the back arrow
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
  webInput: {
    backgroundColor: palette.blue[50],
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    border: 'none',
    width: '100%',
  },
  pickerWrapper: {
    backgroundColor: palette.blue[50],
    borderRadius: 8,
    marginBottom: 20,
  },
  picker: {
    height: 48,
    width: '100%',
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
