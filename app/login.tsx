import { router } from 'expo-router';
import { useState } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

import { loginUser } from '../src/firebase/loginService';
import { updateDailyStreak } from '../src/firebase/streakService';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const result = await loginUser(email, password);

    if (!result.success) {
      alert(result.error);
      return;
    }

    //console.log('Login Result:', result);
    const streakResult = await updateDailyStreak(result.user!.uid);

    if (!streakResult.success) {
      alert(streakResult.error);
      return;
    }
    //console.log('Streak Result:', streakResult);

    alert(
      `Login successful 🔥 Streak: ${streakResult.streak} Day${streakResult.streak === 1 ? '' : 's'}`
    );

    router.replace('/dashboard');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        placeholder="Email"
        placeholderTextColor="#94A3B8"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Password"
        placeholderTextColor="#94A3B8"
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
    justifyContent: 'center',
    padding: 24,
  },

  title: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 32,
    textAlign: 'center',
  },

  input: {
    backgroundColor: '#1E293B',
    color: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },

  button: {
    backgroundColor: '#2563EB',
    padding: 16,
    borderRadius: 12,
  },

  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});