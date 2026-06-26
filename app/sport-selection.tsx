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
    icon: "🏃",
  },
  {
    id: "football",
    title: "Football",
    icon: "⚽",
  },
  {
    id: "cricket",
    title: "Cricket",
    icon: "🏏",
  },
  {
    id: "swimming",
    title: "Swimming",
    icon: "🏊",
  },
  {
    id: "boxing",
    title: "Boxing",
    icon: "🥊",
  },
  {
    id: "badminton",
    title: "Badminton",
    icon: "🏸",
  },
  {
    id: "weightlifting",
    title: "Weightlifting",
    icon: "🏋️",
  },
  {
    id: "martial-arts",
    title: "Martial Arts",
    icon: "🥋",
  },
  {
    id: "other",
    title: "Other",
    icon: "🎯",
  },
];

export default function SportSelectionScreen() {
  const [selectedSport, setSelectedSport] =
    useState<string>("");

 const handleContinue = () => {
  router.push({
    pathname: '/athlete-details',
    params: {
      sport: selectedSport,
    },
  });
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
            <Text style={styles.sportEmoji}>
               {item.icon}
            </Text>

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
    backgroundColor: '#06B6D4',
    paddingHorizontal: 24,
    paddingTop: 40,
  },

  title: {
    color: '#FFFFFF',
    fontSize: 36,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 10,
  },

  subtitle: {
    color: '#EAFBFF',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
  },

  card: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    margin: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 150,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
  },

  activeCard: {
    borderWidth: 3,
    borderColor: '#06B6D4',
    transform: [{ scale: 1.02 }],
  },

  cardText: {
    color: '#0F172A',
    marginTop: 14,
    fontWeight: '700',
    fontSize: 18,
  },

  sportEmoji: {
    fontSize: 48,
  },

  button: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 18,
    borderRadius: 999,
    marginBottom: 30,
    marginTop: 20,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 6,
  },

  buttonText: {
    color: '#06B6D4',
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 18,
  },
});