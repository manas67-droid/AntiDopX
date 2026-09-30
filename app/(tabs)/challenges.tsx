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

    
      <View style={styles.grid}>
        <GameCard
  title="Supplement Roulette"
  subtitle="Spin to learn risks"
  icon="dice"
  iconColor="#FF8A3D"
  route="/roulette"
/>
<GameCard
  title="Medicine Scanner"
  subtitle="AI label check"
  icon="camera"
  iconColor="#8B5CF6"
  route="/medicinescanner"
/>
<GameCard
  title="Quiz Arena"
  subtitle="60s rapid fire"
  icon="brain"
  iconColor="#22C55E"
  route="/quiz"
/>

        <GameCard
  title="Scenarios"
  subtitle="Branching outcomes"
  icon="question-circle"
  iconColor="#1EC6E8"
  route="/scenario"
/>
</View>


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
  iconColor,
}: {
  title: string;
  subtitle: string;
  icon: any;
  route: string;
  iconColor: string;
}) {
  return (
    <TouchableOpacity
      style={styles.gameCard}
      onPress={() => router.push(route as any)}
    >
      <FontAwesome5
  name={icon}
  size={28}
  color={iconColor}
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
  backgroundColor: '#F8FBFE',
  padding: 20,
},
 header: {
  color: '#0F172A',
  fontSize: 38,
  fontWeight: '800',
  marginTop: 20,
},

  subHeader: {
  color: '#64748B',
  fontSize: 16,
  marginBottom: 24,
},
  featuredCard: {
  backgroundColor: '#06B6D4',
  padding: 22,
  borderRadius: 28,
  marginBottom: 24,
  shadowColor: '#000',
  shadowOpacity: 0.08,
  shadowRadius: 12,
  elevation: 6,
},
  badge: {
  alignSelf: 'flex-start',
  backgroundColor: 'rgba(255,255,255,0.25)',
  color: 'white',
  paddingHorizontal: 10,
  paddingVertical: 4,
  borderRadius: 20,
  fontSize: 11,
  fontWeight: '700',
},
featuredTitle: {
  color: 'white',
  fontSize: 34,
  fontWeight: '800',
  marginTop: 16,
},
  featuredDescription: {
  color: '#EAF9FF',
  fontSize: 17,
  marginTop: 10,
  lineHeight: 24,
},
  xpText: {
  color: 'white',
  marginTop: 20,
  fontWeight: '700',
  fontSize: 16,
},

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  gameCard: {
  width: '48%',
  backgroundColor: '#FFFFFF',
  borderRadius: 28,
  padding: 22,
  marginBottom: 18,

  shadowColor: '#000',
  shadowOpacity: 0.08,
  shadowRadius: 10,
  elevation: 5,

  borderWidth: 1,
  borderColor: '#EDF2F7',
},
gameTitle: {
  color: '#111827',
  fontWeight: '700',
  fontSize: 22,
  marginTop: 18,
},

  gameSubtitle: {
  color: '#64748B',
  fontSize: 15,
  marginTop: 8,
},
sectionTitle: {
  color: '#111827',
  fontSize: 28,
  fontWeight: '800',
  marginVertical: 24,
},

 tournamentCard: {
  backgroundColor: '#FFFFFF',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    borderRadius: 24,
    borderWidth: 1,
borderColor: '#E5E7EB',
shadowColor: '#000',
shadowOpacity: 0.06,
shadowRadius: 8,
elevation: 4,
  },

  tournamentTitle: {
  color: '#111827',
    fontWeight: 'bold',
  },

  tournamentPlayers: {
    color: '#64748B',
    fontSize: 12,
  },

  status: {
    color: '#22C55E',
    fontWeight: 'bold',
  },
});