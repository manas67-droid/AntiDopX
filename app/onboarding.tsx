import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';

export default function OnboardingScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>🏆</Text>

      <Text style={styles.title}>
        Protect Your Career
      </Text>

      <Text style={styles.subtitle}>
        Many athletes fail doping tests because
        they don't know the rules.
      </Text>

      <Text style={styles.description}>
        Learn how to identify banned substances,
        verify medicines, and make safe decisions.
      </Text>

      <TouchableOpacity
  style={styles.button}
  onPress={() => {
    router.push('/role-selection');
  }}
>
        <Text style={styles.buttonText}>
          I'm Ready
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

  logo: {
    fontSize: 70,
    marginBottom: 20,
  },

  title: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },

  subtitle: {
    color: '#CBD5E1',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 28,
  },

  description: {
    color: '#94A3B8',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
  },

  button: {
    backgroundColor: '#2563EB',
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 14,
  },

  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});