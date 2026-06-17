import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';

import { auth } from '../../../src/firebase/config';
import { completeModule } from '../../../src/firebase/progressService';
import { addXP } from '../../../src/firebase/xpservices';

export default function WadaRulesScreen() {
  const handleCompleteModule = async () => {
    const currentUser = auth.currentUser;

    if (!currentUser) {
      Alert.alert('Error', 'No user logged in');
      return;
    }

    const progressResult = await completeModule(
      currentUser.uid,
      'wadaRules'
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
      '🎉 WADA Rules Completed!',
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
        📜 WADA Rules
      </Text>

      <Text style={styles.sectionTitle}>
        What is WADA?
      </Text>

      <Text style={styles.content}>
        The World Anti-Doping Agency (WADA)
        promotes clean sport worldwide and
        creates anti-doping regulations used
        by international sports organizations.
      </Text>

      <Text style={styles.sectionTitle}>
        Athlete Responsibilities
      </Text>

      <Text style={styles.content}>
        • Know the anti-doping rules{'\n'}
        • Check medications before use{'\n'}
        • Be available for testing{'\n'}
        • Report whereabouts when required
      </Text>

      <Text style={styles.sectionTitle}>
        Strict Liability
      </Text>

      <Text style={styles.content}>
        Athletes are responsible for any
        prohibited substance found in their
        body, whether intentional or not.
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