import {
    Feather,
    MaterialCommunityIcons,
} from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const items = [
  {
    name: 'Creatine',
    risk: 'Low',
    note: 'Well-studied. Choose certified batches.',
  },
  {
    name: 'Whey Protein',
    risk: 'Low',
    note: 'Generally safe. Look for certification.',
  },
  {
    name: 'Vitamin D',
    risk: 'Low',
    note: 'Permitted. Get blood tested before use.',
  },
  {
    name: 'Omega 3',
    risk: 'Low',
    note: 'Safe and beneficial.',
  },
  {
    name: 'Energy Booster',
    risk: 'High',
    note: 'May contain banned stimulants.',
  },
  {
    name: 'Pre-Workout Mix',
    risk: 'Medium',
    note: 'Always verify ingredients carefully.',
  },
];

export default function RouletteScreen() {
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<any>(null);

  const spin = () => {
    setSpinning(true);
    setResult(null);

    setTimeout(() => {
      const randomItem =
        items[Math.floor(Math.random() * items.length)];

      setResult(randomItem);
      setSpinning(false);
    }, 2000);
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low':
        return '#16A34A';
      case 'Medium':
        return '#F59E0B';
      case 'High':
        return '#DC2626';
      default:
        return '#2563EB';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}

      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
        >
          <Feather
            name="arrow-left"
            size={24}
            color="white"
          />
        </TouchableOpacity>

        <TouchableOpacity>
          <MaterialCommunityIcons
            name="bookmark-outline"
            size={24}
            color="white"
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.gameTag}>
        GAME
      </Text>

      <Text style={styles.title}>
        Supplement Roulette
      </Text>

      <Text style={styles.subtitle}>
        Spin to discover what's safe and what's risky.
      </Text>

      {/* Wheel */}

      <View style={styles.wheel}>
        <Text style={styles.wheelText}>
          🎯
        </Text>
      </View>

      <TouchableOpacity
        style={styles.spinButton}
        disabled={spinning}
        onPress={spin}
      >
        <Text style={styles.spinButtonText}>
          {spinning
            ? 'Spinning...'
            : 'SPIN'}
        </Text>
      </TouchableOpacity>

      {/* Result */}

      {result && (
        <View style={styles.resultCard}>
          <View style={styles.resultHeader}>
            <Text style={styles.resultTitle}>
              {result.name}
            </Text>

            <View
              style={[
                styles.riskBadge,
                {
                  backgroundColor:
                    getRiskColor(
                      result.risk
                    ),
                },
              ]}
            >
              <Text
                style={
                  styles.riskText
                }
              >
                {result.risk}
              </Text>
            </View>
          </View>

          <Text style={styles.note}>
            {result.note}
          </Text>

          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text
                style={
                  styles.statLabel
                }
              >
                Safety
              </Text>

              <Text
                style={
                  styles.statValue
                }
              >
                {result.risk ===
                'Low'
                  ? '9/10'
                  : result.risk ===
                    'Medium'
                  ? '6/10'
                  : '2/10'}
              </Text>
            </View>

            <View style={styles.statBox}>
              <Text
                style={
                  styles.statLabel
                }
              >
                WADA
              </Text>

              <Text
                style={
                  styles.statValue
                }
              >
                {result.risk ===
                'High'
                  ? 'Watch'
                  : 'Allowed'}
              </Text>
            </View>

            <View style={styles.statBox}>
              <Text
                style={
                  styles.statLabel
                }
              >
                Test
              </Text>

              <Text
                style={
                  styles.statValue
                }
              >
                Batch ✓
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={
              styles.saveButton
            }
          >
            <Text
              style={
                styles.saveButtonText
              }
            >
              Save to Library
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
    padding: 20,
  },

  header: {
    flexDirection: 'row',
    justifyContent:
      'space-between',
    marginTop: 10,
  },

  gameTag: {
    color: '#2563EB',
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 20,
  },

  title: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 8,
  },

  subtitle: {
    color: '#94A3B8',
    marginTop: 8,
    marginBottom: 30,
  },

  wheel: {
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: '#2563EB',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },

  wheelText: {
    fontSize: 80,
  },

  spinButton: {
    backgroundColor: '#2563EB',
    padding: 18,
    borderRadius: 16,
    marginTop: 30,
  },

  spinButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },

  resultCard: {
    backgroundColor: '#1E293B',
    marginTop: 25,
    padding: 20,
    borderRadius: 20,
  },

  resultHeader: {
    flexDirection: 'row',
    justifyContent:
      'space-between',
    alignItems: 'center',
  },

  resultTitle: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },

  riskBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },

  riskText: {
    color: 'white',
    fontWeight: 'bold',
  },

  note: {
    color: '#CBD5E1',
    marginTop: 12,
    lineHeight: 22,
  },

  statsRow: {
    flexDirection: 'row',
    justifyContent:
      'space-between',
    marginTop: 20,
  },

  statBox: {
    backgroundColor: '#334155',
    padding: 12,
    borderRadius: 12,
    width: '30%',
    alignItems: 'center',
  },

  statLabel: {
    color: '#94A3B8',
    fontSize: 12,
  },

  statValue: {
    color: 'white',
    fontWeight: 'bold',
    marginTop: 6,
  },

  saveButton: {
    backgroundColor: '#2563EB',
    marginTop: 20,
    padding: 14,
    borderRadius: 12,
  },

  saveButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});