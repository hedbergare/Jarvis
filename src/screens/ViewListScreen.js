import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { useDispatch } from "react-redux";
import { colors } from "../../constants/vars";
import ItemCard from "../components/ItemCard";
import ScreenHeader from "../components/ScreenHeader";
import {
  addQuantity,
  subtractQuantity,
  completeItem,
} from "../../redux/actions/ItemListActions";
import {
  addQuantityShared,
  subtractQuantityShared,
  completeSharedItem,
} from "../../redux/actions/SharedItemListActions";
import firebase from "firebase/app";
import "firebase/database";
require("firebase/auth");

const ViewListScreen = ({ navigation, route }) => {
  const list = route.params;

  const dispatch = useDispatch();

  const handleAddQuantity = (item) => {
    dispatch(addQuantity(list.key, item.key));
  };
  const handleSubtractQuantity = (item) => {
    dispatch(subtractQuantity(list.key, item.key));
  };
  const handleCompleteItem = (item, completed) => {
    if (firebase.auth().currentUser.uid === list.userId) {
      dispatch(completeItem(list.key, item.key, completed));
    } else {
      dispatch(completeSharedItem(list.key, item.key, completed));
    }
  };

  const renderListItemCards = (item, index) => {
    return (
      <ItemCard
        key={index}
        item={item}
        list={list}
        handleOnPress={(item) => handleOnPressListItemCard(item)}
        addQuantity={(item) => handleAddQuantity(item)}
        subtractQuantity={(item) => handleSubtractQuantity(item)}
        completeItem={(item, completed) => handleCompleteItem(item, completed)}
      />
    );
  };

  return (
    <View style={styles.ViewListScreen}>
      <ScrollView>
        <ScreenHeader title={list.name} navigation={navigation} />
        {list.items ? (
          Object.values(list.items).map((item, index) => {
            return renderListItemCards(item, index);
          })
        ) : (
          /* TO DO - Add a "add task" button here */
          <Text>You don't have any tasks in this list yet. Add task here:</Text>
        )}
      </ScrollView>
    </View>
  );
};

export default ViewListScreen;

const styles = StyleSheet.create({
  ViewListScreen: {
    flex: 1,
    backgroundColor: colors.white,
  },
});
