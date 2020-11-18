import {
  ADD_POST,
  LOAD_POSTS,
  REMOVE_POST,
  TOGGLE_BOOKED,
} from "../../store/types";
import {} from "redux-thunk";
import { DB } from "../../db";
import { useDispatch } from "react-redux";
import * as FileSystem from "expo-file-system";
// import {DATA} from '../../data'
export const loadPosts = () => {
  return async (dispatch) => {
    const posts = await DB.getPosts();
    dispatch({
      type: LOAD_POSTS,
      payload: posts,
    });
  };
};

export const toggleBooked = (post) => async dispatch =>{
  await DB.updatePost(post)
  dispatch({
    type: TOGGLE_BOOKED,
    payload: post.id,
  });
};

export const removePost = (id) => async dispatch =>{
  dispatch({
    type: REMOVE_POST,
    payload: id,
  });
};
export const addPost = (post) => async (dispatch) => {
  const fileName = post.img.split('/').pop();
  const path = FileSystem.documentDirectory + fileName;
  try {
    await FileSystem.moveAsync({
      from: post.img,
      to: path,
    });
  } catch (error) {
    console.log(error);
    
  }
  const payload = { ...post, img: path };
  const id = DB.createPost(post);
  payload.id = id;
  dispatch({
    type: ADD_POST,
    payload,
    
  });
};
