import {
    FontAwesome5,
    MaterialIcons,
} from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const choices = [
  {
    id: 'a',
    label: 'Take it — coach knows best',
    outcome: 'bad',
    text:
      'Risky. Even trusted coaches can suggest substances containing banned ingredients. Strict liability means YOU are responsible.',
  },
  {
    id: 'b',
    label: 'Verify on Global DRO first',
    outcome: 'good',
    text:
      "Smart move! Global DRO and WADA's Prohibited List tell you exactly what's allowed.",
  },
  {
    id: 'c',
    label: 'Ask medical / NADA support',
    outcome: 'best',
    text:
      'Best answer. Your team doctor or NADA can verify ingredients and ensure compliance.',
  },
];

export default function ScenarioScreen() {
  const [selected, setSelected] =
    useState<string | null>(null);

  const result = choices.find(
    (choice) => choice.id === selected
  );

  return (
    <ScrollView style={styles.container}>
      {/* Header */}

      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
        >
          <MaterialIcons
            name="arrow-back"
            size={28}
            color="white"
          />
        </TouchableOpacity>

        <Text style={styles.xpText}>
          ⚡ +80 XP
        </Text>
      </View>

      {/* Title */}

      <Text style={styles.scenarioLabel}>
        Scenario 04 · Pre-Competition
      </Text>

      <Text style={styles.title}>
        What Would You Do?
      </Text>

      {/* Scenario Card */}

      <View style={styles.scenarioCard}>
        <View style={styles.warningIcon}>
          <FontAwesome5
            name="exclamation-triangle"
            size={24}
            color="white"
          />
        </View>

        <View style={{ flex: 1 }}>
          <Text style={styles.cardTitle}>
            Day before the meet
          </Text>

          <Text style={styles.cardText}>
            Your coach hands you a new recovery
            supplement and insists it will
            improve your performance.
          </Text>
        </View>
      </View>

      {/* Choices */}

      {choices.map((choice) => {
        const isSelected =
          selected === choice.id;

        const showResult =
          selected !== null;

        return (
          <TouchableOpacity
            key={choice.id}
            disabled={selected !== null}
            onPress={() =>
              setSelected(choice.id)
            }
            style={[
              styles.choiceCard,

              showResult &&
                isSelected &&
                choice.outcome === 'bad' &&
                styles.badChoice,

              showResult &&
                isSelected &&
                choice.outcome === 'good' &&
                styles.goodChoice,

              showResult &&
                isSelected &&
                choice.outcome === 'best' &&
                styles.bestChoice,
            ]}
          >
            <Text style={styles.choiceLetter}>
              {choice.id.toUpperCase()}
            </Text>

            <Text style={styles.choiceText}>
              {choice.label}
            </Text>
          </TouchableOpacity>
        );
      })}

      {/* Result */}

      {result && (
        <View
          style={[
            styles.resultCard,

            result.outcome === 'bad'
              ? styles.badResult
              : styles.goodResult,
          ]}
        >
          <Text style={styles.resultTitle}>
            {result.outcome === 'best'
              ? '🏆 Pro Move!'
              : result.outcome === 'good'
              ? '✅ Smart Choice'
              : '⚠️ Be Careful'}
          </Text>

          <Text style={styles.resultText}>
            {result.text}
          </Text>

          <View style={styles.resultButtons}>
            <TouchableOpacity
              style={styles.exitButton}
              onPress={() =>
                router.push('/challenges' as any)
              }
            >
              <Text style={styles.exitText}>
                Exit
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.nextButton}
              onPress={() =>
                setSelected(null)
              }
            >
              <Text style={styles.nextText}>
                Next Scenario →
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </ScrollView>
  );
}const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
    padding: 20,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 20,
  },

  xpText: {
    color: '#22C55E',
    fontWeight: 'bold',
    fontSize: 16,
  },

  scenarioLabel: {
    color: '#2563EB',
    fontSize: 12,
    fontWeight: '700',
  },

  title: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 24,
  },

  scenarioCard: {
    flexDirection: 'row',
    backgroundColor: '#1E293B',
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
  },

  warningIcon: {
    width: 50,
    height: 50,
    borderRadius: 14,
    backgroundColor: '#F59E0B',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  cardTitle: {
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 8,
  },

  cardText: {
    color: '#CBD5E1',
    lineHeight: 22,
  },

  choiceCard: {
    backgroundColor: '#1E293B',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },

  choiceLetter: {
    color: '#2563EB',
    fontWeight: 'bold',
    fontSize: 18,
    marginRight: 14,
  },

  choiceText: {
    color: 'white',
    flex: 1,
  },

  badChoice: {
    borderWidth: 2,
    borderColor: '#EF4444',
  },

  goodChoice: {
    borderWidth: 2,
    borderColor: '#2563EB',
  },

  bestChoice: {
    borderWidth: 2,
    borderColor: '#22C55E',
  },

  resultCard: {
    marginTop: 20,
    padding: 20,
    borderRadius: 18,
  },

  badResult: {
    backgroundColor: '#7F1D1D',
  },

  goodResult: {
    backgroundColor: '#14532D',
  },

  resultTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  resultText: {
    color: 'white',
    lineHeight: 22,
  },

  resultButtons: {
    flexDirection: 'row',
    marginTop: 20,
    gap: 12,
  },

  exitButton: {
    flex: 1,
    backgroundColor: '#1E293B',
    padding: 14,
    borderRadius: 12,
  },

  exitText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '600',
  },

  nextButton: {
    flex: 1,
    backgroundColor: '#2563EB',
    padding: 14,
    borderRadius: 12,
  },

  nextText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});