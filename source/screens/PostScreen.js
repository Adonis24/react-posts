import React from "react";
import { View, Text, StyleSheet, Image, Button, Alert } from "react-native";
import {HeaderButtons,Item} from 'react-navigation-header-buttons'
import { DATA } from "../data";
import { THEME } from "../theme";
import { AppHeaderIcon } from "../components/AppHeadericon";

export const PostScreen = ({ route, navigation }) => {
  const postId = route.params?.postId;
  const post = DATA.find((p) => p.id === postId);
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
  const iconName = route.params?.booked ? 'ios-star' : 'ios-star-outline'
  return (<HeaderButtons HeaderButtonComponent={AppHeaderIcon} {...props}>
  <Item
    title="Take favorite"
    iconName={iconName}
    onPress={() => 
      console.log("Добавить в избранное")
    }
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
