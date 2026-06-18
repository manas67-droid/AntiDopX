import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { auth } from '../../src/firebase/config';
import { logoutUser } from '../../src/firebase/logoutservices';
import { completeModule } from '../../src/firebase/progressService';
import { getUserProfile } from '../../src/firebase/userService';
import { addXP } from '../../src/firebase/xpservices';

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

      if (!currentUser) return;

      const result = await getUserProfile(currentUser.uid);

      if (!result.success) {
        alert(result.error);
        return;
      }

      const userData = result.data!;

      setName(userData.name);
      setSport(userData.sport);
      setAge(String(userData.age));
      setLevel(userData.level);
      setXp(userData.xp);
      setStreak(userData.streak);
    };

    loadProfile();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>👋 Welcome Back</Text>

      <Text style={styles.name}>{name}</Text>

      <View style={styles.profileCard}>
        <Text style={styles.profileText}>🏅 Sport: {sport}</Text>
        <Text style={styles.profileText}>🎂 Age: {age}</Text>
      </View>

      <View style={styles.statsCard}>
        <Text style={styles.statText}>Level: {level}</Text>
        <Text style={styles.statText}>XP: {xp}</Text>
        <Text style={styles.statText}>
          🔥 Streak: {streak} Day{streak === 1 ? '' : 's'}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.featureCard}
        onPress={() => router.push('/learning-journey')}
      >
        <Text style={styles.featureTitle}>📚 Learning Journey</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.featureCard}
        onPress={() => router.push('/supplement-roulette')}
      >
        <Text style={styles.featureTitle}>🧪 Supplement Roulette</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.featureCard}
        onPress={() => router.push('/achievements')}
      >
        <Text style={styles.featureTitle}>🏆 Achievements</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.featureCard}
        onPress={() => router.push('/challenges')}
      >
        <Text style={styles.featureTitle}>🎮 Play & Compete</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.featureCard}
        onPress={async () => {
          const currentUser = auth.currentUser;

          if (!currentUser) return;

          const progressResult = await completeModule(
            currentUser.uid,
            'antiDopingBasics'
          );

          if (!progressResult.success) {
            alert(progressResult.error);
            return;
          }

          const xpResult = await addXP(currentUser.uid, 20);

          if (!xpResult.success) {
            alert(xpResult.error);
            return;
          }

          setXp(xpResult.xp ?? 0);
          setLevel(xpResult.level ?? 'Rookie');

          alert('📚 Anti-Doping Basics completed! +20 XP');
        }}
      >
        <Text style={styles.featureTitle}>
          📚 Complete Anti-Doping Basics
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.featureCard}
        onPress={() => router.push('/medicine-scanner')}
      >
        <Text style={styles.featureTitle}>📷 Medicine Scanner</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.featureCard}
        onPress={() => router.push('/leaderboard')}
      >
        <Text style={styles.featureTitle}>🏅 Leaderboard</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={async () => {
          const result = await logoutUser();

          if (!result.success) {
            alert(result.error);
            return;
          }

          router.replace('/login');
        }}
      >
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2563EB',
    padding: 20,
  },

  greeting: {
    color: '#94A3B8',
    fontSize: 16,
    marginTop: 20,
  },

  name: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  profileCard: {
    backgroundColor: '#1E293B',
    padding: 16,
    borderRadius: 16,
    marginBottom: 20,
  },

  profileText: {
    color: 'white',
    fontSize: 16,
    marginBottom: 6,
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
    backgroundColor: '#1D4ED8',
    padding: 20,
    borderRadius: 16,
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
  },
});