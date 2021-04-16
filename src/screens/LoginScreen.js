import React, { useState } from "react";
import {
  Button,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
} from "react-native";
import LoginService from "../services/LoginService";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.welcomeText}>Welcome Text!</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(email) => setEmail(email)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={(password) => setPassword(password)}
      />
      <Button
        title="Sign in"
        style={styles.logInButton}
        onPress={() => LoginService.signIn(email, password)}
      />
      <Button
        title="Sign in with google"
        style={styles.logInButton}
        onPress={() => LoginService.signInWithGoogleAsync()}
      />
      <Button
        title="Don't have an account? Register here."
        style={styles.logInButton}
        onPress={() => navigation.navigate("Registration")}
      />
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    width: "85%",
    margin: 10,
    padding: 15,
    fontSize: 16,
    borderColor: "#d3d3d3",
    borderBottomWidth: 1,
    textAlign: "center",
  },
  welcomeText: {
    color: "tomato",
  },
  logInButton: {
    height: 70,
  },
  registerButton: {
    height: 70,
  },
});
