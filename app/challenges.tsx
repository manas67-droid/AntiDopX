import {
    FontAwesome5,
    MaterialCommunityIcons
} from '@expo/vector-icons';
import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ChallengesScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>
        🎮 Play & Compete
      </Text>

      <Text style={styles.subHeader}>
        Fast games. Real knowledge.
      </Text>

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
        />

        <GameCard
          title="Medicine Scanner"
          subtitle="AI label check"
          icon="camera"
          route="/scanner"
        />

        <GameCard
          title="Quiz Arena"
          subtitle="60s rapid fire"
          icon="brain"
          route="/quiz"
        />

        <GameCard
          title="Scenarios"
          subtitle="Branching outcomes"
          icon="question-circle"
          route="/scenario"
        />
      </View>

      {/* Tournament Section */}

      <Text style={styles.sectionTitle}>
        🏆 Live Tournaments
      </Text>

      <TournamentCard
        title="Clean Sport Cup"
        players="1,240 Players"
        status="LIVE"
      />

      <TournamentCard
        title="Supplement Awareness Week"
        players="Solo Event"
        status="DAY 2"
      />

      <TournamentCard
        title="TUE Mastery Bracket"
        players="Team Battle"
        status="SATURDAY"
      />
    </ScrollView>
  );
}

function GameCard({
  title,
  subtitle,
  icon,
  route,
}: {
  title: string;
  subtitle: string;
  icon: any;
  route: string;
}) {
  return (
    <TouchableOpacity
      style={styles.gameCard}
      onPress={() => router.push(route as any)}
    >
      <FontAwesome5
        name={icon}
        size={28}
        color="#2563EB"
      />

      <Text style={styles.gameTitle}>
        {title}
      </Text>

      <Text style={styles.gameSubtitle}>
        {subtitle}
      </Text>
    </TouchableOpacity>
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
      <MaterialCommunityIcons
        name="trophy"
        size={28}
        color="#F59E0B"
      />

      <View style={{ flex: 1 }}>
        <Text style={styles.tournamentTitle}>
          {title}
        </Text>

        <Text style={styles.tournamentPlayers}>
          {players}
        </Text>
      </View>

      <Text style={styles.status}>
        {status}
      </Text>
    </View>
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
  },

  featuredCard: {
    backgroundColor: '#2563EB',
    padding: 20,
    borderRadius: 20,
    marginBottom: 24,
  },

  badge: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },

  featuredTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },

  featuredDescription: {
    color: 'white',
    marginTop: 10,
  },

  xpText: {
    color: 'white',
    marginTop: 15,
    fontWeight: 'bold',
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  gameCard: {
    width: '48%',
    backgroundColor: '#1E293B',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
  },

  gameTitle: {
    color: 'white',
    fontWeight: 'bold',
    marginTop: 12,
  },

  gameSubtitle: {
    color: '#94A3B8',
    fontSize: 12,
    marginTop: 5,
  },

  sectionTitle: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 20,
  },

  tournamentCard: {
    backgroundColor: '#1E293B',
    padding: 16,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },

  tournamentTitle: {
    color: 'white',
    fontWeight: 'bold',
  },

  tournamentPlayers: {
    color: '#94A3B8',
    fontSize: 12,
  },

  status: {
    color: '#22C55E',
    fontWeight: 'bold',
  },
});