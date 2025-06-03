// src/components/TaskCard.tsx

import React from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Platform,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Task } from '../types';

interface Props {
  task: Task;
  onToggle: () => void;
  onDelete: () => void;
  onLongPress?: () => void;
}

export default function TaskCard({
  task,
  onToggle,
  onDelete,
  onLongPress,
}: Props) {
  return (
    <View style={styles.cardContainer}>
      <Pressable
        style={styles.leftRow}
        onPress={onToggle}
        onLongPress={onLongPress}
      >
        <Feather
          name={task.done ? 'check-square' : 'square'}
          size={20}
          color={task.done ? '#38bdf8' : '#7dd3fc'}
        />
        <Text
          style={[
            styles.taskText,
            task.done && { textDecorationLine: 'line-through', color: '#999' },
          ]}
        >
          {task.title}
        </Text>
      </Pressable>
      <Pressable onPress={onDelete} style={styles.deleteButton}>
        <Feather name="trash-2" size={18} color="#ef4444" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff80',
    borderRadius: 12,
    padding: 12,
    marginHorizontal: 16,
    marginVertical: 6,
    // shadows:
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
  },
  leftRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  taskText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#333',
  },
  deleteButton: {
    padding: 6,
    marginLeft: 12,
  },
});
