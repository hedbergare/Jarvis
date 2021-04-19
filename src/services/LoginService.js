import React from "react";
import firebase from "firebase/app";
import "firebase/database";
require("firebase/auth");
import * as Google from "expo-google-app-auth";

class LoginService {
  constructor() {}
  static onSignIn = (googleUser) => {
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    var unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
      unsubscribe();
      // Check if we are already signed-in Firebase with the correct user.
      if (!this.isUserEqual(googleUser.user.id, firebaseUser)) {
        // Build Firebase credential with the Google ID token.
        var credential = firebase.auth.GoogleAuthProvider.credential(
          googleUser.idToken,
          googleUser.accessToken
        );

        // Sign in with credential from the Google user.
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
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
          });
      } else {
        console.log("User already signed-in Firebase.");
      }
    });
  };
  static isUserEqual = (googleUserId, firebaseUser) => {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (
          providerData[i].providerId ===
            firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
          providerData[i].uid === googleUserId
        ) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  };
  static signIn = (email, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in - do something with the user info????
        var user = userCredential.user;
        // ...
      })
      .catch((error) => {
        //Display error message for the user
        var errorMessage = error.message;
        console.log(errorMessage);
      });
  };
  static signInWithGoogleAsync = async () => {
    try {
      const result = await Google.logInAsync({
        iosClientId:
          "790659808632-tisagpfd57o025ddch3klfe9s85h7juq.apps.googleusercontent.com",
        scopes: ["profile", "email"],
      });

      if (result.type === "success") {
        this.onSignIn(result);
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  };
}

export default LoginService;
