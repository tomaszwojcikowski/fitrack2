import React, { useEffect } from 'react';
import { ScrollView } from 'react-native';
import { styled, YStack, XStack, Text as TamaguiText } from '@tamagui/core';
import { Ionicons } from '@expo/vector-icons';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withSpring, 
  withDelay,
  withTiming,
  Easing
} from 'react-native-reanimated';

const AnimatedYStack = Animated.createAnimatedComponent(YStack);
const AnimatedXStack = Animated.createAnimatedComponent(XStack);

const Container = styled(YStack, {
  flex: 1,
  backgroundColor: '$gray2',
});

const Header = styled(YStack, {
  padding: '$lg',
  backgroundColor: '$background',
  borderBottomWidth: 1,
  borderBottomColor: '$gray3',
});

const Card = styled(YStack, {
  backgroundColor: '$background',
  margin: '$md',
  padding: '$lg',
  borderRadius: '$lg',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 8,
  elevation: 3,
});

const CardHeader = styled(XStack, {
  alignItems: 'center',
  marginBottom: '$md',
  gap: '$sm',
});

const StartButton = styled(XStack, {
  backgroundColor: '$primary',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '$md',
  borderRadius: '$md',
  gap: '$sm',
  pressStyle: {
    backgroundColor: '$primaryDark',
    scale: 0.98,
  },
});

const StatsContainer = styled(XStack, {
  marginHorizontal: '$md',
  gap: '$sm',
  marginBottom: '$md',
});

const StatCard = styled(YStack, {
  flex: 1,
  backgroundColor: '$background',
  padding: '$md',
  borderRadius: '$md',
  alignItems: 'center',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 8,
  elevation: 3,
});

const ActivityItem = styled(XStack, {
  alignItems: 'center',
  paddingVertical: '$sm',
  borderBottomWidth: 1,
  borderBottomColor: '$gray3',
});

export default function HomeScreen({ navigation }) {
  const headerOpacity = useSharedValue(0);
  const cardScale = useSharedValue(0.9);
  const statsOpacity = useSharedValue(0);

  useEffect(() => {
    headerOpacity.value = withTiming(1, { duration: 500, easing: Easing.ease });
    cardScale.value = withSpring(1, { damping: 15 });
    statsOpacity.value = withDelay(200, withTiming(1, { duration: 500 }));
  }, []);

  const headerAnimStyle = useAnimatedStyle(() => ({
    opacity: headerOpacity.value,
  }));

  const cardAnimStyle = useAnimatedStyle(() => ({
    transform: [{ scale: cardScale.value }],
  }));

  const statsAnimStyle = useAnimatedStyle(() => ({
    opacity: statsOpacity.value,
  }));

  const todayWorkout = {
    name: 'Upper Body - Day 1',
    exercises: 5,
    duration: '45 min',
  };

  return (
    <ScrollView>
      <Container>
        <AnimatedYStack style={headerAnimStyle}>
          <Header>
            <TamaguiText fontSize={28} fontWeight="bold" color="$text" marginBottom="$xs">
              Welcome to FiTrack2!
            </TamaguiText>
            <TamaguiText fontSize={16} color="$textLight">
              Your fitness journey starts here
            </TamaguiText>
          </Header>
        </AnimatedYStack>

        <AnimatedYStack style={cardAnimStyle}>
          <Card>
            <CardHeader>
              <Ionicons name="barbell" size={32} color="#FF6B35" />
              <TamaguiText fontSize={20} fontWeight="bold" color="$text">
                Today's Workout
              </TamaguiText>
            </CardHeader>
            <YStack marginBottom="$md">
              <TamaguiText fontSize={18} fontWeight="600" color="$text" marginBottom="$sm">
                {todayWorkout.name}
              </TamaguiText>
              <XStack gap="$md">
                <XStack alignItems="center" gap="$xs">
                  <Ionicons name="fitness" size={16} color="#666" />
                  <TamaguiText fontSize={14} color="$textLight">
                    {todayWorkout.exercises} exercises
                  </TamaguiText>
                </XStack>
                <XStack alignItems="center" gap="$xs">
                  <Ionicons name="time" size={16} color="#666" />
                  <TamaguiText fontSize={14} color="$textLight">
                    {todayWorkout.duration}
                  </TamaguiText>
                </XStack>
              </XStack>
            </YStack>
            <StartButton onPress={() => navigation.navigate('Workout')}>
              <TamaguiText color="#FFF" fontSize={16} fontWeight="bold">
                Start Workout
              </TamaguiText>
              <Ionicons name="arrow-forward" size={20} color="#FFF" />
            </StartButton>
          </Card>
        </AnimatedYStack>

        <AnimatedXStack style={statsAnimStyle}>
          <StatsContainer>
            <StatCard>
              <TamaguiText fontSize={24} fontWeight="bold" color="$primary" marginBottom="$xs">
                12
              </TamaguiText>
              <TamaguiText fontSize={12} fontWeight="600" color="$text" marginBottom={2}>
                Workouts
              </TamaguiText>
              <TamaguiText fontSize={10} color="$textLight">
                This Month
              </TamaguiText>
            </StatCard>
            <StatCard>
              <TamaguiText fontSize={24} fontWeight="bold" color="$primary" marginBottom="$xs">
                4,320
              </TamaguiText>
              <TamaguiText fontSize={12} fontWeight="600" color="$text" marginBottom={2}>
                Total Volume
              </TamaguiText>
              <TamaguiText fontSize={10} color="$textLight">
                kg Lifted
              </TamaguiText>
            </StatCard>
            <StatCard>
              <TamaguiText fontSize={24} fontWeight="bold" color="$primary" marginBottom="$xs">
                8.5
              </TamaguiText>
              <TamaguiText fontSize={12} fontWeight="600" color="$text" marginBottom={2}>
                Avg RPE
              </TamaguiText>
              <TamaguiText fontSize={10} color="$textLight">
                Last 7 Days
              </TamaguiText>
            </StatCard>
          </StatsContainer>
        </AnimatedXStack>

        <Card>
          <TamaguiText fontSize={20} fontWeight="bold" color="$text" marginBottom="$md">
            Recent Activity
          </TamaguiText>
          <ActivityItem>
            <YStack marginRight="$sm">
              <Ionicons name="checkmark-circle" size={24} color="#22C55E" />
            </YStack>
            <YStack flex={1}>
              <TamaguiText fontSize={14} fontWeight="600" color="$text" marginBottom="$xs">
                Completed: Full Body Workout
              </TamaguiText>
              <TamaguiText fontSize={12} color="$textLight">
                2 hours ago
              </TamaguiText>
            </YStack>
          </ActivityItem>
          <ActivityItem>
            <YStack marginRight="$sm">
              <Ionicons name="trophy" size={24} color="#F59E0B" />
            </YStack>
            <YStack flex={1}>
              <TamaguiText fontSize={14} fontWeight="600" color="$text" marginBottom="$xs">
                New PR: Squat 140kg
              </TamaguiText>
              <TamaguiText fontSize={12} color="$textLight">
                Yesterday
              </TamaguiText>
            </YStack>
          </ActivityItem>
        </Card>
      </Container>
    </ScrollView>
  );
}
