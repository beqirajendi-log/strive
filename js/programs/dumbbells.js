PROGRAMS['dumbbells'] = {
  id: 'dumbbells',
  name: 'Dumbbell PPL',
  weeks: 8,
  days: 3,
  totalWeeks: 8,
  daysPerWeek: 3,
  difficulty: 'beginner',
  progressionType: 'fixed',
  feedbackType: 'none',
  focusTags: ['hypertrophy', 'home', 'dumbbell'],
  description: 'A dumbbell-only Push/Pull/Legs program for lifters training at home or without barbell access. Uses double progression — work up to 12 reps on all 3 sets, then increase the weight. Runs as a 3-day or 6-day cycle.',
  whoIsItFor: 'Beginners and early intermediates who only have access to dumbbells, a bench, and a pull-up bar. If you have barbell access, consider a barbell program instead.',
  equipment: ['Adjustable dumbbells', 'Bench', 'Pull-up bar'],
  weeks_data: {}
};

(function() {
  const pushDay = {
    label: 'Push',
    notes: 'Start lighter than you think. Volume adds up fast across 5 exercises — pick a weight where you can hit at least 8 clean reps per set.',
    exercises: [
      { name: 'Dumbbell Chest Press',        tier: 'main', sets: [{ reps: 12, amrap: true }, { reps: 12, amrap: true }, { reps: 12, amrap: true }] },
      { name: 'Incline Dumbbell Fly',         tier: 'main', sets: [{ reps: 12, amrap: true }, { reps: 12, amrap: true }, { reps: 12, amrap: true }] },
      { name: 'Arnold Press',                 tier: 'main', sets: [{ reps: 12, amrap: true }, { reps: 12, amrap: true }, { reps: 12, amrap: true }] },
      { name: 'Overhead Tricep Extension',    tier: 'main', sets: [{ reps: 12, amrap: true }, { reps: 12, amrap: true }, { reps: 12, amrap: true }] },
      { name: 'Hanging Leg Raise',            tier: 'main', sets: [{ reps: 12, amrap: true }, { reps: 12, amrap: true }, { reps: 12, amrap: true }] }
    ]
  };

  const pullDay = {
    label: 'Pull',
    notes: 'Pull-ups too easy? Hold a dumbbell between your feet to add load. Same concept for hanging leg raises.',
    exercises: [
      { name: 'Pull-ups',                     tier: 'main', sets: [{ reps: 12, amrap: true }, { reps: 12, amrap: true }, { reps: 12, amrap: true }] },
      { name: 'Bent-over Dumbbell Row',       tier: 'main', sets: [{ reps: 12, amrap: true }, { reps: 12, amrap: true }, { reps: 12, amrap: true }] },
      { name: 'Reverse Fly',                  tier: 'main', sets: [{ reps: 12, amrap: true }, { reps: 12, amrap: true }, { reps: 12, amrap: true }] },
      { name: 'Dumbbell Bicep Curl',          tier: 'main', sets: [{ reps: 12, amrap: true }, { reps: 12, amrap: true }, { reps: 12, amrap: true }] },
      { name: 'Dumbbell Shrug',               tier: 'main', sets: [{ reps: 12, amrap: true }, { reps: 12, amrap: true }, { reps: 12, amrap: true }] },
      { name: 'Hanging Leg Raise',            tier: 'main', sets: [{ reps: 12, amrap: true }, { reps: 12, amrap: true }, { reps: 12, amrap: true }] }
    ]
  };

  const legsDay = {
    label: 'Legs',
    notes: 'Goblet squats getting too easy? Progress to Bulgarian split squats or pistol squats — both are significantly harder per leg.',
    exercises: [
      { name: 'Goblet Squat',                 tier: 'main', sets: [{ reps: 12, amrap: true }, { reps: 12, amrap: true }, { reps: 12, amrap: true }] },
      { name: 'Dumbbell Lunge',               tier: 'main', sets: [{ reps: 12, amrap: true }, { reps: 12, amrap: true }, { reps: 12, amrap: true }] },
      { name: 'Single Leg Romanian Deadlift', tier: 'main', sets: [{ reps: 12, amrap: true }, { reps: 12, amrap: true }, { reps: 12, amrap: true }] },
      { name: 'Standing Calf Raise',          tier: 'main', sets: [{ reps: 12, amrap: true }, { reps: 12, amrap: true }, { reps: 12, amrap: true }] },
      { name: 'Hanging Leg Raise',            tier: 'main', sets: [{ reps: 12, amrap: true }, { reps: 12, amrap: true }, { reps: 12, amrap: true }] }
    ]
  };

  for (let w = 1; w <= 8; w++) {
    PROGRAMS['dumbbells'].weeks_data['week' + w] = {
      label: 'Week ' + w,
      deload: false,
      days: {
        day1: { ...pushDay },
        day2: { ...pullDay },
        day3: { ...legsDay }
      }
    };
  }
})();
