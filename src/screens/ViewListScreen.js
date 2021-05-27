import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { colors, icons } from "../../constants/vars";
import ItemCard from "../components/ItemCard";
import ScreenHeader from "../components/ScreenHeader";
import {
  addQuantity,
  subtractQuantity,
  completeItem,
  addItemToList,
  deleteItem,
  submitEditItem,
} from "../../redux/actions/ItemListActions";
import { completeSharedItem } from "../../redux/actions/SharedItemListActions";
import firebase from "firebase/app";
import "firebase/database";
import AddButton from "../components/AddButton";
import FullScreenModal from "../components/FullScreenModal";
import CreateItemField from "../components/CreateItemField";
import Font from "../components/Font";
import { fonts } from "../../constants/fonts";
import Sort from "../components/Sort";
import SortingService from "../services/SortingService";
require("firebase/auth");

const ViewListScreen = ({ navigation, route }) => {
  const listKey = route.params;

  const itemLists = useSelector((state) => state.itemLists);
  const { sharedItemLists } = useSelector((state) => state.sharedItemLists);

  let currentList;
  for (const item of itemLists) {
    item.key === listKey ? (currentList = item) : null;
  }
  for (const item of sharedItemLists) {
    item.key === listKey ? (currentList = item) : null;
  }
  const list = currentList;

  const [selectedSortOption, setSelectedSortOption] = useState("Newest");

  const [sortedList, setSortedList] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);

  const [editItem, setEditItem] = useState(null);
  const [editName, setEditName] = useState("");
  const [editQuantity, setEditQuantity] = useState(1);

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
  const handleCreateItem = () => {
    dispatch(
      addItemToList(name, quantity, list.key, firebase.auth().currentUser.uid)
    );
    setShowAddModal(false);
    setName("");
    setQuantity(1);
  };
  const handleSubmitChanges = () => {
    dispatch(submitEditItem(editName, editQuantity, editItem.key, list.key));
    setShowEditModal(false);
    setEditName("");
    setEditQuantity(1);
    setEditItem(null);
  };

  const handleDeleteItem = (item) => {
    dispatch(deleteItem(item.key, list.key));
  };
  const handleEditItem = (item) => {
    setEditItem(item);
    setEditName(item.name);
    setEditQuantity(item.quantity);
    setShowEditModal(true);
  };

  const handleSortedList = (sortBy) => {
    setSelectedSortOption(sortBy);
    let sortedList;
    if (list.items) {
      switch (sortBy) {
        case "Due date":
          sortedList = SortingService.sortByDueDate(list.items, true);
          break;
        case "Newest":
          sortedList = SortingService.sortByNewest(list.items, true);
          break;
        case "Oldest":
          sortedList = SortingService.sortByOldest(list.items, true);
          break;
        default:
      }
    }
    setSortedList(sortedList);
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
        handleDelete={(item) => handleDeleteItem(item)}
        handleEdit={(item) => handleEditItem(item)}
      />
    );
  };

  useEffect(() => {
    handleSortedList(selectedSortOption);
  }, [list]);

  return (
    <View style={styles.ViewListScreen}>
      <ScrollView>
        <ScreenHeader title={list.name} navigation={navigation} />
        <View style={styles.sortContainer}>
          <Sort
            options={[
              { label: "Newest", value: "Newest" },
              { label: "Oldest", value: "Oldest" },
            ]}
            handleOnPress={(sortedBy) => handleSortedList(sortedBy)}
          />
        </View>
        <View style={styles.listContainer}>
          {list.items && sortedList ? (
            Object.values(sortedList)?.map((item, index) => {
              return renderListItemCards(item, index);
            })
          ) : (
            <View style={styles.noItemsText}>
              <Font
                textStyle={fonts.heading5}
                text="Add your first item below!"
              ></Font>
            </View>
          )}
        </View>
        {showAddModal && (
          <FullScreenModal
            confirmText="Create Item"
            title="Create Item"
            visible={showAddModal}
            handleClose={() => {
              setShowAddModal(false);
            }}
            handleConfirm={() => handleCreateItem()}
            content={
              <>
                <CreateItemField
                  src={icons.alphabet}
                  placeholder="Declare a name"
                  title="Name"
                  initialQuantity={quantity}
                  textChanged={(text) => {
                    setName(text);
                  }}
                  onIncrement={() => setQuantity(quantity + 1)}
                  onDecrement={() => setQuantity(quantity - 1)}
                />
              </>
            }
          />
        )}
        {showEditModal && (
          <FullScreenModal
            confirmText="Submit changes"
            title="Edit Item"
            visible={showEditModal}
            handleClose={() => {
              setShowEditModal(false);
            }}
            handleConfirm={() => handleSubmitChanges()}
            content={
              <>
                <CreateItemField
                  src={icons.alphabet}
                  placeholder={editName}
                  title="Name"
                  initialQuantity={editQuantity}
                  textChanged={(text) => {
                    setEditName(text);
                  }}
                  onIncrement={() => setEditQuantity(editQuantity + 1)}
                  onDecrement={() => setEditQuantity(editQuantity - 1)}
                />
              </>
            }
          />
        )}
      </ScrollView>
      <AddButton
        handleOnPress={() => {
          setShowAddModal(true);
        }}
      />
    </View>
  );
};
export default ViewListScreen;

const styles = StyleSheet.create({
  ViewListScreen: {
    flex: 1,
    backgroundColor: colors.white,
  },
  noItemsText: {
    width: "60%",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  sortContainer: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  listContainer: {
    zIndex: -1,
  },
});
