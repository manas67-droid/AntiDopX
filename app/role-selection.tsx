import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';
export default function RoleSelectionScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Who Are You?</Text>

 <TouchableOpacity
  style={styles.card}
  onPress={() => {
    router.push('/athlete-register');
  }}
>
        <Text style={styles.emoji}>🏃</Text>
        <Text style={styles.cardTitle}>Athlete</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={() => {
    alert('Coach Selected');
  }}>
        <Text style={styles.emoji}>🎯</Text>
        <Text style={styles.cardTitle}>Coach</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={() => {
    alert('Parent Selected');
  }}>
        <Text style={styles.emoji}>👨‍👩‍👧</Text>
        <Text style={styles.cardTitle}>Parent</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
    padding: 24,
    justifyContent: 'center',
  },

  title: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
  },

  card: {
    backgroundColor: '#1E293B',
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    alignItems: 'center',
  },

  emoji: {
    fontSize: 40,
    marginBottom: 10,
  },

  cardTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});