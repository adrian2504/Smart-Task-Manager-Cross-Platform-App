// src/components/TaskCard.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Modal,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { palette } from '../theme/colors';

export type Task = {
  id: string;
  title: string;
  done: boolean;
  due?: string;         // "YYYY-MM-DD"
  category?: string;
  comment?: string;
  image?: string;       // dataURL
};

type TaskCardProps = {
  task: Task;
  onToggle(): void;
  onDelete(): void;
};

export default function TaskCard({ task, onToggle, onDelete }: TaskCardProps) {
  const [modalVisible, setModalVisible] = useState(false);

  // Format due date into "Thu Jun 19 2025"
  const dueDateText = task.due
    ? new Date(task.due + 'T00:00:00').toDateString()
    : null;

  return (
    <>
      <Pressable style={styles.cardWrapper} onPress={() => setModalVisible(true)}>
        <View style={styles.leftRow}>
          <Pressable onPress={onToggle} style={styles.checkbox}>
            {task.done ? (
              <Feather name="check-square" size={20} color={palette.green[600]} />
            ) : (
              <Feather name="square" size={20} color={palette.gray[400]} />
            )}
          </Pressable>
          <Text
            style={[
              styles.title,
              { textDecorationLine: task.done ? 'line-through' : 'none' },
            ]}
            numberOfLines={1}
          >
            {task.title}
          </Text>
        </View>
        <Pressable onPress={onDelete}>
          <Feather name="trash-2" size={20} color={palette.red[500]} />
        </Pressable>
      </Pressable>

      {/* Modal for showing full comment + image */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>

        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>{task.title}</Text>
          {dueDateText && (
            <Text style={styles.modalDate}>{dueDateText}</Text>
          )}
          {task.category && (
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{task.category}</Text>
            </View>
          )}
          {task.image && (
            <Image
              source={{ uri: task.image }}
              style={styles.modalImage}
              resizeMode="cover"
            />
          )}
          {task.comment ? (
            <Text style={styles.modalComment}>{task.comment}</Text>
          ) : (
            <Text style={[styles.modalComment, { fontStyle: 'italic', color: palette.gray[500] }]}>
              (No additional details)
            </Text>
          )}
          <Pressable
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </Pressable>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  cardWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: palette.white,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 12,
    // subtle shadow (iOS + Android/web)
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  leftRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  checkbox: {
    marginRight: 12,
  },
  title: {
    fontSize: 16,
    color: palette.gray[800],
    flexShrink: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  modalContainer: {
    position: 'absolute',
    top: '25%',
    left: '10%',
    right: '10%',
    backgroundColor: palette.white,
    borderRadius: 16,
    padding: 24,
    maxHeight: '60%',
    // stronger shadow for modal
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: palette.gray[900],
    marginBottom: 8,
  },
  modalDate: {
    fontSize: 14,
    color: palette.gray[600],
    marginBottom: 6,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: palette.blue[100],
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 12,
  },
  categoryText: {
    fontSize: 13,
    color: palette.blue[600],
    fontWeight: '500',
  },
  modalImage: {
    width: '100%',
    height: 150,
    borderRadius: 12,
    marginBottom: 12,
  },
  modalComment: {
    fontSize: 14,
    color: palette.gray[700],
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: palette.red[500],
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 'auto',
  },
  closeButtonText: {
    color: palette.white,
    fontSize: 14,
    fontWeight: '600',
  },
});
