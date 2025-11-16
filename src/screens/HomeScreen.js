import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen({ navigation }) {
  const todayWorkout = {
    name: 'Upper Body - Day 1',
    exercises: 5,
    duration: '45 min',
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Welcome to FiTrack2!</Text>
        <Text style={styles.subtitle}>Your fitness journey starts here</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name="barbell" size={32} color="#FF6B35" />
          <Text style={styles.cardTitle}>Today's Workout</Text>
        </View>
        <View style={styles.workoutInfo}>
          <Text style={styles.workoutName}>{todayWorkout.name}</Text>
          <View style={styles.workoutDetails}>
            <View style={styles.detailItem}>
              <Ionicons name="fitness" size={16} color="#666" />
              <Text style={styles.detailText}>{todayWorkout.exercises} exercises</Text>
            </View>
            <View style={styles.detailItem}>
              <Ionicons name="time" size={16} color="#666" />
              <Text style={styles.detailText}>{todayWorkout.duration}</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity 
          style={styles.startButton}
          onPress={() => navigation.navigate('Workout')}
        >
          <Text style={styles.startButtonText}>Start Workout</Text>
          <Ionicons name="arrow-forward" size={20} color="#FFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>12</Text>
          <Text style={styles.statLabel}>Workouts</Text>
          <Text style={styles.statSubLabel}>This Month</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>4,320</Text>
          <Text style={styles.statLabel}>Total Volume</Text>
          <Text style={styles.statSubLabel}>kg Lifted</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>8.5</Text>
          <Text style={styles.statLabel}>Avg RPE</Text>
          <Text style={styles.statSubLabel}>Last 7 Days</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Recent Activity</Text>
        <View style={styles.activityItem}>
          <View style={styles.activityIconContainer}>
            <Ionicons name="checkmark-circle" size={24} color="#22C55E" />
          </View>
          <View style={styles.activityContent}>
            <Text style={styles.activityTitle}>Completed: Full Body Workout</Text>
            <Text style={styles.activityTime}>2 hours ago</Text>
          </View>
        </View>
        <View style={styles.activityItem}>
          <View style={styles.activityIconContainer}>
            <Ionicons name="trophy" size={24} color="#F59E0B" />
          </View>
          <View style={styles.activityContent}>
            <Text style={styles.activityTitle}>New PR: Squat 140kg</Text>
            <Text style={styles.activityTime}>Yesterday</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    padding: 24,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  card: {
    backgroundColor: '#FFF',
    margin: 16,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginLeft: 12,
  },
  workoutInfo: {
    marginBottom: 16,
  },
  workoutName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 12,
  },
  workoutDetails: {
    flexDirection: 'row',
    gap: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  detailText: {
    fontSize: 14,
    color: '#666',
  },
  startButton: {
    backgroundColor: '#FF6B35',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  startButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  statsContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    gap: 12,
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF6B35',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 2,
  },
  statSubLabel: {
    fontSize: 10,
    color: '#666',
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  activityIconContainer: {
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  activityTime: {
    fontSize: 12,
    color: '#666',
  },
});
