import React, { useState } from 'react';
import {
  View, Text, TextInput, Pressable, StyleSheet,
  Platform, ScrollView, Image
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import { Feather } from '@expo/vector-icons';

import { palette } from '../theme/colors';
import { useTasks } from '../hooks/TasksContext';

export default function AddTaskScreen() {
  const navigation = useNavigation<any>();
  const { dispatch } = useTasks();

  const [title,   setTitle]   = useState('');
  const [overview,setOverview]= useState('');
  const [due,     setDue]     = useState<Date | undefined>();
  const [showPicker, setShowPicker] = useState(false);

  const [category,setCategory]= useState('');
  const [status,  setStatus]  = useState<'not_started'|'in_progress'|'done'>('not_started');
  const [imageUri,setImageUri]= useState<string>();

  const pickImageNative = async () => {
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.5,
    });
    if (!res.canceled) setImageUri(res.assets[0].uri);
  };

  const create = () => {
    if (!title.trim()) return;
    dispatch({
      type: 'ADD',
      payload: {
        id: Date.now().toString(),
        title: title.trim(),
        notes: overview,
        due:  due ? due.toISOString().split('T')[0] : undefined,
        done: false,
        category,
        comment: overview,
        imageUri,
        status,
      },
    });
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
        <Feather name="arrow-left" size={24} color={palette.blue[500]} />
      </Pressable>

      <Text style={styles.h1}>Add Task</Text>

      {/* Task name */}
      <Text style={styles.label}>Task Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Task Name"
        value={title}
        onChangeText={setTitle}
      />

      {/* Due date */}
      <Text style={styles.label}>Date of Due</Text>
      {Platform.OS === 'web' ? (
        <input
          type="date"
          style={styles.webInput as any}
          onChange={(e) => e.currentTarget.value && setDue(new Date(e.currentTarget.value))}
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
              onChange={(_, d) => { setShowPicker(false); d && setDue(d); }}
            />
          )}
        </>
      )}

      {/* Category */}
      <Text style={styles.label}>Category</Text>
      <View style={styles.pickerWrapper}>
        <Picker selectedValue={category} onValueChange={setCategory} style={styles.picker}>
          <Picker.Item label="— None —" value="" />
          <Picker.Item label="Work"      value="Work" />
          <Picker.Item label="Personal"  value="Personal" />
          <Picker.Item label="Shopping"  value="Shopping" />
          <Picker.Item label="Other"     value="Other" />
        </Picker>
      </View>

      {/* Status */}
      <Text style={styles.label}>Status</Text>
      <View style={styles.pickerWrapper}>
        <Picker selectedValue={status} onValueChange={setStatus} style={styles.picker}>
          <Picker.Item label="Not started" value="not_started" />
          <Picker.Item label="In progress" value="in_progress" />
          <Picker.Item label="Done"        value="done" />
        </Picker>
      </View>

      {/* Overview */}
      <Text style={styles.label}>Overview / Comment</Text>
      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Overview"
        multiline
        value={overview}
        onChangeText={setOverview}
      />

      {/* Image upload */}
      <Text style={styles.label}>Upload Image</Text>
      {Platform.OS === 'web' ? (
        <>
          <input
            type="file"
            accept="image/*"
            id="imagePicker"
            style={{ display: 'none' }}
            onChange={(e) => {
              const f = e.currentTarget.files?.[0];
              if (f) setImageUri(URL.createObjectURL(f));
            }}
          />
          <Pressable
            style={[styles.uploadArea, imageUri && { borderColor: palette.blue[500] }]}
            onPress={() => (document.getElementById('imagePicker') as HTMLInputElement).click()}
          >
            {imageUri ? (
              <Image source={{ uri: imageUri }} style={styles.previewImage} />
            ) : (
              <Text style={styles.uploadHint}>Click to select an image</Text>
            )}
          </Pressable>
        </>
      ) : (
        <Pressable style={styles.buttonOutline} onPress={pickImageNative}>
          <Text style={{ color: palette.blue[600] }}>
            {imageUri ? 'Change image' : 'Pick image'}
          </Text>
        </Pressable>
      )}

      {/* Save */}
      <Pressable style={styles.button} onPress={create}>
        <Text style={styles.buttonText}>Create a task</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 24, backgroundColor: palette.white },
  backButton: { position: 'absolute', top: 16, left: 16, zIndex: 10 },
  h1: { marginTop: 48, fontSize: 22, fontWeight: '700', marginBottom: 24 },
  label: { fontSize: 14, marginBottom: 6, color: palette.gray[600] },
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
  picker: { height: 48, width: '100%' },

  uploadArea: {
    borderWidth: 2,
    borderColor: palette.blue[200],
    borderStyle: 'dashed',
    borderRadius: 12,
    height: 180,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  uploadHint: { color: palette.gray[500] },
  previewImage: { width: '100%', height: '100%', borderRadius: 10 },

  buttonOutline: {
    borderWidth: 1,
    borderColor: palette.blue[600],
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: palette.blue[500],
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 4,
  },
  buttonText: { color: palette.white, fontSize: 16, fontWeight: '600' },
});
