// importing all the constants from actiontypes
import { FETCH_ALL, CREATE, UPDATE, DELETE } from '../constants/actionTypes';

import * as api from '../api/index.js';


// Action Creators
// action creators are functoins that returns an action. Action is just an object with type and payload

export const getPosts = () => async (dispatch) => {
      
    // to fetch the data from the backend
    try {
        //here data is the action
        const { data } = await api.fetchPosts();

        dispatch({ type: FETCH_ALL , payload: data});
    } catch (error) {
        console.log(error.message);
    }
}
//to creating a post by request from api
export const createPost = (post) => async(dispatch) => {
    try {
        const { data } = await api.createPost(post);
        dispatch({ type: CREATE, payload: data});
    } catch (error) {
        console.log(error.message);
    }
}
//update the post 
export const updatePost = (id, post) => async (dispatch) => {
    try{
        const { data } = await api.updatePost(id, post);

        dispatch({ type: UPDATE, payload: data });
    }
    catch(error){

        console.log("Error in update post msg from action ",error);
    }
}

//delete action

export const deletePost = (id) => async (dispatch) =>{
    try {
        await api.deletePost(id);
        dispatch({ type: DELETE, payload: id});
        console.log('post deleted');
    } catch (error) {
        console.log('error in deletion ',error);
    }
}

// like post 

export const likePost = (id) => async (dispatch) =>{
    try {
        const { data } = await api.likePost(id);

        dispatch({ type: UPDATE , payload: data});
    } catch (error) {
        console.log('error in like post ',error);
    }
}