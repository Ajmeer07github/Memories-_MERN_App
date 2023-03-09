import React from 'react';
import { useSelector } from 'react-redux';

import Post from './Post/Post';
import { Grid, CircularProgress } from '@material-ui/core';

import Style from './Poststyle';

    
const Posts = ({ setCurrentId }) => {
    //the state.post comes from index.js in reducers
    const { posts, isLoading } = useSelector((state) => state.posts);
    
    const classes =Style(); 
    
    // console.log(posts);

    // if (!posts.length && !isLoading ){
    //   return "No Posts available";
      
    // }

  return (
    isLoading ? <CircularProgress/> : (
      <Grid
      className={classes.conatiner}
      container
      alignItems = "stretch"
      spacing = {3}
      >
      {
        posts.map((post) =>(
          <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
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