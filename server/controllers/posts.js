import express  from 'express';
import mongoose from 'mongoose';
import posts from '../../client/src/reducers/posts.mjs';

import PostMessage from '../models/postMessages.js';

const router = express.Router();

//getting post function
export const getPosts = async (req, res) =>{
    try{ 
        const postMessages =await PostMessage.find();
        res.status(200).json(postMessages);
    }    
    catch(error){
        res.status(404).json({message: error.message});
    }
}

//creating post function
export const createPost = async (req,res) =>{
    const post = req.body;
    const newPost = new PostMessage(post);
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
    
    

    res.json({message: 'Post deletd successfully' });

} 
// like functionality

export const likePost = async(req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid( id ))  return res.status(404).send(`No post with id: ${id}`);

    const post = await PostMessage.findById(id);

    //after calling we have to update the like count and eventually leads to update the post 
    const updatedPost = await PostMessage.findByIdAndUpdate(id, {likeCount:post.likeCount + 1}, { new: true});

    res.json(updatedPost);

}
