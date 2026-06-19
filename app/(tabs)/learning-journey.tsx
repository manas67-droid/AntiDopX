import React, { useCallback, useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { router, useFocusEffect } from 'expo-router';
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

  useFocusEffect(
    useCallback(() => {
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
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        📚 Learning Journey
      </Text>

      <Text style={styles.progressText}>
        Progress: {completionPercent}%
      </Text>

      <TouchableOpacity
        style={styles.module}
        onPress={() =>
          router.push('./modules/anti-doping-basics')
        }
      >
        <Text style={styles.moduleText}>
          {progress.antiDopingBasics ? '✅' : '⬜'} Anti-Doping
          Basics
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.module}
        onPress={() =>
          router.push('./modules/wada-rules')
        }
      >
        <Text style={styles.moduleText}>
          {progress.wadaRules ? '✅' : '⬜'} WADA Rules
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.module}
        onPress={() =>
          router.push('./modules/testing-procedures')
        }
      >
        <Text style={styles.moduleText}>
          {progress.testingProcedures ? '✅' : '⬜'} Testing
          Procedures
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.module}
        onPress={() =>
          router.push('./modules/tue')
        }
      >
        <Text style={styles.moduleText}>
          {progress.tue ? '✅' : '⬜'} TUE
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.module}
        onPress={() =>
          router.push('./modules/supplements')
        }
      >
        <Text style={styles.moduleText}>
          {progress.supplements ? '✅' : '⬜'} Supplements &
          Risks
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
    padding: 20,
  },

  title: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 60,
    marginBottom: 8,
  },

  progressText: {
    color: '#93C5FD',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 24,
  },

  module: {
    backgroundColor: '#1E293B',
    borderRadius: 12,
    marginBottom: 12,
    padding: 16,
  },

  moduleText: {
    color: 'white',
    fontSize: 16,
  },
});
