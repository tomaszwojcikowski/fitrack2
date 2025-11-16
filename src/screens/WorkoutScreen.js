import React, { useState, useEffect } from 'react';
import { ScrollView, TextInput } from 'react-native';
import { styled, YStack, XStack, Text as TamaguiText, Input } from '@tamagui/core';
import { Ionicons } from '@expo/vector-icons';
import {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withDelay,
  FadeIn,
  FadeInDown,
} from 'react-native-reanimated';
import { CelebrationAnimation } from '../components';
import { database } from '../database';
import { AnimatedYStack, AnimatedXStack } from '../utils/animatedComponents';
import { updateE1RM } from '../utils/e1rmCalculations';

const Container = styled(YStack, {
  flex: 1,
  backgroundColor: '$gray2',
});

const CenterContent = styled(YStack, {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  padding: '$xl',
});

const Title = styled(TamaguiText, {
  fontSize: 32,
  fontWeight: 'bold',
  color: '$gray12',
  marginTop: '$lg',
  marginBottom: '$sm',
});

const Subtitle = styled(TamaguiText, {
  fontSize: 16,
  color: '$gray10',
  marginBottom: '$xl',
});

const StartButton = styled(XStack, {
  backgroundColor: '$primary',
  paddingHorizontal: '$xl',
  paddingVertical: '$md',
  borderRadius: '$lg',
  pressStyle: {
    backgroundColor: '$primaryDark',
    scale: 0.95,
  },
});

const StartButtonText = styled(TamaguiText, {
  color: '$white',
  fontSize: 18,
  fontWeight: 'bold',
});

const WorkoutHeader = styled(XStack, {
  backgroundColor: '$background',
  padding: '$md',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderBottomWidth: 1,
  borderBottomColor: '$gray3',
});

const TimerContainer = styled(XStack, {
  alignItems: 'center',
  gap: '$sm',
});

const TimerText = styled(TamaguiText, {
  fontSize: 24,
  fontWeight: 'bold',
  color: '$gray12',
});

const EndButton = styled(XStack, {
  backgroundColor: '$error',
  paddingHorizontal: '$md',
  paddingVertical: '$sm',
  borderRadius: '$md',
  pressStyle: {
    opacity: 0.8,
  },
});

const EndButtonText = styled(TamaguiText, {
  color: '$white',
  fontWeight: 'bold',
});

const ExerciseCard = styled(YStack, {
  backgroundColor: '$background',
  margin: '$md',
  padding: '$md',
  borderRadius: '$lg',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 8,
  elevation: 3,
});

const ExerciseHeader = styled(XStack, {
  alignItems: 'center',
  marginBottom: '$md',
});

const ExerciseNumber = styled(TamaguiText, {
  width: 32,
  height: 32,
  borderRadius: 16,
  backgroundColor: '$primary',
  color: '$white',
  textAlign: 'center',
  lineHeight: 32,
  fontSize: 16,
  fontWeight: 'bold',
  marginRight: '$sm',
});

const ExerciseInfo = styled(YStack, {
  flex: 1,
});

const ExerciseName = styled(TamaguiText, {
  fontSize: 18,
  fontWeight: 'bold',
  color: '$gray12',
  marginBottom: 4,
});

const ExercisePrescription = styled(TamaguiText, {
  fontSize: 14,
  color: '$gray10',
});

const SetsContainer = styled(YStack, {
  marginBottom: '$sm',
});

const SetRow = styled(XStack, {
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingVertical: '$sm',
  borderBottomWidth: 1,
  borderBottomColor: '$gray3',
});

const SetHeader = styled(TamaguiText, {
  flex: 1,
  fontSize: 12,
  fontWeight: 'bold',
  color: '$gray10',
  textAlign: 'center',
});

const SetInputRow = styled(XStack, {
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingVertical: '$sm',
});

const SetNumber = styled(TamaguiText, {
  flex: 1,
  fontSize: 16,
  fontWeight: 'bold',
  color: '$gray12',
  textAlign: 'center',
});

const StyledInput = styled(Input, {
  flex: 1,
  borderWidth: 1,
  borderColor: '$gray5',
  borderRadius: '$md',
  padding: '$sm',
  textAlign: 'center',
  marginHorizontal: 4,
});

const CheckButton = styled(XStack, {
  flex: 1,
  backgroundColor: '$success',
  padding: '$sm',
  borderRadius: '$md',
  alignItems: 'center',
  justifyContent: 'center',
  marginLeft: 4,
  pressStyle: {
    backgroundColor: '$successDark',
    scale: 0.95,
  },
});

const AddSetButton = styled(XStack, {
  alignItems: 'center',
  justifyContent: 'center',
  padding: '$sm',
  borderWidth: 1,
  borderColor: '$primary',
  borderRadius: '$md',
  pressStyle: {
    backgroundColor: '$gray2',
  },
});

const AddSetText = styled(TamaguiText, {
  color: '$primary',
  fontWeight: 'bold',
  marginLeft: '$sm',
});

export default function WorkoutScreen() {
  const [workoutStarted, setWorkoutStarted] = useState(false);
  const [workoutLog, setWorkoutLog] = useState(null);
  const [workoutTemplate, setWorkoutTemplate] = useState(null);
  const [exercises, setExercises] = useState([]);
  const [exerciseSets, setExerciseSets] = useState({});
  const [showCelebration, setShowCelebration] = useState(false);
  const [workoutStats, setWorkoutStats] = useState({});
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  
  const scale = useSharedValue(0);
  
  useEffect(() => {
    scale.value = withSpring(1);
    loadWorkoutTemplate();
  }, []);

  // Timer effect
  useEffect(() => {
    if (workoutStarted && startTime) {
      const interval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        setElapsedTime(elapsed);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [workoutStarted, startTime]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  async function loadWorkoutTemplate() {
    try {
      // Get the first available workout template (for now)
      const workoutTemplatesCollection = database.collections.get('workout_templates');
      const templates = await workoutTemplatesCollection.query().fetch();
      
      if (templates.length > 0) {
        const template = templates[0];
        setWorkoutTemplate(template);
        
        // Get template exercises
        const templateExercisesCollection = database.collections.get('template_exercises');
        const templateExercises = await templateExercisesCollection
          .query()
          .where('workout_template_id', template.id)
          .fetch();
        
        // Sort by order
        templateExercises.sort((a, b) => a.order - b.order);
        
        // Load the actual exercise records
        const exercisesCollection = database.collections.get('exercises');
        const exercisePromises = templateExercises.map(te => 
          exercisesCollection.find(te.exerciseId)
        );
        const workoutExercises = await Promise.all(exercisePromises);
        
        setExercises(workoutExercises);
        
        // Initialize sets structure based on template prescription
        const setsData = {};
        workoutExercises.forEach((ex, index) => {
          const templateEx = templateExercises[index];
          const numSets = parseInt(templateEx.sets, 10) || 3;
          
          const sets = [];
          for (let i = 1; i <= numSets; i++) {
            sets.push({
              setNumber: i,
              reps: '',
              weight: '',
              rpe: '',
              logged: false,
              prescribed: {
                reps: templateEx.repsPrescribed,
                rpe: templateEx.rpeTarget,
                rest: templateEx.restPrescribedSeconds,
              },
            });
          }
          
          setsData[ex.id] = sets;
        });
        setExerciseSets(setsData);
      } else {
        // Fallback to loading random exercises if no templates
        await loadFallbackExercises();
      }
    } catch (error) {
      console.error('Error loading workout template:', error);
      await loadFallbackExercises();
    }
  }

  async function loadFallbackExercises() {
    try {
      const exercisesCollection = database.collections.get('exercises');
      const allExercises = await exercisesCollection.query().fetch();
      const workoutExercises = allExercises.slice(0, 3);
      setExercises(workoutExercises);
      
      // Initialize sets structure for each exercise
      const setsData = {};
      workoutExercises.forEach(ex => {
        setsData[ex.id] = [
          { setNumber: 1, reps: '', weight: '', rpe: '', logged: false },
          { setNumber: 2, reps: '', weight: '', rpe: '', logged: false },
          { setNumber: 3, reps: '', weight: '', rpe: '', logged: false },
        ];
      });
      setExerciseSets(setsData);
    } catch (error) {
      console.error('Error loading fallback exercises:', error);
    }
  }

  async function startWorkout() {
    try {
      const now = Date.now();
      setStartTime(now);
      
      // Create workout log in database
      await database.write(async () => {
        const workoutLogsCollection = database.collections.get('workout_logs');
        const newWorkoutLog = await workoutLogsCollection.create(record => {
          record.userId = 'default-user'; // We'll implement proper user management later
          record.workoutTemplateId = workoutTemplate ? workoutTemplate.id : null;
          record.startedAt = now;
          record.completedAt = null;
        });
        setWorkoutLog(newWorkoutLog);
      });
      
      setWorkoutStarted(true);
    } catch (error) {
      console.error('Error starting workout:', error);
    }
  }

  async function logSet(exerciseId, setNumber, reps, weight, rpe) {
    if (!workoutLog || !reps || !weight) {
      return;
    }
    
    try {
      const repsInt = parseInt(reps, 10);
      const weightFloat = parseFloat(weight);
      
      await database.write(async () => {
        const loggedSetsCollection = database.collections.get('logged_sets');
        await loggedSetsCollection.create(record => {
          record.workoutLogId = workoutLog.id;
          record.exerciseId = exerciseId;
          record.setNumber = setNumber;
          record.repsActual = repsInt;
          record.weight = weightFloat;
          record.rpeActual = rpe ? parseFloat(rpe) : null;
          record.rirActual = null;
          record.isWarmup = false;
        });
      });
      
      // Update E1RM if this is a PR
      try {
        const e1rmResult = await updateE1RM(
          database,
          'default-user',
          exerciseId,
          weightFloat,
          repsInt
        );
        
        if (e1rmResult.isNewPR) {
          console.log(`New PR! E1RM: ${e1rmResult.newE1RM} kg`);
          // TODO: Show PR notification to user
        }
      } catch (error) {
        console.error('Error updating E1RM:', error);
      }
      
      // Mark set as logged in UI
      setExerciseSets(prev => ({
        ...prev,
        [exerciseId]: prev[exerciseId].map(set => 
          set.setNumber === setNumber ? { ...set, logged: true } : set
        ),
      }));
    } catch (error) {
      console.error('Error logging set:', error);
    }
  }

  function updateSetData(exerciseId, setNumber, field, value) {
    setExerciseSets(prev => ({
      ...prev,
      [exerciseId]: prev[exerciseId].map(set =>
        set.setNumber === setNumber ? { ...set, [field]: value } : set
      ),
    }));
  }

  function addSet(exerciseId) {
    setExerciseSets(prev => {
      const currentSets = prev[exerciseId] || [];
      const newSetNumber = currentSets.length + 1;
      return {
        ...prev,
        [exerciseId]: [
          ...currentSets,
          { setNumber: newSetNumber, reps: '', weight: '', rpe: '', logged: false },
        ],
      };
    });
  }

  async function endWorkout() {
    try {
      // Get all logged sets for this workout
      const loggedSetsCollection = database.collections.get('logged_sets');
      const allLoggedSets = await loggedSetsCollection
        .query()
        .fetch();
      
      const workoutSets = allLoggedSets.filter(set => set.workoutLogId === workoutLog.id);
      
      // Calculate total volume
      const totalVolume = workoutSets.reduce((sum, set) => {
        return sum + (set.weight * set.repsActual);
      }, 0);
      
      // Update workout log with completion time
      await database.write(async () => {
        await workoutLog.update(record => {
          record.completedAt = Date.now();
        });
      });
      
      // Format elapsed time
      const minutes = Math.floor(elapsedTime / 60);
      const seconds = elapsedTime % 60;
      const durationStr = `${minutes}:${seconds.toString().padStart(2, '0')}`;
      
      const stats = {
        duration: durationStr,
        sets: workoutSets.length,
        volume: Math.round(totalVolume),
        exercises: exercises.length,
      };
      
      setWorkoutStats(stats);
      setShowCelebration(true);
    } catch (error) {
      console.error('Error ending workout:', error);
    }
  }

  const handleCloseCelebration = () => {
    setShowCelebration(false);
    setWorkoutStarted(false);
    setWorkoutLog(null);
    setElapsedTime(0);
    setStartTime(null);
    // Reset exercise sets
    const setsData = {};
    exercises.forEach(ex => {
      setsData[ex.id] = [
        { setNumber: 1, reps: '', weight: '', rpe: '', logged: false },
        { setNumber: 2, reps: '', weight: '', rpe: '', logged: false },
        { setNumber: 3, reps: '', weight: '', rpe: '', logged: false },
      ];
    });
    setExerciseSets(setsData);
  };

  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  if (!workoutStarted) {
    return (
      <Container>
        <CenterContent>
          <AnimatedYStack style={animatedStyle}>
            <Ionicons name="barbell" size={80} color="#FF6B35" />
          </AnimatedYStack>
          <AnimatedYStack entering={FadeInDown.delay(200).springify()}>
            <Title>Ready to Train?</Title>
          </AnimatedYStack>
          <AnimatedYStack entering={FadeInDown.delay(300).springify()}>
            <Subtitle>Start your workout session</Subtitle>
          </AnimatedYStack>
          <AnimatedXStack entering={FadeInDown.delay(400).springify()}>
            <StartButton onPress={startWorkout}>
              <StartButtonText>Start Workout</StartButtonText>
            </StartButton>
          </AnimatedXStack>
        </CenterContent>
      </Container>
    );
  }

  return (
    <Container>
      <WorkoutHeader>
        <TimerContainer>
          <Ionicons name="time" size={24} color="#FF6B35" />
          <TimerText>{formatTime(elapsedTime)}</TimerText>
        </TimerContainer>
        <EndButton onPress={endWorkout}>
          <EndButtonText>End Workout</EndButtonText>
        </EndButton>
      </WorkoutHeader>

      <ScrollView>
        {exercises.map((exercise, index) => {
          const sets = exerciseSets[exercise.id] || [];
          return (
            <AnimatedYStack
              key={exercise.id}
              entering={FadeInDown.delay(index * 100).springify()}
            >
              <ExerciseCard>
                <ExerciseHeader>
                  <ExerciseNumber>{index + 1}</ExerciseNumber>
                  <ExerciseInfo>
                    <ExerciseName>{exercise.name}</ExerciseName>
                    <ExercisePrescription>
                      {sets.length > 0 && sets[0].prescribed ? (
                        `${sets.length} sets × ${sets[0].prescribed.reps} reps @ RPE ${sets[0].prescribed.rpe}`
                      ) : (
                        `${sets.length} sets`
                      )}
                    </ExercisePrescription>
                  </ExerciseInfo>
                  <XStack pressStyle={{ opacity: 0.6 }}>
                    <Ionicons name="swap-horizontal" size={24} color="#666" />
                  </XStack>
                </ExerciseHeader>

                <SetsContainer>
                  <SetRow>
                    <SetHeader>Set</SetHeader>
                    <SetHeader>Reps</SetHeader>
                    <SetHeader>Weight (kg)</SetHeader>
                    <SetHeader>RPE</SetHeader>
                    <SetHeader>✓</SetHeader>
                  </SetRow>
                  {sets.map((set) => (
                    <SetInputRow key={set.setNumber}>
                      <SetNumber>{set.setNumber}</SetNumber>
                      <StyledInput 
                        keyboardType="numeric"
                        placeholder={set.prescribed?.reps || "8"}
                        value={set.reps}
                        onChangeText={(value) => updateSetData(exercise.id, set.setNumber, 'reps', value)}
                        editable={!set.logged}
                      />
                      <StyledInput 
                        keyboardType="numeric"
                        placeholder="kg"
                        value={set.weight}
                        onChangeText={(value) => updateSetData(exercise.id, set.setNumber, 'weight', value)}
                        editable={!set.logged}
                      />
                      <StyledInput 
                        keyboardType="numeric"
                        placeholder={set.prescribed?.rpe?.toString() || "8"}
                        value={set.rpe}
                        onChangeText={(value) => updateSetData(exercise.id, set.setNumber, 'rpe', value)}
                        editable={!set.logged}
                      />
                      <CheckButton 
                        onPress={() => logSet(exercise.id, set.setNumber, set.reps, set.weight, set.rpe)}
                        style={{ 
                          backgroundColor: set.logged ? '#22C55E' : '#FF6B35',
                          opacity: set.logged ? 0.7 : 1,
                        }}
                      >
                        <Ionicons name="checkmark" size={20} color="#FFF" />
                      </CheckButton>
                    </SetInputRow>
                  ))}
                </SetsContainer>

                <AddSetButton onPress={() => addSet(exercise.id)}>
                  <Ionicons name="add" size={20} color="#FF6B35" />
                  <AddSetText>Add Set</AddSetText>
                </AddSetButton>
              </ExerciseCard>
            </AnimatedYStack>
          );
        })}
      </ScrollView>

      <CelebrationAnimation
        visible={showCelebration}
        onClose={handleCloseCelebration}
        stats={workoutStats}
      />
    </Container>
  );
}
