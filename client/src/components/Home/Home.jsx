import React from 'react';
import { useState } from 'react';
import { Container, Grow, Grid, Paper, AppBar, TextField, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';

import  Posts from '../Posts/Posts';
import Form from '../Form/Form';
import { getPostsBySearch } from '../../actions/posts';
import  Pagination  from '../pagination';

import Styles  from './Homestyles';

// search function

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {

    const [ currentId , setCurrentId ] = useState(0);
    const  dispatch  =useDispatch();
    const navigate = useNavigate();
    const query = useQuery();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');
    const classes = Styles();

    const [search, setSearch] = useState('');
    const [tags, setTags] = useState([]);
    
  
 
    // search post function
    const searchPost = () => {
      
      if (search.trim() || tags) {

        // tags: tags.join(',')})); since tags is an array so we cannot pass the array so we join the array elements as string using the join operator

        dispatch(getPostsBySearch({ search, tags: tags.join(',') })); 

        navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);

      }else{
      
        navigate('/posts');
      }
    };

    // search functionlity whenhit the enter button after entering the search term
    // keyCode===13 => ENTER KEYCODE
    const handleKeyPress = (e) => {
      if(e.keyCode === 13 ){
        searchPost();
      }
    };

    const handleAddChip = (tag) => setTags([...tags, tag]);

    const handleDeleteChip = (chipToDelete) => setTags(tags.filter((tag) => tag !== chipToDelete));

  return (
    <Grow in>
        <Container maxWidth='xl'>
          <Grid
          className={classes.gridContainer}
          container
          justifyContent='space-between' 
          alignItems='stretch'
          spacing={4}
          >
            {/* container for holding post */ }

            <Grid item xs={12} sm={6} md={9} >
                <Posts setCurrentId={setCurrentId}/>
            </Grid>
            
            {/* container for holding From to add post */}

            <Grid item xs={12} sm={6} md={3} >

              <AppBar className={classes.appBarSearch} position='static' color='inherit'>
                
                <TextField
                  name='search'
                  variant='outlined'
                  label='Search'
                  fullWidth
                  onKeyDown={handleKeyPress}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />

                <ChipInput 
                  style={{ margin: '10px 0'}}
                  value={tags}
                  onAdd={(chip) => handleAddChip(chip)}
                  onDelete={(chip) => handleDeleteChip(chip)}
                  label={'Search Tags'}
                  variant='outlined'
                />

                <Button onClick={searchPost} variant='contained' className={classes.searchButton} color='primary' >
                  Search
                </Button>

              </AppBar>
                
                <Form 
                currentId={currentId} 
                setCurrentId={setCurrentId} />
                {( !searchQuery && !tags.length) &&(

                  // pagination 

                  <Paper elevation={6} className={classes.pagination}>
                    <Pagination page={page}
                      
                    />              
                  </Paper>
                )}
            </Grid>
            

          </Grid>
        </Container>
      </Grow>
  )
}

export default Home