import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

export default function WelcomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>
        🏆 AntiDopX
      </Text>

      <Text style={styles.subtitle}>
        Learn. Compete. Stay Clean.
      </Text>

      <TouchableOpacity
        style={styles.primaryButton}
        onPress={() => router.push('/login')}
      >
        <Text style={styles.buttonText}>
          Login
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() =>
          router.push('/athlete-register')
        }
      >
        <Text style={styles.buttonText}>
          Create Account
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
    padding: 24,
  },

  logo: {
    color: 'white',
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
  },

  subtitle: {
    color: '#94A3B8',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 50,
  },

  primaryButton: {
    backgroundColor: '#2563EB',
    padding: 16,
    borderRadius: 14,
    marginBottom: 16,
  },

  secondaryButton: {
    backgroundColor: '#1E293B',
    padding: 16,
    borderRadius: 14,
  },

  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});