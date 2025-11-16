import React, { useMemo } from 'react';
import { ScrollView, Dimensions } from 'react-native';
import { styled, YStack, XStack, Text as TamaguiText } from '@tamagui/core';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { CartesianChart, Line, Bar, useChartPressState } from 'victory-native';
import { LinearGradient, vec, Circle, useFont } from '@shopify/react-native-skia';

const AnimatedYStack = Animated.createAnimatedComponent(YStack);
const { width: SCREEN_WIDTH } = Dimensions.get('window');

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

const ChartContainer = styled(YStack, {
  height: 220,
  width: '100%',
  backgroundColor: '$gray2',
  borderRadius: '$md',
  padding: '$sm',
});

const ChartLabel = styled(TamaguiText, {
  fontSize: 12,
  color: '$gray10',
  marginTop: '$xs',
  textAlign: 'center',
});

// Generate sample data for demonstration
const generateVolumeData = () => {
  const weeks = ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'];
  return weeks.map((week, index) => ({
    week: index + 1,
    label: week,
    volume: 8000 + Math.random() * 4000 + index * 1000,
  }));
};

const generateE1RMData = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  return months.map((month, index) => ({
    month: index + 1,
    label: month,
    squat: 120 + index * 3.5 + Math.random() * 5,
    bench: 85 + index * 2 + Math.random() * 3,
    deadlift: 155 + index * 4 + Math.random() * 5,
  }));
};

export default function ProgressScreen() {
  const volumeData = useMemo(() => generateVolumeData(), []);
  const e1rmData = useMemo(() => generateE1RMData(), []);
  
  const { state: volumeState, isActive: volumeActive } = useChartPressState({
    x: 0,
    y: { volume: 0 },
  });

  const { state: e1rmState, isActive: e1rmActive } = useChartPressState({
    x: 0,
    y: { squat: 0, bench: 0, deadlift: 0 },
  });

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
          <ChartContainer>
            <CartesianChart
              data={volumeData}
              xKey="week"
              yKeys={["volume"]}
              domainPadding={{ left: 20, right: 20, top: 30 }}
              chartPressState={volumeState}
            >
              {({ points, chartBounds }) => (
                <>
                  <Bar
                    points={points.volume}
                    chartBounds={chartBounds}
                    color="#FF6B35"
                    barWidth={24}
                    roundedCorners={{
                      topLeft: 4,
                      topRight: 4,
                    }}
                  >
                    <LinearGradient
                      start={vec(0, 0)}
                      end={vec(0, chartBounds.bottom)}
                      colors={["#FF6B35", "#FF8C5A"]}
                    />
                  </Bar>
                  {volumeActive && (
                    <Circle
                      cx={volumeState.x.position}
                      cy={volumeState.y.volume.position}
                      r={8}
                      color="#FF6B35"
                      opacity={0.8}
                    />
                  )}
                </>
              )}
            </CartesianChart>
            {volumeActive && (
              <ChartLabel>
                Week {Math.round(volumeState.x.value)}: {Math.round(volumeState.y.volume.value)} kg
              </ChartLabel>
            )}
          </ChartContainer>
        </Card>
      </AnimatedYStack>

      <AnimatedYStack entering={FadeInDown.delay(200).springify()}>
        <Card>
          <CardHeader>
            <Ionicons name="barbell" size={24} color="#FF6B35" />
            <CardTitle>Estimated 1RM Progress</CardTitle>
          </CardHeader>
          <ChartContainer>
            <CartesianChart
              data={e1rmData}
              xKey="month"
              yKeys={["squat", "bench", "deadlift"]}
              domainPadding={{ left: 15, right: 15, top: 30 }}
              chartPressState={e1rmState}
            >
              {({ points }) => (
                <>
                  <Line
                    points={points.squat}
                    color="#FF6B35"
                    strokeWidth={3}
                    curveType="natural"
                  />
                  <Line
                    points={points.bench}
                    color="#004E89"
                    strokeWidth={3}
                    curveType="natural"
                  />
                  <Line
                    points={points.deadlift}
                    color="#00D9C0"
                    strokeWidth={3}
                    curveType="natural"
                  />
                  {e1rmActive && (
                    <>
                      <Circle
                        cx={e1rmState.x.position}
                        cy={e1rmState.y.squat.position}
                        r={6}
                        color="#FF6B35"
                      />
                      <Circle
                        cx={e1rmState.x.position}
                        cy={e1rmState.y.bench.position}
                        r={6}
                        color="#004E89"
                      />
                      <Circle
                        cx={e1rmState.x.position}
                        cy={e1rmState.y.deadlift.position}
                        r={6}
                        color="#00D9C0"
                      />
                    </>
                  )}
                </>
              )}
            </CartesianChart>
            {e1rmActive && (
              <XStack gap="$md" justifyContent="center" marginTop="$xs">
                <ChartLabel style={{ color: '#FF6B35' }}>
                  Squat: {Math.round(e1rmState.y.squat.value)} kg
                </ChartLabel>
                <ChartLabel style={{ color: '#004E89' }}>
                  Bench: {Math.round(e1rmState.y.bench.value)} kg
                </ChartLabel>
                <ChartLabel style={{ color: '#00D9C0' }}>
                  DL: {Math.round(e1rmState.y.deadlift.value)} kg
                </ChartLabel>
              </XStack>
            )}
          </ChartContainer>
          <XStack gap="$md" justifyContent="center" marginTop="$md">
            <LegendItem>
              <LegendDot style={{ backgroundColor: '#FF6B35' }} />
              <LegendText>Squat</LegendText>
            </LegendItem>
            <LegendItem>
              <LegendDot style={{ backgroundColor: '#004E89' }} />
              <LegendText>Bench Press</LegendText>
            </LegendItem>
            <LegendItem>
              <LegendDot style={{ backgroundColor: '#00D9C0' }} />
              <LegendText>Deadlift</LegendText>
            </LegendItem>
          </XStack>
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

const LegendItem = styled(XStack, {
  alignItems: 'center',
  gap: '$xs',
});

const LegendDot = styled(YStack, {
  width: 12,
  height: 12,
  borderRadius: 6,
});

const LegendText = styled(TamaguiText, {
  fontSize: 12,
  color: '$gray11',
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
