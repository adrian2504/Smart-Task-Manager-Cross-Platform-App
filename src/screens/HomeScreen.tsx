// src/screens/HomeScreen.tsx

import React, { useState } from 'react';
import {
  View,
  Pressable,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import DraggableFlatList, {
  RenderItemParams,
} from 'react-native-draggable-flatlist';
import useTasks from '../hooks/useTasks';
import TaskCard from '../components/TaskCard';
import AddTaskModal from '../components/AddTaskModal';
import { Task } from '../types';

export default function HomeScreen() {
  const { tasks, dispatch } = useTasks();
  const [modalVisible, setModalVisible] = useState(false);

  const renderItem = ({ item, drag }: RenderItemParams<Task>) => (
    <TaskCard
      task={item}
      onToggle={() => dispatch({ type: 'TOGGLE', id: item.id })}
      onDelete={() => dispatch({ type: 'DELETE', id: item.id })}
      onLongPress={drag}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      {tasks.length === 0 ? (
        <View style={styles.emptyMessageContainer}>
          <Text style={styles.emptyMessageText}>
            No tasks yet. Tap ＋ to add one.
          </Text>
        </View>
      ) : (
        <DraggableFlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          onDragEnd={({ data }) => dispatch({ type: 'REORDER', payload: data })}
          renderItem={renderItem}
        />
      )}

      <Pressable
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Feather name="plus" size={24} color="#ffffff" />
      </Pressable>

      <AddTaskModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAdd={(title) =>
          dispatch({
            type: 'ADD',
            payload: {
              id: Date.now().toString(),
              title,
              due: undefined, // no due date for now
              done: false,
            },
          })
        }
      />
    </SafeAreaView>
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
  addButton: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    backgroundColor: '#3B82F6',
    padding: 16,
    borderRadius: 32,
    // shadows:
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
});
