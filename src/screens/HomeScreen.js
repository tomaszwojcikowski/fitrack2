import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { styled, YStack, XStack, Text as TamaguiText } from '@tamagui/core';
import { Ionicons } from '@expo/vector-icons';
import { 
  useAnimatedStyle, 
  useSharedValue, 
  withSpring, 
  withDelay,
  withTiming,
  Easing
} from 'react-native-reanimated';
import { AchievementUnlock } from '../components';
import { AnimatedYStack, AnimatedXStack } from '../utils/animatedComponents';
import { database } from '../database';
import { Q } from '@nozbe/watermelondb';
import { calculateTotalVolume, calculateAverageRPE } from '../utils/e1rmCalculations';

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
  const [showAchievement, setShowAchievement] = useState(false);
  const [stats, setStats] = useState({
    monthlyWorkouts: 0,
    totalVolume: 0,
    avgRPE: 0,
    loading: true,
  });
  const [recentActivity, setRecentActivity] = useState([]);
  
  const headerOpacity = useSharedValue(0);
  const cardScale = useSharedValue(0.9);
  const statsOpacity = useSharedValue(0);

  useEffect(() => {
    headerOpacity.value = withTiming(1, { duration: 500, easing: Easing.ease });
    cardScale.value = withSpring(1, { damping: 15 });
    statsOpacity.value = withDelay(200, withTiming(1, { duration: 500 }));
    
    loadStats();
    loadRecentActivity();
    
    // Demo: Show achievement after 2 seconds
    const timer = setTimeout(() => {
      setShowAchievement(true);
    }, 2000);
    
    return () => clearTimeout(timer);
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

  async function loadStats() {
    try {
      const workoutLogsCollection = database.collections.get('workout_logs');
      const loggedSetsCollection = database.collections.get('logged_sets');

      // Get workouts from this month
      const now = new Date();
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).getTime();
      const monthlyWorkouts = await workoutLogsCollection
        .query(
          Q.where('completed_at', Q.notEq(null)),
          Q.where('started_at', Q.gte(startOfMonth))
        )
        .fetch();

      // Get sets from last 7 days for average RPE
      const sevenDaysAgo = Date.now() - (7 * 24 * 60 * 60 * 1000);
      const recentWorkouts = await workoutLogsCollection
        .query(
          Q.where('completed_at', Q.notEq(null)),
          Q.where('started_at', Q.gte(sevenDaysAgo))
        )
        .fetch();

      let allRecentSets = [];
      for (const workout of recentWorkouts) {
        const sets = await loggedSetsCollection
          .query(Q.where('workout_log_id', workout.id))
          .fetch();
        allRecentSets.push(...sets);
      }

      // Calculate total volume this month
      let allMonthlySets = [];
      for (const workout of monthlyWorkouts) {
        const sets = await loggedSetsCollection
          .query(Q.where('workout_log_id', workout.id))
          .fetch();
        allMonthlySets.push(...sets);
      }

      const totalVolume = calculateTotalVolume(allMonthlySets);
      const avgRPE = calculateAverageRPE(allRecentSets);

      setStats({
        monthlyWorkouts: monthlyWorkouts.length,
        totalVolume: Math.round(totalVolume),
        avgRPE: avgRPE > 0 ? avgRPE.toFixed(1) : '-',
        loading: false,
      });
    } catch (error) {
      console.error('Error loading stats:', error);
      setStats({
        monthlyWorkouts: 0,
        totalVolume: 0,
        avgRPE: '-',
        loading: false,
      });
    }
  }

  async function loadRecentActivity() {
    try {
      const workoutLogsCollection = database.collections.get('workout_logs');
      const recentWorkouts = await workoutLogsCollection
        .query(
          Q.where('completed_at', Q.notEq(null)),
          Q.sortBy('completed_at', Q.desc)
        )
        .fetch();

      const activities = recentWorkouts.slice(0, 2).map(workout => {
        const completedDate = new Date(workout.completedAt);
        const now = new Date();
        const hoursAgo = Math.floor((now - completedDate) / (1000 * 60 * 60));
        
        let timeAgo;
        if (hoursAgo < 1) {
          timeAgo = 'Just now';
        } else if (hoursAgo < 24) {
          timeAgo = `${hoursAgo} hour${hoursAgo > 1 ? 's' : ''} ago`;
        } else {
          const daysAgo = Math.floor(hoursAgo / 24);
          timeAgo = daysAgo === 1 ? 'Yesterday' : `${daysAgo} days ago`;
        }

        return {
          id: workout.id,
          type: 'workout',
          title: 'Completed: Workout Session',
          timeAgo,
        };
      });

      setRecentActivity(activities);
    } catch (error) {
      console.error('Error loading recent activity:', error);
      setRecentActivity([]);
    }
  }

  const todayWorkout = {
    name: 'Workout Session',
    exercises: 3,
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
                {stats.loading ? '...' : stats.monthlyWorkouts}
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
                {stats.loading ? '...' : stats.totalVolume.toLocaleString()}
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
                {stats.loading ? '...' : stats.avgRPE}
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
          {recentActivity.length > 0 ? (
            recentActivity.map((activity, index) => (
              <ActivityItem key={activity.id} style={{ borderBottomWidth: index === recentActivity.length - 1 ? 0 : 1 }}>
                <YStack marginRight="$sm">
                  <Ionicons name="checkmark-circle" size={24} color="#22C55E" />
                </YStack>
                <YStack flex={1}>
                  <TamaguiText fontSize={14} fontWeight="600" color="$text" marginBottom="$xs">
                    {activity.title}
                  </TamaguiText>
                  <TamaguiText fontSize={12} color="$textLight">
                    {activity.timeAgo}
                  </TamaguiText>
                </YStack>
              </ActivityItem>
            ))
          ) : (
            <YStack padding="$lg" alignItems="center">
              <Ionicons name="fitness-outline" size={48} color="#ccc" style={{ marginBottom: 8 }} />
              <TamaguiText fontSize={14} color="$textLight" textAlign="center">
                No workouts yet. Start your first workout to see your activity here!
              </TamaguiText>
            </YStack>
          )}
        </Card>

        <AchievementUnlock
          visible={showAchievement}
          onClose={() => setShowAchievement(false)}
          achievement={{
            type: 'streak',
            name: '7 Day Streak',
            description: 'You\'ve worked out for 7 days in a row! Keep up the amazing consistency.',
            reward: '+50 XP',
            stars: 3,
          }}
        />
      </Container>
    </ScrollView>
  );
}
