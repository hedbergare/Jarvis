import React from "react";
import { StyleSheet, Text, View, Image, TextInput } from "react-native";
import { fonts } from "../../constants/fonts";
import { colors } from "../../constants/vars";
import DecrementButton from "./DecrementButton";
import Font from "./Font";
import IncrementButton from "./IncrementButton";
import SvgComponent from "./SvgComponent";

const CreateItemField = React.memo(
  ({
    src,
    placeholder,
    title,
    textChanged,
    toggleRender,
    onIncrement,
    onDecrement,
    initialQuantity,
  }) => {
    const inputRef = React.createRef();
    const [quantity, setQuantity] = React.useState(initialQuantity);
    React.useEffect(() => {
      inputRef.current.clear();
    }, [toggleRender]);

    return (
      <View style={styles.CreateItemField}>
        <SvgComponent content={src} iconStyle={styles.iconStyle} />
        <View>
          <Text style={fonts.subText}>
            <Font text={title + ":"}></Font>
          </Text>
          <TextInput
            ref={inputRef}
            style={[fonts.heading5, styles.input]}
            placeholder={placeholder}
            onChangeText={(text, textInputRef) =>
              textChanged(text, textInputRef)
            }
          ></TextInput>
        </View>
        <View style={styles.rightFloatContainer}>
          <Font
            font={fonts.subText}
            textStyle={styles.quantityText}
            text="Quantity:"
          ></Font>
          <Font textStyle={fonts.heading5} text={quantity}></Font>
          <View style={styles.buttonContainer}>
            <IncrementButton
              handleOnPress={() => {
                setQuantity(quantity + 1);
                onIncrement();
              }}
            />
            <DecrementButton
              handleOnPress={() => {
                setQuantity(quantity - 1);
                onDecrement();
              }}
            />
          </View>
        </View>
      </View>
    );
  }
);

export default CreateItemField;

const styles = StyleSheet.create({
  CreateItemField: {
    alignItems: "center",
    flexDirection: "row",
    alignItems: "center",
    minWidth: "95%",
    height: 90,
    paddingBottom: 10,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.black + "30",
  },
  iconStyle: {
    marginRight: 10,
  },
  input: {
    width: 130,
  },
  rightFloatContainer: {
    position: "absolute",
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    width: "30%",
    justifyContent: "space-between",
  },
  buttonContainer: {
    marginLeft: 5,
    height: 70,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  quantityText: {
    marginRight: 2,
  },
});
