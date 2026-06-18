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

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      contentInsetAdjustmentBehavior="automatic"
    >
      <Text style={styles.title} selectable>
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
        <Text style={styles.errorText} selectable>
          {error}
        </Text>
      ) : null}

      {!isLoading && entries.length === 0 && !error ? (
        <Text style={styles.emptyText} selectable>
          No leaderboard entries yet.
        </Text>
      ) : null}

      {entries.map((entry, index) => (
        <View
          key={`${entry.name}-${entry.sport}-${index}`}
          style={styles.entryCard}
        >
          <Text style={styles.rank} selectable>
            #{index + 1}
          </Text>

          <View style={styles.entryDetails}>
            <Text style={styles.entryName} selectable>
              {entry.name}
            </Text>
            <Text style={styles.entrySport} selectable>
              {entry.sport}
            </Text>
          </View>

          <View style={styles.scoreGroup}>
            <Text style={styles.xp} selectable>
              {entry.xp} XP
            </Text>
            <Text style={styles.level} selectable>
              {entry.level}
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

  entryCard: {
    alignItems: 'center',
    backgroundColor: '#1E293B',
    borderRadius: 12,
    flexDirection: 'row',
    gap: 12,
    padding: 16,
  },

  rank: {
    color: '#60A5FA',
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
