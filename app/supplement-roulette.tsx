import { useEffect, useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {
  getRandomSupplement,
  getSupplementCategories,
  type SupplementCategory,
  type SupplementResult,
} from '../src/firebase/supplementService';

export default function SupplementRouletteScreen() {
  const [categories, setCategories] = useState<SupplementCategory[]>([]);
  const [result, setResult] = useState<SupplementResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const spin = async (category?: SupplementCategory) => {
    setIsLoading(true);
    const supplementResult = await getRandomSupplement(category);
    setIsLoading(false);

    if (!supplementResult.success) {
      Alert.alert('Error', supplementResult.error);
      return;
    }

    setResult(supplementResult.data);
  };

  useEffect(() => {
    const loadCategories = async () => {
      const categoryResult = await getSupplementCategories();

      if (!categoryResult.success) {
        Alert.alert('Error', categoryResult.error);
        return;
      }

      setCategories(categoryResult.data);
      spin();
    };

    loadCategories();
  }, []);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      contentInsetAdjustmentBehavior="automatic"
    >
      <Text style={styles.title} selectable>
        Supplement Roulette
      </Text>

      <TouchableOpacity
        style={styles.primaryButton}
        onPress={() => spin()}
        disabled={isLoading}
      >
        <Text style={styles.buttonText}>
          {isLoading ? 'Checking...' : 'Random Spin'}
        </Text>
      </TouchableOpacity>

      <View style={styles.categoryRow}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={styles.categoryButton}
            onPress={() => spin(category)}
            disabled={isLoading}
          >
            <Text style={styles.categoryButtonText}>
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {result ? (
        <View style={styles.resultCard}>
          <Text style={styles.categoryLabel} selectable>
            {result.category}
          </Text>
          <Text style={styles.resultName} selectable>
            {result.name}
          </Text>
          <Text style={styles.resultText} selectable>
            {result.reason}
          </Text>
          <Text style={styles.guidance} selectable>
            {result.guidance}
          </Text>
        </View>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },

  contentContainer: {
    gap: 18,
    padding: 20,
    paddingBottom: 48,
  },

  title: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 40,
  },

  primaryButton: {
    backgroundColor: '#2563EB',
    borderRadius: 12,
    padding: 16,
  },

  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  categoryRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },

  categoryButton: {
    backgroundColor: '#334155',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },

  categoryButtonText: {
    color: 'white',
    fontWeight: '700',
  },

  resultCard: {
    backgroundColor: '#1E293B',
    borderRadius: 12,
    gap: 12,
    padding: 18,
  },

  categoryLabel: {
    color: '#93C5FD',
    fontSize: 13,
    fontWeight: '800',
    textTransform: 'uppercase',
  },

  resultName: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },

  resultText: {
    color: '#E2E8F0',
    fontSize: 16,
    lineHeight: 24,
  },

  guidance: {
    color: '#CBD5E1',
    fontSize: 15,
    lineHeight: 22,
  },
});
