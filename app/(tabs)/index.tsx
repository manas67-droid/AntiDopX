import { router } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
  <Text style={styles.logo}>🏆</Text>
</View>
      <Text style={styles.title}>
        AntiDopX
      </Text>

      <Text style={styles.subtitle}>
  Learn anti-doping rules through interactive
  scenarios, quizzes, and real-world decisions.
</Text>
<Text style={styles.tagline}>
  Learn → Apply → Verify → Earn → Compete
</Text>
<View style={styles.featureContainer}>
  <Text style={styles.feature}>🎮 Gamified Learning</Text>
  <Text style={styles.feature}>🧪 Supplement Roulette</Text>
  <Text style={styles.feature}>📷 Medicine Scanner</Text>
  <Text style={styles.feature}>🏆 Live Leaderboards</Text>
</View>

      <TouchableOpacity
  style={styles.button}
  onPress={() => {
    router.push('/login');
  }}
>
        <Text style={styles.buttonText}>
          Get Started
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  tagline: {
  color: '#60A5FA',
  fontSize: 14,
  marginBottom: 40,
  textAlign: 'center',
  fontWeight: '600',
},
featureContainer: {
  marginBottom: 30,
},

feature: {
  color: '#CBD5E1',
  fontSize: 16,
  marginVertical: 6,
  textAlign: 'center',
},
  logoContainer: {
  width: 120,
  height: 120,
  borderRadius: 60,
  backgroundColor: '#1E293B',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: 24,
},

  logo: {
    fontSize: 64,
    marginBottom: 20,
  },

  title: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  subtitle: {
    color: '#94A3B8',
    fontSize: 16,
    marginTop: 12,
    textAlign: 'center',
    marginBottom: 40,
  },

  button: {
    backgroundColor: '#2563EB',
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 12,
  },

  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});