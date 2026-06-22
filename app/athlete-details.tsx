import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../src/firebase/config';

export default function AthleteDetailsScreen() {
  const { sport } = useLocalSearchParams<{
    sport: string;
  }>();

  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  const handleContinue = async () => {
    if (!name.trim()) {
      alert('Please enter your name');
      return;
    }

    if (!age.trim()) {
      alert('Please enter your age');
      return;
    }

    const currentUser = auth.currentUser;

    if (!currentUser) {
      alert('No authenticated user found');
      return;
    }

    try {
      await setDoc(
        doc(db, 'users', currentUser.uid),
        {
          uid: currentUser.uid,
          email: currentUser.email,

          name: name.trim(),
          age: Number(age),
          sport: sport || 'Unknown',

          xp: 0,
          level: 'Rookie',
          streak: 0,

          progress: {
            antiDopingBasics: false,
            wadaRules: false,
            testingProcedures: false,
            tue: false,
            supplements: false,
          },

          achievements: [],

          createdAt: new Date().toISOString(),
        }
      );

      router.replace('/dashboard');
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Athlete Details
      </Text>

      <Text style={styles.subtitle}>
        Complete your profile
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        placeholderTextColor="#94A3B8"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Age"
        placeholderTextColor="#94A3B8"
        keyboardType="numeric"
        value={age}
        onChangeText={setAge}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleContinue}
      >
        <Text style={styles.buttonText}>
          Continue
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#14C8E8',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },

  title: {
    color: '#FFFFFF',
    fontSize: 34,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 10,
  },

  subtitle: {
    color: '#EAFBFF',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 40,
  },

  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 18,
    fontSize: 16,
    marginBottom: 16,
  },

  button: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 18,
    borderRadius: 999,
    marginTop: 20,
  },

  buttonText: {
    color: '#14C8E8',
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 18,
  },
});