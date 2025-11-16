import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ProgressScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Progress</Text>
        <Text style={styles.subtitle}>Track your fitness journey</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name="trending-up" size={24} color="#FF6B35" />
          <Text style={styles.cardTitle}>Volume Over Time</Text>
        </View>
        <View style={styles.chartPlaceholder}>
          <Ionicons name="bar-chart" size={80} color="#D4D4D4" />
          <Text style={styles.placeholderText}>Chart will be implemented with Victory Native</Text>
        </View>
      </View>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name="barbell" size={24} color="#FF6B35" />
          <Text style={styles.cardTitle}>Estimated 1RM Progress</Text>
        </View>
        <View style={styles.e1rmList}>
          <View style={styles.e1rmItem}>
            <Text style={styles.exerciseName}>Squat</Text>
            <Text style={styles.e1rmValue}>140 kg</Text>
            <View style={styles.changeContainer}>
              <Ionicons name="arrow-up" size={16} color="#22C55E" />
              <Text style={styles.changeText}>+5kg</Text>
            </View>
          </View>
          <View style={styles.e1rmItem}>
            <Text style={styles.exerciseName}>Bench Press</Text>
            <Text style={styles.e1rmValue}>100 kg</Text>
            <View style={styles.changeContainer}>
              <Ionicons name="arrow-up" size={16} color="#22C55E" />
              <Text style={styles.changeText}>+2.5kg</Text>
            </View>
          </View>
          <View style={styles.e1rmItem}>
            <Text style={styles.exerciseName}>Deadlift</Text>
            <Text style={styles.e1rmValue}>180 kg</Text>
            <View style={styles.changeContainer}>
              <Ionicons name="arrow-up" size={16} color="#22C55E" />
              <Text style={styles.changeText}>+10kg</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name="calendar" size={24} color="#FF6B35" />
          <Text style={styles.cardTitle}>Weekly Summary</Text>
        </View>
        <View style={styles.summaryGrid}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryValue}>4</Text>
            <Text style={styles.summaryLabel}>Workouts</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryValue}>180</Text>
            <Text style={styles.summaryLabel}>Sets</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryValue}>12,450</Text>
            <Text style={styles.summaryLabel}>Total Volume</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryValue}>8.2</Text>
            <Text style={styles.summaryLabel}>Avg RPE</Text>
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
  title: {
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
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginLeft: 12,
  },
  chartPlaceholder: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
  },
  placeholderText: {
    marginTop: 16,
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  e1rmList: {
    gap: 12,
  },
  e1rmItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
  },
  exerciseName: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  e1rmValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF6B35',
    marginRight: 12,
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  changeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#22C55E',
    marginLeft: 2,
  },
  summaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  summaryItem: {
    flex: 1,
    minWidth: '45%',
    padding: 16,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    alignItems: 'center',
  },
  summaryValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF6B35',
    marginBottom: 4,
  },
  summaryLabel: {
    fontSize: 12,
    color: '#666',
  },
});
