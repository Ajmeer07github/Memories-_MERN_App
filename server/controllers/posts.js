import express  from 'express';
import mongoose from 'mongoose';

import PostMessage from '../models/postMessages.js';

const router = express.Router();

//getting post function
export const getPosts = async (req, res) =>{

    const { page } = req.query;

    try{ 

        const LIMIT = 12;
        const startIndex = (Number(page) - 1) * LIMIT; //to get the starting index of each page first post

        const total = await PostMessage.countDocuments({}); //to count the total pages
        //fetching -> sorting from newer to older post -> and setting limit of each page -> skipping the prev page posts

        const posts = await PostMessage.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);

        res.status(200).json({ data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT )});
        
    }    
    catch(error){
        res.status(404).json({message: error.message});
    }
}

// get post details function

export const getPost = async (req, res) => { 
    const { id } = req.params;

    try {
        const post = await PostMessage.findById(id);
        
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// search controller
// QUERY -> /posts?page=1 -> page=1 as result url 
// PARAMS -> /posts/123 -> id=123 as result url
//params is used when we want some "specific" search like functoinality


export const getPostsBySearch = async (req, res) => {
    const { searchQuery, tags } = req.query;


    try{
        const title = new RegExp(searchQuery,"i"); //i stands for ignore the case of search query
        // $or means or logic in the array
        // $in stands for array containing elements like "in" in python 
        // tags.split(',') coz we passed the tags as string seperated by commas
      
        const posts = await PostMessage.find({ $or: [ { title }, { tags: { $in: tags.split(',') } } ]});
        
        // sending back to front end line of code
        res.json({ data: posts });
        

    } catch (error) {
        res.status(404).json({ message:error.message  });
    }
}

//creating post function

export const createPost = async (req,res) =>{

    const post = req.body;

    const newPost = new PostMessage({  ...post, creator: req.userId, createdAt: new Date().toISOString() });
    try{
        await newPost.save();
        res.status(201).json(newPost);
    }
    catch(error){
        res.status(409).json({message: error.message});
    }
}

export const updatePost = async (req, res) => {
    const { id } = req.params;
    const  post = req.body;
    //to check the given id is mongoose id 
    if (!mongoose.Types.ObjectId.isValid( id ))  return res.status(404).send(`No post with id: ${id}`);


    const updatedPost = await PostMessage.findByIdAndUpdate( id, { ...post, id }, { new : true });

    res.json(updatedPost);
}

//delete functionality

export const deletePost= async(req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid( id ))  return res.status(404).send(`No post with id: ${id}`);

    await PostMessage.findByIdAndRemove(id);
    
    

    res.json({message: 'Post deleted successfully' });

} 
// like functionality

export const likePost = async(req, res) => {
    const { id } = req.params;

    if(!req.userId) return res.json({ message: 'Unauthenticated' });

    if (!mongoose.Types.ObjectId.isValid( id ))  return res.status(404).send(`No post with id: ${id}`);

    const post = await PostMessage.findById(id);

    //after calling we have to update the like count and eventually leads to update the post 

    const index = post.likes.findIndex((id) => id === String(req.userId) );
    // if the user already likes the post
    if (index === -1){
        post.likes.push(req.userId);
    }
    else{
        post.likes = post.likes.filter((id) => id !== String(req.userId));
    }
    // {likeCount:post.likeCount + 1}
    const updatedPost = await PostMessage.findByIdAndUpdate(id, { ...post, id },{ new: true });

    res.json(updatedPost);

}

export default router;