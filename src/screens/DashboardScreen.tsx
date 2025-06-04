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

import { palette } from '../theme/colors';
import GlassContainer from '../components/GlassContainer';
import { useTasks } from '../hooks/TasksContext';
import TaskCard, { Task } from '../components/TaskCard';
import { useUser } from '../hooks/UserContext';
import { useAuth } from '../hooks/useAuth';

const { width } = Dimensions.get('window');

export default function DashboardScreen() {
  const navigation = useNavigation<any>();
  const { tasks, dispatch } = useTasks();
  const { userName, setUserName } = useUser();
  const { logout } = useAuth();

  // 1) Today (midnight)
  const todayMidnight = new Date().setHours(0, 0, 0, 0);

  // 2) “Upcoming” tasks: due-date > today
  const upcoming = tasks
    .filter((t) => t.due && new Date(t.due).getTime() > todayMidnight)
    .sort((a, b) => new Date(a.due!).getTime() - new Date(b.due!).getTime())
    .slice(0, 5);

  const pendingCount = tasks.filter((t) => !t.done).length;
  const progress = tasks.length
    ? Math.round((tasks.filter((t) => t.done).length / tasks.length) * 100)
    : 0;

  const handleLogout = () => {
    logout();
    setUserName(null);
    navigation.replace('Login');
  };

  console.log('DashboardScreen userName:', userName);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* ===== Header ===== */}
      <View style={styles.headerBox}>
        <View style={{ flexShrink: 1 }}>
          <Text style={styles.greeting}>
            Welcome{userName ? `, ${userName}` : ''}!
          </Text>
          <Text style={styles.sub}>{pendingCount} Tasks remaining</Text>
        </View>
        <Pressable style={styles.logoutBtn} onPress={handleLogout}>
          <Feather name="log-out" size={20} color={palette.white} />
        </Pressable>
      </View>

      {/* ===== Today summary widget ===== */}
      <View style={{ marginHorizontal: 16, marginTop: 16 }}>
        <GlassContainer style={styles.widget}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ flex: 1 }}>
              <Text style={styles.widgetTitle}>Today Task Summary</Text>
              <Text style={styles.widgetSub}>Progress {progress}%</Text>
            </View>
            <Pressable
              onPress={() => navigation.navigate('AddTask')}
              style={styles.widgetFab}
            >
              <Feather name="plus" size={20} color={palette.white} />
            </Pressable>
          </View>
        </GlassContainer>
      </View>

      {/* ===== Upcoming Tasks ===== */}
      <Text style={styles.sectionTitle}>Upcoming Tasks</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingLeft: 16, paddingVertical: 8 }}
      >
        {upcoming.length === 0 ? (
          <View style={styles.emptyUpcoming}>
            <Text style={styles.emptyText}>No upcoming tasks</Text>
          </View>
        ) : (
          upcoming.map((task: Task) => {
            // Build “display date” from ISO string
            let dateText = '';
            if (task.due) {
              const d = new Date(task.due);
              dateText = d.toDateString();
            }
            return (
              <View key={task.id} style={styles.upcomingCard}>
                <View style={styles.upcomingContent}>
                  <Text style={styles.upcomingTitle}>{task.title}</Text>
                  {dateText ? (
                    <Text style={styles.upcomingDate}>{dateText}</Text>
                  ) : null}
                  {task.category ? (
                    <Text style={styles.upcomingCategory}>
                      {task.category}
                    </Text>
                  ) : null}
                  {task.comment ? (
                    <Text
                      style={styles.upcomingComment}
                      numberOfLines={2}
                      ellipsizeMode="tail"
                    >
                      {task.comment}
                    </Text>
                  ) : null}
                </View>
              </View>
            );
          })
        )}
      </ScrollView>

      {/* ===== My Task List ===== */}
      <Text style={[styles.sectionTitle, { marginTop: 24 }]}>
        My Task List
      </Text>
      <View style={{ paddingHorizontal: 16, paddingBottom: 32, marginTop: 8 }}>
        {tasks.map((task: Task) => (
          <TaskCard
            key={task.id}
            task={task}
            onToggle={() => dispatch({ type: 'TOGGLE', id: task.id })}
            onDelete={() => dispatch({ type: 'DELETE', id: task.id })}
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.gray[50],
  },
  headerBox: {
    backgroundColor: palette.blue[500],
    paddingTop: 56,
    paddingBottom: 28,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  greeting: {
    color: palette.white,
    fontSize: 24,
    fontWeight: '700',
  },
  sub: {
    color: palette.white,
    fontSize: 14,
    marginTop: 4,
  },
  logoutBtn: {
    backgroundColor: palette.blue[700],
    borderRadius: 18,
    padding: 8,
    marginLeft: 12,
  },

  widget: {
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  widgetTitle: {
    fontWeight: '600',
    fontSize: 16,
    color: palette.gray[800],
  },
  widgetSub: {
    color: palette.gray[600],
    fontSize: 14,
    marginTop: 4,
  },
  widgetFab: {
    backgroundColor: palette.blue[600],
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginHorizontal: 16,
    marginTop: 24,
    color: palette.gray[900],
  },

  emptyUpcoming: {
    backgroundColor: palette.gray[100],
    borderRadius: 12,
    padding: 16,
    minWidth: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: palette.gray[500],
  },

  upcomingCard: {
    backgroundColor: palette.white,
    borderRadius: 16,
    width: width * 0.7,
    marginRight: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  upcomingContent: {
    flexDirection: 'column',
  },
  upcomingTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: palette.gray[800],
    marginBottom: 4,
  },
  upcomingDate: {
    fontSize: 14,
    color: palette.gray[600],
    marginBottom: 6,
  },
  upcomingCategory: {
    fontSize: 13,
    color: palette.blue[600],
    fontWeight: '500',
    marginBottom: 6,
  },
  upcomingComment: {
    fontSize: 14,
    color: palette.gray[700],
  },
});
