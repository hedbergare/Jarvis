import React from "react";
import { StyleSheet, Image, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { colors } from "../../constants/vars";

const Navbar = ({ navigation }) => {
  const handleHomeClick = () => {
    navigation.navigate("HomeScreen");
  };
  const handleTasksClick = () => {
    navigation.navigate("TaskListsScreen");
  };
  return (
    <View style={styles.Navbar}>
      <TouchableOpacity style={styles.navbarItem} onPress={handleHomeClick}>
        <Image source={require("../assets/icon-home.png")} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.navbarItem}>
        <Image source={require("../assets/icon-bulb.png")} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.navbarItem} onPress={handleTasksClick}>
        <Image source={require("../assets/icon-schedule.png")} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.navbarItem}>
        <Image source={require("../assets/icon-pen.png")} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.navbarItem}>
        <Image source={require("../assets/icon-list.png")} />
      </TouchableOpacity>
    </View>
  );
};

export default Navbar;

const styles = StyleSheet.create({
  Navbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 30,
    paddingVertical: 20,
    backgroundColor: colors.whiteDark,
    width: "100%",
    position: "absolute",
    bottom: 0,
  },
});
