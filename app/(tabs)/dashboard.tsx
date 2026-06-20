import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { auth } from '../../src/firebase/config';
import { getUserProfile } from '../../src/firebase/userService';

export default function DashboardScreen() {
  const [name, setName] = useState('');
  const [sport, setSport] = useState('');
  const [age, setAge] = useState('');
  const [level, setLevel] = useState('1');
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const loadProfile = async () => {
      const currentUser = auth.currentUser;

      if (!currentUser) return;

      const result = await getUserProfile(currentUser.uid);

      if (!result.success || !result.data) return;

      const userData = result.data;

      setName(userData.name || '');
      setSport(userData.sport || '');
      setAge(String(userData.age || ''));
      setLevel(userData.level || '1');
      setXp(userData.xp || 0);
      setStreak(userData.streak || 0);
    };

    loadProfile();
  }, []);

  return (
  <ScrollView
    style={styles.container}
    showsVerticalScrollIndicator={false}
>
  
    {/* HERO */}

    <View style={styles.hero}>
      <View style={styles.userRow}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {name?.charAt(0)?.toUpperCase() || 'A'}
          </Text>
        </View>

        <View>
          <Text style={styles.welcome}>
            Welcome back 👋
          </Text>

          <Text style={styles.userName}>
            {name || 'Athlete'}
          </Text>
        </View>

        <View style={styles.streakBadge}>
          <Text style={styles.streakText}>
            🔥 {streak}
          </Text>
        </View>
      </View>

      <View style={styles.levelCard}>
        <View style={styles.levelRow}>
          <View>
            <Text style={styles.levelLabel}>
              LEVEL
            </Text>

            <Text style={styles.levelValue}>
              {level}
            </Text>
          </View>

          <View>
            <Text style={styles.levelLabel}>
              XP
            </Text>

            <Text style={styles.xpValue}>
              {xp}/3000
            </Text>
          </View>
        </View>

        <View style={styles.progressBg}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${Math.min(
                  (xp / 3000) * 100,
                  100
                )}%`,
              },
            ]}
          />
        </View>
      </View>
    </View>

    {/* DAILY MISSION */}

    <View style={styles.missionCard}>
      <Text style={styles.missionHeading}>
        DAILY MISSION
      </Text>

      <Text style={styles.missionText}>
        Complete 1 Scenario + 5 Quiz Questions
      </Text>

      <View style={styles.progressBgLight}>
        <View
          style={{
            width: '35%',
            height: 8,
            backgroundColor: '#14C8E8',
            borderRadius: 20,
          }}
        />
      </View>

      <Text style={styles.reward}>
        ⚡ +150 XP & Badge
      </Text>
    </View>

    {/* QUICK PLAY */}

<Text style={styles.sectionTitle}>
  Quick Play
</Text>

<View style={styles.grid}>
  <TouchableOpacity
    style={styles.gridCard}
    onPress={() => router.push('/learning-journey')}
  >
    <Text style={styles.gridIcon}>📚</Text>
    <Text style={styles.gridTitle}>Learn</Text>
    <Text style={styles.gridSubtitle}>5 Modules</Text>
  </TouchableOpacity>

  <TouchableOpacity
    style={styles.gridCard}
    onPress={() => router.push('/roulette')}
  >
    <Text style={styles.gridIcon}>🎲</Text>
    <Text style={styles.gridTitle}>Supplement Spin</Text>
    <Text style={styles.gridSubtitle}>Risk Roulette</Text>
  </TouchableOpacity>

  <TouchableOpacity
    style={styles.gridCard}
    onPress={() => router.push('/scanner')}
  >
    <Text style={styles.gridIcon}>📷</Text>
    <Text style={styles.gridTitle}>Med Scanner</Text>
    <Text style={styles.gridSubtitle}>AI Check</Text>
  </TouchableOpacity>

  <TouchableOpacity
    style={styles.gridCard}
    onPress={() => router.push('/challenges')}
  >
    <Text style={styles.gridIcon}>🧠</Text>
    <Text style={styles.gridTitle}>Quiz Arena</Text>
    <Text style={styles.gridSubtitle}>Beat The Clock</Text>
  </TouchableOpacity>
</View>

{/* THIS WEEK */}

<View style={styles.weekHeader}>
  <Text style={styles.sectionTitle}>
    This Week
  </Text>

  <Text style={styles.eventCount}>
    3 events
  </Text>
</View>

<View style={styles.eventCard}>
  <View style={styles.dayCircle}>
    <Text style={styles.dayText}>THU</Text>
  </View>

  <View style={{ flex: 1 }}>
    <Text style={styles.eventTitle}>
      Clean Sport Tournament
    </Text>

    <Text style={styles.eventSubtitle}>
      Compete with athletes
    </Text>
  </View>

  <View style={styles.liveBadge}>
    <Text style={styles.liveText}>LIVE</Text>
  </View>
</View>

<View style={styles.eventCard}>
  <View style={styles.dayCircle}>
    <Text style={styles.dayText}>SAT</Text>
  </View>

  <View style={{ flex: 1 }}>
    <Text style={styles.eventTitle}>
      TUE Process Workshop
    </Text>

    <Text style={styles.eventSubtitle}>
      Interactive Lesson
    </Text>
  </View>

  <View style={styles.newBadge}>
    <Text style={styles.liveText}>NEW</Text>
  </View>
</View>

{/* BADGES */}

<View style={styles.badgeHeader}>
  <Text style={styles.sectionTitle}>
    Recent Badges
  </Text>

  <Text style={styles.viewAll}>
    View all
  </Text>
</View>

<View style={styles.badgesRow}>
  <View style={styles.badgeCard}>
    <Text style={styles.badgeIcon}>🏅</Text>
    <Text style={styles.badgeName}>First Lesson</Text>
  </View>

  <View style={styles.badgeCard}>
    <Text style={styles.badgeIcon}>🛡️</Text>
    <Text style={styles.badgeName}>Clean Athlete</Text>
  </View>

  <View style={styles.badgeCard}>
    <Text style={styles.badgeIcon}>🔥</Text>
    <Text style={styles.badgeName}>7 Day Streak</Text>
  </View>

  <View style={styles.badgeCard}>
    <Text style={styles.badgeIcon}>💊</Text>
    <Text style={styles.badgeName}>Supp Expert</Text>
  </View>
</View>

{/* RANK CARD */}

<View style={styles.rankCard}>
  <Text style={styles.rankTitle}>
    🏆 Your Rank
  </Text>

  <Text style={styles.rankText}>
    #42 nationally • Top 5%
  </Text>
</View>

<View style={{ height: 120 }} />
  </ScrollView>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  hero: {
    backgroundColor: '#14C8E8',
    padding: 24,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },

  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  avatar: {
    width: 55,
    height: 55,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  avatarText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 20,
  },
  missionHeading: {
  color: '#14C8E8',
  fontWeight: '700',
  marginBottom: 10,
  },

  progressBgLight: {
  height: 8,
  backgroundColor: '#E2E8F0',
  borderRadius: 20,
  marginTop: 20,
  },

  grid: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  paddingHorizontal: 20,
  },

  gridCard: {
  width: '47%',
  backgroundColor: '#fff',
  borderRadius: 24,
  padding: 22,
  marginBottom: 16,
  elevation: 4,
  },

  gridIcon: {
  fontSize: 34,
  marginBottom: 12,
  },

  gridTitle: {
  fontSize: 16,
  fontWeight: '700',
  color: '#0F172A',
  },
  welcome: {
    color: '#EAFBFF',
    fontSize: 14,
  },

  userName: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
  },

  streakBadge: {
    marginLeft: 'auto',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },

  streakText: {
    color: '#fff',
    fontWeight: '700',
  },

  levelCard: {
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 24,
    padding: 20,
    marginTop: 24,
  },

  levelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  levelLabel: {
    color: '#EAFBFF',
  },

  levelValue: {
    color: '#fff',
    fontSize: 36,
    fontWeight: '700',
  },

  xpValue: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '700',
  },

  progressBg: {
    height: 10,
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderRadius: 20,
    marginTop: 20,
  },

  progressFill: {
    height: 10,
    backgroundColor: '#84CC16',
    borderRadius: 20,
  },

  missionCard: {
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 24,
    padding: 20,
    elevation: 4,
  },

  missionTitle: {
    color: '#14C8E8',
    fontWeight: '700',
    marginBottom: 8,
  },

  missionText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0F172A',
  },

  reward: {
    color: '#22C55E',
    fontWeight: '700',
    marginTop: 12,
  },

  chipRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
  },

  
  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginHorizontal: 20,
    marginBottom: 15,
    color: '#0F172A',
  },

  gridSubtitle: {
  color: '#64748B',
  marginTop: 4,
},

weekHeader: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingHorizontal: 20,
},

eventCount: {
  color: '#64748B',
},

eventCard: {
  backgroundColor: '#fff',
  marginHorizontal: 20,
  marginBottom: 14,
  borderRadius: 24,
  padding: 16,
  flexDirection: 'row',
  alignItems: 'center',
},

dayCircle: {
  width: 50,
  height: 50,
  borderRadius: 25,
  backgroundColor: '#F1F5F9',
  justifyContent: 'center',
  alignItems: 'center',
  marginRight: 14,
},

dayText: {
  fontWeight: '700',
  color: '#475569',
},

eventTitle: {
  fontSize: 17,
  fontWeight: '700',
},

eventSubtitle: {
  color: '#64748B',
},

liveBadge: {
  backgroundColor: '#DCFCE7',
  paddingHorizontal: 12,
  paddingVertical: 6,
  borderRadius: 999,
},

newBadge: {
  backgroundColor: '#DCFCE7',
  paddingHorizontal: 12,
  paddingVertical: 6,
  borderRadius: 999,
},

liveText: {
  color: '#22C55E',
  fontWeight: '700',
},

badgeHeader: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingHorizontal: 20,
},

viewAll: {
  color: '#14C8E8',
  fontWeight: '600',
},

badgesRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  paddingHorizontal: 20,
  marginBottom: 24,
},

badgeCard: {
  alignItems: 'center',
},

badgeIcon: {
  fontSize: 40,
},

badgeName: {
  marginTop: 8,
  fontSize: 12,
  fontWeight: '600',
},

rankCard: {
  marginHorizontal: 20,
  backgroundColor: '#22C55E',
  borderRadius: 24,
  padding: 24,
},

rankTitle: {
  color: '#fff',
  fontSize: 16,
},

rankText: {
  color: '#fff',
  fontWeight: '700',
  fontSize: 24,
  marginTop: 8,
},
});