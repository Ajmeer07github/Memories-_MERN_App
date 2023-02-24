import axios from 'axios';

// this is the url of server used to get the posts in the database
const API = axios.create({ baseURL: 'http://localhost:5000' });
// const url = "http://localhost:5000/posts";

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
  
    return req;
  });

export const fetchPost = (id) => API.get(`/posts/${id}`); 

export const fetchPosts = (page) => API.get(`/posts?page=${page}`);

export const fetchPostBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || "none"}&tags=${searchQuery.tags}`);

//sends a POST request to the URL specified with the payload "newPost". The axios.post method is used to make a POST request with axios.

export const createPost = (newPost) => API.post('/posts', newPost);

export const likePost = (id) => API.patch(`/posts/${id}/likePost`);

export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);

export const deletePost = (id) => API.delete(`/posts/${id}`);

 
//  signin and signout routes

export const signIn = (formData) => API.post('/user/signin', formData);

export const signUp = (formData) => API.post('/user/signup', formData);