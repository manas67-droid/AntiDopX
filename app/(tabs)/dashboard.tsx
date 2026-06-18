import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { auth } from '../../src/firebase/config';
import { getUserProfile } from '../../src/firebase/userService';
import { logoutUser } from '../../src/firebase/logoutservices';

export default function DashboardScreen() {
  const [name, setName] = useState('');
  const [sport, setSport] = useState('');
  const [age, setAge] = useState('');
  const [level, setLevel] = useState('');
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const loadProfile = async () => {
      const currentUser = auth.currentUser;

      if (!currentUser) {
        return;
      }

      const result = await getUserProfile(currentUser.uid);

      if (!result.success) {
        Alert.alert('Error', result.error);
        return;
      }

      const userData = result.data!;

      setName(userData.name || '');
      setSport(userData.sport || '');
      setAge(String(userData.age || ''));
      setLevel(userData.level || 'Rookie');
      setXp(userData.xp || 0);
      setStreak(userData.streak || 0);
    };

    loadProfile();
  }, []);

  const handleLogout = async () => {
    const result = await logoutUser();

    if (!result.success) {
      Alert.alert('Error', result.error);
      return;
    }

    router.replace('/');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        🏆 Welcome {name}
      </Text>

      <Text style={styles.sportText}>
        Sport: {sport}
      </Text>

      <Text style={styles.sportText}>
        Age: {age}
      </Text>

      <View style={styles.statsCard}>
        <Text style={styles.statText} selectable>
          Level: {level}
        </Text>

        <Text style={styles.statText} selectable>
          XP: {xp}
        </Text>

        <Text style={styles.statText} selectable>
          Streak: {streak} Day{streak === 1 ? '' : 's'}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.featureCard}
        onPress={() => router.push('/learning-journey')}
      >
        <Text style={styles.featureTitle}>
          Learning Journey
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.featureCard}
        onPress={() => router.push('/modules/anti-doping-basics')}
      >
        <Text style={styles.featureTitle}>
          Open Anti-Doping Basics
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.featureCard}
        onPress={() => router.push('/supplement-roulette')}
      >
        <Text style={styles.featureTitle}>
          Supplement Roulette
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.featureCard}
        onPress={() => router.push('/medicine-scanner')}
      >
        <Text style={styles.featureTitle}>
          Medicine Scanner
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.featureCard}
        onPress={() => router.push('/leaderboard')}
      >
        <Text style={styles.featureTitle}>
          Leaderboard
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={async () => {
          const result = await logoutUser();

          if (!result.success) {
            alert(result.error);
            return;
          }

          router.replace('/');
        }}
      >
        <Text style={styles.logoutText}>
          Logout
        </Text>
      </TouchableOpacity>

      {/*XP test button}
      <TouchableOpacity
        style={styles.featureCard}
        onPress={async () => {
          const currentUser = auth.currentUser;

          if (!currentUser) return;

          const result = await addXP(
            currentUser.uid,
            10
          );

          if (!result.success) {
            alert(result.error);
            return;
          }

          setXp(result.xp ?? 0);
          setLevel(result.level ?? 'Rookie');

          alert(`XP: ${result.xp}`);
        }}
      >
        <Text style={styles.featureTitle}>
          ➕ Add 10 XP
        </Text>
      </TouchableOpacity>
      */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },

  contentContainer: {
    padding: 20,
    paddingBottom: 48,
  },

  header: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 40,
    marginBottom: 24,
  },

  sportText: {
    color: '#94A3B8',
    fontSize: 16,
    marginBottom: 12,
  },

  statsCard: {
    backgroundColor: '#1E293B',
    padding: 20,
    borderRadius: 12,
    marginTop: 8,
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
    borderRadius: 12,
    marginBottom: 16,
  },

  featureTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },

  logoutButton: {
    backgroundColor: '#DC2626',
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
  },

  logoutText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
});