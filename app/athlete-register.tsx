import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { registerUser } from '../src/firebase/authService';
import { createUserProfile } from '../src/firebase/firestoreService';
export default function AthleteRegisterScreen() {
    const [name, setName] = useState('');
    const [sport, setSport] = useState('');
    const [age, setAge] = useState('');
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Athlete Registration</Text>

     <TextInput
  placeholder="Enter your name"
  placeholderTextColor="#94A3B8"
  style={styles.input}
  value={name}
  onChangeText={setName}
/>
<TextInput
  placeholder="Enter your email"
  placeholderTextColor="#94A3B8"
  style={styles.input}
  value={email}
  onChangeText={setEmail}
  keyboardType="email-address"
/>
<TextInput
  placeholder="Enter your password"
  placeholderTextColor="#94A3B8"
  style={styles.input}
  value={password}
  onChangeText={setPassword}
  secureTextEntry
/>
<Text
  style={{
    color: 'white',
    marginBottom: 16,
  }}
>
  Hello, {name}
</Text>
<TextInput
  placeholder="Enter your sport"
  placeholderTextColor="#94A3B8"
  style={styles.input}
  value={sport}
  onChangeText={setSport}
/>

    <TextInput
  placeholder="Enter your age"
  placeholderTextColor="#94A3B8"
  keyboardType="numeric"
  style={styles.input}
  value={age}
  onChangeText={setAge}
/>

<TouchableOpacity
  style={styles.button}
  onPress={async () => {

  if (name.trim() === '') {
    alert('Please enter your name');
    return;
  }
if (password.trim() === '') {
  alert('Please enter your password');
  return;
}
  if (email.trim() === '') {
    alert('Please enter your email');
    return;
  }

  if (sport.trim() === '') {
  alert('Please enter your sport');
  return;
}

if (age.trim() === '') {
  alert('Please enter your age');
  return;
}

  const result = await registerUser(email, password);
  //console.log('Auth Result:', result);

if (!result.success) {
  alert(result.error);
  return;
}

const profileResult = await createUserProfile(
  result.user!.uid,
  name,
  email,
  age,
  sport
);
//console.log('Profile Result:', profileResult);

if (!profileResult.success) {
  alert(profileResult.error);
  return;
}

alert('Account created successfully!');

  router.push({
    pathname: '/dashboard',
    params: {
      name,
      sport,
      age,
    },
  });

}}
>
  <Text style={styles.buttonText}>Continue</Text>
</TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
    padding: 24,
    justifyContent: 'center',
  },

  title: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
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
    alignItems: 'center',
    marginTop: 10,
  },

  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});