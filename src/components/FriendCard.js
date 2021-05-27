import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { fonts } from "../../constants/fonts";
import { colors } from "../../constants/vars";
import Font from "./Font";

const FriendCard = ({
  firstName,
  lastName,
  email,
  handleOnPress,
  friends,
  id,
  share,
  handleShareWith,
  removeShareWith,
  alreadySharedWith,
  showEmail,
}) => {
  const [checkboxState, setCheckboxState] = React.useState(
    alreadySharedWith ? true : false
  );
  return (
    <View style={styles.FriendCard}>
      <View>
        <Font
          text={firstName + " " + lastName}
          textStyle={[
            fonts.heading4,
            { color: colors.black, fontWeight: "400" },
          ]}
        />
        {showEmail ? <Font text={email} textStyle={fonts.subText} /> : <></>}
      </View>
      {!share ? (
        <TouchableOpacity onPress={() => handleOnPress(id)}>
          <Font
            text={share ? "" : friends ? "Remove" : "Add friend"}
            textStyle={[
              fonts.subTextBold,
              {
                color: share
                  ? colors.green
                  : friends
                  ? colors.red
                  : colors.green,
              },
            ]}
          />
        </TouchableOpacity>
      ) : (
        <BouncyCheckbox
          style={{ position: "absolute", right: 0 }}
          isChecked={checkboxState}
          size={30}
          fillColor={colors.green}
          iconStyle={{
            borderColor: colors.green,
          }}
          onPress={() => {
            setCheckboxState(!checkboxState);
            checkboxState ? removeShareWith(id) : handleShareWith(id);
          }}
        />
      )}
    </View>
  );
};

export default FriendCard;

const styles = StyleSheet.create({
  FriendCard: {
    alignItems: "center",
    flexDirection: "row",
    borderBottomColor: colors.gray,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    paddingVertical: 10,
    marginBottom: 15,
    justifyContent: "space-between",
    width: 250,
  },
  textContainer: {},
});
