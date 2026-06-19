import { ScrollView, StyleSheet, Text, View } from 'react-native';

const badges = [
  {
    emoji: '🏅',
    title: 'First Lesson',
    description: 'Complete your first lesson',
    earned: true,
  },
  {
    emoji: '🛡️',
    title: 'Clean Athlete',
    description: 'Pass the basics module',
    earned: true,
  },
  {
    emoji: '🔥',
    title: '7 Day Streak',
    description: 'Practice 7 days in a row',
    earned: true,
  },
  {
    emoji: '💊',
    title: 'Supplement Expert',
    description: 'Master supplement risks',
    earned: true,
  },
  {
    emoji: '🧠',
    title: 'Knowledge Streak',
    description: '5 quiz answers in a row',
    earned: true,
  },
  {
    emoji: '🎯',
    title: 'Sharp Shooter',
    description: '100% on a quiz',
    earned: true,
  },
  {
    emoji: '🏆',
    title: 'Anti-Doping Master',
    description: 'Finish all 6 modules',
    earned: false,
  },
  {
    emoji: '🌍',
    title: 'Global Top 100',
    description: 'Reach top 100 worldwide',
    earned: false,
  },
  {
    emoji: '⚡',
    title: 'Speed Demon',
    description: '10 quiz questions under 60s',
    earned: false,
  },
  {
    emoji: '🥇',
    title: 'Tournament Win',
    description: 'Win a live tournament',
    earned: false,
  },
  {
    emoji: '📚',
    title: 'Scholar',
    description: 'Read all references',
    earned: false,
  },
  {
    emoji: '💯',
    title: 'Centurion',
    description: '100 quizzes completed',
    earned: false,
  },
];

export default function AchievementsScreen() {
  const earnedCount = badges.filter(
    (badge) => badge.earned
  ).length;

  const progress =
    (earnedCount / badges.length) * 100;

  return (
    <ScrollView style={styles.container}>
      {/* Header */}

      <View style={styles.header}>
        <Text style={styles.title}>
          Achievements
        </Text>

        <Text style={styles.subtitle}>
          {earnedCount} of {badges.length} unlocked
        </Text>

        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              { width: `${progress}%` },
            ]}
          />
        </View>
      </View>

      {/* Badge Grid */}

      <View style={styles.grid}>
        {badges.map((badge, index) => (
          <View
            key={index}
            style={[
              styles.badgeCard,
              !badge.earned &&
                styles.lockedBadge,
            ]}
          >
            <View
              style={[
                styles.iconContainer,
                !badge.earned &&
                  styles.lockedIcon,
              ]}
            >
              <Text style={styles.emoji}>
                {badge.earned
                  ? badge.emoji
                  : '🔒'}
              </Text>
            </View>

            <Text
              style={[
                styles.badgeTitle,
                !badge.earned && {
                  color: '#94A3B8',
                },
              ]}
            >
              {badge.title}
            </Text>

            <Text style={styles.badgeDescription}>
              {badge.description}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },

  header: {
    backgroundColor: '#2563EB',
    paddingTop: 50,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  title: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },

  subtitle: {
    color: '#DBEAFE',
    marginTop: 6,
  },

  progressBar: {
    height: 10,
    backgroundColor: '#60A5FA',
    borderRadius: 20,
    marginTop: 16,
    overflow: 'hidden',
  },

  progressFill: {
    height: '100%',
    backgroundColor: 'white',
    borderRadius: 20,
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 16,
  },

  badgeCard: {
    width: '31%',
    backgroundColor: '#1E293B',
    borderRadius: 20,
    padding: 10,
    marginBottom: 14,
    alignItems: 'center',
  },

  lockedBadge: {
    opacity: 0.6,
  },

  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 18,
    backgroundColor: '#2563EB',
    justifyContent: 'center',
    alignItems: 'center',
  },

  lockedIcon: {
    backgroundColor: '#334155',
  },

  emoji: {
    fontSize: 28,
  },

  badgeTitle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 12,
    marginTop: 8,
  },

  badgeDescription: {
    color: '#94A3B8',
    textAlign: 'center',
    fontSize: 10,
    marginTop: 4,
  },
});