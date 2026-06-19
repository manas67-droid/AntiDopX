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
     <View style={styles.header}>
  <Text style={styles.headerTitle}>
    Leaderboard
  </Text>

  <Text style={styles.headerSubtitle}>
    Top clean athletes this month
  </Text>
</View>

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
    <Text style={styles.rank}>
      {index + 1}
    </Text>

    <View style={styles.avatarCircle}>
      <Text style={styles.avatarText}>
        {entry.name
          .split(' ')
          .map(word => word[0])
          .join('')
          .slice(0, 2)
          .toUpperCase()}
      </Text>
    </View>

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
        {entry.xp.toLocaleString()}
      </Text>

      <Text style={styles.level}>
        XP
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
    backgroundColor: '#fff',
  },

  contentContainer: {
    gap: 14,
    padding: 20,
    paddingBottom: 48,
  },


   header: {
  marginTop: 40,
  marginBottom: 10,
  },

  headerTitle: {
  color: '#0F172A',
  fontSize: 34,
  fontWeight: '800',
  },

  headerSubtitle: {
  color: '#64748B',
  fontSize: 16,
  marginTop: 4,
  },

  title: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 40,
  },

  refreshButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#14C8E8',
    borderRadius: 12,
    paddingHorizontal: 18,
    paddingVertical: 12,
  },

  refreshButtonText: {
    color: 'white',
    fontWeight: '700',
  },

  entryCard: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#FFFFFF',
  borderRadius: 30,
  paddingVertical: 16,
  paddingHorizontal: 18,
  borderWidth: 1,
  borderColor: '#E2E8F0',
  },

  rank: {
  width: 30,
  fontSize: 24,
  fontWeight: '700',
  color: '#475569',
  },
  avatarCircle: {
  width: 50,
  height: 50,
  borderRadius: 25,
  backgroundColor: '#06B6D4',
  justifyContent: 'center',
  alignItems: 'center',
  marginHorizontal: 12,
  },

  avatarText: {
  color: '#fff',
  fontWeight: '700',
  fontSize: 18,
  },
  entryDetails: {
    flex: 1,
    gap: 4,
  },

  entryName: {
  color: '#0F172A',
  fontSize: 22,
  fontWeight: '700',
  },

  entrySport: {
  color: '#64748B',
  fontSize: 14,
  marginTop: 2,
  },
  scoreGroup: {
    alignItems: 'flex-end',
    gap: 4,
  },

  xp: {
  color: '#0F172A',
  fontSize: 30,
  fontWeight: '800',
  },

  level: {
  color: '#64748B',
  fontSize: 13,
  textAlign: 'right',
  },
  t: {
    color: '#FCA5A5',
    fontSize: 15,
    lineHeight: 22,
  },

  emptyText: {
    color: '#CBD5E1',
    fontSize: 16,
  },
  errorText: {
  color: '#EF4444',
  fontSize: 15,
  marginTop: 10,
  },
});
