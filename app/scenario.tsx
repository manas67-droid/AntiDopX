<<<<<<< HEAD
import { useCallback, useEffect, useState } from 'react';
import {
  Alert,
=======
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
>>>>>>> 1f47e78c42b666455a065f02e9c037fa6ccae9a7
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
<<<<<<< HEAD
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
=======
} from "react-native";

const choices = [
  {
    id: "a",
    label: "Take it — coach knows best",
    outcome: "bad",
    text: "Risky. Even trusted coaches can suggest substances containing banned ingredients. Strict liability means YOU are responsible.",
  },
  {
    id: "b",
    label: "Verify on Global DRO first",
    outcome: "good",
    text: "Smart move! Global DRO and WADA's Prohibited List tell you exactly what's allowed.",
  },
  {
    id: "c",
    label: "Ask medical / NADA support",
    outcome: "best",
    text: "Best answer. Your team doctor or NADA can verify ingredients and ensure compliance.",
  },
];

export default function ScenarioScreen() {
  const [selected, setSelected] = useState<string | null>(null);

  const result = choices.find((choice) => choice.id === selected);
>>>>>>> 1f47e78c42b666455a065f02e9c037fa6ccae9a7

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
<<<<<<< HEAD
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
=======
          <MaterialIcons name="arrow-back" size={28} color="white" />
        </TouchableOpacity>

        <Text style={styles.xpText}>⚡ +80 XP</Text>
      </View>

      {/* Title */}

      <Text style={styles.scenarioLabel}>Scenario 04 · Pre-Competition</Text>

      <Text style={styles.title}>What Would You Do?</Text>

      {/* Scenario Card */}

      <View style={styles.scenarioCard}>
        <View style={styles.warningIcon}>
          <FontAwesome5 name="exclamation-triangle" size={24} color="white" />
        </View>

        <View style={{ flex: 1 }}>
          <Text style={styles.cardTitle}>Day before the meet</Text>

          <Text style={styles.cardText}>
            Your coach hands you a new recovery supplement and insists it will
            improve your performance.
          </Text>
        </View>
      </View>

      {/* Choices */}

      {choices.map((choice) => {
        const isSelected = selected === choice.id;

        const showResult = selected !== null;

        return (
          <TouchableOpacity
            key={choice.id}
            disabled={selected !== null}
            onPress={() => setSelected(choice.id)}
            style={[
              styles.choiceCard,

              showResult &&
                isSelected &&
                choice.outcome === "bad" &&
                styles.badChoice,

              showResult &&
                isSelected &&
                choice.outcome === "good" &&
                styles.goodChoice,

              showResult &&
                isSelected &&
                choice.outcome === "best" &&
                styles.bestChoice,
            ]}
          >
            <Text style={styles.choiceLetter}>{choice.id.toUpperCase()}</Text>

            <Text style={styles.choiceText}>{choice.label}</Text>
          </TouchableOpacity>
        );
      })}

      {/* Result */}

      {result && (
        <View
          style={[
            styles.resultCard,

            result.outcome === "bad" ? styles.badResult : styles.goodResult,
          ]}
        >
          <Text style={styles.resultTitle}>
            {result.outcome === "best"
              ? "🏆 Pro Move!"
              : result.outcome === "good"
                ? "✅ Smart Choice"
                : "⚠️ Be Careful"}
          </Text>

          <Text style={styles.resultText}>{result.text}</Text>

          <View style={styles.resultButtons}>
            <TouchableOpacity
              style={styles.exitButton}
              onPress={() => router.push("/challenges" as any)}
            >
              <Text style={styles.exitText}>Exit</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.nextButton}
              onPress={() => setSelected(null)}
            >
              <Text style={styles.nextText}>Next Scenario →</Text>
            </TouchableOpacity>
          </View>
>>>>>>> 1f47e78c42b666455a065f02e9c037fa6ccae9a7
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
<<<<<<< HEAD

=======
>>>>>>> 1f47e78c42b666455a065f02e9c037fa6ccae9a7
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1F5F9",
    padding: 20,
  },

  header: {
<<<<<<< HEAD
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
=======
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 50,
    marginBottom: 20,
  },

  xpText: {
    color: "#22C55E",
    fontWeight: "700",
>>>>>>> 1f47e78c42b666455a065f02e9c037fa6ccae9a7
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
    color: "#06B6D4",
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 1,
  },

  title: {
    color: "#0F172A",
    fontSize: 34,
    fontWeight: "800",
    marginTop: 8,
    marginBottom: 24,
  },

<<<<<<< HEAD
  situationCard: {
    flexDirection: 'row',
    backgroundColor: '#1E293B',
=======
  scenarioCard: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
>>>>>>> 1f47e78c42b666455a065f02e9c037fa6ccae9a7
    padding: 20,
    borderRadius: 24,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },

  warningIcon: {
    width: 58,
    height: 58,
    borderRadius: 18,
    backgroundColor: "#FB923C",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  warningIconText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },

  cardTitle: {
    color: "#0F172A",
    fontWeight: "700",
    fontSize: 18,
    marginBottom: 8,
  },

  cardText: {
    color: "#64748B",
    lineHeight: 22,
    fontSize: 15,
  },

  choiceCard: {
    backgroundColor: "#FFFFFF",
    padding: 18,
    borderRadius: 22,
    marginBottom: 14,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },

  completedChoice: {
    opacity: 0.6,
  },

  choiceLetter: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#E0F2FE",
    textAlign: "center",
    textAlignVertical: "center",
    color: "#06B6D4",
    fontWeight: "800",
    fontSize: 18,
    marginRight: 14,
    overflow: "hidden",
  },

  choiceText: {
    color: "#0F172A",
    flex: 1,
    fontSize: 15,
    fontWeight: "600",
  },

  badChoice: {
    borderWidth: 2,
    borderColor: "#EF4444",
    backgroundColor: "#FEF2F2",
  },

  goodChoice: {
    borderWidth: 2,
    borderColor: "#06B6D4",
    backgroundColor: "#F0FDFF",
  },

  bestChoice: {
    borderWidth: 2,
    borderColor: "#22C55E",
    backgroundColor: "#F0FDF4",
  },

  resultCard: {
    marginTop: 20,
    padding: 22,
    borderRadius: 24,
    marginBottom: 30,
  },

  badResult: {
    backgroundColor: "#FEF2F2",
    borderWidth: 1,
    borderColor: "#FCA5A5",
  },

  goodResult: {
    backgroundColor: "#F0FDF4",
    borderWidth: 1,
    borderColor: "#86EFAC",
  },

  resultTitle: {
    color: "#0F172A",
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 10,
  },

  resultText: {
    color: "#475569",
    lineHeight: 24,
    fontSize: 15,
  },

  resultButtons: {
    flexDirection: "row",
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
    backgroundColor: "#E2E8F0",
    padding: 16,
    borderRadius: 16,
  },

  exitText: {
    color: "#0F172A",
    textAlign: "center",
    fontWeight: "700",
  },

<<<<<<< HEAD
  emptyText: {
    color: '#94A3B8',
    fontSize: 16,
    marginTop: 40,
    textAlign: 'center',
=======
  nextButton: {
    flex: 1,
    backgroundColor: "#06B6D4",
    padding: 16,
    borderRadius: 16,
  },

  nextText: {
    color: "white",
    textAlign: "center",
    fontWeight: "800",
>>>>>>> 1f47e78c42b666455a065f02e9c037fa6ccae9a7
  },
});
