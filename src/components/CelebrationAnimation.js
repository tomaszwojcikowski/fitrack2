import React, { useEffect, useRef } from 'react';
import { Modal, View, StyleSheet } from 'react-native';
import { styled, YStack, Text as TamaguiText } from '@tamagui/core';
import LottieView from 'lottie-react-native';
import { FadeIn, FadeOut } from 'react-native-reanimated';
import { AnimatedYStack } from '../utils/animatedComponents';

const Overlay = styled(YStack, {
  flex: 1,
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '$xl',
});

const Content = styled(YStack, {
  backgroundColor: '$background',
  padding: '$xl',
  borderRadius: '$xl',
  alignItems: 'center',
  width: '90%',
  maxWidth: 400,
});

const Title = styled(TamaguiText, {
  fontSize: 28,
  fontWeight: 'bold',
  color: '$gray12',
  marginTop: '$lg',
  textAlign: 'center',
});

const Message = styled(TamaguiText, {
  fontSize: 16,
  color: '$gray10',
  marginTop: '$sm',
  textAlign: 'center',
});

const Stats = styled(YStack, {
  width: '100%',
  marginTop: '$lg',
  gap: '$sm',
});

const StatRow = styled(YStack, {
  flexDirection: 'row',
  justifyContent: 'space-between',
  paddingVertical: '$xs',
  borderBottomWidth: 1,
  borderBottomColor: '$gray3',
});

const StatLabel = styled(TamaguiText, {
  fontSize: 16,
  color: '$gray11',
});

const StatValue = styled(TamaguiText, {
  fontSize: 16,
  fontWeight: 'bold',
  color: '$primary',
});

const CloseButton = styled(YStack, {
  backgroundColor: '$primary',
  paddingHorizontal: '$xl',
  paddingVertical: '$md',
  borderRadius: '$lg',
  marginTop: '$lg',
  pressStyle: {
    opacity: 0.8,
    scale: 0.95,
  },
});

const CloseButtonText = styled(TamaguiText, {
  color: '$white',
  fontSize: 16,
  fontWeight: 'bold',
});

/**
 * CelebrationAnimation Component
 * 
 * Displays a celebration animation when workout is completed.
 * Uses Lottie for smooth, vector-based animations.
 * 
 * @param {boolean} visible - Controls modal visibility
 * @param {function} onClose - Callback when animation is dismissed
 * @param {object} stats - Workout statistics to display
 */
export default function CelebrationAnimation({ visible, onClose, stats = {} }) {
  const animationRef = useRef(null);

  useEffect(() => {
    if (visible && animationRef.current) {
      animationRef.current.play();
    }
  }, [visible]);

  const {
    duration = '0:00',
    sets = 0,
    volume = 0,
    exercises = 0,
  } = stats;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Overlay>
        <AnimatedYStack entering={FadeIn.duration(300)} exiting={FadeOut.duration(200)}>
          <Content>
            <View style={styles.animationContainer}>
              {/* 
                For production, replace this with an actual Lottie animation JSON file.
                Example: https://lottiefiles.com/featured
                
                <LottieView
                  ref={animationRef}
                  source={require('../assets/animations/celebration.json')}
                  autoPlay
                  loop={false}
                  style={styles.animation}
                />
              */}
              <View style={styles.placeholderAnimation}>
                <TamaguiText style={styles.placeholderEmoji}>🎉</TamaguiText>
              </View>
            </View>
            
            <Title>Workout Complete!</Title>
            <Message>Great job! You crushed it today.</Message>
            
            <Stats>
              <StatRow>
                <StatLabel>Duration</StatLabel>
                <StatValue>{duration}</StatValue>
              </StatRow>
              <StatRow>
                <StatLabel>Exercises</StatLabel>
                <StatValue>{exercises}</StatValue>
              </StatRow>
              <StatRow>
                <StatLabel>Total Sets</StatLabel>
                <StatValue>{sets}</StatValue>
              </StatRow>
              <StatRow>
                <StatLabel>Total Volume</StatLabel>
                <StatValue>{volume} kg</StatValue>
              </StatRow>
            </Stats>
            
            <CloseButton onPress={onClose}>
              <CloseButtonText>Done</CloseButtonText>
            </CloseButton>
          </Content>
        </AnimatedYStack>
      </Overlay>
    </Modal>
  );
}

const styles = StyleSheet.create({
  animationContainer: {
    width: 200,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  animation: {
    width: 200,
    height: 200,
  },
  placeholderAnimation: {
    width: 200,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderEmoji: {
    fontSize: 120,
  },
});
