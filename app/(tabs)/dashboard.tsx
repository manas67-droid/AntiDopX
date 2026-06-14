import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function DashboardScreen() {
     const { name, sport,age } = useLocalSearchParams();
     console.log("Name:", name);
     console.log("Sport:", sport);
     console.log("Age:", age);
  return (
    <View style={styles.container}>
     <Text style={styles.header}>
  🏆 Welcome {JSON.stringify(name)}
</Text>
<Text style={styles.sportText}>
  Sport: {sport}
</Text>

      <View style={styles.statsCard}>
        <Text style={styles.statText}>Level: Rookie</Text>
        <Text style={styles.statText}>XP: 0</Text>
        <Text style={styles.statText}>🔥 Streak: 0</Text>
      </View>

      <TouchableOpacity style={styles.featureCard}>
        <Text style={styles.featureTitle}>📚 Learning Journey</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.featureCard}>
        <Text style={styles.featureTitle}>🧪 Supplement Roulette</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.featureCard}>
        <Text style={styles.featureTitle}>📷 Medicine Scanner</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.featureCard}>
        <Text style={styles.featureTitle}>🏅 Leaderboard</Text>
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



  header: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 60,
    marginBottom: 24,
  },

    sportText: {
  color: '#94A3B8',
  fontSize: 16,
  marginBottom: 20,
},

  statsCard: {
    backgroundColor: '#1E293B',
    padding: 20,
    borderRadius: 16,
    marginBottom: 24,
  },

  statText: {
    color: 'white',
    fontSize: 16,
    marginBottom: 8,
  },

  featureCard: {
    backgroundColor: '#2563EB',
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
  },

  featureTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});