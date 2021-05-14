import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { fonts } from "../../constants/fonts";
import { colors, icons } from "../../constants/vars";
import ScreenHeader from "../components/ScreenHeader";
import ListCard from "../components/ListCard";
import { useDispatch, useSelector } from "react-redux";
import Font from "../components/Font";
import CreateField from "../components/CreateField";
import AddButton from "../components/AddButton";
import FullScreenModal from "../components/FullScreenModal";
import ToggleInput from "../components/ToggleInput";
import {
  addItemList,
  deleteItemList,
  submitEditList,
} from "../../redux/actions/ItemListActions";

const TaskListsScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [displayOwned, setDisplayOwned] = React.useState(true);
  const [showAddModal, setShowAddModal] = React.useState(false);
  const [showEditModal, setShowEditModal] = React.useState(false);
  const [name, setName] = React.useState("");
  const [editName, setEditName] = React.useState("");
  const [editList, setEditList] = React.useState(null);

  const itemLists = useSelector((state) => state.itemLists);
  const { sharedItemLists } = useSelector((state) => state.sharedItemLists);
  const userId = useSelector((state) => state.currentUser.uid);

  const handleDisplayOwned = () => {
    setDisplayOwned(true);
  };

  const handleDisplayShared = () => {
    setDisplayOwned(false);
  };
  const handleOnPressList = (list) => {
    navigation.navigate("ViewListScreen", list.key);
  };
  const handleOnDeleteList = (list) => {
    dispatch(deleteItemList(list.key));
  };
  const handleOnEditList = (list) => {
    setEditList(list);
    setShowEditModal(true);
  };
  const renderList = (list, index) => {
    return (
      <ListCard
        key={index}
        list={list}
        onPressHandler={(list) => handleOnPressList(list)}
        handleDelete={(list) => handleOnDeleteList(list)}
        handleEdit={(list) => handleOnEditList(list)}
      />
    );
  };
  const handleCreateItemList = () => {
    dispatch(addItemList(userId, name));
    setShowAddModal(false);
  };
  const handleSubmitChanges = () => {
    dispatch(submitEditList(editName, editList.key));
    setEditName("");
    setEditList(null);
    setShowEditModal(false);
  };

  return (
    <>
      <ScrollView contentContainerStyle={styles.ListScreen}>
        <ScreenHeader title="Item lists" navigation={navigation} />
        <View style={styles.listTypeToggle}>
          <TouchableOpacity
            style={displayOwned ? styles.activeListStyle : null}
            onPress={handleDisplayOwned}
          >
            <Text
              style={[
                fonts.heading4,
                styles.listTypeText,
                displayOwned ? null : styles.fadedText,
              ]}
            >
              Mine
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={displayOwned ? null : styles.activeListStyle}
            onPress={handleDisplayShared}
          >
            <Text
              style={[
                fonts.heading4,
                styles.listTypeText,
                displayOwned ? styles.fadedText : null,
              ]}
            >
              Shared
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.cardsContainer}>
          {displayOwned ? (
            itemLists ? (
              Object.values(itemLists).map((list, index) => {
                return renderList(list, index);
              })
            ) : (
              <Text>
                <Font text="You don't have any item lists yet."></Font>
              </Text>
            )
          ) : sharedItemLists ? (
            Object.values(sharedItemLists).map((list, index) => {
              return renderList(list, index);
            })
          ) : (
            <Text>
              <Font text="You don't have any shared lists..."></Font>
            </Text>
          )}
        </View>
        {showAddModal && (
          <FullScreenModal
            confirmText="Create list"
            title="Create Item List"
            visible={showAddModal}
            handleClose={() => {
              setShowAddModal(false);
            }}
            handleConfirm={() => handleCreateItemList()}
            content={
              <>
                <CreateField
                  src={icons.alphabet}
                  placeholder="Declare a name"
                  title="Name"
                  textChanged={(text) => setName(text)}
                />
                <ToggleInput
                  title="Share with a friend"
                  icon={icons.share}
                  value={"None"}
                  handleOnPress={() => {
                    console.log("Insert share friend functionality");
                  }}
                />
              </>
            }
          />
        )}

        {showEditModal && (
          <FullScreenModal
            confirmText="Submit changes"
            title="Edit Item List"
            visible={showEditModal}
            handleClose={() => {
              setShowEditModal(false);
            }}
            handleConfirm={() => handleSubmitChanges()}
            content={
              <>
                <CreateField
                  src={icons.alphabet}
                  placeholder={editList.name}
                  title="Name"
                  textChanged={(text) => setEditName(text)}
                />
                <ToggleInput
                  title="Share with a friend"
                  icon={icons.share}
                  value={"None"}
                  handleOnPress={() => {
                    console.log("Insert share friend funcitonality");
                  }}
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
    </>
  );
};

export default TaskListsScreen;

const styles = StyleSheet.create({
  ListScreen: {
    backgroundColor: colors.white,
    alignItems: "center",
    minHeight: "100%",
  },
  cardsContainer: {
    marginTop: 10,
  },
  listTypeToggle: {
    width: "100%",
    justifyContent: "center",
    flexDirection: "row",
  },
  listTypeText: {
    width: 140,
    textAlign: "center",
    marginBottom: 10,
  },
  activeListStyle: {
    opacity: 1,
    borderBottomWidth: 1,
    borderBottomColor: colors.purple,
  },
  fadedText: {
    opacity: 0.5,
  },
  modalBackground: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    backgroundColor: colors.black + "90",
    position: "absolute",
  },
  createListContainer: {
    alignSelf: "center",
    alignItems: "center",
    width: "90%",
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "white",
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  addButton: {
    alignSelf: "center",
    width: 100,
    marginVertical: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: colors.purple,
    borderRadius: 50,
  },
  addButtonText: {
    color: colors.white,
  },
});
