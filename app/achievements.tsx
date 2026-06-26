import { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { useFocusEffect } from 'expo-router';
import {
  getAchievements,
  type AchievementKey,
  type Achievements,
} from '../src/firebase/achievementService';
import { auth } from '../src/firebase/config';
import { getUserProfile } from '../src/firebase/userService';

const achievementMeta: {
  key: AchievementKey;
  emoji: string;
  title: string;
  description: string;
}[] = [
  {
    key: 'firstModule',
    emoji: '🏅',
    title: 'First Module',
    description: 'Complete your first module',
  },
  {
    key: 'threeModules',
    emoji: '🛡️',
    title: '3 Modules Completed',
    description: 'Complete 3 learning modules',
  },
  {
    key: 'fiveModules',
    emoji: '🏆',
    title: '5 Modules Completed',
    description: 'Complete all 5 learning modules',
  },
  {
    key: 'xp100',
    emoji: '⚡',
    title: '100 XP Earned',
    description: 'Earn 100 total XP',
  },
  {
    key: 'streak7',
    emoji: '🔥',
    title: '7 Day Streak',
    description: 'Maintain a 7-day streak',
  },
];

export default function AchievementsScreen() {
  const [achievements, setAchievements] = useState<Achievements | null>(null);
  const [completedModules, setCompletedModules] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      const loadData = async () => {
        setIsLoading(true);

        const currentUser = auth.currentUser;
        if (!currentUser) {
          setIsLoading(false);
          return;
        }

        const achievementResult = await getAchievements(currentUser.uid);
        if (achievementResult.success) {
          setAchievements(achievementResult.data);
        }

        const profileResult = await getUserProfile(currentUser.uid);
        if (profileResult.success && profileResult.data) {
          const progress = profileResult.data.progress || {};
          const completed = Object.values(progress).filter(Boolean).length;
          setCompletedModules(completed);
        }

        setIsLoading(false);
      };

      loadData();
    }, [])
  );

  const earnedCount = achievements
    ? Object.values(achievements).filter(Boolean).length
    : 0;

  const progress = achievements
    ? (earnedCount / achievementMeta.length) * 100
    : 0;

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>
          Achievements
        </Text>

        {achievements ? (
          <>
            <Text style={styles.subtitle}>
              {earnedCount} of {achievementMeta.length} unlocked
            </Text>

            <Text style={styles.completedText}>
              {completedModules}/5 modules completed
            </Text>

            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${progress}%` },
                ]}
              />
            </View>
          </>
        ) : null}
      </View>

      {isLoading ? (
        <ActivityIndicator
          color="#06B6D4"
          style={{ marginTop: 40 }}
        />
      ) : (
        <View style={styles.grid}>
          {achievementMeta.map((meta) => {
            const isEarned = achievements?.[meta.key] === true;

            return (
              <View
                key={meta.key}
                style={[
                  styles.badgeCard,
                  !isEarned && styles.lockedBadge,
                ]}
              >
                <View
                  style={[
                    styles.iconContainer,
                    !isEarned && styles.lockedIcon,
                  ]}
                >
                  <Text style={styles.emoji}>
                    {isEarned ? meta.emoji : '🔒'}
                  </Text>
                </View>

                <Text
                  style={[
                    styles.badgeTitle,
                    !isEarned && { color: '#94A3B8' },
                  ]}
                >
                  {meta.title}
                </Text>

                <Text style={styles.badgeDescription}>
                  {meta.description}
                </Text>
              </View>
            );
          })}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  header: {
    backgroundColor: '#06B6D4',
    paddingTop: 50,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  title: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },

  subtitle: {
    color: '#DBEAFE',
    marginTop: 6,
  },

  completedText: {
    color: '#BFDBFE',
    marginTop: 4,
    fontSize: 13,
  },

  progressBar: {
    height: 10,
    backgroundColor: '#fff',
    borderRadius: 20,
    marginTop: 16,
    overflow: 'hidden',
  },

  progressFill: {
    height: '100%',
    backgroundColor: '#06B6D4',
    borderRadius: 20,
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 16,
  },

  badgeCard: {
    width: '31%',
    backgroundColor: '#1E293B',
    borderRadius: 20,
    padding: 10,
    marginBottom: 14,
    alignItems: 'center',
  },

  lockedBadge: {
    opacity: 0.6,
  },

  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 18,
    backgroundColor: '#06B6D4',
    justifyContent: 'center',
    alignItems: 'center',
  },

  lockedIcon: {
    backgroundColor: '#334155',
  },

  emoji: {
    fontSize: 28,
  },

  badgeTitle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 12,
    marginTop: 8,
  },

  badgeDescription: {
    color: '#94A3B8',
    textAlign: 'center',
    fontSize: 10,
    marginTop: 4,
  },
});
