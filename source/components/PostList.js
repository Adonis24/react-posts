import React from "react";
import {Post} from '../components/Post'
import { StyleSheet, View, FlatList, Text} from "react-native";
export const PostList = ({data = [],onOpen}) => {
if (!data.length) {
  return (
    <View style ={styles.wrapper}> 
      <Text style ={styles.noItems}> Постов пока нет</Text> 
      </View>
  )
}
  return (
    <View style={styles.wrapper}>
      <FlatList
        data={data}
        keyExtractor={(post) => post.id.toString()}
        renderItem={({ item }) => {
          return <Post post={item} onOpen={onOpen} />;
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    padding: 10,
  },
  noItems: {
    fontFamily: 'open-regular',
    fontSize: 24,
    textAlign: 'center',
    marginVertical:10

  }
});
