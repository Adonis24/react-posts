import React from "react";
import { View, Text, StyleSheet, Button, FlatList } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import {CommonActions} from '@react-navigation/native'
import { DATA } from "../data";
import {Post} from '../components/Post'
import { AppHeaderIcon } from "../components/AppHeadericon";

export const MainScreen = ({ navigation,route }) => {
  const openPostHandler = (post) => {
    // navigation.dispatch(CommonActions.setParams({ booked: post.booked}));
    navigation.navigate("Post", {postId: post.id, date: post.date, booked: post.booked});
  };
  navigation.setOptions({
    headerRight:(props) => (
      <HeaderButtons HeaderButtonComponent={AppHeaderIcon} {...props}>
        <Item
          title="Take photo"
          iconName="ios-camera"
          onPress={() => 
            console.log("Выбор фото")
          }
        /> 
      </HeaderButtons>
    ),
    headerLeft: (props)=>(
      <HeaderButtons HeaderButtonComponent={AppHeaderIcon} {...props}>
      <Item
        title="menu drawer"
        iconName="ios-menu"
        onPress={() => 
          console.log("Выбор меню")
        }
      /> 
    </HeaderButtons>
     )
  },[navigation,route])
  return (
    <View style={styles.wrapper}>
      <FlatList
        data={DATA}
        keyExtractor={(post) => post.id.toString()}
        renderItem={({ item }) => {
          return <Post post={item} onOpen={openPostHandler}/>;
        }}
      />
    </View>
  );
};



const styles = StyleSheet.create({
  wrapper: {
    padding: 10,
  },
});