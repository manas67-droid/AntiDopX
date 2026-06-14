import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
export default function AthleteRegisterScreen() {
    const [name, setName] = useState('');
    const [sport, setSport] = useState('');
    const [age, setAge] = useState('');
    const router = useRouter();
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
  onPress={() => {
    if (name.trim() === '') {
      alert('Please enter your name');
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

    console.log("Submitting Name:", name);
    console.log("Submitting Sport:", sport);
    console.log("Submitting Age:", age);

    router.push({
      pathname: '/dashboard',
      params: {
        name: name,
        sport: sport,
        age: age,
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