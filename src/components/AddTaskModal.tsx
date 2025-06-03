import React, { useState } from 'react';
import { Modal, View, TextInput, Pressable, Text } from 'react-native';
import GlassContainer from './GlassContainer';
import { v4 as uuid } from 'uuid';
import DateTimePicker from '@react-native-community/datetimepicker';

interface Props {
  visible: boolean;
  onClose: () => void;
  onAdd: (title: string, due?: Date) => void;
}

export default function AddTaskModal({ visible, onClose, onAdd }: Props) {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState<Date | undefined>();

  const submit = () => {
    if (!title.trim()) return;
    onAdd(title.trim(), date);
    setTitle('');
    setDate(undefined);
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View className="flex-1 items-center justify-center bg-black/20 px-4">
        <GlassContainer style="w-full max-w-md">
          <Text className="text-lg font-bold mb-2 text-center">Add New Task</Text>
          <TextInput
            autoFocus
            placeholder="Task title"
            value={title}
            onChangeText={setTitle}
            className="border border-gray-300 dark:border-gray-600 rounded-md px-2 py-1 mb-2 text-gray-800 dark:text-gray-100"
          />

          {date && <Text className="text-center mb-2">Due: {date.toLocaleString()}</Text>}
          <Pressable onPress={() => setDate(new Date())} className="mb-2">
            <Text className="text-blue-500 text-center">{date ? 'Change date' : 'Add due date'}</Text>
          </Pressable>

          {date && (
            <DateTimePicker
              value={date}
              mode="datetime"
              onChange={(e, selected) => setDate(selected || date)}
              style={{ width: '100%' }}
            />
          )}

          <View className="flex-row justify-end mt-4">
            <Pressable onPress={onClose} className="mr-3">
              <Text className="text-gray-500">Cancel</Text>
            </Pressable>
            <Pressable onPress={submit}>
              <Text className="text-blue-600 font-medium">Add</Text>
            </Pressable>
          </View>
        </GlassContainer>
      </View>
    </Modal>
  );
}