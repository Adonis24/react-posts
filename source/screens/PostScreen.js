import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, Text, StyleSheet, Image, Button, Alert } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { THEME } from "../theme";
import { AppHeaderIcon } from "../components/AppHeadericon";
import { toggleBooked, removePost } from "../store/actions/post";

export const PostScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const postId = route.params?.postId;
  const post = useSelector((state) =>
    state.post.allPosts.find((p) => p.id === postId)
  );
  {
    /*const post = DATA.find((p) => p.id === postId);*/
  }
  const booked = useSelector((state) =>
    state.post.bookedPosts.some((post) => post.id === postId)
  );

  const toogleBookedHandler = useCallback(() => {
    dispatch(toggleBooked(post));
  }, [dispatch, post]);

  // const removePostHandler = useCallback(() => {
  //   navigation.navigate('Main')
  //   dispatch(removePost(postId));
  // }, [dispatch, postId]);

  const removeHandler = useCallback(() => {
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
        { text: "Удалить", style: "destructive", onPress: () => { 
          navigation.navigate('Main')
        dispatch(removePost(postId));} },
      ],
      { cancelable: false }
    );
  },[dispatch,postId]);
  React.useEffect(() => {
  navigation.setOptions(
    {
      headerRight: (props) => {
        const iconName = booked ? "ios-star" : "ios-star-outline";
        return (
          <HeaderButtons HeaderButtonComponent={AppHeaderIcon} {...props}>
            <Item
              title="Take favorite"
              iconName={iconName}
              onPress={toogleBookedHandler}
            />
          </HeaderButtons>
        );
      },
    }
  )},[navigation]);
  if ((!post) || (!post.text)) {
    console.log(post)
    return null
  }
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
