import { useCallback, useEffect, useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { useFocusEffect, useRouter } from 'expo-router';
import { auth } from '../src/firebase/config';
import {
  checkScenarioCompleted,
  getScenarios,
  recordScenarioResult,
  type Scenario,
  type ScenarioChoice,
} from '../src/firebase/scenarioService';

export default function ScenarioScreen() {
  const router = useRouter();
  const [scenarios, setScenarios] = useState<Scenario[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());
  const [xpEarnedMessage, setXpEarnedMessage] = useState('');

  const loadData = useCallback(async () => {
    const result = getScenarios();
    if (!result.success) return;

    const allScenarios = result.data;
    setScenarios(allScenarios);

    // Check which scenarios are completed
    const currentUser = auth.currentUser;
    if (currentUser) {
      const completed = new Set<string>();
      for (const scenario of allScenarios) {
        const checkResult = await checkScenarioCompleted(
          currentUser.uid,
          scenario.id
        );
        if (checkResult.success && checkResult.data) {
          completed.add(scenario.id);
        }
      }
      setCompletedIds(completed);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [loadData])
  );

  // Reset selection when scenario changes
  useEffect(() => {
    setSelected(null);
    setXpEarnedMessage('');
  }, [currentIndex]);

  const current =
    scenarios.length > 0 && currentIndex < scenarios.length
      ? scenarios[currentIndex]
      : null;

  const result = current
    ? current.choices.find((c) => c.id === selected)
    : null;

  const isCompleted = current ? completedIds.has(current.id) : false;

  const handleSelect = async (choice: ScenarioChoice) => {
    if (isCompleted) return;

    setSelected(choice.id);

    const currentUser = auth.currentUser;
    if (!currentUser) return;

    const result = await recordScenarioResult(currentUser.uid, current!.id);
    if (result.success) {
      if (result.data.xpEarned > 0) {
        setXpEarnedMessage(`+${result.data.xpEarned} XP earned!`);
        setCompletedIds((prev) => new Set(prev).add(current!.id));
      } else {
        setXpEarnedMessage('Already completed - no XP awarded');
      }
    } else {
      Alert.alert('Error', result.error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backButton}>← Back</Text>
        </TouchableOpacity>

        {current ? (
          <Text style={styles.xpReward}>
            ⚡ +{current.xpReward} XP
          </Text>
        ) : null}
      </View>

      {xpEarnedMessage ? (
        <View
          style={[
            styles.xpBanner,
            xpEarnedMessage.includes('Already') && styles.xpBannerDim,
          ]}
        >
          <Text style={styles.xpBannerText}>{xpEarnedMessage}</Text>
        </View>
      ) : null}

      {current ? (
        <>
          <Text style={styles.scenarioLabel}>
            {current.subtitle}
            {isCompleted ? ' ✅ Completed' : ''}
          </Text>

          <Text style={styles.title}>
            {current.title}
          </Text>

          {/* Situation Card */}
          <View style={styles.situationCard}>
            <View style={styles.warningIcon}>
              <Text style={styles.warningIconText}>!</Text>
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>
                {current.situationTitle}
              </Text>
              <Text style={styles.cardText}>
                {current.situationText}
              </Text>
            </View>
          </View>

          {/* Choices */}
          {current.choices.map((choice) => {
            const isSelected = selected === choice.id;
            const showResult = selected !== null;

            return (
              <TouchableOpacity
                key={choice.id}
                disabled={showResult || isCompleted}
                onPress={() => handleSelect(choice)}
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
                  isCompleted && styles.completedChoice,
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
                {currentIndex > 0 && (
                  <TouchableOpacity
                    style={styles.navButton}
                    onPress={() => setCurrentIndex((i) => i - 1)}
                  >
                    <Text style={styles.navButtonText}>
                      ← Previous
                    </Text>
                  </TouchableOpacity>
                )}

                {currentIndex < scenarios.length - 1 && (
                  <TouchableOpacity
                    style={styles.navButtonPrimary}
                    onPress={() => setCurrentIndex((i) => i + 1)}
                  >
                    <Text style={styles.navButtonPrimaryText}>
                      Next Scenario →
                    </Text>
                  </TouchableOpacity>
                )}

                {currentIndex === scenarios.length - 1 && (
                  <TouchableOpacity
                    style={styles.exitButton}
                    onPress={() => router.back()}
                  >
                    <Text style={styles.exitText}>Exit</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          )}
        </>
      ) : (
        <Text style={styles.emptyText}>
          No scenarios available.
        </Text>
      )}
    </ScrollView>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },

  backButton: {
    color: '#60A5FA',
    fontSize: 16,
    fontWeight: '600',
  },

  xpReward: {
    color: '#22C55E',
    fontWeight: 'bold',
    fontSize: 16,
  },

  xpBanner: {
    backgroundColor: '#166534',
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
  },

  xpBannerDim: {
    backgroundColor: '#334155',
  },

  xpBannerText: {
    color: '#BBF7D0',
    fontSize: 15,
    fontWeight: '700',
    textAlign: 'center',
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

  situationCard: {
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

  warningIconText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
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

  completedChoice: {
    opacity: 0.6,
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

  navButton: {
    flex: 1,
    backgroundColor: '#1E293B',
    padding: 14,
    borderRadius: 12,
  },

  navButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '600',
  },

  navButtonPrimary: {
    flex: 1,
    backgroundColor: '#2563EB',
    padding: 14,
    borderRadius: 12,
  },

  navButtonPrimaryText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
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

  emptyText: {
    color: '#94A3B8',
    fontSize: 16,
    marginTop: 40,
    textAlign: 'center',
  },
});
