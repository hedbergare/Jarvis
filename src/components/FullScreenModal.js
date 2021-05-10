import React from "react";
import {
  StyleSheet,
  View,
  Pressable,
  TouchableOpacity,
  Modal,
  Text,
} from "react-native";
import { fonts } from "../../constants/fonts";
import { colors } from "../../constants/vars";
import { Ionicons } from "@expo/vector-icons";

import Font from "./Font";
import ConfirmButton from "./ConfirmButton";
const FullScreenModal = ({
  title,
  handleConfirm,
  handleClose,
  visible,
  content,
}) => {
  return (
    <Modal
      presentationStyle="overFullScreen"
      transparent={true}
      animationType="fade"
      visible={visible}
    >
      <TouchableOpacity style={styles.modalBackground} onPress={handleClose}>
        <Pressable>
          <View style={styles.contentContainer}>
            <TouchableOpacity
              style={styles.modalIconContainer}
              onPress={handleClose}
            >
              <Ionicons
                name="close-outline"
                color={colors.grayDark}
                size={30}
              />
            </TouchableOpacity>
            <View style={styles.titleBorder}>
              <Text style={[fonts.heading2, styles.title]}>
                <Font text={title}></Font>
              </Text>
            </View>
            {content}
            <ConfirmButton handleConfirm={handleConfirm} />
          </View>
        </Pressable>
      </TouchableOpacity>
    </Modal>
  );
};

export default FullScreenModal;

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
    paddingTop: 100,
    paddingHorizontal: 40,
    minWidth: "80%",
    minHeight: 200,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: colors.black,
  },
  titleBorder: {
    position: "absolute",
    top: 30,
    borderBottomWidth: 1,
    borderColor: colors.blueDark,
  },
  modalIconContainer: {
    position: "absolute",
    left: 15,
    top: 15,
  },
});
