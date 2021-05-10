import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { colors } from "../../constants/vars";
import { fonts } from "../../constants/fonts";
import Font from "./Font";
import "firebase/database";

const ItemCard = ({ item, addQuantity, subtractQuantity, completeItem }) => {
  const [checkboxState, setCheckboxState] = React.useState(item.completed);
  const [quantityState, setQuantityState] = React.useState(item.quantity);

  return (
    <View style={[styles.ItemCard, { opacity: checkboxState ? 0.5 : 1 }]}>
      <View style={styles.content}>
        <BouncyCheckbox
          isChecked={checkboxState}
          size={35}
          fillColor={colors.green}
          iconStyle={{
            borderColor: colors.green,
            borderRadius: 5,
          }}
          onPress={() => {
            setCheckboxState(!checkboxState);
            completeItem(item, !checkboxState);
          }}
        />

        <TouchableOpacity disabled={true} style={styles.ItemCardText}>
          <Text
            style={[
              styles.ItemCardTitle,
              fonts.heading3,
              {
                textDecorationLine: checkboxState ? "line-through" : "none",
              },
            ]}
          >
            <Font text={item.name} />
          </Text>
          <Text style={fonts.subText}>
            <Font text="Added by you"></Font>
          </Text>
        </TouchableOpacity>
        <View style={styles.rightFloatContainer}>
          <Text style={fonts.subText}>
            <Font text="Quantity:"></Font>
          </Text>
          <Text style={fonts.heading5}>
            <Font text={quantityState}></Font>
          </Text>
          <View style={styles.changeQuantity}>
            <TouchableOpacity
              style={styles.plus}
              disabled={checkboxState}
              onPress={() => {
                setQuantityState(quantityState + 1);
                addQuantity(item);
              }}
            >
              <Text>
                <Font textStyle={styles.plusText} text="+"></Font>
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.minus}
              disabled={quantityState == 1 || checkboxState}
              onPress={() => {
                setQuantityState(quantityState - 1);
                subtractQuantity(item);
              }}
            >
              <Text>-</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ItemCard;

const styles = StyleSheet.create({
  ItemCard: {
    width: "80%",
    marginLeft: "10%",
    borderBottomColor: colors.black,
    borderBottomWidth: 1,
    paddingBottom: 10,
    marginBottom: 10,
  },
  content: {
    flexDirection: "row",
  },
  ItemCardTitle: {
    color: "black",
  },
  rightFloatContainer: {
    position: "absolute",
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    width: "30%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  changeQuantity: {
    flexDirection: "column",
    justifyContent: "space-between",
    height: 50,
  },
  plus: {
    backgroundColor: colors.blueLight,
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  plusText: {
    color: colors.blueDark,
    fontWeight: "bold",
  },
  minus: {
    backgroundColor: colors.yellow,
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  opaque: {
    opacity: 0.5,
  },
});
