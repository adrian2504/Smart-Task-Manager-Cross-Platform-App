// src/screens/StatsScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { VictoryPie } from 'victory-native';
import { palette } from '../theme/colors';
import useTasks from '../hooks/useTasks';

export default function StatsScreen() {
  const { tasks } = useTasks();
  const doneCount = tasks.filter((t) => t.done).length;
  const pendingCount = tasks.length - doneCount;

  if (tasks.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No tasks yet</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <VictoryPie
        data={[
          { x: 'Done', y: doneCount },
          { x: 'Pending', y: pendingCount },
        ]}
        innerRadius={60}
        width={280}
        height={280}
        colorScale={[palette.blue[500], palette.blue[200]]}
        labels={({ datum }) => `${datum.x}\n${datum.y}`}
        style={{ labels: { fontSize: 14, fill: palette.gray[500] } }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: palette.white,
    padding: 16,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: palette.white,
  },
  emptyText: {
    fontSize: 16,
    color: palette.gray[500],
  },
});
