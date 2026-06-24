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
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { auth } from '../src/firebase/config';
import { addXP } from '../src/firebase/xpservices';

import { CameraView, useCameraPermissions } from 'expo-camera';
import {
  scanMedicineText,
} from '../src/firebase/medicineScannerService';


export default function ScannerScreen() 
{const [scanning, setScanning] = useState(false);
const [result, setResult] = useState<any>(null);
const [medicineName, setMedicineName] = useState('');
const [permission, requestPermission] =
  useCameraPermissions();

const [showCamera, setShowCamera] =
  useState(false);
  if (!permission) {
  return null;
}
const rewardMedicineScan = async () => {
  const currentUser = auth.currentUser;

  if (!currentUser) return;

  await addXP(
    currentUser.uid,
    10
  );
};
 const scanMedicine = async () => {
  if (!medicineName.trim()) {
    alert('Enter a medicine name');
    return;
  }

  setScanning(true);
  setResult(null);

  const scanResult =
    await scanMedicineText(
      medicineName
    );

  if (!scanResult.success) {
    alert(scanResult.error);
    setScanning(false);
    return;
  }

  const lookup =
    scanResult.data.lookup;

  let color = '#64748B';
  let icon: any = 'help-outline';

  if (lookup.status === 'Allowed') {
    color = '#16A34A';
    icon = 'check-circle';
  }

  if (
    lookup.status ===
    'Use With Caution'
  ) {
    color = '#F59E0B';
    icon = 'warning';
  }

  if (
    lookup.status ===
    'Prohibited'
  ) {
    color = '#DC2626';
    icon = 'cancel';
  }

  setResult({
  status: lookup.status,
  title: lookup.drugName,
  note: lookup.guidance,
  color,
  icon,
});

if (lookup.status !== 'Unknown') {
  console.log(
  'Medicine found:',
  lookup.drugName
);
}

setScanning(false);
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
  {showCamera ? (
    <>
      <CameraView
  style={StyleSheet.absoluteFillObject}
/>
      {showCamera && (
        <TouchableOpacity
          style={{
            marginTop: 10,
            backgroundColor: '#EF4444',
            padding: 12,
            borderRadius: 10,
          }}
          onPress={() => setShowCamera(false)}
        >
          <Text
            style={{
              color: 'white',
              fontWeight: 'bold',
            }}
          >
            Close Camera
          </Text>
        </TouchableOpacity>
      )}
    </>
  ) : (
    <MaterialCommunityIcons
      name="barcode-scan"
      size={80}
      color="#38BDF8"
    />
  )}
</View>

          {scanning && (
            <Text style={styles.scanningText}>
              Scanning...
            </Text>
          )}
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

      {/* Actions */}

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={async () => {
            const response = await requestPermission();

            if (response.granted) {
              setShowCamera(true);
            }
          }}
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
              : 'Check Medicine'}
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
    backgroundColor: '#0F172A',
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
  borderColor: '#14C8E8',
  borderRadius: 30,
  overflow: 'hidden',
  justifyContent: 'center',
  alignItems: 'center',
},

  scanningText: {
    color: '#14C8E8',
    marginTop: 12,
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