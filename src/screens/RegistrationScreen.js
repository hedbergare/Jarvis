import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import firebase from "firebase/app";
import { colors, icons } from "../../constants/vars";
import "firebase/database";
import ScreenHeader from "../components/ScreenHeader";
import InputField from "../components/InputField";
import LargeButton from "../components/LargeButton";
import { useDispatch } from "react-redux";
import { addTaskList } from "../../redux/actions/TaskListActions";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
require("firebase/auth");

const RegistrationScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();

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
            })
            .then(() => {
              dispatch(addTaskList(userCredential.user.uid, "General"));
            });
        })
        .catch((error) => {
          setErrorMessage(error.message);
        });
    }
  };

  return (
    <KeyboardAwareScrollView
      resetScrollToCoords={{ x: 0, y: 0 }}
      contentContainerStyle={styles.RegistrationScreen}
      scrollEnabled={true}
    >
      <ScreenHeader title="Register account" navigation={navigation} />

      <Text style={styles.errorMessage}> {errorMessage}</Text>
      <View style={styles.inputContainer}>
        <InputField
          placeHolderText="First Name"
          secureEntry={false}
          textChanged={(text) => setFirstName(text)}
          src={icons.profile}
        />
        <InputField
          placeHolderText="Last name"
          secureEntry={false}
          textChanged={(lastName) => setLastName(lastName)}
          src={icons.profile}
        />
        <InputField
          placeHolderText="Email"
          secureEntry={false}
          textChanged={(email) => setEmail(email)}
          src={icons.email}
        />
        <InputField
          placeHolderText="Password"
          secureEntry={true}
          textChanged={(password) => setPassword(password)}
          src={icons.key}
        />
        <InputField
          placeHolderText="Confirm Password"
          secureEntry={true}
          textChanged={(password) => setConfirmPassword(password)}
          src={icons.key}
        />
      </View>
      <TouchableOpacity onPress={() => registerAccount()}>
        <LargeButton
          text="Register"
          backgroundColor={colors.redLight}
          color={colors.white}
        ></LargeButton>
      </TouchableOpacity>
    </KeyboardAwareScrollView>
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
