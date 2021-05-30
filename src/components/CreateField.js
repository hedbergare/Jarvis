import React from "react";
import { StyleSheet, Text, View, Image, TextInput } from "react-native";
import { fonts } from "../../constants/fonts";
import { colors } from "../../constants/vars";
import Font from "./Font";
import SvgComponent from "./SvgComponent";

const CreateField = React.memo(
  ({ src, placeholder, title, textChanged, toggleRender, value }) => {
    const inputRef = React.createRef();
    React.useEffect(() => {
      inputRef.current.clear();
    }, [toggleRender]);

    return (
      <View style={styles.CreateField}>
        <SvgComponent content={src} iconStyle={styles.iconStyle} />
        <View>
          <Text style={fonts.subText}>
            <Font text={title + ":"}></Font>
          </Text>
          <TextInput
            returnKeyType="done"
            ref={inputRef}
            style={(fonts.heading5, styles.textInput)}
            /* placeholder={placeholder} */
            onChangeText={(text, textInputRef) =>
              textChanged(text, textInputRef)
            }
            placeholder={placeholder}
            defaultValue={value}
          />
        </View>
      </View>
    );
  }
);

export default CreateField;

const styles = StyleSheet.create({
  CreateField: {
    alignItems: "center",
    flexDirection: "row",
    alignItems: "center",
    minWidth: "90%",
    paddingBottom: 10,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.black + "30",
  },
  iconStyle: {
    marginRight: 10,
  },
});
