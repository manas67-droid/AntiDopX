import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { evaluateAchievements } from '../../firebase/achievementService';
import { auth } from '../../firebase/config';
import { completeModule } from '../../firebase/progressService';
import { getUserProfile } from '../../firebase/userService';
import { addXP } from '../../firebase/xpservices';
import type { LearningModule } from '../../learning/modules';
import { gradeQuiz, type QuizAnswers, type QuizResult } from '../../learning/quiz';

type LearningModuleScreenProps = {
  module: LearningModule;
};

export function LearningModuleScreen({ module }: LearningModuleScreenProps) {
  const router = useRouter();
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
  const [isCompleting, setIsCompleting] = useState(false);
  const [alreadyCompleted, setAlreadyCompleted] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const checkProgress = async () => {
        const currentUser = auth.currentUser;
        if (!currentUser) return;

        const result = await getUserProfile(currentUser.uid);
        if (result.success && result.data) {
          const progress = result.data.progress || {};
          setAlreadyCompleted(Boolean(progress[module.moduleKey]));
        }
      };
      checkProgress();
    }, [module.moduleKey])
  );

  const questions = module.quiz.questions;
  const answeredCount = questions.filter(
    (question) => answers[question.id] !== undefined
  ).length;
  const isQuizAnswered = answeredCount === questions.length;
  const canComplete = quizResult?.passed === true && !isCompleting;

  const handleSelectAnswer = (questionId: string, optionIndex: number) => {
    setAnswers((currentAnswers) => ({
      ...currentAnswers,
      [questionId]: optionIndex,
    }));
    setQuizResult(null);
  };

  const handleSubmitQuiz = () => {
    if (!isQuizAnswered) {
      Alert.alert('Quiz incomplete', 'Answer every question before submitting.');
      return;
    }

    const result = gradeQuiz(
      questions,
      answers,
      module.quiz.passingScore
    );

    setQuizResult(result);

    if (!result.passed) {
      Alert.alert(
        'Review and try again',
        `Score: ${result.score}%. You need ${module.quiz.passingScore}% to complete this module.`
      );
    }
  };

  const handleCompleteModule = async () => {
    if (!quizResult?.passed) {
      Alert.alert('Quiz required', 'Pass the quiz before completing this module.');
      return;
    }

    const currentUser = auth.currentUser;

    if (!currentUser) {
      Alert.alert('Error', 'No user logged in');
      return;
    }

    setIsCompleting(true);

    try {
      // Check if already completed before proceeding (defense in depth)
      const profileResult = await getUserProfile(currentUser.uid);
      if (profileResult.success && profileResult.data) {
        const existingProgress = profileResult.data.progress || {};
        if (existingProgress[module.moduleKey]) {
          setAlreadyCompleted(true);
          Alert.alert(
            'Module already completed',
            'You have already completed this module and cannot earn XP again.'
          );
          return;
        }
      }

      const progressResult = await completeModule(
        currentUser.uid,
        module.moduleKey
      );

      if (!progressResult.success) {
        Alert.alert('Error', progressResult.error);
        return;
      }

      const xpResult = await addXP(
        currentUser.uid,
        module.xpReward
      );

      if (!xpResult.success) {
        Alert.alert('Error', xpResult.error);
        return;
      }

      const achievementResult = await evaluateAchievements(currentUser.uid);
      const unlockedText =
        achievementResult.success &&
        achievementResult.data.newlyUnlocked.length > 0
          ? `\nUnlocked: ${achievementResult.data.newlyUnlocked.join(', ')}`
          : '';

      if (!achievementResult.success) {
        Alert.alert('Achievement update skipped', achievementResult.error);
      }

      Alert.alert(
        `${module.title} completed`,
        `+${module.xpReward} XP awarded${unlockedText}`,
        [
          {
            text: 'OK',
            onPress: () => router.replace('/learning-journey'),
          },
        ]
      );
    } finally {
      setIsCompleting(false);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      contentInsetAdjustmentBehavior="automatic"
    >
      <Text style={styles.title} selectable>
        {module.title}
      </Text>

      {alreadyCompleted && (
        <View style={styles.alreadyCompletedBanner}>
          <Text style={styles.alreadyCompletedText}>
            ✓ Module already completed. You earned XP previously.
          </Text>
        </View>
      )}

      {module.sections.map((section) => (
        <View key={section.title} style={styles.section}>
          <Text style={styles.sectionTitle} selectable>
            {section.title}
          </Text>

          {section.content.map((paragraph) => (
            <Text key={paragraph} style={styles.content} selectable>
              {paragraph}
            </Text>
          ))}
        </View>
      ))}

      <View style={styles.quizHeader}>
        <Text style={styles.quizTitle} selectable>
          Quiz
        </Text>
        <Text style={styles.quizProgress} selectable>
          {answeredCount}/{questions.length}
        </Text>
      </View>

      {questions.map((question, questionIndex) => (
        <View key={question.id} style={styles.questionCard}>
          <Text style={styles.question} selectable>
            {questionIndex + 1}. {question.question}
          </Text>

          {question.options.map((option, optionIndex) => {
            const isSelected = answers[question.id] === optionIndex;
            const isCorrect =
              quizResult !== null &&
              question.correctOptionIndex === optionIndex;
            const isWrong =
              quizResult !== null &&
              isSelected &&
              question.correctOptionIndex !== optionIndex;

            return (
              <TouchableOpacity
                key={option}
                style={[
                  styles.optionButton,
                  isSelected && styles.optionSelected,
                  isCorrect && styles.optionCorrect,
                  isWrong && styles.optionWrong,
                ]}
                onPress={() => handleSelectAnswer(question.id, optionIndex)}
              >
                <Text style={styles.optionText} selectable>
                  {option}
                </Text>
              </TouchableOpacity>
            );
          })}

          {quizResult !== null ? (
            <Text style={styles.explanation} selectable>
              {question.explanation}
            </Text>
          ) : null}
        </View>
      ))}

      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={handleSubmitQuiz}
      >
        <Text style={styles.buttonText}>
          Submit Quiz
        </Text>
      </TouchableOpacity>

      {quizResult !== null ? (
        <Text style={styles.scoreText} selectable>
          Score: {quizResult.score}% ({quizResult.correctCount}/
          {quizResult.totalQuestions})
        </Text>
      ) : null}

      {alreadyCompleted ? (
        <View style={styles.completedNotice}>
          <Text style={styles.completedNoticeText}>
            ✓ Completed
          </Text>
        </View>
      ) : (
        <TouchableOpacity
          style={[
            styles.completeButton,
            !canComplete && styles.disabledButton,
          ]}
          onPress={handleCompleteModule}
          disabled={!canComplete}
        >
          <Text style={styles.buttonText}>
            {isCompleting ? 'Completing...' : `Complete Module +${module.xpReward} XP`}
          </Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },

  contentContainer: {
    padding: 20,
    paddingBottom: 48,
  },

  title: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 40,
    marginBottom: 20,
  },

  alreadyCompletedBanner: {
    backgroundColor: '#166534',
    borderRadius: 12,
    marginBottom: 18,
    padding: 14,
  },

  alreadyCompletedText: {
    color: '#BBF7D0',
    fontSize: 15,
    fontWeight: '700',
    textAlign: 'center',
  },

  section: {
    gap: 10,
    marginBottom: 18,
  },

  sectionTitle: {
    color: '#60A5FA',
    fontSize: 20,
    fontWeight: 'bold',
  },

  content: {
    color: 'white',
    fontSize: 16,
    lineHeight: 24,
  },

  quizHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    marginBottom: 12,
  },

  quizTitle: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },

  quizProgress: {
    color: '#93C5FD',
    fontSize: 16,
    fontVariant: ['tabular-nums'],
    fontWeight: '700',
  },

  questionCard: {
    backgroundColor: '#1E293B',
    borderRadius: 12,
    gap: 10,
    marginBottom: 16,
    padding: 16,
  },

  question: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 24,
  },

  optionButton: {
    backgroundColor: '#334155',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#475569',
    padding: 12,
  },

  optionSelected: {
    borderColor: '#60A5FA',
  },

  optionCorrect: {
    backgroundColor: '#166534',
    borderColor: '#22C55E',
  },

  optionWrong: {
    backgroundColor: '#7F1D1D',
    borderColor: '#EF4444',
  },

  optionText: {
    color: 'white',
    fontSize: 15,
    lineHeight: 22,
  },

  explanation: {
    color: '#CBD5E1',
    fontSize: 14,
    lineHeight: 20,
  },

  secondaryButton: {
    backgroundColor: '#334155',
    borderRadius: 12,
    padding: 16,
  },

  completeButton: {
    backgroundColor: '#2563EB',
    borderRadius: 12,
    marginTop: 12,
    padding: 16,
  },

  disabledButton: {
    opacity: 0.45,
  },

  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  scoreText: {
    color: '#CBD5E1',
    fontSize: 16,
    fontWeight: '700',
    marginTop: 12,
    textAlign: 'center',
  },

  completedNotice: {
    backgroundColor: '#1E293B',
    borderRadius: 12,
    marginTop: 12,
    padding: 16,
  },

  completedNoticeText: {
    color: '#22C55E',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
});
