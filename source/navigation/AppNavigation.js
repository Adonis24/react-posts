import React from "react";
import { Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { createDrawerNavigator, DrawerItem } from "@react-navigation/drawer";
import { MainScreen } from "../screens/MainScreen";
import { PostScreen } from "../screens/PostScreen";
import { THEME } from "../theme";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BookedScreen } from "../screens/BookedScreen";
import { AboutScreen } from "../screens/AboutScreen";
import { CreateScreen } from "../screens/CreateScreen";

const postHandler = (date) => {
  return "Пост " + new Date(date).toLocaleDateString();
};
const PostNavigator = createStackNavigator();
const PostNavigatorComponent = () => {
  return (
    <PostNavigator.Navigator
      initialRouteName="Main"
      screenOptions={{
        title: "Мой блог",
        headerStyle: {
          backgroundColor:
            Platform.OS === "android" ? THEME.MAIN_COLOR : "#fff",
        },
        headerTintColor: Platform.OS === "android" ? "#fff" : THEME.MAIN_COLOR,
      }}
    >
      <PostNavigator.Screen
        name="Main"
        component={MainScreen}
        options={{
          title: "Мой блог",
        }}
      />
      <PostNavigator.Screen
        name="Post"
        component={PostScreen}
        options={({ route }) => ({ title: postHandler(route.params?.date) })}
      />
    </PostNavigator.Navigator>
  );
};
const BookedNavigator = createStackNavigator();
const BookedNavigatorComponent = () => {
  return (
    <BookedNavigator.Navigator
      initialRouteName="Booked"
      options={{
        headerStyle: {
          backgroundColor:
            Platform.OS === "android" ? THEME.MAIN_COLOR : "#fff",
        },
        headerTintColor: Platform.OS === "android" ? "#fff" : THEME.MAIN_COLOR,
      }}
    >
      <BookedNavigator.Screen
        name="Booked"
        component={BookedScreen}
        options={{
          title: "Избранное",
        }}
      />
      <BookedNavigator.Screen
        name="Post"
        component={PostScreen}
        options={({ route }) => ({ title: postHandler(route.params?.date) })}
      />
    </BookedNavigator.Navigator>
  );
};
const CreateNavigator = createStackNavigator();
const CreateNavigatorComponent = () => {
  return (
    <CreateNavigator.Navigator>
      <CreateNavigator.Screen name="Create" component={CreateScreen} />
    </CreateNavigator.Navigator>
  );
};
const AboutNavigator = createStackNavigator();
const AboutNavigatorComponent = () => {
  return (
    <AboutNavigator.Navigator>
      <AboutNavigator.Screen name="About" component={AboutScreen} />
    </AboutNavigator.Navigator>
  );
};
const Tab =
  Platform.OS === "android"
    ? createMaterialBottomTabNavigator()
    : createBottomTabNavigator();
const BottomNavigatorComponent = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Booked"
        component={BookedNavigatorComponent}
        options={{
          tabBarLabel: "Избранное",
          tabBarIcon: (info) => (
            <Ionicons name="ios-star" size={25} color={THEME.MAIN_COLOR} />
          ),
        }}
      />
      <Tab.Screen
        name="Post"
        component={PostNavigatorComponent}
        options={{
          tabBarLabel: "Посты",
          tabBarIcon: (info) => (
            <Ionicons name="ios-albums" size={25} color={THEME.MAIN_COLOR} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const Drawer = createDrawerNavigator();
const DrawerNavigatorComponent = () => {
  return (
    <Drawer.Navigator
      initialRouteName="PostTab"
      screenOptions={{ headerShown: false, activeTintColor: THEME.MAIN_COLOR }}
      drawerContentOptions={{
        activeTintColor: THEME.MAIN_COLOR,
        itemStyle: { fontFamily: "open-bold"},
      }}
    >
      <Drawer.Screen
        name="PostTab"
        component={BottomNavigatorComponent}
        options={{
          drawerLabel: "Главная",
          drawerIcon: () => <Ionicons name="ios-star" />,
        }}
      />
      <Drawer.Screen
        name="About"
        component={AboutNavigatorComponent}
        options={{ drawerLabel: "О приложении" }}
      />
      <Drawer.Screen
        name="Create"
        component={CreateNavigatorComponent}
        options={{ drawerLabel: "Создать пост" }}
      />
    </Drawer.Navigator>
  );
};
export const AppNavigation = () => {
  return (
    <NavigationContainer>
      <DrawerNavigatorComponent />
    </NavigationContainer>
  );
};
// initialRouteName="Booked"
//     shifting={true}
//     tabBarOptions={{
//       activeTintColor: THEME.MAIN_COLOR,
//       shifting:'true'
//     }}
