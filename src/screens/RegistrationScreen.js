import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Button,
  Text,
  TextInput,
} from "react-native";
import firebase from "firebase/app";
import "firebase/database";
require("firebase/auth");

const RegistrationScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const registerAccount = () => {
    if (password !== confirmPassword) {
      setErrorMessage("The passwords doesn't match");
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          // Signed in
          var user = userCredential.user;
          firebase
            .database()
            .ref("/users/" + user.uid)
            .set({
              email: user.email,
              first_name: { firstName },
              last_name: { lastName },
            });
        })
        .catch((error) => {
          setErrorMessage(error.message);
        });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.errorMessage}> {errorMessage}</Text>
      <TextInput
        style={styles.input}
        placeholder="First name"
        onChangeText={(firstName) => setFirstName(firstName)}
      />
      <TextInput
        style={styles.input}
        placeholder="Last name"
        onChangeText={(lastName) => setLastName(lastName)}
      />
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
      <TextInput
        style={styles.input}
        placeholder="Confirm password"
        onChangeText={(confirmPassword) => setConfirmPassword(confirmPassword)}
      />
      <Button
        title="Register account"
        onPress={() => registerAccount()}
      ></Button>
    </SafeAreaView>
  );
};

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
  errorMessage: {
    color: "tomato",
  },
});

export default RegistrationScreen;
