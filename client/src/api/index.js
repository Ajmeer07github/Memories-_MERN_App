import axios from 'axios';

// this is the url of server used to get the posts in the database

const url = "http://localhost:5000/posts";

export const fetchPosts = () => axios.get(url); 

//sends a POST request to the URL specified with the payload "newPost". The axios.post method is used to make a POST request with axios.
export const createPost = (newPost) => axios.post(url, newPost);

export const updatePost = (id, updatedPost) => axios.patch(`${url}/${id}`, updatedPost);

 export const deletePost = (id) => axios.delete(`${url}/${id}`);

 export const likePost = (id) => axios.patch(`${url}/${id}/likePost`);
 
