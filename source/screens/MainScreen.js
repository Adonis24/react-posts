import React,{useEffect} from "react";
import {View, StyleSheet,ActivityIndicator} from 'react-native'
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import {useDispatch, useSelector} from 'react-redux' 
import { AppHeaderIcon } from "../components/AppHeadericon";
import { PostList } from "../components/PostList";
import { loadPosts } from "../store/actions/post";
import { THEME } from "../theme";

export const MainScreen = ({ navigation,route }) => {

  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(loadPosts())
  },[dispatch])
  const openPostHandler = (post) => {
    navigation.navigate("Post", {postId: post.id, date: post.date, booked: post.booked});
  };
  const allPosts = useSelector(state => state.post.allPosts)
  const loading = useSelector(state =>state.post.loading)
  React.useLayoutEffect(() => {
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
  })},[navigation])
  if (loading) {
    return(
      <View style={styles.center}>
        <ActivityIndicator color={THEME.MAIN_COLOR}/>
      </View>
    )
  }
   
  return <PostList data={allPosts} onOpen={openPostHandler}/>
};



const styles = StyleSheet.create({
  wrapper: {
    padding: 10,
  },
  center: {
    flex: 1,
    justifyContent:'center',
    
  }
});
