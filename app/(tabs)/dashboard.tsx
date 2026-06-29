import { router, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { auth } from '../../src/firebase/config';
import {
  getDashboardData,
  type DashboardData,
} from '../../src/firebase/dashboardService';

export default function DashboardScreen() {
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const loadDashboard = useCallback(async () => {
    const currentUser = auth.currentUser;

    if (!currentUser) {
      setError('Please sign in to view your dashboard.');
      setDashboard(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError('');

    const result = await getDashboardData(currentUser.uid);

    if (!result.success) {
      setError(result.error);
      setDashboard(null);
      setIsLoading(false);
      return;
    }

    setDashboard(result.data);
    setIsLoading(false);
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadDashboard();
    }, [loadDashboard])
  );

  if (isLoading && !dashboard) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator color="#14C8E8" size="large" />
      </View>
    );
  }

  if (error && !dashboard) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={loadDashboard}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!dashboard) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.errorText}>No dashboard data available.</Text>
      </View>
    );
  }

  const unlockedBadges = dashboard.badges.filter((badge) => badge.unlocked);
  const visibleBadges =
    unlockedBadges.length > 0
      ? unlockedBadges.slice(0, 4)
      : dashboard.badges.slice(0, 4);

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.hero}>
        <View style={styles.userRow}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {dashboard.name?.charAt(0)?.toUpperCase() || 'A'}
            </Text>
          </View>

          <View>
            <Text style={styles.welcome}>Welcome back 👋</Text>
            <Text style={styles.userName}>{dashboard.name || 'Athlete'}</Text>
          </View>

          <View style={styles.streakBadge}>
            <Text style={styles.streakText}>🔥 {dashboard.streak}</Text>
          </View>
        </View>

        <View style={styles.levelCard}>
          <View style={styles.levelRow}>
            <View>
              <Text style={styles.levelLabel}>LEVEL</Text>
              <Text style={styles.levelValue}>{dashboard.level}</Text>
            </View>

            <View>
              <Text style={styles.levelLabel}>XP</Text>
              <Text style={styles.xpValue}>
                {dashboard.xp}/{dashboard.xpCap}
              </Text>
            </View>
          </View>

          <View style={styles.progressBg}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${dashboard.xpProgressPercent}%`,
                },
              ]}
            />
          </View>
        </View>
      </View>

      <View style={styles.missionCard}>
        <View style={styles.missionHeader}>
          <Text style={styles.missionHeading}>DAILY MISSION</Text>
          <Text style={styles.missionTime}>
            ⏱ Ends in {dashboard.dailyMission.endsInHours}h
          </Text>
        </View>

        <Text style={styles.missionText}>
          {dashboard.dailyMission.description}
        </Text>

        <View style={styles.progressBgLight}>
          <View
            style={{
              width: `${dashboard.dailyMission.progressPercent}%`,
              height: 8,
              backgroundColor: '#14C8E8',
              borderRadius: 20,
            }}
          />
        </View>

        <Text style={styles.reward}>
          ⚡ +{dashboard.dailyMission.rewardXP} XP & Badge
        </Text>
      </View>

      <Text style={styles.sectionTitle}>Quick Play</Text>

      <View style={styles.grid}>
        <TouchableOpacity
          style={styles.gridCard}
          onPress={() => router.push('/learning-journey')}
        >
          <Text style={styles.gridIcon}>📚</Text>
          <Text style={styles.gridTitle}>Learn</Text>
          <Text style={styles.gridSubtitle}>
            {dashboard.totalModules} Modules
          </Text>
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
          onPress={() => router.push('/medicinescanner')}
        >
          <Text style={styles.gridIcon}>📷</Text>
          <Text style={styles.gridTitle}>Med Scanner</Text>
          <Text style={styles.gridSubtitle}>AI Check</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.gridCard}
          onPress={() => router.push('/quiz')}
        >
          <Text style={styles.gridIcon}>🧠</Text>
          <Text style={styles.gridTitle}>Quiz Arena</Text>
          <Text style={styles.gridSubtitle}>Beat The Clock</Text>
        </TouchableOpacity>
      </View>

      {dashboard.recentActivity.length > 0 ? (
        <>
          <View style={styles.weekHeader}>
            <Text style={styles.sectionTitle}>Recent Activity</Text>
            <Text style={styles.eventCount}>
              {dashboard.recentActivity.length} updates
            </Text>
          </View>

          {dashboard.recentActivity.slice(0, 2).map((activity) => (
            <View key={`${activity.timestamp}-${activity.description}`} style={styles.eventCard}>
              <View style={styles.dayCircle}>
                <Text style={styles.dayText}>
                  {activity.type.slice(0, 3).toUpperCase()}
                </Text>
              </View>

              <View style={{ flex: 1 }}>
                <Text style={styles.eventTitle}>{activity.description}</Text>
                <Text style={styles.eventSubtitle}>
                  {new Date(activity.timestamp).toLocaleDateString()}
                </Text>
              </View>
            </View>
          ))}
        </>
      ) : null}

      {dashboard.events.length > 0 ? (
        <>
          <View style={styles.weekHeader}>
            <Text style={styles.sectionTitle}>This Week</Text>
            <Text style={styles.eventCount}>
              {dashboard.events.length} events
            </Text>
          </View>

          {dashboard.events.map((event) => (
            <View key={`${event.dayLabel}-${event.title}`} style={styles.eventCard}>
              <View style={styles.dayCircle}>
                <Text style={styles.dayText}>{event.dayLabel}</Text>
              </View>

              <View style={{ flex: 1 }}>
                <Text style={styles.eventTitle}>{event.title}</Text>
                <Text style={styles.eventSubtitle}>{event.subtitle}</Text>
              </View>

              <View
                style={
                  event.badge === 'LIVE' ? styles.liveBadge : styles.newBadge
                }
              >
                <Text style={styles.liveText}>{event.badge}</Text>
              </View>
            </View>
          ))}
        </>
      ) : null}

      <View style={styles.badgeHeader}>
        <Text style={styles.sectionTitle}>Recent Badges</Text>
        <TouchableOpacity onPress={() => router.push('/achievements')}>
          <Text style={styles.viewAll}>View all</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.badgesRow}>
        {visibleBadges.map((badge) => (
          <View key={badge.key} style={styles.badgeCard}>
            <Text style={styles.badgeIcon}>{badge.icon}</Text>
            <Text style={styles.badgeName}>{badge.label}</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity
        style={styles.rankCard}
        onPress={() => router.push(dashboard.recommendedModule.route as '/modules/anti-doping-basics')}
      >
        <Text style={styles.rankTitle}>🏆 Your Rank</Text>
        <Text style={styles.rankText}>
          {dashboard.rank
            ? `#${dashboard.rank.position} nationally • ${dashboard.rank.percentileLabel}`
            : 'Complete modules to join the leaderboard'}
        </Text>
        <Text style={styles.rankSubtext}>
          Recommended: {dashboard.recommendedModule.title}
        </Text>
      </TouchableOpacity>

      <View style={{ height: 120 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  errorText: {
    color: '#64748B',
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: '#14C8E8',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 12,
  },
  retryButtonText: {
    color: '#fff',
    fontWeight: '700',
  },
  hero: {
    backgroundColor: '#14C8E8',
    paddingTop: 24,
    paddingHorizontal: 24,
    paddingBottom: 90,
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
    fontSize: 16,
  },
  missionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  missionTime: {
    color: '#64748B',
    fontSize: 15,
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
    fontSize: 28,
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
  backgroundColor: '#fff',
    borderRadius: 20,
  },
  missionCard: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginTop: -55,
    borderRadius: 28,
    padding: 22,
    elevation: 8,
    shadowColor: '#14C8E8',
    shadowOpacity: 0.12,
    shadowRadius: 20,
    shadowOffset: {
      width: 0,
      height: 8,
    },
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
  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginHorizontal: 20,
    marginTop: 12,
    marginBottom: 18,
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
    fontSize: 11,
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
    width: '23%',
  },
  badgeIcon: {
    fontSize: 40,
  },
  badgeName: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
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
  rankSubtext: {
    color: '#ECFDF5',
    marginTop: 8,
    fontSize: 14,
  },
});
