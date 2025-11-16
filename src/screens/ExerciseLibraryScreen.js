import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native';
import { styled, YStack, XStack, Text as TamaguiText, Input } from '@tamagui/core';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown, FadeInRight } from 'react-native-reanimated';
import { database } from '../database';

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

const CATEGORIES = ['All', 'Legs', 'Chest', 'Back', 'Shoulders', 'Arms'];

// Helper to extract category from description or name
function extractCategory(exercise) {
  const name = exercise.name.toLowerCase();
  const desc = (exercise.description || '').toLowerCase();
  
  if (name.includes('squat') || name.includes('lunge') || name.includes('leg') || desc.includes('leg')) return 'Legs';
  if (name.includes('bench') || name.includes('press') && (name.includes('chest') || name.includes('incline'))) return 'Chest';
  if (name.includes('push-up') || name.includes('fly') || name.includes('flye') || name.includes('crossover')) return 'Chest';
  if (name.includes('row') || name.includes('pull') || name.includes('lat') || name.includes('deadlift')) return 'Back';
  if (name.includes('shoulder') || name.includes('overhead press') || name.includes('arnold') || name.includes('raise')) return 'Shoulders';
  if (name.includes('curl') || name.includes('tricep') || name.includes('dip') || name.includes('skull')) return 'Arms';
  
  return 'Other';
}

export default function ExerciseLibraryScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadExercises();
  }, []);

  async function loadExercises() {
    try {
      const exercisesCollection = database.collections.get('exercises');
      const allExercises = await exercisesCollection.query().fetch();
      
      // Map database exercises to include computed category
      const mappedExercises = allExercises.map(ex => ({
        id: ex.id,
        name: ex.name,
        description: ex.description,
        category: extractCategory(ex),
        isCustom: ex.isCustom,
      }));
      
      setExercises(mappedExercises);
      setLoading(false);
    } catch (error) {
      console.error('Error loading exercises:', error);
      setLoading(false);
    }
  }

  const filteredExercises = exercises.filter(exercise => {
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
