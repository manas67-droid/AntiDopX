import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { router } from 'expo-router';
import { auth } from '../../src/firebase/config';
import { getUserProfile } from '../../src/firebase/userService';

export default function LearningJourneyScreen() {
  const [progress, setProgress] = useState({
    antiDopingBasics: false,
    wadaRules: false,
    testingProcedures: false,
    tue: false,
    supplements: false,
  });

  const [completionPercent, setCompletionPercent] =
    useState(0);

  useEffect(() => {
    const loadProgress = async () => {
      const currentUser = auth.currentUser;

      if (!currentUser) return;

      const result = await getUserProfile(
        currentUser.uid
      );

      if (!result.success || !result.data) return;

      const userProgress =
        result.data.progress || {};

      setProgress({
        antiDopingBasics:
          userProgress.antiDopingBasics || false,

        wadaRules:
          userProgress.wadaRules || false,

        testingProcedures:
          userProgress.testingProcedures || false,

        tue:
          userProgress.tue || false,

        supplements:
          userProgress.supplements || false,
      });

      const completedModules =
        Object.values(userProgress)
          .filter(Boolean).length;

      const totalModules = 5;

      const percent = Math.round(
        (completedModules / totalModules) * 100
      );

      setCompletionPercent(percent);
    };

    loadProgress();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        📚 Learning Journey
      </Text>

      <Text style={styles.progressText}>
        Progress: {completionPercent}%
      </Text>

      <TouchableOpacity
        onPress={() =>
          router.push('./modules/anti-doping-basics')
        }
      >
        <Text style={styles.module}>
          {progress.antiDopingBasics ? '✅' : '⬜'} Anti-Doping
          Basics
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() =>
          router.push('./modules/wada-rules')
        }
      >
        <Text style={styles.module}>
          {progress.wadaRules ? '✅' : '⬜'} WADA Rules
        </Text>
      </TouchableOpacity>

      <Text style={styles.module}>
        {progress.testingProcedures ? '✅' : '⬜'} Testing
        Procedures
      </Text>

      <Text style={styles.module}>
        {progress.tue ? '✅' : '⬜'} TUE
      </Text>

      <Text style={styles.module}>
        {progress.supplements ? '✅' : '⬜'} Supplements &
        Risks
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },

  contentContainer: {
    gap: 14,
    padding: 20,
    paddingBottom: 48,
  },

  title: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 60,
    marginBottom: 30,
  },

  progressText: {
    color: 'white',
    marginTop: 8,
    fontWeight: '600',
    marginBottom: 24,
  },

  moduleTitle: {
    color: 'white',
    fontSize: 18,
    marginBottom: 20,
  },

  module: {
    color: 'white',
    fontSize: 16,
    marginBottom: 12,
    padding: 12,
    backgroundColor: '#1E293B',
    borderRadius: 8,
  },
});

function useState<T>(initialValue: T): [T, React.Dispatch<React.SetStateAction<T>>] {
  return React.useState(initialValue);
}
