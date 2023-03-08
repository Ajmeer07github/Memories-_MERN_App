import React, { useEffect } from 'react';
import { Paper, Typography, CircularProgress, Divider, Grid,Card } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams, useNavigate } from 'react-router-dom';

import { getPost, getPostsBySearch } from '../../actions/posts';
import Styles from './PostDetailsstyles';

const PostDetails = () => {

  const{ post, posts, isLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = Styles();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getPost(id));
  }, [id])

  // we manipulate recommended post from the tags in the current post

  useEffect(() => {
    if (post) {
      dispatch(getPostsBySearch({ search: 'none', tags: post?.tags.join(',') }));
    }
  }, [post]);


  if(!post) return null;

  if(isLoading){
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size="7em" />
      </Paper>
    );
  }

  //openpost func
  const openPost = (_id) => navigate(`/posts/${_id}`);

  // post recommendation function

  const shuffledPosts = posts.filter(({ _id }) => _id !== post._id).sort(() => 0.5 - Math.random());
  const recommendedPosts = shuffledPosts.slice(0,4);
  return (
        <Paper 
        style={{ padding: '20px', 
        borderRadius: '15px' }}
        elevation={6} >
      
      <div className={classes.card}>

        <div className={classes.section}>

          <Typography 
            variant="h3" 
            component="h2">
            {post.title}
          </Typography>

          <Typography variant="h5">
             Created By : {post.name}
          </Typography>

          <Typography 
            gutterBottom 
            variant="h6" 
            color="textSecondary" 
            component="h2">
              {post.tags.map((tag) => `#${tag} `)}
          </Typography>

          <Typography 
            gutterBottom 
            variant="body1" 
            component="p">
              {post.message}
          </Typography>

          <Typography variant="body1">
            {moment(post.createdAt).fromNow()}
          </Typography>

          {/* <Divider style={{ margin: '20px 0' }} /> */}
        
        </div>
        
        <div className={classes.imageSection}>
          <img className={classes.media} src={post.selectedFile } alt={post.title} />
        </div>
      
      </div>
      {/* recommended post */}

      {!!recommendedPosts.length && (
        <div className={classes.section}>
          <Typography gutterBottom variant="h5">Posts You might also like:</Typography>
          <Divider />
          <div className={classes.recommendedPosts}>
            {recommendedPosts.map(({ title, name, message, likes, selectedFile, _id }) => (
              <div style={{ margin: '20px', cursor: 'pointer' }} onClick={() => openPost(_id)} key={_id}>
                <Typography gutterBottom variant="h6">{title}</Typography>
                <Typography gutterBottom variant="subtitle2">{name}</Typography>
                <Typography gutterBottom variant="subtitle2">{message}</Typography>
                <Typography gutterBottom variant="subtitle1">Likes: {likes.length}</Typography>
                <img src={selectedFile} width="200px" alt={name} />
              </div>
            ))}
          </div>
        </div>
      )} 
      

    </Paper>
  )
}

export default PostDetails;