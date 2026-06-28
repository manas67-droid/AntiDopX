import {
  Feather,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { router } from 'expo-router';
import { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { auth } from '../src/firebase/config';
import {
  saveMedicineScan,
  scanMedicineText,
  type MedicineLookupResult,
  type MedicineStatus,
} from '../src/firebase/medicineScannerService';

type ScanResultView = {
  status: MedicineStatus;
  title: string;
  note: string;
  color: string;
  icon: 'check-circle' | 'warning' | 'cancel' | 'help-outline';
  cached: boolean;
};

const getResultPresentation = (
  lookup: MedicineLookupResult,
  cached = false
): ScanResultView => {
  if (lookup.status === 'Allowed') {
    return {
      status: lookup.status,
      title: lookup.drugName,
      note: lookup.guidance,
      color: '#16A34A',
      icon: 'check-circle',
      cached,
    };
  }

  if (lookup.status === 'Use With Caution') {
    return {
      status: lookup.status,
      title: lookup.drugName,
      note: lookup.guidance,
      color: '#F59E0B',
      icon: 'warning',
      cached,
    };
  }

  if (lookup.status === 'Prohibited') {
    return {
      status: lookup.status,
      title: lookup.drugName,
      note: lookup.guidance,
      color: '#DC2626',
      icon: 'cancel',
      cached,
    };
  }

  return {
    status: lookup.status,
    title: lookup.drugName,
    note: lookup.guidance,
    color: '#64748B',
    icon: 'help-outline',
    cached,
  };
};

export default function ScannerScreen() {
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<ScanResultView | null>(null);
  const [medicineName, setMedicineName] = useState('');
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const [showCamera, setShowCamera] = useState(false);

  const scanMedicine = useCallback(async () => {
    if (!medicineName.trim()) {
      Alert.alert('Missing name', 'Enter a medicine name');
      return;
    }

    setScanning(true);
    setResult(null);
    setError('');

    const scanResult = await scanMedicineText(medicineName);

    if (!scanResult.success) {
      setError(scanResult.error);
      setScanning(false);
      return;
    }

    setResult(
      getResultPresentation(
        scanResult.data.lookup,
        Boolean(scanResult.data.cached)
      )
    );
    setScanning(false);
  }, [medicineName]);

  const handleSaveScan = async () => {
    const currentUser = auth.currentUser;

    if (!currentUser || !result) {
      Alert.alert('Error', 'Sign in and scan a medicine first.');
      return;
    }

    setIsSaving(true);

    const saveResult = await saveMedicineScan(currentUser.uid, {
      drugName: result.title,
      status: result.status,
      guidance: result.note,
    });

    setIsSaving(false);

    if (!saveResult.success) {
      Alert.alert('Error', saveResult.error);
      return;
    }

    if (saveResult.data.duplicate) {
      Alert.alert('Already saved', 'This medicine is already in your library.');
      return;
    }

    Alert.alert(
      'Saved',
      saveResult.data.xpAwarded > 0
        ? `Medicine saved. +${saveResult.data.xpAwarded} XP awarded.`
        : 'Medicine saved to your profile.'
    );
  };

  if (!permission) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Feather name="arrow-left" size={24} color="white" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Medicine Scanner</Text>

        <TouchableOpacity>
          <MaterialIcons name="flashlight-on" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.scannerArea}>
        <View style={styles.scannerBox}>
          {showCamera ? (
            <>
              <CameraView style={StyleSheet.absoluteFillObject} />
              <TouchableOpacity
                style={styles.closeCameraButton}
                onPress={() => setShowCamera(false)}
              >
                <Text style={styles.closeCameraText}>Close Camera</Text>
              </TouchableOpacity>
            </>
          ) : (
            <MaterialCommunityIcons
              name="barcode-scan"
              size={80}
              color="#38BDF8"
            />
          )}
        </View>

        {scanning ? (
          <View style={styles.scanningRow}>
            <ActivityIndicator color="#14C8E8" />
            <Text style={styles.scanningText}>Scanning...</Text>
          </View>
        ) : null}
      </View>

      <Text style={styles.instructions}>
        Point camera at the medicine label
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Enter medicine name"
        placeholderTextColor="#94A3B8"
        value={medicineName}
        onChangeText={setMedicineName}
      />

      {error ? (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={scanMedicine}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : null}

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={async () => {
            const response = await requestPermission();

            if (response.granted) {
              setShowCamera(true);
            } else {
              Alert.alert('Permission required', 'Camera access is needed.');
            }
          }}
        >
          <MaterialIcons name="photo-library" size={18} color="white" />
          <Text style={styles.smallButtonText}>Upload</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.scanButton}
          onPress={scanMedicine}
          disabled={scanning}
        >
          <Text style={styles.scanButtonText}>
            {scanning ? 'Scanning...' : 'Check Medicine'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => setMedicineName('')}
        >
          <Text style={styles.smallButtonText}>Clear</Text>
        </TouchableOpacity>
      </View>

      {result ? (
        <View
          style={[
            styles.resultCard,
            {
              borderColor: result.color,
            },
          ]}
        >
          <View style={styles.resultHeader}>
            <MaterialIcons name={result.icon} size={32} color={result.color} />

            <View>
              <Text style={styles.resultStatus}>
                {result.status.toUpperCase()}
                {result.cached ? ' • CACHED' : ''}
              </Text>
              <Text style={styles.resultTitle}>{result.title}</Text>
            </View>
          </View>

          <Text style={styles.note}>{result.note}</Text>

          <View style={styles.actionRow}>
            <TouchableOpacity style={styles.altButton}>
              <Text style={styles.altButtonText}>Alternatives</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleSaveScan}
              disabled={isSaving}
            >
              <Text style={styles.saveButtonText}>
                {isSaving ? 'Saving...' : 'Save'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    borderColor: '#14C8E8',
    borderRadius: 30,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeCameraButton: {
    marginTop: 10,
    backgroundColor: '#EF4444',
    padding: 12,
    borderRadius: 10,
  },
  closeCameraText: {
    color: 'white',
    fontWeight: 'bold',
  },
  scanningRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    gap: 8,
  },
  scanningText: {
    color: '#14C8E8',
    fontWeight: 'bold',
  },
  instructions: {
    color: '#94A3B8',
    textAlign: 'center',
    fontSize: 14,
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#1E293B',
    color: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  errorBox: {
    backgroundColor: '#7F1D1D',
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
  },
  errorText: {
    color: '#FECACA',
    marginBottom: 10,
  },
  retryButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#EF4444',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
  },
  retryButtonText: {
    color: 'white',
    fontWeight: '700',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    marginTop: 2,
    fontSize: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  scanButton: {
    backgroundColor: '#14C8E8',
    width: '40%',
    padding: 18,
    borderRadius: 14,
    alignItems: 'center',
  },
  scanButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  resultCard: {
    backgroundColor: '#1E293B',
    borderWidth: 3,
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
    backgroundColor: '#14C8E8',
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
