import React from "react";
import {Post} from '../components/Post'
import { StyleSheet, View, FlatList} from "react-native";
export const PostList = ({data,onOpen}) => {
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
});
