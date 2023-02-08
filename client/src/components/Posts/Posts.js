import React from 'react';
import { useSelector } from 'react-redux';

import Post from './Post/Post';
import { Grid, CircularProgress } from '@material-ui/core';

import Style from './Poststyle';

    
const Posts = ({ setCurrentId }) => {
    //the state.post comes from index.js in reducers
    const posts = useSelector((state) => state.posts);
    
    const classes =Style(); 
    
    console.log(posts);
  return (
    !posts.length ? <CircularProgress/> : (
      <Grid
      className={classes.conatiner}
      container
      alignItems = "stretch"
      spacing = {3}
      >
      {
        posts.map((post) =>(
          <Grid key={post._id} item xs={12} sm={6}>
              {/* prop drilling contunuosly sending the prop over and over again */}
            <Post post={post} setCurrentId={setCurrentId}/>           
            
                         
          </Grid>
        ))
      }
      </Grid>
    )
  )
}

export default Posts;