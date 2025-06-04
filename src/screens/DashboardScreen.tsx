// src/screens/DashboardScreen.tsx
import React from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { palette }     from '../theme/colors';
import GlassContainer  from '../components/GlassContainer';
import { useTasks }    from '../hooks/TasksContext';
import TaskCard        from '../components/TaskCard';
import { useAuth }     from '../hooks/useAuth';

const { width } = Dimensions.get('window');

export default function DashboardScreen() {
  const navigation         = useNavigation<any>();
  const { tasks, dispatch } = useTasks();
  const { user, logout }    = useAuth();       

  /* ---------- derive task stats ---------- */
  const today    = new Date().setHours(0, 0, 0, 0);
  const upcoming = tasks
    .filter(t => t.due && new Date(t.due).getTime() > today)
    .sort((a, b) => +new Date(a.due!) - +new Date(b.due!))
    .slice(0, 10);

  const pending  = tasks.filter(t => !t.done).length;
  const progress = tasks.length
    ? Math.round((tasks.filter(t => t.done).length / tasks.length) * 100)
    : 0;

  /* ---------- handlers ---------- */
  const handleLogout = () => {
    logout();                 // clears user in AuthContext
    navigation.replace('Login');
  };

  /* ---------- UI ---------- */
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* ===== Header ===== */}
      <View style={styles.headerBox}>
        <View>
          <Text style={styles.greeting}>
            {user ? `Welcome, ${user}!` : 'Welcome!'}
          </Text>
          <Text style={styles.sub}>{pending} Tasks remaining</Text>
        </View>

        <Pressable style={styles.logoutBtn} onPress={handleLogout}>
          <Feather name="log-out" size={20} color={palette.white} />
        </Pressable>
      </View>

      {/* ===== Today summary widget ===== */}
      <GlassContainer style={styles.widget}>
        <Text style={styles.widgetTitle}>Today Task Summary</Text>
        <Text style={styles.widgetSub}>Progress {progress}%</Text>

        <Pressable
          style={styles.widgetFab}
          onPress={() => navigation.navigate('AddTask')}
        >
          <Feather name="plus" size={20} color={palette.white} />
        </Pressable>
      </GlassContainer>

      {/* ===== Upcoming tasks ===== */}
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
          {upcoming.map(task => (
            <GlassContainer key={task.id} style={styles.cardSmall}>
              <Text style={styles.cardSmallTitle}>{task.title}</Text>
              <Text style={styles.cardSmallSub}>
                {new Date(task.due!).toDateString()}
              </Text>
            </GlassContainer>
          ))}
        </ScrollView>
      )}

      {/* ===== Full task list ===== */}
      <Text style={[styles.sectionTitle, { marginTop: 16 }]}>My Task List</Text>

      {tasks.map(task => (
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

/* ---------- styles ---------- */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: palette.white },

  headerBox: {
    backgroundColor: palette.blue[500],
    paddingTop: 50,
    paddingBottom: 32,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  greeting: { color: palette.white, fontSize: 22, fontWeight: '700' },
  sub:      { color: palette.white, fontSize: 14, marginTop: 2 },

  logoutBtn: {
    backgroundColor: palette.blue[400],
    borderRadius: 18,
    padding: 8,
    marginLeft: 12,
  },

  widget:      { margin: 16, position: 'relative' },
  widgetTitle: { fontWeight: '600', marginBottom: 4 },
  widgetSub:   { color: palette.gray[500] },
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
    borderRadius: 12,
    marginRight: 12,
    padding: 12,
  },
  cardSmallTitle: { fontWeight: '600', marginBottom: 4 },
  cardSmallSub:   { color: palette.gray[500], fontSize: 12 },
});
