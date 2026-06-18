import { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { router } from 'expo-router';

import { auth } from '../src/firebase/config';
import { getUserProfile } from '../src/firebase/userService';
import {
  learningModules,
  type ModuleKey,
} from '../src/learning/modules';

type ProgressState = Record<ModuleKey, boolean>;

const createInitialProgress = (): ProgressState =>
  learningModules.reduce((state, module) => {
    state[module.moduleKey] = false;
    return state;
  }, {} as ProgressState);

export default function LearningJourneyScreen() {
  const [progress, setProgress] = useState<ProgressState>(
    createInitialProgress
  );
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
      const nextProgress = createInitialProgress();

      learningModules.forEach((module) => {
        nextProgress[module.moduleKey] =
          Boolean(userProgress[module.moduleKey]);
      });

      setProgress(nextProgress);

      const completedModules = learningModules.filter(
        (module) => nextProgress[module.moduleKey]
      ).length;

      const percent = Math.round(
        (completedModules / learningModules.length) * 100
      );

      setCompletionPercent(percent);
    };

    loadProgress();
  }, []);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      contentInsetAdjustmentBehavior="automatic"
    >
      <Text style={styles.title} selectable>
        Learning Journey
      </Text>

      <Text style={styles.progressText} selectable>
        Progress: {completionPercent}%
      </Text>

      {learningModules.map((module) => (
        <TouchableOpacity
          key={module.moduleKey}
          style={styles.moduleCard}
          onPress={() => router.push(module.route)}
        >
          <Text style={styles.moduleStatus} selectable>
            {progress[module.moduleKey] ? 'Completed' : 'Not started'}
          </Text>
          <Text style={styles.moduleTitle} selectable>
            {module.shortTitle}
          </Text>
          <Text style={styles.moduleReward} selectable>
            +{module.xpReward} XP
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
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
    marginTop: 40,
  },

  progressText: {
    color: '#60A5FA',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },

  moduleCard: {
    backgroundColor: '#1E293B',
    borderRadius: 12,
    gap: 8,
    padding: 16,
  },

  moduleStatus: {
    color: '#93C5FD',
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase',
  },

  moduleTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
  },

  moduleReward: {
    color: '#CBD5E1',
    fontSize: 14,
  },
});
