import {
  Feather,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import { router } from 'expo-router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { auth } from '../src/firebase/config';
import {
  getQuizArenaQuestions,
  submitQuizArenaResult,
} from '../src/firebase/quizService';

const questions = getQuizArenaQuestions();

export default function QuizScreen() {
  const [idx, setIdx] = useState(0);
  const [time, setTime] = useState(20);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [done, setDone] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [xpEarned, setXpEarned] = useState(0);
  const [submitError, setSubmitError] = useState('');

  const persistQuizResult = useCallback(async (finalScore: number) => {
    const currentUser = auth.currentUser;

    if (!currentUser) {
      setSubmitError('Please sign in to save your quiz results.');
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    const result = await submitQuizArenaResult(
      currentUser.uid,
      finalScore,
      questions.length
    );

    if (!result.success) {
      setSubmitError(result.error);
      Alert.alert('Error', result.error);
      setIsSubmitting(false);
      return;
    }

    setXpEarned(result.data.xpEarned);
    setIsSubmitting(false);
  }, []);

  const nextQuestion = useCallback(
    async (finalScore = score) => {
      if (idx === questions.length - 1) {
        setDone(true);
        await persistQuizResult(finalScore);
        return;
      }

      setIdx((prev) => prev + 1);
      setPicked(null);
      setTime(20);
    },
    [idx, persistQuizResult, score]
  );

  useEffect(() => {
    if (done || picked !== null) return;

    if (time === 0) {
      void nextQuestion(score);
      return;
    }

    const timer = setTimeout(() => {
      setTime((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [time, picked, done, nextQuestion, score]);

  const question = questions[idx];

  const percentage = useMemo(
    () => Math.round((score / questions.length) * 100),
    [score]
  );

  const handleAnswer = (optionIndex: number) => {
    if (picked !== null) return;

    setPicked(optionIndex);

    const nextScore =
      optionIndex === question.correctOptionIndex ? score + 1 : score;

    if (optionIndex === question.correctOptionIndex) {
      setScore(nextScore);
    }

    setTimeout(() => {
      void nextQuestion(nextScore);
    }, 800);
  };

  const resetQuiz = () => {
    setIdx(0);
    setScore(0);
    setPicked(null);
    setTime(20);
    setDone(false);
    setXpEarned(0);
    setSubmitError('');
  };

  if (done) {
    return (
      <SafeAreaView style={styles.resultContainer}>
        {isSubmitting ? (
          <ActivityIndicator color="#06B6D4" size="large" />
        ) : (
          <>
            <MaterialCommunityIcons
              name="trophy"
              size={90}
              color="#FACC15"
            />

            <Text style={styles.resultTitle}>Quiz Complete!</Text>
            <Text style={styles.resultSubtitle}>Great job athlete 🚀</Text>

            <View style={styles.statsRow}>
              <View style={styles.statCard}>
                <Text style={styles.statValue}>
                  {score}/{questions.length}
                </Text>
                <Text style={styles.statLabel}>Score</Text>
              </View>

              <View style={styles.statCard}>
                <Text style={styles.statValue}>{percentage}%</Text>
                <Text style={styles.statLabel}>Accuracy</Text>
              </View>

              <View style={styles.statCard}>
                <Text style={styles.statValue}>+{xpEarned}</Text>
                <Text style={styles.statLabel}>XP</Text>
              </View>
            </View>

            {submitError ? (
              <Text style={styles.errorText}>{submitError}</Text>
            ) : null}

            <TouchableOpacity
              style={styles.button}
              onPress={() => router.push('/dashboard')}
            >
              <Text style={styles.buttonText}>Back to Dashboard</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={resetQuiz}>
              <Text style={styles.playAgain}>Play Again</Text>
            </TouchableOpacity>
          </>
        )}
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
<<<<<<< HEAD
        <TouchableOpacity onPress={() => router.back()}>
          <Feather name="arrow-left" size={24} color="white" />
=======
        <TouchableOpacity
          onPress={() => router.back()}
        >
          <Feather
            name="arrow-left"
            size={24}
            color="#000"
          />
>>>>>>> 621bdfd5b36facd420e855fe8e8c270d43711ec9
        </TouchableOpacity>

        <Text style={styles.timer}>⏱ {time}s</Text>
      </View>

      <Text style={styles.progress}>
        Question {idx + 1} of {questions.length}
      </Text>

      <Text style={styles.question}>{question.question}</Text>

      {question.options.map((option, optionIndex) => {
        let backgroundColor = '#FFFFFF';

        if (picked !== null) {
          if (optionIndex === question.correctOptionIndex) {
            backgroundColor = '#DCFCE7';
          } else if (picked === optionIndex) {
            backgroundColor = '#FEE2E2';
          }
        }

        return (
          <TouchableOpacity
            key={option}
            disabled={picked !== null}
            style={[styles.optionButton, { backgroundColor }]}
            onPress={() => handleAnswer(optionIndex)}
          >
            <Text style={styles.optionText}>{option}</Text>
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
  errorText: {
    color: '#EF4444',
    marginBottom: 12,
    textAlign: 'center',
  },
});
