import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { auth } from '../../../src/firebase/config';
import { completeModule } from '../../../src/firebase/progressService';
import { addXP } from '../../../src/firebase/xpservices';
import { router } from 'expo-router';

export default function AntiDopingBasicsScreen() {
  const handleCompleteModule = async () => {
    const currentUser = auth.currentUser;

    if (!currentUser) {
      Alert.alert('Error', 'No user logged in');
      return;
    }

    const progressResult = await completeModule(
      currentUser.uid,
      'antiDopingBasics'
    );

    if (!progressResult.success) {
      Alert.alert('Error', progressResult.error);
      return;
    }

    const xpResult = await addXP(
      currentUser.uid,
      20
    );

    if (!xpResult.success) {
      Alert.alert('Error', xpResult.error);
      return;
    }

    Alert.alert(
      '🎉 Module Completed!',
      '+20 XP awarded',
      [
        {
          text: 'OK',
          onPress: () => router.back(),
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        📖 Anti-Doping Basics
      </Text>

      <Text style={styles.sectionTitle}>
        What is Doping?
      </Text>

      <Text style={styles.content}>
        Doping refers to the use of prohibited substances
        or methods to enhance athletic performance.
      </Text>

      <Text style={styles.sectionTitle}>
        Why is Doping Dangerous?
      </Text>

      <Text style={styles.content}>
        • Serious health risks{'\n'}
        • Unfair competition{'\n'}
        • Damage to athlete reputation{'\n'}
        • Possible suspension and bans
      </Text>

      <Text style={styles.sectionTitle}>
        Anti-Doping Principles
      </Text>

      <Text style={styles.content}>
        Athletes are responsible for everything that enters
        their body. Understanding anti-doping rules helps
        protect health, fairness, and integrity in sport.
      </Text>

      <TouchableOpacity
        style={styles.completeButton}
        onPress={handleCompleteModule}
      >
        <Text style={styles.completeButtonText}>
          ✅ Complete Module
        </Text>
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

  title: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 60,
    marginBottom: 24,
  },

  sectionTitle: {
    color: '#60A5FA',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    marginTop: 20,
  },

  content: {
    color: 'white',
    fontSize: 16,
    lineHeight: 24,
  },

  completeButton: {
    backgroundColor: '#2563EB',
    padding: 16,
    borderRadius: 12,
    marginTop: 40,
  },

  completeButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
});