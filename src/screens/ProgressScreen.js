import React from 'react';
import { ScrollView } from 'react-native';
import { styled, YStack, XStack, Text as TamaguiText } from '@tamagui/core';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';

const AnimatedYStack = Animated.createAnimatedComponent(YStack);

const Container = styled(ScrollView, {
  flex: 1,
  backgroundColor: '$gray2',
});

const Header = styled(YStack, {
  padding: '$lg',
  backgroundColor: '$background',
  borderBottomWidth: 1,
  borderBottomColor: '$gray3',
});

const Title = styled(TamaguiText, {
  fontSize: 28,
  fontWeight: 'bold',
  color: '$gray12',
  marginBottom: '$xs',
});

const Subtitle = styled(TamaguiText, {
  fontSize: 16,
  color: '$gray10',
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

const CardTitle = styled(TamaguiText, {
  fontSize: 18,
  fontWeight: 'bold',
  color: '$gray12',
});

const ChartPlaceholder = styled(YStack, {
  height: 200,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '$gray2',
  borderRadius: '$md',
});

const PlaceholderText = styled(TamaguiText, {
  fontSize: 14,
  color: '$gray10',
  textAlign: 'center',
  marginTop: '$md',
  paddingHorizontal: '$lg',
});

export default function ProgressScreen() {
  return (
    <Container>
      <AnimatedYStack entering={FadeInDown.springify()}>
        <Header>
          <Title>Your Progress</Title>
          <Subtitle>Track your fitness journey</Subtitle>
        </Header>
      </AnimatedYStack>

      <AnimatedYStack entering={FadeInDown.delay(100).springify()}>
        <Card>
          <CardHeader>
            <Ionicons name="trending-up" size={24} color="#FF6B35" />
            <CardTitle>Volume Over Time</CardTitle>
          </CardHeader>
          <ChartPlaceholder>
            <Ionicons name="bar-chart" size={80} color="#D4D4D4" />
            <PlaceholderText>Chart will be implemented with Victory Native</PlaceholderText>
          </ChartPlaceholder>
        </Card>
      </AnimatedYStack>

      <AnimatedYStack entering={FadeInDown.delay(200).springify()}>
        <Card>
          <CardHeader>
            <Ionicons name="barbell" size={24} color="#FF6B35" />
            <CardTitle>Estimated 1RM Progress</CardTitle>
          </CardHeader>
          <E1RMList>
            <E1RMItem>
              <ExerciseName>Squat</ExerciseName>
              <E1RMValue>140 kg</E1RMValue>
              <ChangeContainer>
                <Ionicons name="arrow-up" size={16} color="#22C55E" />
                <ChangeText>+5kg</ChangeText>
              </ChangeContainer>
            </E1RMItem>
            <E1RMItem>
              <ExerciseName>Bench Press</ExerciseName>
              <E1RMValue>100 kg</E1RMValue>
              <ChangeContainer>
                <Ionicons name="arrow-up" size={16} color="#22C55E" />
                <ChangeText>+2.5kg</ChangeText>
              </ChangeContainer>
            </E1RMItem>
            <E1RMItem>
              <ExerciseName>Deadlift</ExerciseName>
              <E1RMValue>180 kg</E1RMValue>
              <ChangeContainer>
                <Ionicons name="arrow-up" size={16} color="#22C55E" />
                <ChangeText>+10kg</ChangeText>
              </ChangeContainer>
            </E1RMItem>
          </E1RMList>
        </Card>
      </AnimatedYStack>

      <AnimatedYStack entering={FadeInDown.delay(300).springify()}>
        <Card>
          <CardHeader>
            <Ionicons name="calendar" size={24} color="#FF6B35" />
            <CardTitle>Weekly Summary</CardTitle>
          </CardHeader>
          <SummaryGrid>
            <SummaryItem>
              <SummaryValue>4</SummaryValue>
              <SummaryLabel>Workouts</SummaryLabel>
            </SummaryItem>
            <SummaryItem>
              <SummaryValue>180</SummaryValue>
              <SummaryLabel>Sets</SummaryLabel>
            </SummaryItem>
            <SummaryItem>
              <SummaryValue>12,450</SummaryValue>
              <SummaryLabel>Total Volume</SummaryLabel>
            </SummaryItem>
            <SummaryItem>
              <SummaryValue>8.2</SummaryValue>
              <SummaryLabel>Avg RPE</SummaryLabel>
            </SummaryItem>
          </SummaryGrid>
        </Card>
      </AnimatedYStack>
    </Container>
  );
}

const E1RMList = styled(YStack, {
  gap: '$md',
});

const E1RMItem = styled(XStack, {
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingVertical: '$sm',
  borderBottomWidth: 1,
  borderBottomColor: '$gray3',
});

const ExerciseName = styled(TamaguiText, {
  fontSize: 16,
  color: '$gray12',
  flex: 1,
});

const E1RMValue = styled(TamaguiText, {
  fontSize: 18,
  fontWeight: 'bold',
  color: '$gray12',
  marginRight: '$md',
});

const ChangeContainer = styled(XStack, {
  alignItems: 'center',
  gap: 4,
});

const ChangeText = styled(TamaguiText, {
  fontSize: 14,
  color: '$success',
  fontWeight: '600',
});

const SummaryGrid = styled(XStack, {
  flexWrap: 'wrap',
  gap: '$md',
});

const SummaryItem = styled(YStack, {
  flex: 1,
  minWidth: '45%',
  alignItems: 'center',
  padding: '$md',
  backgroundColor: '$gray2',
  borderRadius: '$md',
});

const SummaryValue = styled(TamaguiText, {
  fontSize: 28,
  fontWeight: 'bold',
  color: '$primary',
  marginBottom: '$xs',
});

const SummaryLabel = styled(TamaguiText, {
  fontSize: 14,
  color: '$gray10',
});
