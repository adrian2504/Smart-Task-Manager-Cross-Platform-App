import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { palette } from '../theme/colors';
import Checkbox from './Checkbox';        // assume you have one

export type Task = import('../hooks/TasksContext').Task;

interface Props {
  task: Task;
  onToggle(): void;
  onDelete(): void;
}

export default function TaskCard({ task, onToggle, onDelete }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Pressable style={styles.card} onPress={() => setOpen(!open)}>
      <View style={styles.row}>
        <Checkbox checked={task.done} onPress={onToggle} />
        <Text style={[styles.title, task.done && { textDecorationLine: 'line-through' }]}>
          {task.title}
        </Text>
        <Pressable onPress={onDelete} style={{ marginLeft: 'auto' }}>
          <Feather name="trash-2" size={18} color="#ef4444" />
        </Pressable>
      </View>

      {open && (
        <View style={styles.expanded}>
          {task.imageUri ? (
            <Image source={{ uri: task.imageUri }} style={styles.cardImage} />
          ) : null}

          {task.comment ? <Text style={styles.comment}>{task.comment}</Text> : null}

          {task.due ? (
            <Text style={styles.due}>
              Due&nbsp;
              {new Date(task.due + 'T12:00:00').toLocaleDateString()}
            </Text>
          ) : null}

          <Text style={[styles.statusPill, styles[task.status ?? 'not_started']]}>
            {task.status?.replace('_', ' ') ?? 'not started'}
          </Text>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: palette.white,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  row: { flexDirection: 'row', alignItems: 'center' },
  title: { fontSize: 16, marginLeft: 8, flexShrink: 1 },
  expanded: { marginTop: 10 },
  comment: { fontSize: 14, color: palette.gray[700], marginBottom: 6 },
  due: { fontSize: 12, color: palette.gray[500], marginBottom: 6 },
  cardImage: { width: '100%', height: 140, borderRadius: 8, marginBottom: 8 },

  statusPill: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    fontSize: 12,
    color: palette.white,
    textTransform: 'capitalize',
  },
  not_started: { backgroundColor: palette.gray[400] },
  in_progress: { backgroundColor: palette.amber[500] },
  done:        { backgroundColor: palette.green[500] },
});
