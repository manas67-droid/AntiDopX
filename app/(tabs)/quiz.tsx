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
        let backgroundColor = '#1E293B';

        if (picked !== null) {
          if (i === question.a) {
            backgroundColor = '#16A34A';
          } else if (picked === i) {
            backgroundColor = '#DC2626';
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
    backgroundColor: '#0F172A',
    padding: 20,
  },

  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },

  timer: {
    color: '#FACC15',
    fontWeight: 'bold',
    fontSize: 16,
  },

  progress: {
    color: '#94A3B8',
    marginTop: 30,
  },

  question: {
    color: 'white',
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 30,
  },

  optionButton: {
    padding: 18,
    borderRadius: 16,
    marginBottom: 14,
  },

  optionText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },

  resultContainer: {
    flex: 1,
    backgroundColor: '#0F172A',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  resultTitle: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 20,
  },

  resultSubtitle: {
    color: '#CBD5E1',
    marginTop: 8,
    marginBottom: 30,
  },

  statsRow: {
    flexDirection: 'row',
    gap: 10,
  },

  statCard: {
    backgroundColor: '#1E293B',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
  },

  statValue: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },

  statLabel: {
    color: '#94A3B8',
    marginTop: 4,
  },

  button: {
    backgroundColor: '#2563EB',
    paddingHorizontal: 30,
    paddingVertical: 14,
    borderRadius: 14,
    marginTop: 30,
  },

  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },

  playAgain: {
    color: '#60A5FA',
    marginTop: 20,
    fontWeight: '600',
  },
});