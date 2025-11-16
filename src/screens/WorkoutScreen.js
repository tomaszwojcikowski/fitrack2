import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function WorkoutScreen() {
  const [workoutStarted, setWorkoutStarted] = useState(false);
  const [sets, setSets] = useState([]);
  
  const exercises = [
    { id: 1, name: 'Barbell Squat', sets: '3-5', reps: '5-8', rpe: '8' },
    { id: 2, name: 'Bench Press', sets: '3-5', reps: '5-8', rpe: '8' },
    { id: 3, name: 'Bent Over Row', sets: '3', reps: '8-10', rpe: '7-8' },
  ];

  const startWorkout = () => {
    setWorkoutStarted(true);
  };

  const logSet = (exerciseId) => {
    setSets([...sets, { exerciseId, timestamp: Date.now() }]);
  };

  if (!workoutStarted) {
    return (
      <View style={styles.container}>
        <View style={styles.centerContent}>
          <Ionicons name="barbell" size={80} color="#FF6B35" />
          <Text style={styles.title}>Ready to Train?</Text>
          <Text style={styles.subtitle}>Start your workout session</Text>
          <TouchableOpacity style={styles.startButton} onPress={startWorkout}>
            <Text style={styles.startButtonText}>Start Workout</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.workoutHeader}>
        <View style={styles.timerContainer}>
          <Ionicons name="time" size={24} color="#FF6B35" />
          <Text style={styles.timerText}>00:00</Text>
        </View>
        <TouchableOpacity style={styles.endButton}>
          <Text style={styles.endButtonText}>End Workout</Text>
        </TouchableOpacity>
      </View>

      {exercises.map((exercise, index) => (
        <View key={exercise.id} style={styles.exerciseCard}>
          <View style={styles.exerciseHeader}>
            <Text style={styles.exerciseNumber}>{index + 1}</Text>
            <View style={styles.exerciseInfo}>
              <Text style={styles.exerciseName}>{exercise.name}</Text>
              <Text style={styles.exercisePrescription}>
                {exercise.sets} sets × {exercise.reps} reps @ RPE {exercise.rpe}
              </Text>
            </View>
            <TouchableOpacity>
              <Ionicons name="swap-horizontal" size={24} color="#666" />
            </TouchableOpacity>
          </View>

          <View style={styles.setsContainer}>
            <View style={styles.setRow}>
              <Text style={styles.setHeader}>Set</Text>
              <Text style={styles.setHeader}>Reps</Text>
              <Text style={styles.setHeader}>Weight (kg)</Text>
              <Text style={styles.setHeader}>RPE</Text>
              <Text style={styles.setHeader}>✓</Text>
            </View>
            {[1, 2, 3].map((setNum) => (
              <View key={setNum} style={styles.setInputRow}>
                <Text style={styles.setNumber}>{setNum}</Text>
                <TextInput 
                  style={styles.input} 
                  keyboardType="numeric"
                  placeholder="8"
                />
                <TextInput 
                  style={styles.input} 
                  keyboardType="numeric"
                  placeholder="100"
                />
                <TextInput 
                  style={styles.input} 
                  keyboardType="numeric"
                  placeholder="8"
                />
                <TouchableOpacity 
                  style={styles.checkButton}
                  onPress={() => logSet(exercise.id)}
                >
                  <Ionicons name="checkmark" size={20} color="#FFF" />
                </TouchableOpacity>
              </View>
            ))}
          </View>

          <TouchableOpacity style={styles.addSetButton}>
            <Ionicons name="add" size={20} color="#FF6B35" />
            <Text style={styles.addSetText}>Add Set</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginTop: 24,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 32,
  },
  startButton: {
    backgroundColor: '#FF6B35',
    paddingHorizontal: 48,
    paddingVertical: 16,
    borderRadius: 12,
  },
  startButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  workoutHeader: {
    backgroundColor: '#FFF',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  timerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  endButton: {
    backgroundColor: '#EF4444',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  endButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  exerciseCard: {
    backgroundColor: '#FFF',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  exerciseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  exerciseNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FF6B35',
    color: '#FFF',
    textAlign: 'center',
    lineHeight: 32,
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 12,
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  exercisePrescription: {
    fontSize: 14,
    color: '#666',
  },
  setsContainer: {
    marginBottom: 12,
  },
  setRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  setHeader: {
    flex: 1,
    fontSize: 12,
    fontWeight: 'bold',
    color: '#666',
    textAlign: 'center',
  },
  setInputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  setNumber: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A1A1A',
    textAlign: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#D4D4D4',
    borderRadius: 8,
    padding: 8,
    textAlign: 'center',
    marginHorizontal: 4,
  },
  checkButton: {
    flex: 1,
    backgroundColor: '#22C55E',
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
    marginLeft: 4,
  },
  addSetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderWidth: 1,
    borderColor: '#FF6B35',
    borderRadius: 8,
    borderStyle: 'dashed',
  },
  addSetText: {
    color: '#FF6B35',
    fontWeight: 'bold',
    marginLeft: 8,
  },
});
