// components/LoginForm.tsx
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function LoginForm() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput style={styles.input} placeholder="Username" />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry />
      <Button
        title="Login"
        onPress={() => {
          // Gère la connexion ici
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
});
