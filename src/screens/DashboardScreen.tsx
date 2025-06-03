import React from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { palette } from '../theme/colors';
import GlassContainer from '../components/GlassContainer';
import { useTasks } from '../hooks/TasksContext';
import TaskCard from '../components/TaskCard';
import { useUser } from '../hooks/UserContext';

const { width } = Dimensions.get('window');

export default function DashboardScreen() {
  const navigation = useNavigation();
  const { tasks, dispatch } = useTasks();
  const { userName } = useUser();

  /* ===== Helper: tasks due in the future ===== */
  const today = new Date().setHours(0, 0, 0, 0);
  const upcoming = tasks
    .filter((t) => t.due && new Date(t.due).getTime() > today)
    .sort((a, b) => +new Date(a.due!) - +new Date(b.due!))     // soonest first
    .slice(0, 10);                                              // cap to 10 cards

  const pending = tasks.filter((t) => !t.done).length;
  const progress = tasks.length
    ? Math.round((tasks.filter((t) => t.done).length / tasks.length) * 100)
    : 0;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* ===== Header ===== */}
      <View style={styles.headerBox}>
        <Text style={styles.greeting}>
         Good morning {userName ? userName : ''}
       </Text>
        <Text style={styles.sub}>{pending} Tasks remaining</Text>
        <Pressable style={styles.bellIcon}>
          <Feather name="bell" size={20} color={palette.white} />
        </Pressable>
      </View>


      {/* ===== Today summary widget ===== */}
      <GlassContainer style={styles.widget}>
        <Text style={styles.widgetTitle}>Today Task Summary</Text>
        <Text style={styles.widgetSub}>Progress {progress}%</Text>

        <Pressable
          style={styles.widgetFab}
          onPress={() => navigation.navigate('AddTask' as never)}
        >
          <Feather name="plus" size={20} color={palette.white} />
        </Pressable>
      </GlassContainer>

      {/* ===== Upcoming tasks horizontal scroll ===== */}
      <Text style={styles.sectionTitle}>Upcoming Task</Text>
      {upcoming.length === 0 ? (
        <Text style={{ marginLeft: 16, color: palette.gray[500] }}>
          No upcoming tasks
        </Text>
      ) : (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ paddingLeft: 16 }}
        >
          {upcoming.map((task) => (
            <GlassContainer key={task.id} style={styles.cardSmall}>
              <Text style={styles.cardSmallTitle}>{task.title}</Text>
              <Text style={styles.cardSmallSub}>
                {new Date(task.due!).toDateString()}
              </Text>
            </GlassContainer>
          ))}
        </ScrollView>
      )}

      {/* ===== My Task List (live, toggleable) ===== */}
      <Text style={[styles.sectionTitle, { marginTop: 16 }]}>My Task List</Text>

      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onToggle={() => dispatch({ type: 'TOGGLE', id: task.id })}
          onDelete={() => dispatch({ type: 'DELETE', id: task.id })}
        />
      ))}

      <View style={{ height: 32 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: palette.white },

  /* header */
  headerBox: {
    backgroundColor: palette.blue[500],
    paddingTop: 50,
    paddingBottom: 32,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  greeting: { color: palette.white, fontSize: 22, fontWeight: '700' },
  sub: { color: palette.white, fontSize: 14, marginTop: 2 },
  bellIcon: { position: 'absolute', right: 16, top: 52 },

  /* widget */
  widget: { margin: 16, position: 'relative' },
  widgetTitle: { fontWeight: '600', marginBottom: 4 },
  widgetSub: { color: palette.gray[500] },
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

  /* section titles + cards */
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginHorizontal: 16,
    marginTop: 24,
  },
  cardSmall: {
    width: width * 0.45,
    borderRadius: 12,
    marginRight: 12,
  },
  cardSmallTitle: { fontWeight: '600', marginBottom: 4 },
  cardSmallSub: { color: palette.gray[500], fontSize: 12 },
});
