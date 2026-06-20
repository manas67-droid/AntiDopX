import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
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

  return (
    <ScrollView style={styles.container}>
      {/* Header */}

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
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
        </View>
      )}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1F5F9",
    padding: 20,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 50,
    marginBottom: 20,
  },

  xpText: {
    color: "#22C55E",
    fontWeight: "700",
    fontSize: 16,
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

  scenarioCard: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
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
  },
});
