import React, { useState, useEffect } from 'react';
import { Modal, ScrollView, TouchableOpacity } from 'react-native';
import { styled, YStack, XStack, Text as TamaguiText } from '@tamagui/core';
import { Ionicons } from '@expo/vector-icons';
import { database } from '../database';

const ModalOverlay = styled(YStack, {
  flex: 1,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '$lg',
});

const ModalContent = styled(YStack, {
  backgroundColor: '$background',
  borderRadius: '$xl',
  padding: '$lg',
  width: '100%',
  maxWidth: 500,
  maxHeight: '80%',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.3,
  shadowRadius: 12,
  elevation: 5,
});

const ModalHeader = styled(XStack, {
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '$md',
  paddingBottom: '$md',
  borderBottomWidth: 1,
  borderBottomColor: '$gray3',
});

const ModalTitle = styled(TamaguiText, {
  fontSize: 20,
  fontWeight: 'bold',
  color: '$gray12',
});

const CloseButton = styled(TouchableOpacity, {
  padding: '$sm',
});

const CurrentExercise = styled(YStack, {
  backgroundColor: '$gray2',
  padding: '$md',
  borderRadius: '$md',
  marginBottom: '$md',
});

const CurrentExerciseLabel = styled(TamaguiText, {
  fontSize: 12,
  color: '$gray10',
  marginBottom: '$xs',
});

const CurrentExerciseName = styled(TamaguiText, {
  fontSize: 16,
  fontWeight: 'bold',
  color: '$gray12',
});

const SubstitutesLabel = styled(TamaguiText, {
  fontSize: 14,
  fontWeight: 'bold',
  color: '$gray11',
  marginBottom: '$sm',
});

const SubstituteItem = styled(TouchableOpacity, {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '$md',
  backgroundColor: '$background',
  borderRadius: '$md',
  marginBottom: '$sm',
  borderWidth: 1,
  borderColor: '$gray3',
  pressStyle: {
    backgroundColor: '$gray2',
    borderColor: '$primary',
  },
});

const SubstituteName = styled(TamaguiText, {
  fontSize: 16,
  color: '$gray12',
  flex: 1,
});

const NoSubstitutesText = styled(TamaguiText, {
  fontSize: 14,
  color: '$gray10',
  textAlign: 'center',
  padding: '$xl',
});

export default function ExerciseSubstitutionModal({ 
  visible, 
  onClose, 
  exercise, 
  onSubstitute 
}) {
  const [substitutes, setSubstitutes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (visible && exercise) {
      loadSubstitutes();
    }
  }, [visible, exercise]);

  async function loadSubstitutes() {
    if (!exercise) return;
    
    setLoading(true);
    try {
      // Get substitution records for this exercise
      const substitutionsCollection = database.collections.get('exercise_substitutions');
      const substitutions = await substitutionsCollection
        .query()
        .where('exercise_id', exercise.id)
        .fetch();
      
      // Load the actual exercise records
      const exercisesCollection = database.collections.get('exercises');
      const substituteExercises = await Promise.all(
        substitutions.map(sub => exercisesCollection.find(sub.substituteExerciseId))
      );
      
      setSubstitutes(substituteExercises);
    } catch (error) {
      console.error('Error loading substitutes:', error);
      setSubstitutes([]);
    } finally {
      setLoading(false);
    }
  }

  function handleSubstitute(substituteExercise) {
    onSubstitute(substituteExercise);
    onClose();
  }

  if (!exercise) {
    return null;
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <ModalOverlay>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>Substitute Exercise</ModalTitle>
            <CloseButton onPress={onClose}>
              <Ionicons name="close" size={24} color="#666" />
            </CloseButton>
          </ModalHeader>

          <CurrentExercise>
            <CurrentExerciseLabel>Current Exercise</CurrentExerciseLabel>
            <CurrentExerciseName>{exercise.name}</CurrentExerciseName>
          </CurrentExercise>

          <SubstitutesLabel>Available Substitutes</SubstitutesLabel>

          <ScrollView style={{ maxHeight: 300 }}>
            {loading ? (
              <NoSubstitutesText>Loading...</NoSubstitutesText>
            ) : substitutes.length === 0 ? (
              <NoSubstitutesText>
                No substitutes available for this exercise
              </NoSubstitutesText>
            ) : (
              substitutes.map((substitute) => (
                <SubstituteItem
                  key={substitute.id}
                  onPress={() => handleSubstitute(substitute)}
                >
                  <SubstituteName>{substitute.name}</SubstituteName>
                  <Ionicons name="checkmark-circle-outline" size={24} color="#FF6B35" />
                </SubstituteItem>
              ))
            )}
          </ScrollView>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
}
