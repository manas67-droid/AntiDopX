import { FontAwesome5 } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity
} from "react-native";

const sports = [
  {
    id: "athletics",
    title: "Athletics",
    icon: "running",
  },
  {
    id: "football",
    title: "Football",
    icon: "futbol",
  },
  {
    id: "cricket",
    title: "Cricket",
    icon: "trophy",
  },
  {
    id: "swimming",
    title: "Swimming",
    icon: "swimmer",
  },
  {
    id: "boxing",
    title: "Boxing",
    icon: "fist-raised",
  },
  {
    id: "other",
    title: "Other",
    icon: "ellipsis-h",
  },
];

export default function SportSelectionScreen() {
  const [selectedSport, setSelectedSport] =
    useState<string>("");

 const handleContinue = () => {
  router.push("/(tabs)/dashboard",);
};

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        What is your sport?
      </Text>

      <Text style={styles.subtitle}>
        We will personalize your learning
        experience.
      </Text>

      <FlatList
        data={sports}
        numColumns={2}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          paddingTop: 24,
        }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.card,
              selectedSport === item.id &&
                styles.activeCard,
            ]}
            onPress={() =>
              setSelectedSport(item.id)
            }
          >
            <FontAwesome5
              name={item.icon}
              size={30}
              color="#2563EB"
            />

            <Text style={styles.cardText}>
              {item.title}
            </Text>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity
        disabled={!selectedSport}
        style={[
          styles.button,
          !selectedSport && {
            opacity: 0.5,
          },
        ]}
        onPress={handleContinue}
      >
        <Text style={styles.buttonText}>
          Continue
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A",
    paddingHorizontal: 20,
  },

  title: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "700",
    marginTop: 20,
  },

  subtitle: {
    color: "#94A3B8",
    marginTop: 8,
    fontSize: 16,
  },

  card: {
    flex: 1,
    backgroundColor: "#1E293B",
    borderRadius: 24,
    padding: 24,
    margin: 8,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 140,
  },

  activeCard: {
    borderWidth: 2,
    borderColor: "#2563EB",
  },

  cardText: {
    color: "#fff",
    marginTop: 12,
    fontWeight: "600",
  },

  button: {
    backgroundColor: "#2563EB",
    paddingVertical: 18,
    borderRadius: 18,
    marginBottom: 24,
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700",
    fontSize: 16,
  },
});
