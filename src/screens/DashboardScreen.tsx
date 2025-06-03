// src/screens/DashboardScreen.tsx
import React from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { palette } from '../theme/colors';
import GlassContainer from '../components/GlassContainer';

const { width } = Dimensions.get('window');

export default function DashboardScreen() {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header Box */}
      <View style={styles.headerBox}>
        <Text style={styles.greeting}>Good morning John</Text>
        <Text style={styles.sub}>4 Tasks remaining</Text>
        <Pressable style={styles.bellIcon}>
          <Feather name="bell" size={20} color={palette.white} />
        </Pressable>
      </View>

      {/* Calendar Picker (just header) */}
      <Calendar
        theme={{
          selectedDayBackgroundColor: palette.blue[500],
          todayTextColor: palette.blue[600],
          arrowColor: palette.blue[600],
        }}
        style={{
          marginHorizontal: 16,
          borderRadius: 12,
          backgroundColor: palette.white,
          elevation: 2,
        }}
        firstDay={1}
      />

      {/* Today Task Summary Widget */}
      <GlassContainer style={styles.widget}>
        <Text style={styles.widgetTitle}>Today Task Summary</Text>
        <Text style={styles.widgetSub}>Progress 85%</Text>
        <Pressable
          style={styles.widgetFab}
          onPress={() => navigation.navigate('AddTask' as never)} // cast for TS
        >
          <Feather name="plus" size={20} color={palette.white} />
        </Pressable>
      </GlassContainer>

      {/* Upcoming Task Horizontal Scroll */}
      <Text style={styles.sectionTitle}>UpComing Task</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ paddingLeft: 16 }}>
        {[1, 2, 3].map((id) => (
          <GlassContainer key={id} style={styles.cardSmall}>
            <Text style={styles.cardSmallTitle}>Task {id}</Text>
            <Text style={styles.cardSmallSub}>Details of task {id}</Text>
          </GlassContainer>
        ))}
      </ScrollView>

      {/* My Task List with Filter Chips */}
      <Text style={[styles.sectionTitle, { marginTop: 16 }]}>My Task List</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ paddingLeft: 16, marginBottom: 12 }}
      >
        {['All', 'Pending', 'In Progress', 'Done'].map((label, idx) => (
          <Pressable
            key={idx}
            style={[styles.chip, idx === 0 && styles.chipActive]}
          >
            <Text style={{ color: idx === 0 ? palette.white : palette.gray[500] }}>{label}</Text>
          </Pressable>
        ))}
      </ScrollView>

      {/* Dummy Task Rows */}
      {[1, 2, 3].map((id) => (
        <View key={id} style={styles.taskRow}>
          <View>
            <Text style={styles.taskTitle}>Task {id}</Text>
            <Text style={styles.taskDetail}>Details of task {id}</Text>
          </View>
          <View style={styles.statusDot} />
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.white,
  },
  headerBox: {
    backgroundColor: palette.blue[500],
    paddingTop: 50,
    paddingBottom: 32,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  greeting: {
    color: palette.white,
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 4,
  },
  sub: {
    color: palette.white,
    fontSize: 14,
  },
  bellIcon: {
    position: 'absolute',
    right: 16,
    top: 52,
  },
  widget: {
    margin: 16,
    position: 'relative',
  },
  widgetTitle: {
    fontWeight: '600',
    marginBottom: 4,
  },
  widgetSub: {
    color: palette.gray[500],
  },
  widgetFab: {
    position: 'absolute',
    right: 12,
    top: 12,
    backgroundColor: palette.blue[500],
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginHorizontal: 16,
    marginTop: 24,
  },
  cardSmall: {
    width: width * 0.45,
    backgroundColor: palette.white,
    borderRadius: 12,
    marginRight: 12,
    elevation: 2,
    shadowColor: palette.gray[500],
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
  },
  cardSmallTitle: {
    fontWeight: '600',
    marginBottom: 4,
  },
  cardSmallSub: {
    color: palette.gray[500],
    fontSize: 12,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: palette.blue[500],
    marginRight: 8,
  },
  chipActive: {
    backgroundColor: palette.blue[500],
    borderColor: palette.blue[500],
  },
  taskRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: palette.white,
    marginHorizontal: 16,
    marginBottom: 8,
    padding: 12,
    borderRadius: 12,
    elevation: 1,
  },
  taskTitle: {
    fontWeight: '600',
  },
  taskDetail: {
    fontSize: 12,
    color: palette.gray[500],
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#ef4444',
  },
});
