import {
  Feather,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const questions = [
  {
    q: 'Which body publishes the global Prohibited List each year?',
    opts: ['WHO', 'WADA', 'IOC', 'FIFA'],
    a: 1,
  },
  {
    q: 'Strict liability means…',
    opts: [
      'Coach is responsible',
      "Athlete is solely responsible for what's in their body",
      'Only intentional doping counts',
      'Federations decide',
    ],
    a: 1,
  },
  {
    q: 'A TUE is required for…',
    opts: [
      'Any vitamin',
      'A prohibited substance needed for a medical condition',
      'All injections',
      'Any prescription',
    ],
    a: 1,
  },
  {
    q: 'How long can samples be stored for re-analysis?',
    opts: ['2 years', '5 years', '10 years', 'Indefinitely'],
    a: 2,
  },
  {
    q: 'Best resource to check a medication?',
    opts: ['Google', 'Global DRO', 'Pharmacist alone', 'Coach'],
    a: 1,
  },
];

export default function QuizScreen() {
  const [idx, setIdx] = useState(0);
  const [time, setTime] = useState(20);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (done || picked !== null) return;

    if (time === 0) {
      nextQuestion();
      return;
    }

    const timer = setTimeout(() => {
      setTime((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [time, picked, done]);

  const question = questions[idx];

  const handleAnswer = (i: number) => {
    if (picked !== null) return;

    setPicked(i);

    if (i === question.a) {
      setScore((prev) => prev + 1);
    }

    setTimeout(() => {
      nextQuestion();
    }, 800);
  };

  const nextQuestion = () => {
    if (idx === questions.length - 1) {
      setDone(true);
      return;
    }

    setIdx((prev) => prev + 1);
    setPicked(null);
    setTime(20);
  };

  if (done) {
    const percentage = Math.round(
      (score / questions.length) * 100
    );

    return (
      <SafeAreaView style={styles.resultContainer}>
        <MaterialCommunityIcons
          name="trophy"
          size={90}
          color="#FACC15"
        />

        <Text style={styles.resultTitle}>
          Quiz Complete!
        </Text>

        <Text style={styles.resultSubtitle}>
          Great job athlete 🚀
        </Text>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>
              {score}/{questions.length}
            </Text>
            <Text style={styles.statLabel}>
              Score
            </Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statValue}>
              {percentage}%
            </Text>
            <Text style={styles.statLabel}>
              Accuracy
            </Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statValue}>
              +180
            </Text>
            <Text style={styles.statLabel}>
              XP
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('/dashboard')}
        >
          <Text style={styles.buttonText}>
            Back to Dashboard
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setIdx(0);
            setScore(0);
            setPicked(null);
            setTime(20);
            setDone(false);
          }}
        >
          <Text style={styles.playAgain}>
            Play Again
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity
          onPress={() => router.back()}
        >
          <Feather
            name="arrow-left"
            size={24}
            color="white"
          />
        </TouchableOpacity>

        <Text style={styles.timer}>
          ⏱ {time}s
        </Text>
      </View>

      <Text style={styles.progress}>
        Question {idx + 1} of {questions.length}
      </Text>

      <Text style={styles.question}>
        {question.q}
      </Text>

      {question.opts.map((option, i) => {
        let backgroundColor = '#FFFFFF';

        if (picked !== null) {
          if (i === question.a) {
           backgroundColor = '#DCFCE7';
          } else if (picked === i) {
            backgroundColor = '#FEE2E2';
          }
        }

        return (
          <TouchableOpacity
            key={i}
            disabled={picked !== null}
            style={[
              styles.optionButton,
              { backgroundColor },
            ]}
            onPress={() => handleAnswer(i)}
          >
            <Text style={styles.optionText}>
              {option}
            </Text>
          </TouchableOpacity>
        );
      })}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F5F9',
    padding: 20,
  },

  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 20,
  },

  timer: {
    color: '#06B6D4',
    fontWeight: '800',
    fontSize: 16,
    backgroundColor: '#E0F7FA',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },

  progress: {
    color: '#64748B',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 10,
  },

  question: {
    color: '#0F172A',
    fontSize: 30,
    fontWeight: '800',
    lineHeight: 40,
    marginBottom: 30,
  },

  optionButton: {
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 22,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },

  optionText: {
    color: '#0F172A',
    fontSize: 16,
    fontWeight: '600',
  },

  resultContainer: {
    flex: 1,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },

  resultTitle: {
    color: '#0F172A',
    fontSize: 34,
    fontWeight: '800',
    marginTop: 20,
  },

  resultSubtitle: {
    color: '#64748B',
    fontSize: 16,
    marginTop: 8,
    marginBottom: 30,
  },

  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
    marginBottom: 30,
  },

  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 20,
    alignItems: 'center',
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },

  statValue: {
    color: '#0F172A',
    fontSize: 22,
    fontWeight: '800',
  },

  statLabel: {
    color: '#64748B',
    marginTop: 6,
    fontSize: 13,
  },

  button: {
    backgroundColor: '#06B6D4',
    width: '100%',
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: 'center',
  },

  buttonText: {
    color: 'white',
    fontWeight: '800',
    fontSize: 16,
  },

  playAgain: {
    color: '#06B6D4',
    marginTop: 20,
    fontWeight: '700',
    fontSize: 16,
  },
});