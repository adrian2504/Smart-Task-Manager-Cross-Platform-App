import React from 'react';
import { Pressable, Text } from 'react-native';
import GlassContainer from './GlassContainer';
import { Feather } from '@expo/vector-icons';
import { Task } from '@/types';

interface Props {
  task: Task;
  onToggle: () => void;
  onDelete: () => void;
}

export default function TaskCard({ task, onToggle, onDelete }: Props) {
  return (
    <GlassContainer style="mb-2 flex-row items-center justify-between">
      <Pressable className="flex-row items-center flex-1" onPress={onToggle}>
        <Feather name={task.done ? 'check-square' : 'square'} size={20} color={task.done ? '#38bdf8' : '#7dd3fc'} />
        <Text className={`ml-2 ${task.done ? 'line-through text-gray-400' : 'text-gray-800 dark:text-gray-100'}`}>{task.title}</Text>
      </Pressable>
      <Pressable onPress={onDelete} className="pl-4 pr-1 py-1">
        <Feather name="trash-2" size={18} color="#ef4444" />
      </Pressable>
    </GlassContainer>
  );
}