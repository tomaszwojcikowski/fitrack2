import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Platform } from 'react-native';

// Import screens
import HomeScreen from '../screens/HomeScreen';
import WorkoutScreen from '../screens/WorkoutScreen';
import ProgressScreen from '../screens/ProgressScreen';
import ExerciseLibraryScreen from '../screens/ExerciseLibraryScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

// Configure linking for web with base path support
const linking = {
  prefixes: ['https://tomaszwojcikowski.github.io/fitrack2', 'http://localhost:8081'],
  config: {
    screens: {
      Home: '',
      Workout: 'workout',
      Progress: 'progress',
      Library: 'library',
      Profile: 'profile',
    },
  },
};

export default function Navigation() {
  return (
    <NavigationContainer linking={Platform.OS === 'web' ? linking : undefined}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Workout') {
              iconName = focused ? 'barbell' : 'barbell-outline';
            } else if (route.name === 'Progress') {
              iconName = focused ? 'stats-chart' : 'stats-chart-outline';
            } else if (route.name === 'Library') {
              iconName = focused ? 'library' : 'library-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'person' : 'person-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#FF6B35',
          tabBarInactiveTintColor: '#737373',
          headerStyle: {
            backgroundColor: '#FF6B35',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        })}
      >
        <Tab.Screen 
          name="Home" 
          component={HomeScreen}
          options={{ title: 'FiTrack2' }}
        />
        <Tab.Screen 
          name="Workout" 
          component={WorkoutScreen}
          options={{ title: 'Workout Logger' }}
        />
        <Tab.Screen 
          name="Progress" 
          component={ProgressScreen}
          options={{ title: 'Progress' }}
        />
        <Tab.Screen 
          name="Library" 
          component={ExerciseLibraryScreen}
          options={{ title: 'Exercise Library' }}
        />
        <Tab.Screen 
          name="Profile" 
          component={ProfileScreen}
          options={{ title: 'Profile' }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
