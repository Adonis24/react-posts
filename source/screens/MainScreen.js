import React from "react";
import { View, Text, StyleSheet, Button, FlatList } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { createDrawerNavigator } from '@react-navigation/drawer';
import {CommonActions} from '@react-navigation/native'
import { DATA } from "../data";
import {Post} from '../components/Post'
import { AppHeaderIcon } from "../components/AppHeadericon";
import { PostList } from "../components/PostList";

export const MainScreen = ({ navigation,route }) => {
  const openPostHandler = (post) => {
    // navigation.dispatch(CommonActions.setParams({ booked: post.booked}));
    navigation.navigate("Post", {postId: post.id, date: post.date, booked: post.booked});
  };
  navigation.setOptions({
    title:'Мой блог',
    headerRight:() => (
      <HeaderButtons HeaderButtonComponent={AppHeaderIcon} >
        <Item
          title="Take photo"
          iconName="ios-camera"
          onPress={() => 
            navigation.navigate("Create")
          }
        /> 
      </HeaderButtons>
    ),
    headerLeft: ()=>(
      <HeaderButtons HeaderButtonComponent={AppHeaderIcon} >
      <Item
        title="menu drawer"
        iconName="ios-menu"
        onPress={() => 
          navigation.toggleDrawer()
        }
      /> 
    </HeaderButtons>
     )
  },[navigation,route])
  return <PostList data={DATA} onOpen={openPostHandler}/>
};



const styles = StyleSheet.create({
  wrapper: {
    padding: 10,
  },
});
