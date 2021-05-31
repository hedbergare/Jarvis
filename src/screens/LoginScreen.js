import React, { useState } from "react";
import {
  Image,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { fonts } from "../../constants/fonts";
import { colors, icons } from "../../constants/vars";
import LargeButton from "../components/LargeButton";
import Font from "../components/Font";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import InputField from "../components/InputField";
import SvgComponent from "../components/SvgComponent";
import firebase from "firebase/app";
import "firebase/database";
require("firebase/auth");
import * as Google from "expo-google-app-auth";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const signInWithGoogleAsync = async () => {
    try {
      const result = await Google.logInAsync({
        iosClientId:
          "790659808632-tisagpfd57o025ddch3klfe9s85h7juq.apps.googleusercontent.com",
        scopes: ["profile", "email"],
      });

      if (result.type === "success") {
        onSignIn(result);
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  };
  const signIn = (email, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        var user = userCredential.user;
      })
      .catch((error) => {
        var errorMessage = error.message;
        console.log(errorMessage);
        setError(errorMessage);
      });
  };
  const isUserEqual = (googleUserId, firebaseUser) => {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (
          providerData[i].providerId ===
            firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
          providerData[i].uid === googleUserId
        ) {
          return true;
        }
      }
    }
    return false;
  };
  const onSignIn = (googleUser) => {
    var unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
      unsubscribe();
      if (!isUserEqual(googleUser.user.id, firebaseUser)) {
        var credential = firebase.auth.GoogleAuthProvider.credential(
          googleUser.idToken,
          googleUser.accessToken
        );
        firebase
          .auth()
          .signInWithCredential(credential)
          .then(function (result) {
            firebase
              .database()
              .ref("/users/" + result.user.uid)
              .set({
                email: result.user.email,
                first_name: result.additionalUserInfo.profile.given_name,
                last_name: result.additionalUserInfo.profile.family_name,
              });
          })
          .catch((error) => {
            var errorMessage = error.message;
            setError(errorMessage);
          });
      } else {
        setError("User already signed-in Firebase.");
      }
    });
  };

  return (
    <ScrollView style={styles.LoginScreen}>
      <KeyboardAwareScrollView
        resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={styles.centerText}
        scrollEnabled={true}
      >
        <SvgComponent
          content={icons.loginIllustration}
          iconStyle={styles.profileImage}
        />
        <View style={styles.titleContainer}>
          <Font
            text="LOG IN"
            font={fonts.heading3}
            textStyle={{ color: colors.redLight }}
          ></Font>
        </View>
        <Font textStyle={styles.errorMessage} text={error}></Font>

        <InputField
          placeHolderText="Email"
          secureEntry={false}
          returnKeyType="done"
          src={icons.email}
          textChanged={(text) => setEmail(text)}
        ></InputField>
        <InputField
          placeHolderText="Password"
          returnKeyType="done"
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
          onPress={() => signInWithGoogleAsync()}
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
            signIn(email, password);
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
    </ScrollView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  LoginScreen: {
    flex: 1,
    backgroundColor: colors.white,
  },
  centerText: {
    alignItems: "center",
    paddingBottom: 50,
  },
  profileImage: {
    marginTop: 50,
    marginBottom: 30,
  },
  titleContainer: {
    marginBottom: "10%",
  },

  forgotPasswordContainer: {
    width: "70%",
    marginBottom: "20%",
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
  errorMessage: {
    color: colors.red,
  },
});
