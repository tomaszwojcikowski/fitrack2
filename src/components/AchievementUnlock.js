import React, { useEffect } from 'react';
import { Modal, View, StyleSheet } from 'react-native';
import { styled, YStack, XStack, Text as TamaguiText } from '@tamagui/core';
import { Ionicons } from '@expo/vector-icons';
import { 
  FadeInUp, 
  FadeOut,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withSequence,
  withDelay,
} from 'react-native-reanimated';
import { AnimatedYStack, AnimatedXStack } from '../utils/animatedComponents';

const Overlay = styled(YStack, {
  flex: 1,
  backgroundColor: 'rgba(0, 0, 0, 0.85)',
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
  maxWidth: 380,
  borderWidth: 3,
  borderColor: '$primary',
});

const IconContainer = styled(YStack, {
  width: 120,
  height: 120,
  borderRadius: 60,
  backgroundColor: '$primaryLight',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: '$md',
});

const Title = styled(TamaguiText, {
  fontSize: 24,
  fontWeight: 'bold',
  color: '$gray12',
  marginTop: '$sm',
  textAlign: 'center',
});

const AchievementName = styled(TamaguiText, {
  fontSize: 20,
  fontWeight: 'bold',
  color: '$primary',
  marginTop: '$xs',
  textAlign: 'center',
});

const Description = styled(TamaguiText, {
  fontSize: 14,
  color: '$gray10',
  marginTop: '$md',
  textAlign: 'center',
  lineHeight: 20,
});

const Divider = styled(YStack, {
  width: '100%',
  height: 1,
  backgroundColor: '$gray3',
  marginVertical: '$md',
});

const RewardSection = styled(YStack, {
  width: '100%',
  alignItems: 'center',
});

const RewardLabel = styled(TamaguiText, {
  fontSize: 14,
  color: '$gray10',
  marginBottom: '$sm',
});

const RewardValue = styled(TamaguiText, {
  fontSize: 28,
  fontWeight: 'bold',
  color: '$success',
});

const CloseButton = styled(YStack, {
  backgroundColor: '$primary',
  paddingHorizontal: '$xl',
  paddingVertical: '$md',
  borderRadius: '$lg',
  marginTop: '$lg',
  width: '100%',
  alignItems: 'center',
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

const StarContainer = styled(XStack, {
  gap: '$xs',
  marginTop: '$sm',
});

/**
 * Achievement unlock animation icons
 */
const achievementIcons = {
  workout: 'barbell',
  streak: 'flame',
  volume: 'trending-up',
  pr: 'trophy',
  consistency: 'calendar',
  endurance: 'fitness',
};

/**
 * AchievementUnlock Component
 * 
 * Displays an animated celebration when user unlocks an achievement.
 * Features:
 * - Animated icon with pulse effect
 * - Achievement details and rewards
 * - Star rating display
 * 
 * @param {boolean} visible - Controls modal visibility
 * @param {function} onClose - Callback when dismissed
 * @param {object} achievement - Achievement data
 */
export default function AchievementUnlock({ 
  visible, 
  onClose, 
  achievement = {} 
}) {
  const scale = useSharedValue(0);
  const rotation = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      // Animate icon with spring and rotation
      scale.value = withSequence(
        withSpring(1.2, { damping: 5 }),
        withSpring(1)
      );
      rotation.value = withSequence(
        withDelay(100, withSpring(10, { damping: 5 })),
        withSpring(-10, { damping: 5 }),
        withSpring(0, { damping: 8 })
      );
    } else {
      scale.value = 0;
      rotation.value = 0;
    }
  }, [visible]);

  const animatedIconStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { rotate: `${rotation.value}deg` },
    ],
  }));

  const {
    type = 'workout',
    name = 'First Workout',
    description = 'Complete your first workout',
    reward = null,
    stars = 1,
  } = achievement;

  const iconName = achievementIcons[type] || 'trophy';

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Overlay>
        <AnimatedYStack entering={FadeInUp.duration(400)} exiting={FadeOut.duration(200)}>
          <Content>
            <Title>🎊 Achievement Unlocked! 🎊</Title>
            
            <Animated.View style={animatedIconStyle}>
              <IconContainer>
                <Ionicons name={iconName} size={60} color="#FF6B35" />
              </IconContainer>
            </Animated.View>
            
            <AchievementName>{name}</AchievementName>
            
            <StarContainer>
              {[...Array(5)].map((_, index) => (
                <Ionicons
                  key={index}
                  name={index < stars ? 'star' : 'star-outline'}
                  size={24}
                  color={index < stars ? '#FFD700' : '#D4D4D4'}
                />
              ))}
            </StarContainer>
            
            <Description>{description}</Description>
            
            {reward && (
              <>
                <Divider />
                <RewardSection>
                  <RewardLabel>Reward</RewardLabel>
                  <RewardValue>{reward}</RewardValue>
                </RewardSection>
              </>
            )}
            
            <CloseButton onPress={onClose}>
              <CloseButtonText>Awesome!</CloseButtonText>
            </CloseButton>
          </Content>
        </AnimatedYStack>
      </Overlay>
    </Modal>
  );
}
