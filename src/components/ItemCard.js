import React from "react";
import {
  Animated,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { colors } from "../../constants/vars";
import { fonts } from "../../constants/fonts";
import Font from "./Font";
import "firebase/database";
import IncrementButton from "./IncrementButton";
import DecrementButton from "./DecrementButton";
import Swipeable from "react-native-gesture-handler/Swipeable";
import SwipeButtons from "./SwipeButtons";
import { useSelector } from "react-redux";

const ItemCard = ({
  item,
  addQuantity,
  subtractQuantity,
  completeItem,
  handleDelete,
  handleEdit,
}) => {
  const [checkboxState, setCheckboxState] = React.useState(item.completed);
  const [quantityState, setQuantityState] = React.useState(item.quantity);
  const swipeableRef = React.useRef(null);

  const otherUsers = useSelector((state) => state.otherUsers);

  const fetchCreator = () => {
    for (const user of otherUsers) {
      if (user.key === item.userId) {
        return user.first_name + " " + user.last_name;
      }
    }
    return "you";
  };

  React.useEffect(() => {
    setQuantityState(item.quantity);
  }, [item.quantity]);

  const creator = fetchCreator();

  return (
    <>
      <Swipeable
        ref={swipeableRef}
        renderRightActions={() => (
          <SwipeButtons
            onDeletePress={() => {
              handleDelete(item);
              swipeableRef.current.close();
            }}
            onEditPress={() => handleEdit(item)}
          ></SwipeButtons>
        )}
        friction={2}
        rightThreshold={20}
        containerStyle={styles.swipeContainer}
      >
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
                <Font text={"Added by " + creator}></Font>
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
                <IncrementButton
                  handleOnPress={() => {
                    setQuantityState(quantityState + 1);
                    addQuantity(item);
                  }}
                  checkboxState={checkboxState}
                />
                <DecrementButton
                  checkboxState={quantityState == 1 || checkboxState}
                  handleOnPress={() => {
                    setQuantityState(quantityState - 1);
                    subtractQuantity(item);
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      </Swipeable>
    </>
  );
};

export default ItemCard;

const styles = StyleSheet.create({
  ItemCard: {
    backgroundColor: colors.white,
    flexDirection: "row",
    width: "100%",
    marginBottom: 10,
    height: 90,
  },
  ItemCardText: {
    justifyContent: "center",
  },
  swipeContainer: {
    width: "100%",
    height: 90,
    marginBottom: 10,
  },
  content: {
    paddingBottom: 20,
    borderBottomColor: colors.black,
    borderBottomWidth: 1,
    flexDirection: "row",
    width: "80%",
    marginHorizontal: "10%",
  },

  ItemCardTitle: {
    color: "black",
  },
  rightFloatContainer: {
    position: "absolute",
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  changeQuantity: {
    flexDirection: "column",
    justifyContent: "space-between",
    height: 70,
    marginLeft: 15,
  },
});
