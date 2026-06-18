import {
  FontAwesome5,
  Ionicons,
  MaterialIcons,
} from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

const modules = [
  {
    id: 1,
    title: 'Anti-Doping Basics',
    lessons: 8,
    xp: 240,
    status: 'done',
    icon: 'shield-alt',
  },
  {
    id: 2,
    title: 'Prohibited Substances',
    lessons: 10,
    xp: 320,
    status: 'active',
    icon: 'flask',
  },
  {
    id: 3,
    title: 'Testing Procedures',
    lessons: 6,
    xp: 200,
    status: 'unlocked',
    icon: 'file-alt',
  },
  {
    id: 4,
    title: 'TUE Process',
    lessons: 5,
    xp: 180,
    status: 'locked',
    icon: 'lock',
  },
  {
    id: 5,
    title: 'Supplement Awareness',
    lessons: 7,
    xp: 220,
    status: 'locked',
    icon: 'capsules',
  },
  {
    id: 6,
    title: 'Play True Ethics',
    lessons: 4,
    xp: 160,
    status: 'locked',
    icon: 'star',
  },
];

export default function LearningJourneyScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>
        Learning Path
      </Text>

      <Text style={styles.subtitle}>
        Master clean sport one module at a time
      </Text>

      {/* Current Module Card */}

      <View style={styles.currentCard}>
        <Text style={styles.currentLabel}>
          CURRENT MODULE
        </Text>

        <Text style={styles.currentTitle}>
          Prohibited Substances
        </Text>

        <View style={styles.progressBar}>
          <View style={styles.progressFill} />
        </View>

        <Text style={styles.progressText}>
          6 / 10 Lessons
        </Text>
      </View>

      {/* Modules */}

      {modules.map((module) => (
        <View
          key={module.id}
          style={[
            styles.moduleCard,
            module.status === 'active' &&
              styles.activeCard,
          ]}
        >
          <View style={styles.iconContainer}>
            <FontAwesome5
              name={module.icon as any}
              size={24}
              color="white"
            />
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.status}>
              {module.status.toUpperCase()}
            </Text>

            <Text style={styles.moduleTitle}>
              {module.title}
            </Text>

            <Text style={styles.moduleInfo}>
              {module.lessons} Lessons • +{module.xp} XP
            </Text>
          </View>

          {module.status === 'done' && (
            <MaterialIcons
              name="check-circle"
              size={28}
              color="#10B981"
            />
          )}

          {module.status === 'active' && (
            <Ionicons
              name="star"
              size={28}
              color="#F59E0B"
            />
          )}

          {module.status === 'locked' && (
            <Ionicons
              name="lock-closed"
              size={24}
              color="#94A3B8"
            />
          )}
        </View>
      ))}
    </ScrollView>
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
    marginTop: 20,
  },

  subtitle: {
    color: '#94A3B8',
    marginTop: 6,
    marginBottom: 20,
  },

  currentCard: {
    backgroundColor: '#2563EB',
    padding: 20,
    borderRadius: 20,
    marginBottom: 25,
  },

  currentLabel: {
    color: '#BFDBFE',
    fontSize: 12,
    fontWeight: '600',
  },

  currentTitle: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 8,
  },

  progressBar: {
    height: 10,
    backgroundColor: '#93C5FD',
    borderRadius: 10,
    marginTop: 16,
    overflow: 'hidden',
  },

  progressFill: {
    width: '60%',
    height: '100%',
    backgroundColor: 'white',
  },

  progressText: {
    color: 'white',
    marginTop: 8,
    fontWeight: '600',
  },

  moduleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    padding: 16,
    borderRadius: 18,
    marginBottom: 14,
  },

  activeCard: {
    borderWidth: 2,
    borderColor: '#2563EB',
  },

  iconContainer: {
    width: 55,
    height: 55,
    borderRadius: 15,
    backgroundColor: '#2563EB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },

  status: {
    color: '#94A3B8',
    fontSize: 11,
    fontWeight: '700',
  },

  moduleTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 2,
  },

  moduleInfo: {
    color: '#CBD5E1',
    marginTop: 4,
    fontSize: 13,
  },
});