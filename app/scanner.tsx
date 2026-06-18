import {
    Feather,
    MaterialCommunityIcons,
    MaterialIcons,
} from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const results = [
  {
    status: 'safe',
    title: 'Paracetamol 500mg',
    note: 'Permitted in and out of competition.',
    color: '#16A34A',
    icon: 'check-circle',
  },
  {
    status: 'warning',
    title: 'Pseudoephedrine',
    note: 'Permitted out-of-competition. Restricted during competition.',
    color: '#F59E0B',
    icon: 'warning',
  },
  {
    status: 'prohibited',
    title: 'Clenbuterol',
    note: 'PROHIBITED at all times. Do not consume.',
    color: '#DC2626',
    icon: 'cancel',
  },
];

export default function ScannerScreen() {
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<any>(null);

  const scanMedicine = () => {
    setScanning(true);
    setResult(null);

    setTimeout(() => {
      const randomResult =
        results[
          Math.floor(
            Math.random() * results.length
          )
        ];

      setResult(randomResult);
      setScanning(false);
    }, 1800);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}

      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
        >
          <Feather
            name="arrow-left"
            size={24}
            color="white"
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          Medicine Scanner
        </Text>

        <TouchableOpacity>
          <MaterialIcons
            name="flashlight-on"
            size={24}
            color="white"
          />
        </TouchableOpacity>
      </View>

      {/* Scanner Box */}

      <View style={styles.scannerArea}>
        <View style={styles.scannerBox}>
          <MaterialCommunityIcons
            name="barcode-scan"
            size={80}
            color="#38BDF8"
          />

          {scanning && (
            <Text style={styles.scanningText}>
              Scanning...
            </Text>
          )}
        </View>
      </View>

      <Text style={styles.instructions}>
        Point camera at the medicine label
      </Text>

      {/* Actions */}

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.secondaryButton}
        >
          <MaterialIcons
            name="photo-library"
            size={18}
            color="white"
          />
          <Text style={styles.smallButtonText}>
            Upload
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.scanButton}
          onPress={scanMedicine}
          disabled={scanning}
        >
          <Text style={styles.scanButtonText}>
            {scanning
              ? 'Scanning...'
              : 'SCAN'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
        >
          <Text style={styles.smallButtonText}>
            Manual
          </Text>
        </TouchableOpacity>
      </View>

      {/* Result */}

      {result && (
        <View
          style={[
            styles.resultCard,
            {
              borderColor:
                result.color,
            },
          ]}
        >
          <View style={styles.resultHeader}>
            <MaterialIcons
              name={result.icon}
              size={32}
              color={result.color}
            />

            <View>
              <Text
                style={
                  styles.resultStatus
                }
              >
                {result.status.toUpperCase()}
              </Text>

              <Text
                style={
                  styles.resultTitle
                }
              >
                {result.title}
              </Text>
            </View>
          </View>

          <Text style={styles.note}>
            {result.note}
          </Text>

          <View style={styles.actionRow}>
            <TouchableOpacity
              style={
                styles.altButton
              }
            >
              <Text
                style={
                  styles.altButtonText
                }
              >
                Alternatives
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={
                styles.saveButton
              }
            >
              <Text
                style={
                  styles.saveButtonText
                }
              >
                Save
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020617',
    padding: 20,
  },

  header: {
    flexDirection: 'row',
    justifyContent:
      'space-between',
    alignItems: 'center',
    marginTop: 10,
  },

  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },

  scannerArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  scannerBox: {
    width: 260,
    height: 260,
    borderWidth: 2,
    borderColor: '#38BDF8',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },

  scanningText: {
    color: '#38BDF8',
    marginTop: 12,
    fontWeight: 'bold',
  },

  instructions: {
    color: '#94A3B8',
    textAlign: 'center',
    marginBottom: 20,
  },

  buttonRow: {
    flexDirection: 'row',
    justifyContent:
      'space-between',
    marginBottom: 20,
  },

  secondaryButton: {
    backgroundColor: '#1E293B',
    width: '28%',
    padding: 14,
    borderRadius: 14,
    alignItems: 'center',
  },

  smallButtonText: {
    color: 'white',
    marginTop: 4,
    fontSize: 12,
  },

  scanButton: {
    backgroundColor: '#2563EB',
    width: '38%',
    padding: 14,
    borderRadius: 14,
    alignItems: 'center',
  },

  scanButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },

  resultCard: {
    backgroundColor: '#1E293B',
    borderWidth: 2,
    borderRadius: 20,
    padding: 20,
  },

  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  resultStatus: {
    color: '#94A3B8',
    fontSize: 11,
    marginLeft: 10,
  },

  resultTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },

  note: {
    color: '#CBD5E1',
    marginTop: 15,
    lineHeight: 22,
  },

  actionRow: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between',
  },

  altButton: {
    backgroundColor: '#334155',
    width: '48%',
    padding: 14,
    borderRadius: 12,
  },

  altButtonText: {
    color: 'white',
    textAlign: 'center',
  },

  saveButton: {
    backgroundColor: '#2563EB',
    width: '48%',
    padding: 14,
    borderRadius: 12,
  },

  saveButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});