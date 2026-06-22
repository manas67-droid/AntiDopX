import { useCallback, useState } from 'react';
import {
<<<<<<< HEAD
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { useFocusEffect } from 'expo-router';
import {
  claimChallengeReward,
  getWeeklyChallenges,
  type Challenge,
} from '../src/firebase/challengesService';
import { auth } from '../src/firebase/config';
=======
  FontAwesome5,
  MaterialCommunityIcons
} from '@expo/vector-icons';
import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
>>>>>>> 1f47e78c42b666455a065f02e9c037fa6ccae9a7

export default function ChallengesScreen() {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [claimingId, setClaimingId] = useState<string | null>(null);

  const loadChallenges = useCallback(async () => {
    const currentUser = auth.currentUser;
    if (!currentUser) return;

    setIsLoading(true);
    const result = await getWeeklyChallenges(currentUser.uid);
    if (result.success) {
      setChallenges(result.data);
    } else {
      Alert.alert('Error', result.error);
    }
    setIsLoading(false);
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadChallenges();
    }, [loadChallenges])
  );

  const handleClaim = async (challenge: Challenge) => {
    const currentUser = auth.currentUser;
    if (!currentUser) return;

    setClaimingId(challenge.id);
    const result = await claimChallengeReward(currentUser.uid, challenge.id);
    setClaimingId(null);

    if (result.success) {
      Alert.alert(
        'Reward claimed!',
        `+${result.data} XP awarded for completing "${challenge.title}"`
      );
      loadChallenges();
    } else {
      Alert.alert('Error', result.error);
    }
  };

  const completedCount = challenges.filter((c) => c.completed).length;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>
        🎯 Weekly Challenges
      </Text>

      <Text style={styles.subHeader}>
        {completedCount}/{challenges.length} completed this week
      </Text>

<<<<<<< HEAD
      {isLoading ? (
        <ActivityIndicator
          color="#60A5FA"
          style={{ marginTop: 40 }}
=======
      {/* Featured Card */}
      <TouchableOpacity
        style={styles.featuredCard}
        onPress={() => router.push('/scenario'as any)}
      >
        <Text style={styles.badge}>
          FEATURED
        </Text>

        <Text style={styles.featuredTitle}>
          What Would You Do?
        </Text>

        <Text style={styles.featuredDescription}>
          Make split-second decisions in real
          anti-doping scenarios.
        </Text>

        <Text style={styles.xpText}>
          ⚡ +80 XP per scenario
        </Text>
      </TouchableOpacity> 

      {/* Games Grid */}

      <View style={styles.grid}>
        <GameCard
          title="Supplement Roulette"
          subtitle="Spin to learn risks"
          icon="dice"
          route="/roulette"
>>>>>>> 1f47e78c42b666455a065f02e9c037fa6ccae9a7
        />
      ) : (
        <>
          {challenges.map((challenge) => {
            const progressPct = Math.min(
              (challenge.progress / challenge.target) * 100,
              100
            );
            const isComplete = challenge.completed;

            return (
              <View
                key={challenge.id}
                style={[
                  styles.challengeCard,
                  isComplete && styles.completedCard,
                ]}
              >
                <View style={styles.challengeHeader}>
                  <Text style={styles.challengeTitle}>
                    {isComplete ? '✅ ' : '⏳ '}
                    {challenge.title}
                  </Text>
                  <Text style={styles.xpBadge}>
                    +{challenge.xpReward} XP
                  </Text>
                </View>

                <Text style={styles.challengeDescription}>
                  {challenge.description}
                </Text>

                <View style={styles.progressBg}>
                  <View
                    style={[
                      styles.progressFill,
                      { width: `${progressPct}%` },
                    ]}
                  />
                </View>

                <Text style={styles.progressText}>
                  {challenge.progress >= challenge.target
                    ? 'Completed!'
                    : `${challenge.progress} / ${challenge.target}`}
                </Text>

                {isComplete && (
                  <TouchableOpacity
                    style={styles.claimButton}
                    onPress={() => handleClaim(challenge)}
                    disabled={claimingId === challenge.id}
                  >
                    <Text style={styles.claimButtonText}>
                      {claimingId === challenge.id
                        ? 'Claiming...'
                        : 'Claim Reward'}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            );
          })}
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
    padding: 20,
  },

  header: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 20,
  },

  subHeader: {
    color: '#94A3B8',
    marginBottom: 24,
    marginTop: 6,
  },

  challengeCard: {
    backgroundColor: '#1E293B',
    borderRadius: 20,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },

  completedCard: {
    borderColor: '#22C55E',
  },

  challengeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },

  challengeTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
    flex: 1,
  },

  xpBadge: {
    color: '#22C55E',
    fontWeight: '700',
    fontSize: 14,
  },

  challengeDescription: {
    color: '#94A3B8',
    marginBottom: 14,
  },

  progressBg: {
    height: 8,
    backgroundColor: '#334155',
    borderRadius: 10,
    overflow: 'hidden',
  },

  progressFill: {
    height: '100%',
    backgroundColor: '#2563EB',
    borderRadius: 10,
  },

  progressText: {
    color: '#CBD5E1',
    fontSize: 13,
    marginTop: 8,
    fontWeight: '600',
  },

  claimButton: {
    backgroundColor: '#22C55E',
    borderRadius: 12,
    padding: 14,
    marginTop: 14,
  },

  claimButtonText: {
    color: 'white',
    fontWeight: '700',
    textAlign: 'center',
  },
});
