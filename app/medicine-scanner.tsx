import { useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import {
  scanMedicineText,
  type MedicineScanResult,
} from '../src/firebase/medicineScannerService';

export default function MedicineScannerScreen() {
  const [medicineText, setMedicineText] = useState('');
  const [result, setResult] = useState<MedicineScanResult | null>(null);
  const [isChecking, setIsChecking] = useState(false);

  const handleAnalyze = async () => {
    setIsChecking(true);
    const scanResult = await scanMedicineText(medicineText);
    setIsChecking(false);

    if (!scanResult.success) {
      Alert.alert('Error', scanResult.error);
      return;
    }

    setResult(scanResult.data);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      contentInsetAdjustmentBehavior="automatic"
    >
      <Text style={styles.title} selectable>
        Medicine Scanner
      </Text>

      <Text style={styles.label} selectable>
        Paste medicine label text
      </Text>

      <TextInput
        multiline
        placeholder="Example: Cold tablet with pseudoephedrine"
        placeholderTextColor="#94A3B8"
        style={styles.input}
        value={medicineText}
        onChangeText={setMedicineText}
      />

      <TouchableOpacity
        style={styles.primaryButton}
        onPress={handleAnalyze}
        disabled={isChecking}
      >
        <Text style={styles.buttonText}>
          {isChecking ? 'Analyzing...' : 'Analyze Text'}
        </Text>
      </TouchableOpacity>

      {result ? (
        <View style={styles.resultCard}>
          <Text style={styles.status} selectable>
            {result.lookup.status}
          </Text>
          <Text style={styles.drugName} selectable>
            {result.detectedDrugName || 'No match detected'}
          </Text>
          <Text style={styles.guidance} selectable>
            {result.lookup.guidance}
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
    gap: 16,
    padding: 20,
    paddingBottom: 48,
  },

  title: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 40,
  },

  label: {
    color: '#CBD5E1',
    fontSize: 16,
  },

  input: {
    backgroundColor: '#1E293B',
    borderRadius: 12,
    color: 'white',
    minHeight: 140,
    padding: 16,
    textAlignVertical: 'top',
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

  resultCard: {
    backgroundColor: '#1E293B',
    borderRadius: 12,
    gap: 12,
    padding: 18,
  },

  status: {
    color: '#93C5FD',
    fontSize: 13,
    fontWeight: '800',
    textTransform: 'uppercase',
  },

  drugName: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },

  guidance: {
    color: '#CBD5E1',
    fontSize: 15,
    lineHeight: 22,
  },
});
