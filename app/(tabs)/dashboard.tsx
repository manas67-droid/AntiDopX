import { Feather, FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router, useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { AppBadge } from '../../src/components/common/AppBadge';
import { AppButton } from '../../src/components/common/AppButton';
import { ProgressBar } from '../../src/components/common/ProgressBar';
import { auth } from '../../src/firebase/config';
import {
  getDashboardData,
  type DashboardData,
} from '../../src/firebase/dashboardService';
import { useTranslation } from '../../src/localization';

export default function DashboardScreen() {
  const { t } = useTranslation();
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
      void loadDashboard();
    }, [loadDashboard])
  );

  if (isLoading && !dashboard) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator color="#06B6D4" size="large" />
      </View>
    );
  }

  if (error && !dashboard) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={loadDashboard}>
          <Text style={styles.retryButtonText}>{t.common.retry}</Text>
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
      contentContainerStyle={{ paddingBottom: 140 }}
    >
      {/* Top Hero Card */}
      <View style={styles.hero}>
        <View style={styles.userRow}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {dashboard.name?.charAt(0)?.toUpperCase() || 'A'}
            </Text>
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.welcome}>{t.dashboard.welcome} 👋</Text>
            <Text style={styles.userName}>{dashboard.name || t.dashboard.athlete}</Text>
            <Text style={styles.userSport}>{dashboard.sport || 'Athlete'}</Text>
          </View>

          <View style={styles.streakBadge}>
            <Text style={styles.streakText}>🔥 {dashboard.streak}d</Text>
          </View>
        </View>

        {/* Level Progression */}
        <View style={styles.levelCard}>
          <View style={styles.levelRow}>
            <View>
              <Text style={styles.levelLabel}>{t.common.level.toUpperCase()}</Text>
              <Text style={styles.levelValue}>{dashboard.level}</Text>
            </View>

            <View style={{ alignItems: 'flex-end' }}>
              <Text style={styles.levelLabel}>{t.common.xp.toUpperCase()}</Text>
              <Text style={styles.xpValue}>
                {dashboard.xp} / {dashboard.xpCap}
              </Text>
            </View>
          </View>

          <ProgressBar
            progressPercent={dashboard.xpProgressPercent}
            height={8}
            color="#FFFFFF"
            backgroundColor="rgba(255,255,255,0.25)"
            style={{ marginTop: 14 }}
          />
        </View>
      </View>

      {/* Today's Daily Mission */}
      <View style={styles.missionCard}>
        <View style={styles.missionHeader}>
          <Text style={styles.missionHeading}>{t.dashboard.dailyMission}</Text>
          <Text style={styles.missionTime}>
            ⏱ {t.dashboard.endsIn} {dashboard.dailyMission.endsInHours}{t.dashboard.hours}
          </Text>
        </View>

        <Text style={styles.missionText}>
          {dashboard.dailyMission.description}
        </Text>

        <ProgressBar
          progressPercent={dashboard.dailyMission.progressPercent}
          height={8}
          color="#06B6D4"
          style={{ marginTop: 14 }}
        />

        <View style={styles.missionFooterRow}>
          <Text style={styles.reward}>
            ⚡ +{dashboard.dailyMission.rewardXP} XP & Badge
          </Text>
          <TouchableOpacity
            style={styles.continueBtn}
            onPress={() => router.push('/quiz' as any)}
          >
            <Text style={styles.continueBtnText}>{t.common.continue} →</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* AI Coach Banner */}
      <View style={styles.aiCoachBanner}>
        <View style={styles.aiIconBox}>
          <MaterialCommunityIcons name="robot" size={32} color="#06B6D4" />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.aiTitle}>{t.dashboard.aiCoachTitle}</Text>
          <Text style={styles.aiSubtitle}>
            "Need help with today's anti-doping lesson?"
          </Text>
        </View>
        <TouchableOpacity
          style={styles.aiBtn}
          onPress={() => router.push('/ai-coach' as any)}
        >
          <Text style={styles.aiBtnText}>{t.dashboard.askAi}</Text>
        </TouchableOpacity>
      </View>

      {/* Quick Play Section */}
      <Text style={styles.sectionTitle}>{t.dashboard.quickPlay}</Text>

      <View style={styles.grid}>
        <TouchableOpacity
          style={styles.gridCard}
          onPress={() => router.push('/learning-journey')}
        >
          <Text style={styles.gridIcon}>📚</Text>
          <Text style={styles.gridTitle}>{t.dashboard.learnTitle}</Text>
          <Text style={styles.gridSubtitle}>16 {t.dashboard.learnSubtitle}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.gridCard}
          onPress={() => router.push('/medicinescanner')}
        >
          <Text style={styles.gridIcon}>📷</Text>
          <Text style={styles.gridTitle}>{t.dashboard.scannerTitle}</Text>
          <Text style={styles.gridSubtitle}>{t.dashboard.scannerSubtitle}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.gridCard}
          onPress={() => router.push('/quiz')}
        >
          <Text style={styles.gridIcon}>🧠</Text>
          <Text style={styles.gridTitle}>{t.dashboard.quizTitle}</Text>
          <Text style={styles.gridSubtitle}>{t.dashboard.quizSubtitle}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.gridCard}
          onPress={() => router.push('/roulette')}
        >
          <Text style={styles.gridIcon}>🎲</Text>
          <Text style={styles.gridTitle}>{t.dashboard.spinTitle}</Text>
          <Text style={styles.gridSubtitle}>{t.dashboard.spinSubtitle}</Text>
        </TouchableOpacity>
      </View>

      {/* Coach Communication Banner */}
      <View style={styles.coachBanner}>
        <View style={styles.coachIconBox}>
          <FontAwesome5 name="user-graduate" size={24} color="#10B981" />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.coachBannerTitle}>Assigned Coach</Text>
          <Text style={styles.coachBannerSubtitle}>
            Direct messaging with verified mentors
          </Text>
        </View>
        <TouchableOpacity
          style={styles.coachMessageBtn}
          onPress={() => {
            const currentUser = auth.currentUser;
            const convId = `${currentUser?.uid || 'athlete'}_coach-primary`;
            router.push({
              pathname: '/chat/[conversationId]',
              params: { conversationId: convId, recipientName: 'Coach Mentor' },
            } as any);
          }}
        >
          <Text style={styles.coachMessageBtnText}>{t.dashboard.messageCoach}</Text>
        </TouchableOpacity>
      </View>

      {/* Badges Section */}
      <View style={styles.badgeHeader}>
        <Text style={styles.sectionTitle}>Badges & Achievements</Text>
        <TouchableOpacity onPress={() => router.push('/achievements')}>
          <Text style={styles.viewAll}>View all →</Text>
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

      {/* National Rank & Recommendation */}
      <TouchableOpacity
        style={styles.rankCard}
        onPress={() => router.push(dashboard.recommendedModule.route as any)}
      >
        <Text style={styles.rankTitle}>🏆 {t.dashboard.rankTitle}</Text>
        <Text style={styles.rankText}>
          {dashboard.rank
            ? `#${dashboard.rank.position} ${t.dashboard.nationally} • ${dashboard.rank.percentileLabel}`
            : 'Complete your first quiz to join rankings'}
        </Text>
        <Text style={styles.rankSubtext}>
          {t.dashboard.recommended}: {dashboard.recommendedModule.title} →
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#F8FAFC',
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
    backgroundColor: '#06B6D4',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 14,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  hero: {
    backgroundColor: '#06B6D4',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 85,
    borderBottomLeftRadius: 36,
    borderBottomRightRadius: 36,
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255,255,255,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  avatarText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 22,
  },
  welcome: {
    color: '#E0F2FE',
    fontSize: 13,
    fontWeight: '500',
  },
  userName: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '800',
  },
  userSport: {
    color: '#BAE6FD',
    fontSize: 13,
    marginTop: 2,
    fontWeight: '600',
  },
  streakBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  streakText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 14,
  },
  levelCard: {
    backgroundColor: 'rgba(255,255,255,0.14)',
    borderRadius: 22,
    padding: 18,
    marginTop: 20,
  },
  levelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  levelLabel: {
    color: '#E0F2FE',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  levelValue: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '800',
    marginTop: 2,
  },
  xpValue: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '800',
    marginTop: 2,
  },
  missionCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginTop: -55,
    borderRadius: 26,
    padding: 20,
    elevation: 8,
    shadowColor: '#0F172A',
    shadowOpacity: 0.08,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 6 },
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  missionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  missionHeading: {
    color: '#06B6D4',
    fontWeight: '800',
    fontSize: 14,
    letterSpacing: 0.5,
  },
  missionTime: {
    color: '#64748B',
    fontSize: 13,
    fontWeight: '600',
  },
  missionText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0F172A',
    lineHeight: 24,
  },
  missionFooterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 14,
  },
  reward: {
    color: '#16A34A',
    fontWeight: '700',
    fontSize: 13,
  },
  continueBtn: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 14,
  },
  continueBtnText: {
    color: '#06B6D4',
    fontWeight: '700',
    fontSize: 13,
  },
  aiCoachBanner: {
    backgroundColor: '#1E293B',
    marginHorizontal: 20,
    marginTop: 16,
    borderRadius: 22,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
  },
  aiIconBox: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#0F172A',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  aiTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
  aiSubtitle: {
    color: '#94A3B8',
    fontSize: 12,
    marginTop: 2,
  },
  aiBtn: {
    backgroundColor: '#06B6D4',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 16,
    marginLeft: 10,
  },
  aiBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    marginHorizontal: 20,
    marginTop: 22,
    marginBottom: 14,
    color: '#0F172A',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  gridCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 18,
    marginBottom: 14,
    elevation: 3,
    shadowColor: '#0F172A',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  gridIcon: {
    fontSize: 30,
    marginBottom: 10,
  },
  gridTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
  },
  gridSubtitle: {
    color: '#64748B',
    fontSize: 12,
    marginTop: 4,
  },
  coachBanner: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginTop: 10,
    borderRadius: 22,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    elevation: 2,
  },
  coachIconBox: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#ECFDF5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  coachBannerTitle: {
    color: '#0F172A',
    fontSize: 15,
    fontWeight: '800',
  },
  coachBannerSubtitle: {
    color: '#64748B',
    fontSize: 12,
    marginTop: 2,
  },
  coachMessageBtn: {
    backgroundColor: '#10B981',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 16,
    marginLeft: 10,
  },
  coachMessageBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 12,
  },
  badgeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 14,
  },
  viewAll: {
    color: '#06B6D4',
    fontWeight: '700',
    fontSize: 14,
  },
  badgesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 12,
    marginBottom: 18,
  },
  badgeCard: {
    alignItems: 'center',
    width: '23%',
    backgroundColor: '#FFFFFF',
    paddingVertical: 14,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  badgeIcon: {
    fontSize: 32,
  },
  badgeName: {
    marginTop: 6,
    fontSize: 11,
    fontWeight: '600',
    textAlign: 'center',
    color: '#334155',
  },
  rankCard: {
    marginHorizontal: 20,
    backgroundColor: '#10B981',
    borderRadius: 24,
    padding: 20,
    marginTop: 6,
  },
  rankTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  rankText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 18,
    marginTop: 6,
  },
  rankSubtext: {
    color: '#ECFDF5',
    marginTop: 8,
    fontSize: 13,
    fontWeight: '600',
  },
});
