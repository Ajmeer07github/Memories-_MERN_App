import express from 'express';

import { getPosts, getPost, getPostsBySearch, createPost, updatePost, deletePost, likePost } from '../controllers/posts.js';

import auth from '../middleware/auth.js';
// in this post.js file all the routes starts with /posts 
const router = express.Router();

router.get('/search',getPostsBySearch);
router.get('/',getPosts);
router.get('/:id',getPost); // : means it is dynamic
 //search route

router.post('/',auth,createPost);
// patch is used for updating an existing document
router.patch('/:id',auth, updatePost);
router.delete('/:id',auth, deletePost);
router.patch('/:id/likePost',auth, likePost);

export default router;