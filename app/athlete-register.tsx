import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { registerUser } from '../src/firebase/authService';
import { loginUser } from '../src/firebase/loginService';

export default function AthleteRegisterScreen() {
  const router = useRouter();

  const [isLogin, setIsLogin] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleContinue = async () => {
    if (!email.trim()) {
      alert('Enter Email');
      return;
    }

    if (!password.trim()) {
      alert('Enter Password');
      return;
    }

    if (isLogin) {
      const result = await loginUser(
        email.trim(),
        password
      );

      if (!result.success) {
        console.log('LOGIN ERROR:', result.error);
        alert(result.error);
        return;
      }

      router.replace('/dashboard');
    } else {
      const result = await registerUser(
        email.trim(),
        password
      );

      if (!result.success) {
        alert(result.error);
        return;
      }

      router.push('/onboarding');
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <TouchableOpacity
        onPress={() => router.back()}
      >
        <Text style={styles.back}>
          ← Back
        </Text>
      </TouchableOpacity>

      <View style={styles.header}>
        <Text style={styles.title}>
          Welcome, Athlete
        </Text>

        <Text style={styles.subtitle}>
          Start your clean sport journey
        </Text>
      </View>

      <View style={styles.card}>
        <View style={styles.toggleContainer}>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              isLogin && styles.activeToggle,
            ]}
            onPress={() => setIsLogin(true)}
          >
            <Text
              style={[
                styles.toggleText,
                isLogin && styles.activeText,
              ]}
            >
              Log In
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.toggleButton,
              !isLogin && styles.activeToggle,
            ]}
            onPress={() => setIsLogin(false)}
          >
            <Text
              style={[
                styles.toggleText,
                !isLogin && styles.activeText,
              ]}
            >
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>

        <TextInput
          placeholder="athlete@email.com"
          placeholderTextColor="#94A3B8"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />

        <TextInput
          placeholder="Password"
          placeholderTextColor="#94A3B8"
          secureTextEntry
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />

        {isLogin && (
          <TouchableOpacity>
            <Text style={styles.forgot}>
              Forgot password?
            </Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={handleContinue}
        >
          <Text style={styles.primaryButtonText}>
            {isLogin
              ? 'Login'
              : 'Start Your Clean Sport Journey'}
          </Text>
        </TouchableOpacity>

        <Text style={styles.or}>OR</Text>

        <TouchableOpacity style={styles.googleButton}>
          <Text style={styles.googleText}>
            Continue with Google
          </Text>
        </TouchableOpacity>

        <Text style={styles.footer}>
          By continuing you agree to our Terms.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#00BCEB',
    paddingTop: 60,
  },

  back: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 20,
  },

  header: {
    paddingHorizontal: 24,
    marginTop: 40,
    marginBottom: 30,
  },

  title: {
    fontSize: 34,
    fontWeight: '700',
    color: '#fff',
  },

  subtitle: {
    fontSize: 18,
    color: '#E2E8F0',
    marginTop: 8,
  },

  card: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 24,
    minHeight: 700,
  },

  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#EEF5F8',
    borderRadius: 40,
    padding: 4,
    marginBottom: 30,
  },

  toggleButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
  },

  activeToggle: {
    backgroundColor: '#fff',
  },

  toggleText: {
    color: '#64748B',
    fontWeight: '600',
  },

  activeText: {
    color: '#000',
    fontWeight: '700',
  },

  input: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 18,
    padding: 18,
    fontSize: 16,
    marginBottom: 16,
  },

  forgot: {
    alignSelf: 'flex-end',
    color: '#00BCEB',
    marginBottom: 20,
  },

  primaryButton: {
    backgroundColor: '#00BCEB',
    padding: 18,
    borderRadius: 35,
    alignItems: 'center',
    marginTop: 10,
  },

  primaryButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },

  or: {
    textAlign: 'center',
    marginVertical: 24,
    color: '#64748B',
  },

  googleButton: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 35,
    padding: 18,
    alignItems: 'center',
  },

  googleText: {
    fontSize: 16,
    fontWeight: '600',
  },

  footer: {
    textAlign: 'center',
    color: '#94A3B8',
    marginTop: 24,
  },
});