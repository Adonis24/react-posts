import React from "react";
import { Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import { MainScreen } from "../screens/MainScreen";
import { PostScreen } from "../screens/PostScreen";
import { THEME } from "../theme";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BookedScreen } from "../screens/BookedScreen";


const postHandler = (date) => {
  return "Пост " + new Date(date).toLocaleDateString();
};
const PostNavigator = createStackNavigator();
const PostNavigatorComponent = () => {

  return (
    <PostNavigator.Navigator
      initialRouteName="Main"
      options={{
        title: "Мой блог",
        headerStyle: {
          backgroundColor:
            Platform.OS === "android" ? THEME.MAIN_COLOR : "#fff",
        },
        headerTintColor: Platform.OS === "android" ? "#fff" : THEME.MAIN_COLOR,
        backgroundColor: THEME.MAIN_COLOR,
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
const BookedNavigatorComponent = ()=>{
  return (
    <BookedNavigator.Navigator
    initialRouteName="Booked"
    options={{
      headerStyle: {
        backgroundColor:
          Platform.OS === "android" ? THEME.MAIN_COLOR : "#fff",
      },
      headerTintColor: Platform.OS === "android" ? "#fff" : THEME.MAIN_COLOR,
      backgroundColor: THEME.MAIN_COLOR,
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
  )
}
const Tab = createBottomTabNavigator();
const BottomNavigatorComponent = (props) => {
  return (
    <Tab.Navigator {...props} initialRouteName="Booked"
    tabBarOptions={{
      activeTintColor: THEME.MAIN_COLOR,
    }}>
      <Tab.Screen
        name="Booked"
        component={BookedNavigatorComponent}
        options={{ tabBarLabel:'Избранное',tabBarIcon: info => ( <Ionicons name="ios-star" size={25} color={THEME.MAIN_COLOR}/>) }}
      />
      <Tab.Screen
        name="Post"
        component={PostNavigatorComponent}
        options={{ tabBarLabel:'Посты', tabBarIcon: info => (<Ionicons name="ios-albums" size={25} color={THEME.MAIN_COLOR}/>) }}
      />
    </Tab.Navigator>
  );
}

export const AppNavigation = () => {

  return <NavigationContainer>
    <BottomNavigatorComponent/>
  </NavigationContainer>;
};
