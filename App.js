import "react-native-gesture-handler";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import ApiKeys from "./constants/ApiKeys";
import firebase from "firebase/app";
import { Ionicons } from "@expo/vector-icons";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "./src/screens/HomeScreen";
import LoginScreen from "./src/screens/LoginScreen";
import LoadingScreen from "./src/screens/LoadingScreen";
import RegistrationScreen from "./src/screens/RegistrationScreen";
import Store from "./redux/Store";
import { Provider } from "react-redux";
import TaskListsScreen from "./src/screens/TaskListsScreen";
import GoalStackScreen from "./src/navigation/GoalStackScreen";
import ListStackScreen from "./src/navigation/ListStackScreen";
import CreateTaskStackScreen from "./src/navigation/CreateTaskStackScreen";
import { colors } from "./constants/vars";
import { useDispatch } from "react-redux";
import { fetchUser } from "./redux/actions/AuthActions";
import { fetchTaskLists } from "./redux/actions/TaskListActions";
import AuthUserStackScreen from "./src/navigation/AuthUserStackScreen";
import { createStackNavigator } from "@react-navigation/stack";
import TaskStackScreen from "./src/navigation/TaskStackScreen";
import { fetchSharedTaskLists } from "./redux/actions/SharedTaskListActions";
import { fetchOwnGoals } from "./redux/actions/GoalActions";

const AppWrapper = () => {
  return (
    <Provider store={Store}>
      <App />
    </Provider>
  );
};

const App = () => {
  const [authUser, setAuthUser] = React.useState("loading");
  const dispatch = useDispatch();

  //Initializing firebase
  if (!firebase.apps.length) {
    firebase.initializeApp(ApiKeys.FirebaseConfig);
  }

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
          <Tab.Screen name="HomeScreen" component={HomeScreen} />
          <Tab.Screen name="GoalStackScreen" component={GoalStackScreen} />
          <Tab.Screen name="TaskStackScreen" component={TaskStackScreen} />
          <Tab.Screen
            name="CreateTaskStackScreen"
            component={CreateTaskStackScreen}
          />
          <Tab.Screen name="ListStackScreen" component={ListStackScreen} />
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
        dispatch(fetchOwnGoals(user.uid));
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

              if (route.name === "HomeScreen") {
                iconName = focused ? "ios-home" : "ios-home-outline";
              } else if (route.name === "GoalStackScreen") {
                iconName = focused ? "ios-bulb" : "ios-bulb-outline";
              } else if (route.name === "TaskStackScreen") {
                iconName = focused ? "ios-newspaper" : "ios-newspaper-outline";
              } else if (route.name === "CreateTaskStackScreen") {
                iconName = focused ? "ios-create" : "ios-create-outline";
              } else if (route.name === "ListStackScreen") {
                iconName = focused ? "ios-list" : "ios-list";
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
  );
};

export default AppWrapper;
