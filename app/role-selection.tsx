import { router } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
export default function RoleSelectionScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Who Are You?</Text>

 <TouchableOpacity
  style={styles.card}
  onPress={() => {
    router.push('/sport-selection');
  }}
>
        <Text style={styles.emoji}>🏃</Text>
        <Text style={styles.cardTitle}>Athlete</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => {
          router.push('/coach/dashboard' as any);
        }}
      >
        <Text style={styles.emoji}>🎯</Text>
        <Text style={styles.cardTitle}>Coach / Mentor</Text>
        <Text style={styles.cardDescription}>Monitor athletes, track anti-doping curriculum, and communicate directly.</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => {
          router.push('/coach/dashboard' as any);
        }}
      >
        <Text style={styles.emoji}>👨‍👩‍👧</Text>
        <Text style={styles.cardTitle}>Parent / Guardian</Text>
        <Text style={styles.cardDescription}>Support young athletes with safe medication guidance and awareness.</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#06B6D4',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },

  title: {
    color: '#FFFFFF',
    fontSize: 36,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 44,
  },

  card: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 24,
    paddingHorizontal: 20,
    borderRadius: 24,
    marginBottom: 18,
    alignItems: 'center',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
  },

  emoji: {
    fontSize: 52,
    marginBottom: 14,
  },

  cardTitle: {
    color: '#0F172A',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 6,
  },

  cardDescription: {
    color: '#64748B',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 8,
  },
});