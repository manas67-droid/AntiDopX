import { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {
  getLeaderboard,
  type LeaderboardEntry,
} from '../../src/firebase/leaderboardService';

const TOP_3_COLORS = ['#F59E0B', '#94A3B8', '#CD7F32'];
const TOP_3_EMOJIS = ['🥇', '🥈', '🥉'];

export default function LeaderboardScreen() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const loadLeaderboard = useCallback(async () => {
    setIsLoading(true);
    setError('');

    const result = await getLeaderboard();

    if (!result.success) {
      setError(result.error);
      Alert.alert('Error', result.error);
      setIsLoading(false);
      return;
    }

    setEntries(result.data);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadLeaderboard();
  }, [loadLeaderboard]);

  const top3 = entries.slice(0, 3);
  const rest = entries.slice(3);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Text style={styles.title}>
        Leaderboard
      </Text>

      <TouchableOpacity
        style={styles.refreshButton}
        onPress={loadLeaderboard}
        disabled={isLoading}
      >
        <Text style={styles.refreshButtonText}>
          {isLoading ? 'Refreshing...' : 'Refresh'}
        </Text>
      </TouchableOpacity>

      {isLoading ? (
        <ActivityIndicator color="#60A5FA" />
      ) : null}

      {error ? (
        <Text style={styles.errorText}>
          {error}
        </Text>
      ) : null}

      {!isLoading && entries.length === 0 && !error ? (
        <Text style={styles.emptyText}>
          No leaderboard entries yet.
        </Text>
      ) : null}

      {/* TOP 3 PODIUM */}
      {top3.length > 0 ? (
        <View style={styles.podium}>
          {top3.map((entry, index) => (
            <View
              key={`top-${index}`}
              style={[
                styles.podiumCard,
                index === 0 && styles.podiumFirst,
              ]}
            >
              <Text style={styles.podiumEmoji}>
                {TOP_3_EMOJIS[index]}
              </Text>
              <Text
                style={[
                  styles.podiumRank,
                  { color: TOP_3_COLORS[index] },
                ]}
              >
                #{index + 1}
              </Text>
              <Text style={styles.podiumName}>
                {entry.name}
              </Text>
              <Text style={styles.podiumSport}>
                {entry.sport}
              </Text>
              <Text style={styles.podiumXP}>
                {entry.xp} XP
              </Text>
              <Text style={styles.podiumDetail}>
                {entry.level} · 🔥{entry.streak}
              </Text>
            </View>
          ))}
        </View>
      ) : null}

      {/* REST OF LEADERBOARD */}
      {rest.map((entry, index) => (
        <View
          key={`${entry.name}-${entry.sport}-${index}`}
          style={styles.entryCard}
        >
          <Text style={styles.rank}>
            #{index + 4}
          </Text>

          <View style={styles.entryDetails}>
            <Text style={styles.entryName}>
              {entry.name}
            </Text>
            <Text style={styles.entrySport}>
              {entry.sport}
            </Text>
          </View>

          <View style={styles.scoreGroup}>
            <Text style={styles.xp}>
              {entry.xp} XP
            </Text>
            <Text style={styles.level}>
              {entry.level}
            </Text>
            <Text style={styles.streak}>
              🔥{entry.streak}
            </Text>
          </View>
        </View>
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

  refreshButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#2563EB',
    borderRadius: 12,
    paddingHorizontal: 18,
    paddingVertical: 12,
  },

  refreshButtonText: {
    color: 'white',
    fontWeight: '700',
  },

  podium: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    marginVertical: 20,
  },

  podiumCard: {
    flex: 1,
    backgroundColor: '#1E293B',
    borderRadius: 20,
    padding: 14,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#334155',
  },

  podiumFirst: {
    borderColor: '#F59E0B',
    backgroundColor: '#1E293B',
    transform: [{ scale: 1.05 }],
  },

  podiumEmoji: {
    fontSize: 28,
    marginBottom: 6,
  },

  podiumRank: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },

  podiumName: {
    color: 'white',
    fontSize: 15,
    fontWeight: '700',
    textAlign: 'center',
  },

  podiumSport: {
    color: '#94A3B8',
    fontSize: 12,
    textAlign: 'center',
  },

  podiumXP: {
    color: '#22C55E',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 6,
  },

  podiumDetail: {
    color: '#94A3B8',
    fontSize: 11,
    marginTop: 4,
  },

  entryCard: {
    alignItems: 'center',
    backgroundColor: '#1E293B',
    borderRadius: 12,
    flexDirection: 'row',
    gap: 12,
    padding: 16,
  },

  rank: {
    color: '#277ce5',
    fontSize: 18,
    fontVariant: ['tabular-nums'],
    fontWeight: 'bold',
    width: 44,
  },

  entryDetails: {
    flex: 1,
    gap: 4,
  },

  entryName: {
    color: 'white',
    fontSize: 17,
    fontWeight: '700',
  },

  entrySport: {
    color: '#CBD5E1',
    fontSize: 14,
  },

  scoreGroup: {
    alignItems: 'flex-end',
    gap: 4,
  },

  xp: {
    color: 'white',
    fontSize: 16,
    fontVariant: ['tabular-nums'],
    fontWeight: 'bold',
  },

  level: {
    color: '#93C5FD',
    fontSize: 12,
    fontWeight: '700',
    textAlign: 'right',
  },

  streak: {
    color: '#F97316',
    fontSize: 12,
    fontWeight: '700',
  },

  errorText: {
    color: '#FCA5A5',
    fontSize: 15,
    lineHeight: 22,
  },

  emptyText: {
    color: '#CBD5E1',
    fontSize: 16,
  },
});
