// importing all the constants from actiontypes
import { FETCH_ALL, FETCH_BY_SEARCH, FETCH_POST, START_LOADING, END_LOADING, CREATE, UPDATE,LIKE, DELETE } from '../constants/actionTypes';

import * as api from '../api/index.jsx';


// Action Creators
// action creators are functoins that returns an action. Action is just an object with type and payload
//dispatch function provided by Redux. It takes an action as an argument and sends it to the Redux store.dispatch simply triggers the action
export const getPost = (id) => async (dispatch) => {
    try {
      dispatch({ type: START_LOADING });

      const { data } = await api.fetchPost(id); //API call to fetch a single post
  
      dispatch({ type: FETCH_POST, payload: data });

      dispatch({ type: END_LOADING });
    
    } catch (error) {
      console.log(error.message,"error in getPost action");
    }
  };

export const getPosts = (page) => async (dispatch) => {
    try {
      dispatch({ type: START_LOADING });

      const { data: { data, currentPage, numberOfPages } } = await api.fetchPosts(page); //API call to fetch multiple posts based on the specified page
  
      dispatch({ type: FETCH_ALL, payload: { data, currentPage, numberOfPages } });
      
      dispatch({ type: END_LOADING });
      
    } catch (error) {
      console.log(error.message,"error in getPosts action");
    }
  };

// post details function


// Search function

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
    
    try {
        console.log(searchQuery);
        dispatch({ type: START_LOADING });

        const { data: { data } } = await api.fetchPostBySearch(searchQuery); //API call to search for posts based on the provided query

        dispatch({ type: END_LOADING });

        console.log("searched posts",{data});

        dispatch({ type: FETCH_BY_SEARCH , payload: { data } });
        
        
        
    } catch (error) {
        console.log(error.message,"error in search action")
    }
};

//to creating a post by request from api
export const createPost = (post, navigate) => async(dispatch) => {
    try {
        dispatch({ type: START_LOADING });

        const { data } = await api.createPost(post);//API call to create a new post using the provided data

        navigate(`/posts/${data._id}`);

        dispatch({ type: END_LOADING });
        
        dispatch({ type: CREATE, payload: data});

        console.log("post created msg from post from actions");
    } 
    catch (error) {
        console.log(error.message);
    }
}
//update the post 
export const updatePost = (id, post) => async (dispatch) => {
    try{
        const { data } = await api.updatePost(id, post);//API call to update a specific post based on the id and data

        dispatch({ type: UPDATE, payload: data });
    }
    catch(error){

        console.log("Error in update post msg from action ",error);
    }
}
// like post 

export const likePost = (id) => async (dispatch) =>{
    const user = JSON.parse(localStorage.getItem('profile'));
    try {
        const { data } = await api.likePost(id,user?.token); //API call to like or unlike a specific post based on the provided id

        dispatch({ type: LIKE , payload: data} );
    } catch (error) {
        console.log('error in like post ',error);
    }
}

//delete action

export const deletePost = (id) => async (dispatch) =>{
    try {
        await api.deletePost(id);//API call to delete a specific post based on the provided id
        dispatch({ type: DELETE, payload: id});
        console.log('post deleted');
    } catch (error) {
        console.log('error in deletion ',error);
    }
}

