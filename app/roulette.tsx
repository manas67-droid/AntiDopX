import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Svg, { G, Path, Text as SvgText
} from "react-native-svg";

const items = [
  {
    name: "Creatine",
    risk: "Low",
    note: "Well-studied. Choose certified batches.",
  },
  {
    name: "Whey Protein",
    risk: "Low",
    note: "Generally safe. Look for certification.",
  },
  {
    name: "Vitamin D",
    risk: "Low",
    note: "Permitted. Get blood tested before use.",
  },
  {
    name: "Omega 3",
    risk: "Low",
    note: "Safe and beneficial.",
  },
  {
    name: "Energy Booster",
    risk: "High",
    note: "May contain banned stimulants.",
  },
  {
    name: "Pre-Workout Mix",
    risk: "Medium",
    note: "Always verify ingredients carefully.",
  },
];
const AnimatedView = Animated.createAnimatedComponent(View);

export default function RouletteScreen() {
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<any>(null);
  const rotation = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: `${rotation.value}deg`,
        },
      ],
    };
  });

  const spin = () => {
    if (spinning) return;

    setSpinning(true);
    setResult(null);

    const randomDegrees = 1800 + Math.floor(Math.random() * 360);

    rotation.value = withTiming(rotation.value + randomDegrees, {
      duration: 4000,
    });

    setTimeout(() => {
      const randomItem = items[Math.floor(Math.random() * items.length)];

      setResult(randomItem);
      setSpinning(false);
    }, 4000);
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Low":
        return "#16A34A";
      case "Medium":
        return "#F59E0B";
      case "High":
        return "#DC2626";
      default:
        return "#2563EB";
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Feather name="arrow-left" size={24} color="#0f172a" />
        </TouchableOpacity>

        <TouchableOpacity>
          <MaterialCommunityIcons
            name="bookmark-outline"
            size={24}
            color="#0f172a"
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.gameTag}>GAME</Text>

      <Text style={styles.title}>Supplement Roulette</Text>

      <Text style={styles.subtitle}>
        Spin to discover what's safe and what's risky.
      </Text>

      {/* Wheel */}

      <View style={styles.wheelContainer}>
        <View style={styles.pointer} />

        <AnimatedView style={animatedStyle}>
          <Svg width={300} height={300}>
            <G>
              
              <Path
                d="M150 150 L150 0 A150 150 0 0 1 280 75 Z"
                fill="#22C55E"
              />

              <Path
                d="M150 150 L280 75 A150 150 0 0 1 280 225 Z"
                fill="#0891B2"
              />

              <Path
                d="M150 150 L280 225 A150 150 0 0 1 150 300 Z"
                fill="#F59E0B"
              />

              <Path
                d="M150 150 L150 300 A150 150 0 0 1 20 225 Z"
                fill="#EF4444"
              />

              <Path
                d="M150 150 L20 225 A150 150 0 0 1 20 75 Z"
                fill="#06B6D4"
              />

              <Path d="M150 150 L20 75 A150 150 0 0 1 150 0 Z" fill="#8B5CF6" />
                 
            </G>
          </Svg>

          <View style={styles.centerCircle}>
            <Text style={styles.centerText}>SPIN</Text>
          </View>
        </AnimatedView>
      </View>

      <TouchableOpacity
        style={styles.spinButton}
        disabled={spinning}
        onPress={spin}
      >
        <Text style={styles.spinButtonText}>
          {spinning ? "Spinning..." : "SPIN"}
        </Text>
      </TouchableOpacity>

      {/* Result */}

      {result && (
        <View style={styles.resultCard}>
          <View style={styles.resultHeader}>
            <Text style={styles.resultTitle}>{result.name}</Text>

            <View
              style={[
                styles.riskBadge,
                {
                  backgroundColor: getRiskColor(result.risk),
                },
              ]}
            >
              <Text style={styles.riskText}>{result.risk}</Text>
            </View>
          </View>

          <Text style={styles.note}>{result.note}</Text>

          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Safety</Text>

              <Text style={styles.statValue}>
                {result.risk === "Low"
                  ? "9/10"
                  : result.risk === "Medium"
                    ? "6/10"
                    : "2/10"}
              </Text>
            </View>

            <View style={styles.statBox}>
              <Text style={styles.statLabel}>WADA</Text>

              <Text style={styles.statValue}>
                {result.risk === "High" ? "Watch" : "Allowed"}
              </Text>
            </View>

            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Test</Text>

              <Text style={styles.statValue}>Batch ✓</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Save to Library</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    padding: 20,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },

  gameTag: {
    color: "#0891B2",
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 20,
  },

  title: {
    color: "#14C8E8",
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 8,
  },

  subtitle: {
    color: "#64748B",
    marginTop: 8,
    marginBottom: 30,
  },

  wheelContainer: {
    alignItems: "center",
    marginTop: 10,
  },

  pointer: {
    width: 0,
    height: 0,
    borderLeftWidth: 15,
    borderRightWidth: 15,
    borderBottomWidth: 25,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "#14C8E8",
    marginBottom: -5,
    zIndex: 10,
  },

  centerCircle: {
    position: "absolute",
    top: 110,
    left: 110,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },

  centerText: {
    fontSize: 20,
    fontWeight: "800",
    color: "#0891B2",
  },

  spinButton: {
    backgroundColor: "#14C8E8",
    padding: 18,
    borderRadius: 16,
    marginTop: 30,
  },

  spinButtonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },

  resultCard: {
    backgroundColor: "#fff",
    marginTop: 25,
    padding: 20,
    borderRadius: 20,
    elevation: 4,
  },

  resultHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  resultTitle: {
    color: "#14C8E8",
    fontSize: 22,
    fontWeight: "bold",
  },

  riskBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },

  riskText: {
    color: "white",
    fontWeight: "bold",
  },

  note: {
    color: "#64748B",
    marginTop: 12,
    lineHeight: 22,
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },

  statBox: {
    backgroundColor: "#f1f5f9",
    padding: 12,
    borderRadius: 12,
    width: "30%",
    alignItems: "center",
  },

  statLabel: {
    color: "#94A3B8",
    fontSize: 12,
  },

  statValue: {
    color: "#14C8E8",
    fontWeight: "bold",
    marginTop: 6,
  },

  saveButton: {
    backgroundColor: "#14C8E8",
    marginTop: 20,
    padding: 14,
    borderRadius: 12,
  },

  saveButtonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },

  contentContainer: {
    padding: 20,
    paddingBottom: 120,
  },
});
