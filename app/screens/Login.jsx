import React from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { account } from "../../lib/appwrite"; // Ensure this path is correct

// Form validation schema
const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

const LoginScreen = ({ navigation }) => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      console.log("Logging in with:", data);

      // 🔍 Check if a session already exists
      try {
        const existingSession = await account.get();
        if (existingSession) {
          console.log("Existing session found:", existingSession);
          await account.deleteSessions(); // ❌ Clear existing session
          console.log("Deleted existing session, proceeding to login...");
        }
      } catch (sessionError) {
        console.log("No active session found, proceeding with login...");
      }

      // ✅ Create a new session
      const session = await account.createEmailPasswordSession(data.email, data.password);
      console.log("Login successful:", session);

      Alert.alert("Login Successful", "Welcome back!");
      navigation.navigate("Main");
    } catch (error) {
      console.error("Login Error:", error);
      Alert.alert("Login Failed", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Login</Text>

      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <TextInput 
            style={styles.input} 
            placeholder="Email" 
            value={value} 
            onChangeText={onChange} 
            keyboardType="email-address"
          />
        )}
      />
      {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <TextInput 
            style={styles.input} 
            placeholder="Password" 
            value={value} 
            onChangeText={onChange} 
            secureTextEntry
          />
        )}
      />
      {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}

      <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
        <Text style={styles.link}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  header: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
  input: { backgroundColor: "white", padding: 12, borderRadius: 8, marginBottom: 15, borderWidth: 1, borderColor: "#D1D5DB" },
  button: { backgroundColor: "#2563EB", padding: 15, borderRadius: 8, alignItems: "center" },
  buttonText: { color: "white", fontSize: 16, fontWeight: "bold" },
  link: { textAlign: "center", marginTop: 10, color: "#2563EB" },
  error: { color: "red", marginBottom: 10 },
});

export default LoginScreen;
