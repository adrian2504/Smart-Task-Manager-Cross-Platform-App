// src/screens/StatsScreen.tsx

import React from 'react';
import { View, Text, StyleSheet, ScrollView, Platform, Dimensions } from 'react-native';
import { palette } from '../theme/colors';
import { useTasks } from '../hooks/TasksContext';

// Victory imports for web/native
const {
  VictoryPie,
  VictoryChart,
  VictoryBar,
  VictoryAxis,
  VictoryLegend,
} = Platform.OS === 'web'
  ? require('victory')
  : require('victory-native');

const { width } = Dimensions.get('window');

export default function StatsScreen() {
  const { tasks } = useTasks();

  // Compute basic counts
  const totalTasks = tasks.length;
  const doneTasks = tasks.filter((t) => t.done).length;
  const pendingTasks = totalTasks - doneTasks;

  // Compute category breakdown
  const categoryCounts: Record<string, number> = {};
  tasks.forEach((t) => {
    const cat = t.category?.trim() || 'Uncategorized';
    if (!categoryCounts[cat]) categoryCounts[cat] = 0;
    categoryCounts[cat]++;
  });

  const pieData = [
    { x: 'Done', y: doneTasks },
    { x: 'Pending', y: pendingTasks },
  ];

  const barData = Object.entries(categoryCounts).map(([category, count]) => ({
    category,
    count,
  }));

  // Determine an insight message
  let insightText = '';
  if (totalTasks === 0) {
    insightText = 'You have no tasks yet. Add one to get started!';
  } else if (pendingTasks === 0) {
    insightText = "Great job—you're all caught up!";
  } else if (doneTasks === 0) {
    insightText = "Looks like you're just getting started. Let's complete your first task!";
  } else {
    const percentDone = Math.round((doneTasks / totalTasks) * 100);
    insightText = `You've completed ${percentDone}% of your tasks so far. Keep it up!`;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* ===== Summary Text ===== */}
      <View style={styles.summaryBox}>
        <Text style={styles.summaryTitle}>Task Overview</Text>
        <Text style={styles.summaryText}>Total: {totalTasks}</Text>
        <Text style={styles.summaryText}>Done: {doneTasks}</Text>
        <Text style={styles.summaryText}>Pending: {pendingTasks}</Text>
        <Text style={styles.insight}>{insightText}</Text>
      </View>

      {/* ===== Pie Chart: Done vs Pending ===== */}
      {totalTasks > 0 && (
        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Completion Breakdown</Text>
          <VictoryPie
            data={pieData}
            innerRadius={50}
            width={width * 0.9}
            height={width * 0.9}
            labels={({ datum }) => `${datum.x}\n${datum.y}`}
            colorScale={[palette.blue[500], palette.blue[200]]}
            style={{
              labels: { fill: palette.gray[700], fontSize: 14, fontWeight: '600' },
            }}
          />
        </View>
      )}

      {/* ===== Bar Chart: Tasks by Category ===== */}
      {barData.length > 0 && (
        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Tasks by Category</Text>
          <VictoryChart
            domainPadding={{ x: 30, y: 20 }}
            width={width * 0.95}
            height={300}
          >
            <VictoryAxis
              style={{
                axis: { stroke: palette.gray[400] },
                tickLabels: { angle: -45, fontSize: 12, fill: palette.gray[600] },
                grid: { stroke: 'transparent' },
              }}
            />
            <VictoryAxis
              dependentAxis
              style={{
                axis: { stroke: palette.gray[400] },
                tickLabels: { fontSize: 12, fill: palette.gray[600] },
                grid: { stroke: palette.gray[200], strokeDasharray: '4,8' },
              }}
            />
            <VictoryBar
              data={barData}
              x="category"
              y="count"
              style={{
                data: {
                  fill: ({ datum }) => {
                    // Give distinct colors per category
                    const colors = [palette.blue[500], palette.blue[300], palette.blue[100], palette.gray[300]];
                    // cycle through colors if more categories
                    const idx = Object.keys(categoryCounts).indexOf(datum.category) % colors.length;
                    return colors[idx];
                  },
                },
              }}
              barRatio={0.7}
              labels={({ datum }) => datum.count}
              labelComponent={
                <Text style={{ fontSize: 10, fill: palette.gray[800] }} />
              }
            />
          </VictoryChart>
        </View>
      )}

      {/* ===== Legend for Bar Chart ===== */}
      {barData.length > 0 && (
        <View style={styles.legendContainer}>
          <VictoryLegend
            orientation="horizontal"
            gutter={20}
            data={Object.keys(categoryCounts).map((cat, i) => {
              const colors = [palette.blue[500], palette.blue[300], palette.blue[100], palette.gray[300]];
              return {
                name: cat,
                symbol: { fill: colors[i % colors.length], type: 'square' },
              };
            })}
            style={{
              labels: { fontSize: 12, fill: palette.gray[700] },
            }}
          />
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 40,
    backgroundColor: palette.white,
  },
  summaryBox: {
    backgroundColor: palette.blue[50],
    margin: 16,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  summaryTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: palette.gray[800],
    marginBottom: 8,
  },
  summaryText: {
    fontSize: 16,
    color: palette.gray[700],
    marginTop: 4,
  },
  insight: {
    marginTop: 12,
    fontSize: 14,
    color: palette.gray[600],
    fontStyle: 'italic',
  },
  chartContainer: {
    alignItems: 'center',
    marginTop: 24,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: palette.gray[800],
    marginBottom: 12,
  },
  legendContainer: {
    marginTop: 8,
    alignItems: 'center',
  },
});
