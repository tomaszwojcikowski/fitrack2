import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { styled, YStack, XStack, Text as TamaguiText, Input } from '@tamagui/core';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown, FadeInRight } from 'react-native-reanimated';

const AnimatedYStack = Animated.createAnimatedComponent(YStack);
const AnimatedXStack = Animated.createAnimatedComponent(XStack);

const Container = styled(YStack, {
  flex: 1,
  backgroundColor: '$gray2',
});

const SearchContainer = styled(XStack, {
  alignItems: 'center',
  backgroundColor: '$background',
  margin: '$md',
  paddingHorizontal: '$md',
  borderRadius: '$lg',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 8,
  elevation: 3,
});

const SearchInput = styled(Input, {
  flex: 1,
  paddingVertical: '$sm',
  fontSize: 16,
  borderWidth: 0,
});

const CategoryButton = styled(XStack, {
  paddingHorizontal: '$lg',
  paddingVertical: '$sm',
  backgroundColor: '$background',
  borderRadius: 20,
  marginRight: '$sm',
  pressStyle: {
    scale: 0.95,
  },
});

const CategoryButtonActive = styled(XStack, {
  paddingHorizontal: '$lg',
  paddingVertical: '$sm',
  backgroundColor: '$primary',
  borderRadius: 20,
  marginRight: '$sm',
  pressStyle: {
    scale: 0.95,
  },
});

const CategoryButtonText = styled(TamaguiText, {
  fontSize: 14,
  fontWeight: '600',
  color: '$gray10',
});

const CategoryButtonTextActive = styled(TamaguiText, {
  fontSize: 14,
  fontWeight: '600',
  color: '$white',
});

const ExerciseCard = styled(XStack, {
  alignItems: 'center',
  backgroundColor: '$background',
  padding: '$md',
  borderRadius: '$lg',
  marginBottom: '$sm',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 8,
  elevation: 3,
  pressStyle: {
    backgroundColor: '$gray1',
    scale: 0.98,
  },
});

const ExerciseIcon = styled(YStack, {
  width: 56,
  height: 56,
  borderRadius: 28,
  backgroundColor: '#FFF5F0',
  justifyContent: 'center',
  alignItems: 'center',
  marginRight: '$md',
});

const ExerciseInfo = styled(YStack, {
  flex: 1,
});

const ExerciseName = styled(TamaguiText, {
  fontSize: 16,
  fontWeight: 'bold',
  color: '$gray12',
  marginBottom: 4,
});

const ExerciseDescription = styled(TamaguiText, {
  fontSize: 14,
  color: '$gray10',
  marginBottom: 6,
});

const CategoryBadge = styled(YStack, {
  alignSelf: 'flex-start',
  backgroundColor: '$gray3',
  paddingHorizontal: '$sm',
  paddingVertical: 4,
  borderRadius: 6,
});

const CategoryBadgeText = styled(TamaguiText, {
  fontSize: 12,
  color: '$gray10',
  fontWeight: '600',
});

const FAB = styled(XStack, {
  position: 'absolute',
  right: 16,
  bottom: 16,
  width: 56,
  height: 56,
  borderRadius: 28,
  backgroundColor: '$primary',
  justifyContent: 'center',
  alignItems: 'center',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.3,
  shadowRadius: 8,
  elevation: 5,
  pressStyle: {
    scale: 0.9,
  },
});

const EXERCISES = [
  { id: 1, name: 'Barbell Squat', category: 'Legs', description: 'Compound leg exercise' },
  { id: 2, name: 'Bench Press', category: 'Chest', description: 'Upper body pressing movement' },
  { id: 3, name: 'Deadlift', category: 'Back', description: 'Full body compound movement' },
  { id: 4, name: 'Overhead Press', category: 'Shoulders', description: 'Shoulder pressing movement' },
  { id: 5, name: 'Bent Over Row', category: 'Back', description: 'Horizontal pulling movement' },
  { id: 6, name: 'Pull-up', category: 'Back', description: 'Vertical pulling movement' },
  { id: 7, name: 'Dumbbell Curl', category: 'Arms', description: 'Bicep isolation' },
  { id: 8, name: 'Tricep Extension', category: 'Arms', description: 'Tricep isolation' },
];

const CATEGORIES = ['All', 'Legs', 'Chest', 'Back', 'Shoulders', 'Arms'];

export default function ExerciseLibraryScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredExercises = EXERCISES.filter(exercise => {
    const matchesSearch = exercise.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || exercise.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <Container>
      <AnimatedYStack entering={FadeInDown.springify()}>
        <SearchContainer>
          <Ionicons name="search" size={20} color="#666" style={{ marginRight: 8 }} />
          <SearchInput
            placeholder="Search exercises..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </SearchContainer>
      </AnimatedYStack>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ maxHeight: 50, marginHorizontal: 16, marginBottom: 16 }}>
        {CATEGORIES.map((category, index) => {
          const ButtonComponent = selectedCategory === category ? CategoryButtonActive : CategoryButton;
          const TextComponent = selectedCategory === category ? CategoryButtonTextActive : CategoryButtonText;
          
          return (
            <AnimatedXStack key={category} entering={FadeInRight.delay(index * 50).springify()}>
              <ButtonComponent onPress={() => setSelectedCategory(category)}>
                <TextComponent>{category}</TextComponent>
              </ButtonComponent>
            </AnimatedXStack>
          );
        })}
      </ScrollView>

      <YStack flex={1} paddingHorizontal="$md">
        <ScrollView>
          {filteredExercises.map((exercise, index) => (
            <AnimatedYStack key={exercise.id} entering={FadeInDown.delay(index * 50).springify()}>
              <ExerciseCard>
                <ExerciseIcon>
                  <Ionicons name="fitness" size={32} color="#FF6B35" />
                </ExerciseIcon>
                <ExerciseInfo>
                  <ExerciseName>{exercise.name}</ExerciseName>
                  <ExerciseDescription>{exercise.description}</ExerciseDescription>
                  <CategoryBadge>
                    <CategoryBadgeText>{exercise.category}</CategoryBadgeText>
                  </CategoryBadge>
                </ExerciseInfo>
                <Ionicons name="chevron-forward" size={24} color="#666" />
              </ExerciseCard>
            </AnimatedYStack>
          ))}
        </ScrollView>
      </YStack>

      <AnimatedXStack entering={FadeInDown.delay(400).springify()}>
        <FAB>
          <Ionicons name="add" size={28} color="#FFF" />
        </FAB>
      </AnimatedXStack>
    </Container>
  );
}
