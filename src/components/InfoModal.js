import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../constants/vars";
import { fonts } from "../../constants/fonts";
import Font from "./Font";

const InfoModal = ({ styleProp, text }) => {
  const [state, setstate] = useState(false);

  return (
    <>
      <TouchableOpacity onPress={() => setstate(true)}>
        <Ionicons
          style={styleProp}
          name="alert-circle-outline"
          color={colors.grayDark}
          size={20}
        />
      </TouchableOpacity>
      {state && (
        <Modal
          presentationStyle="overFullScreen"
          transparent={true}
          animationType="fade"
          visible={state}
        >
          <TouchableOpacity
            style={styles.modalBackground}
            onPress={() => setstate(false)}
          >
            <Pressable>
              <View style={styles.contentContainer}>
                <Ionicons
                  name="alert-circle-outline"
                  color={colors.grayDark}
                  size={64}
                />

                <Font
                  text={text}
                  textStyle={styles.text}
                  font={fonts.heading5}
                ></Font>
              </View>
            </Pressable>
          </TouchableOpacity>
        </Modal>
      )}
    </>
  );
};

export default InfoModal;

const styles = StyleSheet.create({
  modalBackground: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.black + "90",
    position: "absolute",
  },
  contentContainer: {
    alignSelf: "center",
    paddingTop: 20,
    paddingHorizontal: 40,
    width: "90%",
    minHeight: 200,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: colors.white,
    alignItems: "center",
  },
  text: {
    padding: 20,
    textAlign: "justify",
    marginBottom: 20,
  },
});
