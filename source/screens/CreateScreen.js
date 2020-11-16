import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { AppHeaderIcon } from "../components/AppHeadericon";
import { THEME } from "../theme";
import { addPost } from "../store/actions/post";

export const CreateScreen = ({ navigation, route }) => {
  const [text, setText] = useState('')
  const dispatch = useDispatch();
  const img = "https://cdn.londonandpartners.com/visit/general-london/areas/river/76709-640x360-houses-of-parliament-and-london-eye-on-thames-from-above-640.jpg";
  const saveHandler = () => {
    const post = {
      date: new Date().toJSON(),
      text: text,
      img: img,
      booked: false,
    };
    dispatch(addPost(post));
    console.log(post)
    navigation.navigate("Main");
  };
  navigation.setOptions(
    {
      title: "Создать пост",

      headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
          <Item
            title="menu drawer"
            iconName="ios-menu"
            onPress={() => navigation.toggleDrawer()}
          />
        </HeaderButtons>
      ),
    },
    [navigation, route]
  );

  return (
    <ScrollView >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}  >
        <View style={styles.wrapper}  >
          <Text style={styles.title}>Создай новый пост</Text>
          <TextInput
            style={styles.textarea}
            placeholder="Введите текст поста"
            onChangeText={text => setText(text)}
            value={text}
            multiline
            
          />
          <Image
            style={{ width: "100%", height: 200, marginBottom: 10 }}
            source={{
              uri: img,
            }}
          />
          <Button
            title="Создать пост"
            color={THEME.MAIN_COLOR}
            onPress={saveHandler}
          />
        </View>
     </TouchableWithoutFeedback>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 10,
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    fontFamily: "open-regular",
    marginVertical: 10,
  },
  center: {
    flex: 1,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  textarea: {
    padding: 10,
    marginBottom: 10,
  },
});
