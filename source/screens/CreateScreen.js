import React from "react";
import { View, Text, StyleSheet, Button, FlatList } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { DATA } from "../data";
import { AppHeaderIcon } from "../components/AppHeadericon";


export const CreateScreen = ({ navigation, route }) => {
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
    <View style={styles.center}>
      <Text>CreateScreen</Text>
    </View>
  );
};


const styles = StyleSheet.create({
  wrapper: {
    padding: 10,
  },
  center: {
    flex:1,
  textAlign: "center",
  justifyContent: "center",
  alignItems: "center",
}
});
