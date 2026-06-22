<<<<<<< HEAD
import React, { useCallback, useState } from 'react';
=======
import React, { useEffect } from "react";
>>>>>>> 1f47e78c42b666455a065f02e9c037fa6ccae9a7
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

<<<<<<< HEAD
import { router, useFocusEffect } from 'expo-router';
import { auth } from '../../src/firebase/config';
import { getUserProfile } from '../../src/firebase/userService';
=======
import { router } from "expo-router";
import { auth } from "../../src/firebase/config";
import { getUserProfile } from "../../src/firebase/userService";
>>>>>>> 1f47e78c42b666455a065f02e9c037fa6ccae9a7

export default function LearningJourneyScreen() {
  const [progress, setProgress] = useState({
    antiDopingBasics: false,
    wadaRules: false,
    testingProcedures: false,
    tue: false,
    supplements: false,
  });

  const [completionPercent, setCompletionPercent] = useState(0);

  useFocusEffect(
    useCallback(() => {
      const loadProgress = async () => {
        const currentUser = auth.currentUser;

        if (!currentUser) return;

<<<<<<< HEAD
        const result = await getUserProfile(
          currentUser.uid
        );
=======
      const result = await getUserProfile(currentUser.uid);
>>>>>>> 1f47e78c42b666455a065f02e9c037fa6ccae9a7

        if (!result.success || !result.data) return;

<<<<<<< HEAD
        const userProgress =
          result.data.progress || {};

        setProgress({
          antiDopingBasics:
            userProgress.antiDopingBasics || false,

          wadaRules:
            userProgress.wadaRules || false,

          testingProcedures:
            userProgress.testingProcedures || false,

          tue:
            userProgress.tue || false,

          supplements:
            userProgress.supplements || false,
        });

        const completedModules =
          Object.values(userProgress)
            .filter(Boolean).length;
=======
      const userProgress = result.data.progress || {};

      setProgress({
        antiDopingBasics: userProgress.antiDopingBasics || false,

        wadaRules: userProgress.wadaRules || false,

        testingProcedures: userProgress.testingProcedures || false,

        tue: userProgress.tue || false,

        supplements: userProgress.supplements || false,
      });

      const completedModules =
        Object.values(userProgress).filter(Boolean).length;
>>>>>>> 1f47e78c42b666455a065f02e9c037fa6ccae9a7

        const totalModules = 5;

<<<<<<< HEAD
        const percent = Math.round(
          (completedModules / totalModules) * 100
        );
=======
      const percent = Math.round((completedModules / totalModules) * 100);
>>>>>>> 1f47e78c42b666455a065f02e9c037fa6ccae9a7

        setCompletionPercent(percent);
      };

      loadProgress();
    }, [])
  );

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.contentContainer}
    >
      <Text style={styles.headerTitle}>Learning Path</Text>

      <Text style={styles.headerSubtitle}>
        Master clean sport, one module at a time
      </Text>

      {/* Progress Card */}

<<<<<<< HEAD
      <TouchableOpacity
        style={styles.module}
        onPress={() =>
          router.push('./modules/anti-doping-basics')
        }
      >
        <Text style={styles.moduleText}>
          {progress.antiDopingBasics ? '✅' : '⬜'} Anti-Doping
          Basics
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.module}
        onPress={() =>
          router.push('./modules/wada-rules')
        }
      >
        <Text style={styles.moduleText}>
          {progress.wadaRules ? '✅' : '⬜'} WADA Rules
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.module}
        onPress={() =>
          router.push('./modules/testing-procedures')
        }
      >
        <Text style={styles.moduleText}>
          {progress.testingProcedures ? '✅' : '⬜'} Testing
          Procedures
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.module}
        onPress={() =>
          router.push('./modules/tue')
        }
      >
        <Text style={styles.moduleText}>
          {progress.tue ? '✅' : '⬜'} TUE
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.module}
        onPress={() =>
          router.push('./modules/supplements')
        }
      >
        <Text style={styles.moduleText}>
          {progress.supplements ? '✅' : '⬜'} Supplements &
          Risks
        </Text>
      </TouchableOpacity>
    </View>
=======
      <View style={styles.progressCard}>
        <Text style={styles.currentLabel}>CURRENT PROGRESS</Text>

        <Text style={styles.currentModule}>Clean Sport Journey</Text>

        <View style={styles.progressBarBg}>
          <View
            style={[
              styles.progressBarFill,
              {
                width: `${completionPercent}%`,
              },
            ]}
          />
        </View>

        <Text style={styles.progressCount}>{completionPercent}% Complete</Text>
      </View>

      {/* Module Timeline */}

      <View style={styles.timeline}>
        <TouchableOpacity
          style={styles.moduleCard}
          onPress={() => router.push("./modules/anti-doping-basics")}
        >
          <Text style={styles.status}>
            {progress.antiDopingBasics ? "COMPLETED" : "AVAILABLE"}
          </Text>

          <Text style={styles.moduleTitle}>Anti-Doping Basics</Text>

          <Text style={styles.moduleInfo}>8 lessons • +240 XP</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.moduleCard}
          onPress={() => router.push("./modules/wada-rules")}
        >
          <Text style={styles.status}>
            {progress.wadaRules ? "COMPLETED" : "IN PROGRESS"}
          </Text>

          <Text style={styles.moduleTitle}>WADA Rules</Text>

          <Text style={styles.moduleInfo}>10 lessons • +320 XP</Text>
        </TouchableOpacity>

        <View style={styles.moduleCard}>
          <Text style={styles.status}>
            {progress.testingProcedures ? "COMPLETED" : "UNLOCKED"}
          </Text>

          <Text style={styles.moduleTitle}>Testing Procedures</Text>

          <Text style={styles.moduleInfo}>6 lessons • +200 XP</Text>
        </View>

        <View style={styles.moduleCard}>
          <Text style={styles.status}>
            {progress.tue ? "COMPLETED" : "LOCKED"}
          </Text>

          <Text style={styles.moduleTitle}>TUE Process</Text>

          <Text style={styles.moduleInfo}>5 lessons • +180 XP</Text>
        </View>

        <View style={styles.moduleCard}>
          <Text style={styles.status}>
            {progress.supplements ? "COMPLETED" : "LOCKED"}
          </Text>

          <Text style={styles.moduleTitle}>Supplements & Risks</Text>

          <Text style={styles.moduleInfo}>7 lessons • +220 XP</Text>
        </View>
      </View>
    </ScrollView>
>>>>>>> 1f47e78c42b666455a065f02e9c037fa6ccae9a7
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
<<<<<<< HEAD
    backgroundColor: '#0F172A',
    padding: 20,
  },

  title: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 60,
    marginBottom: 8,
  },

  progressText: {
    color: '#93C5FD',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 24,
  },

  module: {
    backgroundColor: '#1E293B',
    borderRadius: 12,
    marginBottom: 12,
    padding: 16,
  },

  moduleText: {
    color: 'white',
    fontSize: 16,
  },
});
=======
    backgroundColor: "#F5F8FA",
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  contentContainer: {
  paddingBottom: 120,
},

  headerTitle: {
    fontSize: 34,
    fontWeight: "800",
    color: "#0F172A",
  },

  headerSubtitle: {
    color: "#64748B",
    fontSize: 16,
    marginTop: 6,
    marginBottom: 24,
  },

  progressCard: {
    backgroundColor: "#16C6E8",
    borderRadius: 30,
    padding: 24,
    marginBottom: 30,
  },

  currentLabel: {
    color: "#EAFBFF",
    fontWeight: "700",
    marginBottom: 8,
  },

  currentModule: {
    color: "white",
    fontSize: 28,
    fontWeight: "800",
    marginBottom: 20,
  },

  progressBarBg: {
    height: 12,
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: 999,
  },

  progressBarFill: {
    height: 12,
    backgroundColor: "white",
    borderRadius: 999,
  },

  progressCount: {
    color: "white",
    fontWeight: "700",
    marginTop: 12,
  },

  timeline: {
    flex: 1,
    marginBottom: 80,
  },

  moduleCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },

  status: {
    color: "#0EA5E9",
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 6,
  },

  moduleTitle: {
    color: "#0F172A",
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 6,
  },

  moduleInfo: {
    color: "#64748B",
    fontSize: 14,
  },
});

function useState<T>(
  initialValue: T,
): [T, React.Dispatch<React.SetStateAction<T>>] {
  return React.useState(initialValue);
}
>>>>>>> 1f47e78c42b666455a065f02e9c037fa6ccae9a7
