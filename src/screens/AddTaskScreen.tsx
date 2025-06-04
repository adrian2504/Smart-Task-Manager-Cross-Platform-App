// src/screens/AddTaskScreen.tsx
import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Platform,
  ScrollView,
  Image,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import { Feather } from '@expo/vector-icons';

import { palette } from '../theme/colors';
import { useTasks } from '../hooks/TasksContext';

export default function AddTaskScreen() {
  const navigation = useNavigation<any>();
  const { dispatch } = useTasks();

  const [title, setTitle]       = useState('');
  const [overview, setOverview] = useState('');
  const [due, setDue]           = useState<Date>();
  const [showPicker, setShowPicker] = useState(false);
  const [category, setCategory] = useState<string>('');
  const [imageUri, setImageUri] = useState<string | null>(null);

  // For web: hold a ref to the hidden file input:
  const fileInputRef = useRef<HTMLInputElement>(null);

  const create = () => {
    if (!title.trim()) return;

    // Convert `due` Date ➞ "YYYY-MM-DD" string
    const dueString = due ? due.toISOString().split('T')[0] : undefined;

    dispatch({
      type: 'ADD',
      payload: {
        id: Date.now().toString(),
        title: title.trim(),
        comment: overview.trim(),
        due: dueString,
        done: false,
        category: category || undefined,
        image: imageUri || undefined, // store dataURL or undefined
      },
    });
    navigation.goBack();
  };

  // Web-only file‐input change handler:
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setImageUri(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* ← Custom “back arrow” at top-left */}
      <Pressable
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Feather name="arrow-left" size={24} color={palette.blue[600]} />
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
          ref={fileInputRef}
          type="date"
          style={styles.webInput as any}
          onChange={(e) => {
            const val = e.currentTarget.value; // "YYYY-MM-DD"
            if (val) setDue(new Date(val + 'T00:00:00'));
          }}
        />
      ) : (
        <>
          <Pressable
            style={styles.input}
            onPress={() => setShowPicker(true)}
          >
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
          <Picker.Item label="Work"     value="Work" />
          <Picker.Item label="Personal" value="Personal" />
          <Picker.Item label="Shopping" value="Shopping" />
          <Picker.Item label="Other"    value="Other" />
        </Picker>
      </View>

      {/* Overview / Comment */}
      <Text style={styles.label}>Overview</Text>
      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Overview"
        multiline
        value={overview}
        onChangeText={setOverview}
      />

      {/* Image Upload */}
      <Text style={styles.label}>Upload Image</Text>
      {Platform.OS === 'web' ? (
        <>
          <Pressable
            style={styles.uploadButton}
            onPress={() => fileInputRef.current?.click()}
          >
            <Text style={styles.uploadButtonText}>
              {imageUri ? 'Change Image' : 'Choose Image'}
            </Text>
          </Pressable>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
          {imageUri && (
            <Image
              source={{ uri: imageUri }}
              style={styles.previewImage}
              resizeMode="cover"
            />
          )}
        </>
      ) : (
        <Text style={styles.nativeNotice}>
          (Image upload only supported on Web demo)
        </Text>
      )}

      {/* Save Button */}
      <Pressable style={styles.button} onPress={create}>
        <Text style={styles.buttonText}>Create a task</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: palette.gray[50],
    flexGrow: 1,
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    zIndex: 10,
  },
  h1: {
    marginTop: 48,
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 24,
    color: palette.blue[700],
  },
  label: {
    fontSize: 14,
    marginBottom: 6,
    color: palette.gray[600],
    fontWeight: '500',
  },
  input: {
    backgroundColor: palette.white,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: palette.gray[200],
  },
  webInput: {
    backgroundColor: palette.white,
    borderRadius: 12,
    padding: 12,
    marginBottom: 20,
    border: `1px solid ${palette.gray[200]}`,
    width: '100%',
    fontSize: 16,
  },
  pickerWrapper: {
    backgroundColor: palette.white,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: palette.gray[200],
  },
  picker: {
    height: 48,
    width: '100%',
  },
  uploadButton: {
    backgroundColor: palette.blue[500],
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  uploadButtonText: {
    color: palette.white,
    fontSize: 14,
    fontWeight: '600',
  },
  previewImage: {
    width: '100%',
    height: 150,
    borderRadius: 12,
    marginBottom: 20,
  },
  nativeNotice: {
    fontSize: 13,
    fontStyle: 'italic',
    color: palette.gray[500],
    marginBottom: 20,
  },
  button: {
    backgroundColor: palette.green[500],
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: palette.white,
    fontSize: 16,
    fontWeight: '600',
  },
});
