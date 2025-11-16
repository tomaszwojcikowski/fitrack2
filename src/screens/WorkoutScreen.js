import React, { useState, useEffect } from 'react';
import { ScrollView, TextInput } from 'react-native';
import { styled, YStack, XStack, Text as TamaguiText, Input } from '@tamagui/core';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withDelay,
  FadeIn,
  FadeInDown,
} from 'react-native-reanimated';
import { CelebrationAnimation } from '../components';

const AnimatedYStack = Animated.createAnimatedComponent(YStack);
const AnimatedXStack = Animated.createAnimatedComponent(XStack);

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
  const [sets, setSets] = useState([]);
  const [showCelebration, setShowCelebration] = useState(false);
  const [workoutStats, setWorkoutStats] = useState({});
  
  const scale = useSharedValue(0);
  
  useEffect(() => {
    scale.value = withSpring(1);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));
  
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

  const endWorkout = () => {
    // Calculate workout stats
    const stats = {
      duration: '45:32',
      sets: sets.length || 15,
      volume: 12450,
      exercises: exercises.length,
    };
    setWorkoutStats(stats);
    setShowCelebration(true);
  };

  const handleCloseCelebration = () => {
    setShowCelebration(false);
    setWorkoutStarted(false);
    setSets([]);
  };

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
          <TimerText>00:00</TimerText>
        </TimerContainer>
        <EndButton onPress={endWorkout}>
          <EndButtonText>End Workout</EndButtonText>
        </EndButton>
      </WorkoutHeader>

      <ScrollView>
        {exercises.map((exercise, index) => (
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
                    {exercise.sets} sets × {exercise.reps} reps @ RPE {exercise.rpe}
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
                {[1, 2, 3].map((setNum) => (
                  <SetInputRow key={setNum}>
                    <SetNumber>{setNum}</SetNumber>
                    <StyledInput 
                      keyboardType="numeric"
                      placeholder="8"
                    />
                    <StyledInput 
                      keyboardType="numeric"
                      placeholder="100"
                    />
                    <StyledInput 
                      keyboardType="numeric"
                      placeholder="8"
                    />
                    <CheckButton onPress={() => logSet(exercise.id)}>
                      <Ionicons name="checkmark" size={20} color="#FFF" />
                    </CheckButton>
                  </SetInputRow>
                ))}
              </SetsContainer>

              <AddSetButton>
                <Ionicons name="add" size={20} color="#FF6B35" />
                <AddSetText>Add Set</AddSetText>
              </AddSetButton>
            </ExerciseCard>
          </AnimatedYStack>
        ))}
      </ScrollView>

      <CelebrationAnimation
        visible={showCelebration}
        onClose={handleCloseCelebration}
        stats={workoutStats}
      />
    </Container>
  );
}
