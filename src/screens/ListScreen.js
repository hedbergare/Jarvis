import React from "react";
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
} from "react-native";
import { fonts } from "../../constants/fonts";
import { colors, icons } from "../../constants/vars";
import ScreenHeader from "../components/ScreenHeader";
import ListCard from "../components/ListCard";
import { useSelector } from "react-redux";
import Font from "../components/Font";
import CreateField from "../components/CreateField";

const TaskListsScreen = ({ navigation }) => {
  const [displayOwned, setDisplayOwned] = React.useState(true);
  const [modalVisible, setModalVisible] = React.useState(false);

  const itemLists = useSelector((state) => state.itemLists);
  const { sharedItemLists } = useSelector((state) => state.sharedItemLists);

  const handleDisplayOwned = () => {
    setDisplayOwned(true);
  };

  const handleDisplayShared = () => {
    setDisplayOwned(false);
  };
  const handleOnPressList = (list) => {
    navigation.navigate("ViewListScreen", list);
  };
  const renderList = (list, index) => {
    return (
      <ListCard
        key={index}
        list={list}
        onPressHandler={(list) => handleOnPressList(list)}
      />
    );
  };

  return (
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
      {/* </View> */}
      <Button title="Add list" onPress={() => setModalVisible(true)}></Button>
      <Modal
        presentationStyle="overFullScreen"
        transparent={true}
        animationType="fade"
        style={styles.modalBackground}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <TouchableOpacity
          style={styles.modalBackground}
          onPressOut={() => {
            setModalVisible(false);
          }}
        >
          <TouchableOpacity activeOpacity={1}>
            <View style={styles.createListContainer}>
              <CreateField
                src={icons.alphabet}
                placeholder="Declare a name"
                title="Name"
                textChanged={(text) => setName(text)}
              />
              <CreateField
                src={icons.share}
                placeholder="Share List (optional)"
                title="Share with..."
                textChanged={(userId) => setSharedWith(userId)}
              />
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => handleCreateList()}
              >
                <Text style={[fonts.heading3, styles.addButtonText]}>
                  <Font text="Create"></Font>
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </ScrollView>
  );
};

export default TaskListsScreen;

const styles = StyleSheet.create({
  ListScreen: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: "center",
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
