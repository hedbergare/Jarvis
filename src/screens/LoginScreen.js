import React, { useState } from "react";
import { Image, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import LoginService from "../services/LoginService";
import { fonts } from "../../constants/fonts";
import { colors, icons } from "../../constants/vars";
import LargeButton from "../components/LargeButton";
import Font from "../components/Font";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import InputField from "../components/InputField";
import SvgComponent from "../components/SvgComponent";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <KeyboardAwareScrollView
      resetScrollToCoords={{ x: 0, y: 0 }}
      contentContainerStyle={styles.LoginScreen}
      scrollEnabled={true}
    >
      <SvgComponent
        content={icons.loginIllustration}
        iconStyle={styles.profileImage}
      />
      <Font
        text="LOG IN"
        font={fonts.heading3}
        textStyle={{ color: colors.redLight }}
      ></Font>
      <InputField
        placeHolderText="Email"
        secureEntry={false}
        src={icons.email}
        textChanged={(text) => setEmail(text)}
      ></InputField>
      <InputField
        placeHolderText="Password"
        secureEntry={true}
        src={icons.key}
        textChanged={(text) => setPassword(text)}
      ></InputField>
      <TouchableOpacity
        style={styles.forgotPasswordContainer}
        onPress={() => navigation.navigate("ForgotPasswordScreen")}
      >
        <Text style={[styles.forgotPasswordText, fonts.subText]}>
          <Font text="Forgot your password?"></Font>
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.googleButton}
        onPress={() => LoginService.signInWithGoogleAsync()}
      >
        <Text style={[fonts.subTextBold, styles.googleButtonText]}>
          <Font text="Connect with Google"></Font>
        </Text>
        <Image source={require("../assets/icon-google.png")} />
      </TouchableOpacity>

      <Text style={[styles.buttonSeparator, fonts.heading5]}>
        <Font text="or"></Font>
      </Text>

      <TouchableOpacity
        onPress={() => {
          LoginService.signIn(email, password);
        }}
      >
        <LargeButton
          text="LOG IN"
          backgroundColor={colors.redLight}
          color={colors.white}
        ></LargeButton>
      </TouchableOpacity>

      <View style={styles.registerContainer}>
        <Text style={fonts.subText}>
          <Font text="Don't have an account?"></Font>
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("RegistrationScreen")}
        >
          <Text style={[fonts.subText, styles.signUpText]}>
            <Font text="Sign up"></Font>
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  LoginScreen: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: "center",
  },
  profileImage: {
    marginTop: 50,
    marginBottom: 30,
  },

  forgotPasswordContainer: {
    width: 280,
    marginBottom: 30,
    marginTop: 2,
  },
  forgotPasswordText: {
    color: colors.yellow,
  },
  googleButton: {
    width: 217,
    height: 46,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: colors.whiteDark,
    shadowColor: colors.black,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    borderRadius: 6,
    color: colors.black,
  },
  googleButtonText: {
    textTransform: "uppercase",
    textAlign: "center",
    marginRight: 10,
  },
  buttonSeparator: {
    marginVertical: 10,
  },
  registerContainer: {
    flexDirection: "row",
    marginTop: 15,
  },
  signUpText: {
    color: colors.redLight,
    marginLeft: 10,
  },
});
