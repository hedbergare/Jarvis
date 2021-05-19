import React from "react";
import { StyleSheet, View, TouchableOpacity, Modal, Text } from "react-native";
import { fonts } from "../../constants/fonts";
import { colors } from "../../constants/vars";
import { Ionicons } from "@expo/vector-icons";

import Font from "./Font";
import ConfirmButton from "./ConfirmButton";
import { ScrollView } from "react-native-gesture-handler";
const FullScreenModal = ({
  title,
  handleConfirm,
  handleClose,
  visible,
  content,
  confirmText,
}) => {
  return (
    <Modal
      presentationStyle="overFullScreen"
      transparent={true}
      animationType="fade"
      visible={visible}
    >
      <TouchableOpacity
        style={styles.modalBackground}
        onPress={handleClose}
        activeOpacity={1}
      >
        <ScrollView style={{ flexGrow: 0, height: 400, borderRadius: 20 }}>
          <TouchableOpacity onPress={() => {}} activeOpacity={1}>
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
              <ConfirmButton
                confirmText={confirmText}
                handleConfirm={handleConfirm}
              />
            </View>
          </TouchableOpacity>
        </ScrollView>
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
    width: "100%",
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
