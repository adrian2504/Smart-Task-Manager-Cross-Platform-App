import React, { useState } from 'react';
import { View, Pressable, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import DraggableFlatList, { RenderItemParams } from 'react-native-draggable-flatlist';
import useTasks from '@/hooks/useTasks';
import TaskCard from '@/components/TaskCard';
import AddTaskModal from '@/components/AddTaskModal';
import { Task } from '@/types';

export default function HomeScreen() {
  const { tasks, dispatch } = useTasks();
  const [modal, setModal] = useState(false);

  const renderItem = ({ item, drag, isActive }: RenderItemParams<Task>) => (
    <TaskCard
      task={item}
      onToggle={() => dispatch({ type: 'TOGGLE', id: item.id })}
      onDelete={() => dispatch({ type: 'DELETE', id: item.id })}
      onLongPress={drag}
    />
  );

  return (
    <View className="flex-1 p-4 bg-glass-light dark:bg-glass-dark">
      <DraggableFlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        onDragEnd={({ data }) => dispatch({ type: 'REORDER', payload: data })}
        renderItem={renderItem}
      />
      <Pressable
        className="absolute bottom-6 right-6 bg-blue-500 p-4 rounded-full shadow-lg"
        onPress={() => setModal(true)}
      >
        <Feather name="plus" size={24} color="#ffffff" />
      </Pressable>
      <AddTaskModal
        visible={modal}
        onClose={() => setModal(false)}
        onAdd={(title, due) =>
          dispatch({
            type: 'ADD',
            payload: { id: Date.now().toString(), title, due: due?.toISOString(), done: false }
          })
        }
      />
    </View>
  );
}