import React, { useEffect, useCallback} from "react";
// import {useDispatch} from 'react-native'
import {useSelector, useDispatch} from 'react-redux'
import { View, Text, StyleSheet, Image, Button, Alert } from "react-native";
import {HeaderButtons,Item} from 'react-navigation-header-buttons'
import { DATA } from "../data";
import { THEME } from "../theme";
import { AppHeaderIcon } from "../components/AppHeadericon";
import {toggleBooked} from '../store/actions/post'

export const PostScreen = ({ route, navigation }) => {
  const dispatch = useDispatch()
  const postId = route.params?.postId;
  const post = DATA.find((p) => p.id === postId);
  const booked = useSelector(state => state.post.bookedPosts.some(post => post.id === postId))
  //useEffect(() => {navigation.setParams({booked})})
  const toogleBookedHandler = useCallback(() => {
    dispatch(toggleBooked(postId))
  },[dispatch,postId])
  // useEffect(() => {
  //   navigation.setParams({toogleBookedHandler})
  // },[toogleBookedHandler])
  const removeHandler = () => {
    // Works on both Android and iOS
    Alert.alert(
      "Удаление поста",
      "Вы точно хотите удалить пост?",
      [
        {
          text: "Отменить",
          onPress: () => console.log("Отмена"),
          style: "cancel",
        },
        { text: "Удалить", style: "destructive", onPress: () => {} },
      ],
      { cancelable: false }
    );
  };
  navigation.setOptions({
headerRight: (props)=>{
  const iconName = booked ? 'ios-star' : 'ios-star-outline'
  return (<HeaderButtons HeaderButtonComponent={AppHeaderIcon} {...props}>
  <Item
    title="Take favorite"
    iconName={iconName}
    onPress={toogleBookedHandler}
  /> 
</HeaderButtons>
)}
  },[navigation,route])
  return (
    <View style={styles.center}>
      <Image source={{ uri: post.img }} style={styles.image} />
      <View>
        <Text>{post.text}</Text>
      </View>
      <Button
        title="Удалить"
        color={THEME.DANGER_COLOR}
        onPress={removeHandler}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 200,
  },
});
