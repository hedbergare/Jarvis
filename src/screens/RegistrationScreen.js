import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import firebase from "firebase/app";
import { colors } from "../../constants/vars";
import "firebase/database";
import ScreenHeader from "../components/ScreenHeader";
import InputField from "../components/InputField";
import LargeButton from "../components/LargeButton";
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
              first_name: firstName,
              last_name: lastName,
            });
        })
        .catch((error) => {
          setErrorMessage(error.message);
        });
    }
  };

  return (
    <View style={styles.RegistrationScreen}>
      <ScreenHeader title="Register account" navigation={navigation} />
      <Text style={styles.errorMessage}> {errorMessage}</Text>
      <View style={styles.inputContainer}>
        <InputField
          placeHolderText="First Name"
          secureEntry={false}
          textChanged={(text) => setFirstName(text)}
          src={require("../assets/icon-mail.png")}
        />
        <InputField
          placeHolderText="Last name"
          secureEntry={false}
          textChanged={(lastName) => setLastName(lastName)}
          src={require("../assets/icon-mail.png")}
        />
        <InputField
          placeHolderText="Email"
          secureEntry={false}
          textChanged={(email) => setEmail(email)}
          src={require("../assets/icon-mail.png")}
        />
        <InputField
          placeHolderText="Password"
          secureEntry={true}
          textChanged={(password) => setPassword(password)}
          src={require("../assets/icon-key.png")}
        />
        <InputField
          placeHolderText="Confirm Password"
          secureEntry={true}
          textChanged={(password) => setConfirmPassword(password)}
          src={require("../assets/icon-key.png")}
        />
      </View>
      <TouchableOpacity onPress={() => registerAccount()}>
        <LargeButton
          text="Register"
          backgroundColor={colors.redLight}
          color={colors.white}
        ></LargeButton>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  RegistrationScreen: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  inputContainer: {},
  errorMessage: {
    color: "tomato",
  },
});

export default RegistrationScreen;
