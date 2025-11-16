// Seed data for the exercise library
export const seedExercises = [
  // Leg Exercises
  {
    name: 'Barbell Squat',
    description: 'A fundamental compound exercise targeting the quadriceps, hamstrings, and glutes.',
    category: 'Legs',
    videoUrl: null,
    isCustom: false,
  },
  {
    name: 'Romanian Deadlift',
    description: 'Hip hinge movement targeting hamstrings and glutes.',
    category: 'Legs',
    videoUrl: null,
    isCustom: false,
  },
  {
    name: 'Leg Press',
    description: 'Machine exercise for overall leg development.',
    category: 'Legs',
    videoUrl: null,
    isCustom: false,
  },
  {
    name: 'Walking Lunges',
    description: 'Unilateral leg exercise for strength and balance.',
    category: 'Legs',
    videoUrl: null,
    isCustom: false,
  },
  {
    name: 'Leg Curl',
    description: 'Isolation exercise for hamstrings.',
    category: 'Legs',
    videoUrl: null,
    isCustom: false,
  },

  // Chest Exercises
  {
    name: 'Barbell Bench Press',
    description: 'The king of upper body pressing exercises.',
    category: 'Chest',
    videoUrl: null,
    isCustom: false,
  },
  {
    name: 'Incline Dumbbell Press',
    description: 'Targets upper chest fibers.',
    category: 'Chest',
    videoUrl: null,
    isCustom: false,
  },
  {
    name: 'Dumbbell Flyes',
    description: 'Chest isolation exercise.',
    category: 'Chest',
    videoUrl: null,
    isCustom: false,
  },
  {
    name: 'Push-ups',
    description: 'Classic bodyweight chest exercise.',
    category: 'Chest',
    videoUrl: null,
    isCustom: false,
  },
  {
    name: 'Cable Crossover',
    description: 'Cable exercise for chest definition.',
    category: 'Chest',
    videoUrl: null,
    isCustom: false,
  },

  // Back Exercises
  {
    name: 'Bent Over Row',
    description: 'Compound back exercise for thickness.',
    category: 'Back',
    videoUrl: null,
    isCustom: false,
  },
  {
    name: 'Pull-ups',
    description: 'Classic bodyweight back exercise.',
    category: 'Back',
    videoUrl: null,
    isCustom: false,
  },
  {
    name: 'Lat Pulldown',
    description: 'Machine alternative to pull-ups.',
    category: 'Back',
    videoUrl: null,
    isCustom: false,
  },
  {
    name: 'Seated Cable Row',
    description: 'Mid-back rowing movement.',
    category: 'Back',
    videoUrl: null,
    isCustom: false,
  },
  {
    name: 'T-Bar Row',
    description: 'Compound back exercise for overall development.',
    category: 'Back',
    videoUrl: null,
    isCustom: false,
  },

  // Shoulder Exercises
  {
    name: 'Overhead Press',
    description: 'Primary shoulder pressing movement.',
    category: 'Shoulders',
    videoUrl: null,
    isCustom: false,
  },
  {
    name: 'Lateral Raises',
    description: 'Isolation exercise for side delts.',
    category: 'Shoulders',
    videoUrl: null,
    isCustom: false,
  },
  {
    name: 'Front Raises',
    description: 'Targets anterior deltoids.',
    category: 'Shoulders',
    videoUrl: null,
    isCustom: false,
  },
  {
    name: 'Rear Delt Flyes',
    description: 'Isolation for posterior deltoids.',
    category: 'Shoulders',
    videoUrl: null,
    isCustom: false,
  },
  {
    name: 'Arnold Press',
    description: 'Dumbbell shoulder press variation.',
    category: 'Shoulders',
    videoUrl: null,
    isCustom: false,
  },

  // Arm Exercises
  {
    name: 'Barbell Curl',
    description: 'Classic bicep mass builder.',
    category: 'Arms',
    videoUrl: null,
    isCustom: false,
  },
  {
    name: 'Tricep Dips',
    description: 'Compound tricep exercise.',
    category: 'Arms',
    videoUrl: null,
    isCustom: false,
  },
  {
    name: 'Hammer Curls',
    description: 'Targets brachialis and forearms.',
    category: 'Arms',
    videoUrl: null,
    isCustom: false,
  },
  {
    name: 'Skull Crushers',
    description: 'Isolation exercise for triceps.',
    category: 'Arms',
    videoUrl: null,
    isCustom: false,
  },
  {
    name: 'Cable Tricep Pushdown',
    description: 'Cable isolation for triceps.',
    category: 'Arms',
    videoUrl: null,
    isCustom: false,
  },
];

export const categories = [
  { name: 'Legs', description: 'Lower body exercises' },
  { name: 'Chest', description: 'Chest exercises' },
  { name: 'Back', description: 'Back exercises' },
  { name: 'Shoulders', description: 'Shoulder exercises' },
  { name: 'Arms', description: 'Arm exercises' },
];

// Exercise substitutions - exercises that can substitute for each other
export const exerciseSubstitutions = [
  // Chest substitutions
  { exercise1: 'Barbell Bench Press', exercise2: 'Dumbbell Flyes' },
  { exercise1: 'Barbell Bench Press', exercise2: 'Push-ups' },
  { exercise1: 'Incline Dumbbell Press', exercise2: 'Barbell Bench Press' },
  { exercise1: 'Push-ups', exercise2: 'Cable Crossover' },
  
  // Back substitutions
  { exercise1: 'Pull-ups', exercise2: 'Lat Pulldown' },
  { exercise1: 'Bent Over Row', exercise2: 'T-Bar Row' },
  { exercise1: 'Bent Over Row', exercise2: 'Seated Cable Row' },
  { exercise1: 'Lat Pulldown', exercise2: 'Seated Cable Row' },
  
  // Leg substitutions
  { exercise1: 'Barbell Squat', exercise2: 'Leg Press' },
  { exercise1: 'Romanian Deadlift', exercise2: 'Leg Curl' },
  { exercise1: 'Walking Lunges', exercise2: 'Leg Press' },
  
  // Shoulder substitutions
  { exercise1: 'Overhead Press', exercise2: 'Arnold Press' },
  { exercise1: 'Lateral Raises', exercise2: 'Front Raises' },
  
  // Arm substitutions
  { exercise1: 'Barbell Curl', exercise2: 'Hammer Curls' },
  { exercise1: 'Tricep Dips', exercise2: 'Skull Crushers' },
  { exercise1: 'Skull Crushers', exercise2: 'Cable Tricep Pushdown' },
];

// Sample workout program following the development plan
export const sampleProgram = {
  name: 'Beginner Strength Program',
  description: 'A 4-week program designed for building foundational strength across all major muscle groups.',
  phases: [
    {
      name: 'Foundation Phase',
      order: 1,
      workouts: [
        {
          name: 'Upper Body Push',
          dayOfWeek: 1, // Monday
          exercises: [
            {
              exerciseName: 'Barbell Bench Press',
              order: 1,
              sets: '4',
              repsPrescribed: '8-10',
              restPrescribedSeconds: 120,
              rpeTarget: 7,
            },
            {
              exerciseName: 'Incline Dumbbell Press',
              order: 2,
              sets: '3',
              repsPrescribed: '10-12',
              restPrescribedSeconds: 90,
              rpeTarget: 7,
            },
            {
              exerciseName: 'Overhead Press',
              order: 3,
              sets: '3',
              repsPrescribed: '8-10',
              restPrescribedSeconds: 90,
              rpeTarget: 7,
            },
            {
              exerciseName: 'Lateral Raises',
              order: 4,
              sets: '3',
              repsPrescribed: '12-15',
              restPrescribedSeconds: 60,
              rpeTarget: 8,
            },
          ],
        },
        {
          name: 'Lower Body',
          dayOfWeek: 3, // Wednesday
          exercises: [
            {
              exerciseName: 'Barbell Squat',
              order: 1,
              sets: '4',
              repsPrescribed: '8-10',
              restPrescribedSeconds: 180,
              rpeTarget: 7,
            },
            {
              exerciseName: 'Romanian Deadlift',
              order: 2,
              sets: '3',
              repsPrescribed: '10-12',
              restPrescribedSeconds: 120,
              rpeTarget: 7,
            },
            {
              exerciseName: 'Leg Press',
              order: 3,
              sets: '3',
              repsPrescribed: '12-15',
              restPrescribedSeconds: 90,
              rpeTarget: 8,
            },
            {
              exerciseName: 'Leg Curl',
              order: 4,
              sets: '3',
              repsPrescribed: '12-15',
              restPrescribedSeconds: 60,
              rpeTarget: 8,
            },
          ],
        },
        {
          name: 'Upper Body Pull',
          dayOfWeek: 5, // Friday
          exercises: [
            {
              exerciseName: 'Pull-ups',
              order: 1,
              sets: '4',
              repsPrescribed: '6-8',
              restPrescribedSeconds: 120,
              rpeTarget: 8,
            },
            {
              exerciseName: 'Bent Over Row',
              order: 2,
              sets: '4',
              repsPrescribed: '8-10',
              restPrescribedSeconds: 90,
              rpeTarget: 7,
            },
            {
              exerciseName: 'Seated Cable Row',
              order: 3,
              sets: '3',
              repsPrescribed: '10-12',
              restPrescribedSeconds: 90,
              rpeTarget: 7,
            },
            {
              exerciseName: 'Barbell Curl',
              order: 4,
              sets: '3',
              repsPrescribed: '10-12',
              restPrescribedSeconds: 60,
              rpeTarget: 8,
            },
          ],
        },
      ],
    },
  ],
};
