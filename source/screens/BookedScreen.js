import React from "react";
import { View, Text, StyleSheet, Button, FlatList } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector} from 'react-redux' 
import { AppHeaderIcon } from "../components/AppHeadericon";
import { PostList } from "../components/PostList";
import { loadPosts } from "../store/actions/post";

export const BookedScreen = ({ navigation,route }) => {
  const openPostHandler = (post) => {
    navigation.navigate("Booked", {postId: post.id, date: post.date, booked: post.booked});
  };

  const bookedPosts = useSelector(state => state.post.bookedPosts)
  navigation.setOptions({
    headerTitle:'Избранное',
    headerLeft: (props)=>(
      <HeaderButtons HeaderButtonComponent={AppHeaderIcon} {...props}>
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
  return <PostList data={bookedPosts} onOpen={openPostHandler}/>
};


const styles = StyleSheet.create({
  center: {
      flex:1,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  }
});
