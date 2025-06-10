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
} = Platform.OS === 'web'
  ? require('victory')
  : require('victory-native');

const { width } = Dimensions.get('window');

export default function StatsScreen() {
  const { tasks } = useTasks();

  // ---- 1) Compute summary counts ----
  const totalTasks = tasks.length;
  const doneTasks = tasks.filter((t) => t.status === 'Done').length;
  const inProgressTasks = tasks.filter((t) => t.status === 'In Progress').length;
  const notStartedTasks = tasks.filter((t) => t.status === 'Not Started').length;
  const pendingTasks = totalTasks - doneTasks;

  // ---- 2) Build pie data (Done vs Pending) ----
  const pieData = [
    { x: 'Done', y: doneTasks },
    { x: 'Pending', y: pendingTasks },
  ];

  // ---- 3) Build histogram data (status breakdown) ----
  const statusCounts = [
    { status: 'Not Started', count: notStartedTasks },
    { status: 'In Progress', count: inProgressTasks },
    { status: 'Done', count: doneTasks },
  ];

  // ---- 4) Determine insight text ----
  let insightText = '';
  if (totalTasks === 0) {
    insightText = 'You have no tasks yet. Add one to get started!';
  } else if (doneTasks === totalTasks) {
    insightText = "Fantastic! All tasks are complete.";
  } else if (doneTasks === 0) {
    insightText = "No tasks completed yet. Let’s get moving!";
  } else {
    const percentDone = Math.round((doneTasks / totalTasks) * 100);
    insightText = `You’ve completed ${percentDone}% of your tasks. Keep going!`;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* ===== Glassy Blue Boxes for Summary Counts ===== */}
      <View style={styles.summaryRow}>
        <View style={[styles.glassBox, { backgroundColor: 'rgba(56, 189, 248, 0.15)' }]}>
          <Text style={styles.boxNumber}>{totalTasks}</Text>
          <Text style={styles.boxLabel}>Total</Text>
        </View>
        <View style={[styles.glassBox, { backgroundColor: 'rgba(14, 165, 233, 0.15)' }]}>
          <Text style={styles.boxNumber}>{inProgressTasks}</Text>
          <Text style={styles.boxLabel}>In Progress</Text>
        </View>
        <View style={[styles.glassBox, { backgroundColor: 'rgba(38, 157, 248, 0.15)' }]}>
          <Text style={styles.boxNumber}>{doneTasks}</Text>
          <Text style={styles.boxLabel}>Done</Text>
        </View>
        <View style={[styles.glassBox, { backgroundColor: 'rgba(132, 204, 250, 0.15)' }]}>
          <Text style={styles.boxNumber}>{notStartedTasks}</Text>
          <Text style={styles.boxLabel}>Not Started</Text>
        </View>
      </View>

      {/* ===== Insight Text Under Boxes ===== */}
      <View style={styles.insightContainer}>
        <Text style={styles.insightText}>{insightText}</Text>
      </View>

      {/* ===== Pie Chart & Histogram Side by Side =====
      {totalTasks > 0 && (
        <View style={styles.chartsRow}>
          ===== Pie (small, left) =====
          <View style={styles.pieWrapper}>
            <Text style={styles.chartTitle}>Done vs Pending</Text>
            <VictoryPie
              data={pieData}
              innerRadius={40}
              width={width * 0.4}
              height={width * 0.4}
              labels={({ datum }) => `${datum.x}\n${datum.y}`}
              colorScale={[palette.blue[500], palette.blue[200]]}
              style={{
                labels: { fill: palette.gray[700], fontSize: 10, fontWeight: '600' },
              }}
            />
          </View> 

          ===== Histogram (right) =====
          <View style={styles.histogramWrapper}>
            <Text style={styles.chartTitle}>Status Breakdown</Text>
            <VictoryChart
              domainPadding={{ x: 30, y: 20 }}
              width={width * 0.55}
              height={250}
            >
              <VictoryAxis
                style={{
                  axis: { stroke: palette.gray[400] },
                  tickLabels: { fontSize: 10, fill: palette.gray[600], angle: -30 },
                  grid: { stroke: 'transparent' },
                }}
              />
              <VictoryAxis
                dependentAxis
                style={{
                  axis: { stroke: palette.gray[400] },
                  tickLabels: { fontSize: 10, fill: palette.gray[600] },
                  grid: { stroke: palette.gray[200], strokeDasharray: '4,8' },
                }}
              />
              <VictoryBar
                data={statusCounts}
                x="status"
                y="count"
                barRatio={0.7}
                style={{
                  data: {
                    fill: ({ datum }) => {
                      switch (datum.status) {
                        case 'In Progress':
                          return palette.blue[500];
                        case 'Done':
                          return palette.blue[700];
                        case 'Not Started':
                        default:
                          return palette.blue[300];
                      }
                    },
                  },
                  labels: { fill: palette.gray[800], fontSize: 10, fontWeight: '500' },
                }}
                labels={({ datum }) => datum.count}
              />
            </VictoryChart>
          </View> 
           </View>*/}
        
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 40,
    backgroundColor: palette.white,
  },
  summaryRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginTop: 16,
  },
  glassBox: {
    width: (width - 64) / 2, // two boxes per row on small screens
    minWidth: 140,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  boxNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: palette.blue[700],
  },
  boxLabel: {
    fontSize: 12,
    color: palette.gray[700],
    marginTop: 4,
  },
  insightContainer: {
    marginHorizontal: 16,
    marginBottom: 12,
  },
  insightText: {
    fontSize: 14,
    color: palette.gray[600],
    fontStyle: 'italic',
  },
  chartsRow: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginTop: 16,
  },
  pieWrapper: {
    flex: 1,
    alignItems: 'center',
  },
  histogramWrapper: {
    flex: 1.2,
    justifyContent: 'flex-start',
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: palette.gray[800],
    textAlign: 'center',
    marginBottom: 8,
  },
});
