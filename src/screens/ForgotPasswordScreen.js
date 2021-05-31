import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity, Alert } from "react-native";
import firebase from "firebase/app";
import { colors, icons } from "../../constants/vars";
import "firebase/database";
import { Ionicons } from "@expo/vector-icons";
import InputField from "../components/InputField";
import SvgComponent from "../components/SvgComponent";
import LargeButton from "../components/LargeButton";
import Font from "../components/Font";
require("firebase/auth");

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleBackArrow = () => {
    {
      navigation.goBack();
    }
  };
  const onResetPassword = () => {
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        Alert.alert(
          "Password reset",
          "Check you e-mail and follow the link to reset your password.",
          [
            {
              text: "Log In",
              onPress: () => {
                navigation.goBack();
              },
              style: "cancel",
            },
          ]
        );
      })
      .catch((error) => {
        setError(error.message);
      });
  };
  return (
    <View style={styles.ForgotPasswordScreen}>
      <TouchableOpacity style={styles.backArrowIcon} onPress={handleBackArrow}>
        <Ionicons name="arrow-back-outline" color={colors.gray} size={40} />
      </TouchableOpacity>
      <View style={styles.icon}>
        <SvgComponent content={icons.forgotPassword}></SvgComponent>
      </View>
      <View style={styles.input}>
        <Font textStyle={styles.errorMessage} text={error} />
        <InputField
          returnKeyType="done"
          placeHolderText="E-mail address"
          src={icons.email}
          textChanged={(text) => setEmail(text)}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={() => onResetPassword()}>
        <LargeButton
          text="RESET PASSWORD"
          backgroundColor={colors.redLight}
          color={colors.white}
          o
        ></LargeButton>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  ForgotPasswordScreen: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  backArrowIcon: {
    position: "absolute",
    top: 45,
    left: 20,
  },
  icon: {
    marginTop: 30,
  },
  input: {
    marginTop: 50,
  },
  button: {
    marginTop: 140,
  },
  errorMessage: {
    color: colors.red,
  },
});
export default ForgotPasswordScreen;
