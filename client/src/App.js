import React from 'react';
import { useState, useEffect } from 'react';
import { Container, AppBar, Typography, Grow, Grid} from '@material-ui/core';
import { useDispatch } from 'react-redux';

import { getPosts } from './actions/posts';
import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';
import memories from './images/memories.png';
import useStyles from './styles';

const App = () => {
  const [ currentId, setCurrentId ] = useState(null);
  const classes =useStyles();  
  
  const  dispatch  =useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]); 
  
  return (
    <Container>
      <AppBar
        className={classes.appBar}  
        position='static'
        color='inherit'
      >
        <Typography 
          className={classes.title}
          variant='h2' 
          align='center'
        >
          Memories
        </Typography>
        <img
          className={classes.memories_logo} 
          src={memories} 
          alt="memorieslogo" 
          height="60" />
        
      </AppBar>

      <Grow in>
        <Container>
          <Grid
          className={classes.main_container}
          container
          justifyContent='space-between' 
          alignItems='stretch'
          spacing={4}
          >
            {/* container for holding post */ }

            <Grid item xs={12} sm={7}>
                <Posts setCurrentId={setCurrentId}/>
            </Grid>
            
            {/* container for holding From to add post */}

            <Grid item xs={12} sm={4}>
                <Form 
                currentId={currentId} 
                setCurrentId={setCurrentId} />
            </Grid>

          </Grid>
        </Container>
      </Grow>

    </Container>
  )
}
export default App;