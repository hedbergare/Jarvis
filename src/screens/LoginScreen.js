import React, { useState } from "react";
import {
  Image,
  View,
  Button,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import LoginService from "../services/LoginService";
import { useDispatch } from "react-redux";
import { logIn } from "../../redux/actions/AuthActions";
import { fonts } from "../../constants/fonts";
import { colors } from "../../constants/vars";
import LargeButton from "../components/LargeButton";
import Font from "../components/Font";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import InputField from "../components/InputField";

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <KeyboardAwareScrollView
      resetScrollToCoords={{ x: 0, y: 0 }}
      contentContainerStyle={styles.LoginScreen}
      scrollEnabled={true}
    >
      {/* TO DO - does the image scale? Is it too big?? And should we have our logo here instead?*/}
      <Image
        style={styles.profileImage}
        source={require("../assets/icon-profile.png")}
      />
      {/* 
          onChangeText={(password) => setPassword(password)}
      */}
      <InputField
        placeHolderText="Email"
        secureEntry={false}
        src={require("../assets/icon-mail.png")}
        textChanged={(text) => setEmail(text)}
      ></InputField>
      <InputField
        placeHolderText="Password"
        secureEntry={true}
        src={require("../assets/icon-key.png")}
        textChanged={(text) => setPassword(text)}
      ></InputField>

      {/* TO-DO: Navigate to ForgotPasswordScreen */}
      <TouchableOpacity style={styles.forgotPasswordContainer}>
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

      <TouchableOpacity onPress={() => LoginService.signIn(email, password)}>
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
        <TouchableOpacity onPress={() => navigation.navigate("Registration")}>
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
    justifyContent: "center",
  },
  profileImage: {
    marginBottom: 30,
  },
  inputContainer: {
    width: 280,
    height: 30,
    alignItems: "center",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: colors.grayDark,
    marginTop: 20,
  },
  input: {
    marginLeft: 10,
    width: 200,
    fontSize: 16,
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
