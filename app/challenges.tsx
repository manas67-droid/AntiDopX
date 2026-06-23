import { router } from 'expo-router';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function ChallengesScreen() {
  return (
  <ScrollView
    style={styles.container}
    showsVerticalScrollIndicator={false}
  >
    <Text style={styles.title}>
      Challenges
    </Text>

    <Text style={styles.subtitle}>
      Compete, learn and earn rewards
    </Text>

    {/* Quiz */}

    <TouchableOpacity
      style={styles.gameCard}
      onPress={() => router.push('/quiz')}
    >
      <Text style={styles.gameTitle}>
        🧠 Quiz Arena
      </Text>

      <Text style={styles.gameSubtitle}>
        Beat the clock and test your knowledge
      </Text>
    </TouchableOpacity>

    {/* Scenario */}

    <TouchableOpacity
      style={styles.gameCard}
      onPress={() => router.push('/scenario')}
    >
      <Text style={styles.gameTitle}>
        🎯 Decision Scenarios
      </Text>

      <Text style={styles.gameSubtitle}>
        Choose wisely and earn XP
      </Text>
    </TouchableOpacity>

    {/* Scanner */}

    <TouchableOpacity
      style={styles.gameCard}
      onPress={() => router.push('/scanner')}
    >
      <Text style={styles.gameTitle}>
        📷 Medicine Scanner
      </Text>

      <Text style={styles.gameSubtitle}>
        Check medicine compliance instantly
      </Text>
    </TouchableOpacity>

    {/* Roulette */}

    <TouchableOpacity
      style={styles.gameCard}
      onPress={() => router.push('/roulette')}
    >
      <Text style={styles.gameTitle}>
        🧪 Supplement Roulette
      </Text>

      <Text style={styles.gameSubtitle}>
        Learn supplement risks through gameplay
      </Text>
    </TouchableOpacity>

    {/* Tournament Section */}

    <Text style={styles.sectionTitle}>
      🏆 Live Tournaments
    </Text>

    <View style={styles.tournamentCard}>
      <View style={styles.dayCircle}>
        <Text style={styles.dayText}>THU</Text>
      </View>

      <View style={{ flex: 1 }}>
        <Text style={styles.eventTitle}>
          Clean Sport Cup
        </Text>

        <Text style={styles.eventSubtitle}>
          1,240 Players
        </Text>
      </View>

      <View style={styles.liveBadge}>
        <Text style={styles.liveText}>
          LIVE
        </Text>
      </View>
    </View>

    <View style={styles.tournamentCard}>
      <View style={styles.dayCircle}>
        <Text style={styles.dayText}>FRI</Text>
      </View>

      <View style={{ flex: 1 }}>
        <Text style={styles.eventTitle}>
          Supplement Awareness Week
        </Text>

        <Text style={styles.eventSubtitle}>
          Solo Event
        </Text>
      </View>

      <View style={styles.liveBadge}>
        <Text style={styles.liveText}>
          DAY 2
        </Text>
      </View>
    </View>

    <View style={styles.tournamentCard}>
      <View style={styles.dayCircle}>
        <Text style={styles.dayText}>SAT</Text>
      </View>

      <View style={{ flex: 1 }}>
        <Text style={styles.eventTitle}>
          TUE Mastery Bracket
        </Text>

        <Text style={styles.eventSubtitle}>
          Team Battle
        </Text>
      </View>

      <View style={styles.liveBadge}>
        <Text style={styles.liveText}>
          SATURDAY
        </Text>
      </View>
    </View>

    <View style={{ height: 50 }} />
  </ScrollView>
  );
}

function TournamentCard({
  title,
  players,
  status,
}: {
  title: string;
  players: string;
  status: string;
}) {
  return (
    <View style={styles.tournamentCard}>
      <View style={styles.circle}>
        <Text style={styles.circleText}>
          {status === 'LIVE'
            ? 'THU'
            : status === 'DAY 2'
            ? 'FRI'
            : 'SAT'}
        </Text>
      </View>

      <View style={{ flex: 1 }}>
        <Text style={styles.tournamentTitle}>
          {title}
        </Text>

        <Text style={styles.tournamentPlayers}>
          {players}
        </Text>
      </View>

      <View style={styles.badge}>
        <Text style={styles.badgeText}>
          {status}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    padding: 20,
  },

  title: {
    fontSize: 34,
    fontWeight: '800',
    color: '#0F172A',
    marginTop: 50,
  },

  subtitle: {
    fontSize: 16,
    color: '#64748B',
    marginTop: 6,
    marginBottom: 30,
  },

  gameCard: {
    backgroundColor: '#FFFFFF',
    padding: 22,
    borderRadius: 24,
    marginBottom: 16,
    elevation: 3,
  },

  gameTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0F172A',
  },

  gameSubtitle: {
    color: '#64748B',
    marginTop: 6,
  },

  sectionTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0F172A',
    marginTop: 20,
    marginBottom: 16,
  },

  tournamentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 24,
    marginBottom: 14,
    elevation: 2,
  },

dayCircle: {
  width: 52,
  height: 52,
  borderRadius: 26,
  backgroundColor: '#E2E8F0',
  justifyContent: 'center',
  alignItems: 'center',
  marginRight: 12,
},

dayText: {
  fontWeight: '700',
  color: '#475569',
},

eventTitle: {
  fontSize: 16,
  fontWeight: '700',
  color: '#0F172A',
},

eventSubtitle: {
  color: '#64748B',
  marginTop: 4,
},

liveBadge: {
  backgroundColor: '#DCFCE7',
  paddingHorizontal: 10,
  paddingVertical: 6,
  borderRadius: 20,
},

liveText: {
  color: '#16A34A',
  fontWeight: '700',
  fontSize: 12,
},

  circle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },

  circleText: {
    color: '#475569',
    fontWeight: '700',
    fontSize: 12,
  },

  tournamentTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0F172A',
  },

  tournamentPlayers: {
    color: '#64748B',
    marginTop: 4,
  },

  badge: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },

  badgeText: {
    color: '#22C55E',
    fontWeight: '700',
    fontSize: 12,
  },
});