import "react-native-gesture-handler";
import * as React from "react";
import { RefreshControl, ScrollView, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import ApiKeys from "./constants/ApiKeys";
import firebase from "firebase/app";
import { Ionicons } from "@expo/vector-icons";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import LoadingScreen from "./src/screens/LoadingScreen";
import Store from "./redux/Store";
import { Provider } from "react-redux";
import GoalStackScreen from "./src/navigation/GoalStackScreen";
import ListStackScreen from "./src/navigation/ListStackScreen";
import { colors } from "./constants/vars";
import { useDispatch } from "react-redux";
import { fetchUser } from "./redux/actions/AuthActions";
import { fetchTaskLists } from "./redux/actions/TaskListActions";
import AuthUserStackScreen from "./src/navigation/AuthUserStackScreen";
import { createStackNavigator } from "@react-navigation/stack";
import TaskStackScreen from "./src/navigation/TaskStackScreen";
import { fetchSharedTaskLists } from "./redux/actions/SharedTaskListActions";
import { fetchItemLists } from "./redux/actions/ItemListActions";
import { fetchSharedItemLists } from "./redux/actions/SharedItemListActions";
import { fetchOtherUsers } from "./redux/actions/OtherUsersActions";
import { fetchOwnGoals } from "./redux/actions/GoalActions";
import HomeStackScreen from "./src/navigation/HomeStackScreen";
import { fetchSharedGoals } from "./redux/actions/SharedGoalActions";
import FriendsStackScreen from "./src/navigation/FriendsStackScreen";

const AppWrapper = () => {
  return (
    <Provider store={Store}>
      <App />
    </Provider>
  );
};

const App = () => {
  const [authUser, setAuthUser] = React.useState("loading");
  const [refreshing, setRefreshing] = React.useState(false);

  const dispatch = useDispatch();

  //Initializing firebase
  if (!firebase.apps.length) {
    firebase.initializeApp(ApiKeys.FirebaseConfig);
  }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
  }, []);

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const Tabs = () => {
    if (authUser === "loading") {
      return (
        <Tab.Screen
          name="LoadingScreen"
          component={LoadingScreen}
          options={{ title: "Loading screen" }}
        />
      );
    } else if (authUser === "true") {
      return (
        <>
          <Tab.Screen name="HomeStackScreen" component={HomeStackScreen} />
          <Tab.Screen name="GoalStackScreen" component={GoalStackScreen} />
          <Tab.Screen name="TaskStackScreen" component={TaskStackScreen} />
          <Tab.Screen name="ListStackScreen" component={ListStackScreen} />
          <Tab.Screen
            name="FriendsStackScreen"
            component={FriendsStackScreen}
          />
        </>
      );
    }
  };

  const checkIfLoggedIn = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        dispatch(fetchUser(user.uid));
        dispatch(fetchTaskLists(user.uid));
        dispatch(fetchSharedTaskLists(user.uid));
        dispatch(fetchOtherUsers(user.uid));
        dispatch(fetchOwnGoals(user.uid));
        dispatch(fetchSharedGoals(user.uid));
        dispatch(fetchItemLists(user.uid));
        dispatch(fetchSharedItemLists(user.uid));
        setAuthUser("true");
      } else {
        setAuthUser("false");
      }
    });
  };

  React.useEffect(() => {
    checkIfLoggedIn();
  });

  const Tab = createBottomTabNavigator();
  const Stack = createStackNavigator();

  return (
    <ScrollView
      contentContainerStyle={styles.wrapper}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <NavigationContainer>
        {authUser === "false" ? (
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen
              name="AuthUserStackScreen"
              component={AuthUserStackScreen}
            />
          </Stack.Navigator>
        ) : (
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === "HomeStackScreen") {
                  iconName = focused ? "ios-home" : "ios-home-outline";
                } else if (route.name === "GoalStackScreen") {
                  iconName = focused ? "ios-bulb" : "ios-bulb-outline";
                } else if (route.name === "TaskStackScreen") {
                  iconName = focused
                    ? "ios-newspaper"
                    : "ios-newspaper-outline";
                } else if (route.name === "ListStackScreen") {
                  iconName = focused ? "ios-list" : "ios-list";
                } else if (route.name === "FriendsStackScreen") {
                  iconName = focused ? "ios-people" : "ios-people-outline";
                }

                // You can return any component that you like here!
                return <Ionicons name={iconName} size={size} color={color} />;
              },
            })}
            tabBarOptions={{
              activeTintColor: colors.blue,
              inactiveTintColor: colors.gray,
              showLabel: false,
            }}
          >
            {Tabs()}
          </Tab.Navigator>
        )}
      </NavigationContainer>
    </ScrollView>
  );
};

export default AppWrapper;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});
