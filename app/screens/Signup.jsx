import React from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { account, ID } from "../../lib/appwrite"; // Make sure this matches the correct path

// Form validation schema
const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

const SignupScreen = ({ navigation }) => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      console.log("Signing up with:", data); // Add a log for debugging

      // Use Appwrite's account.create() to register the user
      const user = await account.create(ID.unique(), data.email, data.password);

      console.log("Signup successful:", user); // Log the user data

      Alert.alert("Signup Successful", "You can now log in!");
      navigation.navigate("Login"); // Navigate to Login screen after signup
    } catch (error) {
      console.error("Signup Error:", error);
      Alert.alert("Signup Failed", error.message); // Show error if signup fails
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sign Up</Text>

      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, value } }) => (
          <TextInput 
            style={styles.input} 
            placeholder="Full Name" 
            value={value} 
            onChangeText={onChange} 
          />
        )}
      />
      {errors.name && <Text style={styles.error}>{errors.name.message}</Text>}

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
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.link}>Already have an account? Login</Text>
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

export default SignupScreen;
