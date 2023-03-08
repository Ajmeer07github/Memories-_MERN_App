import React, { useState, useEffect } from 'react';
import  { TextField, Button, Typography, Paper} from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';

import Styles from './formstyle';
import { createPost, updatePost } from '../../actions/posts';

    
const Form = ({ currentId, setCurrentId }) => {
    
const [postData, setPostData] = useState({
  title:'',
  message:'',
  tags:[],
  selectedFile:''
});
  //to fetch the post's data in the from to update when Morehorizon button clicked
  const post = useSelector((state) => currentId ? state.posts.posts.find((p) => p._id === currentId ) : null);

    const classes =Styles();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // to update the post click the three dot the current post's details will show in the form 
    
    // getting username to fetch it in the post from the email/name in local storage

    const user = JSON.parse(localStorage.getItem('profile'));

    useEffect(() => {
      if (!post?.title) clear();
      if (post) setPostData(post);
    }, [post]);

    const clear = () => {
      setCurrentId(0);
      setPostData({
        title:'',
        message:'',
        tags:[],
        selectedFile:'',
      });
    }

    //to post the data after the user hits submit
    
    const handleSubmit = async (e) => {
      
      e.preventDefault();
  
      if (currentId === 0) {
        dispatch(createPost({ ...postData, name: user?.result?.name }, navigate));

        clear();

      } else {

        dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
        
        clear();
      }
    };

    // if user doesnt signedin or signedup 

    if(!user?.result?.name){
      return (
        <Paper className={classes.paper} elevation={6}>
          <Typography variant="h6" align="center">
            Please Sign To Add Memories
          </Typography>
        </Paper>
      );
    }

    const handleAddChip = (tag) => {
      setPostData({ ...postData, tags: [...postData.tags, tag] });
    };
  
    const handleDeleteChip = (chipToDelete) => {
      setPostData({ ...postData, tags: postData.tags.filter((tag) => tag !== chipToDelete) });
    };
    
  return (
    <Paper className={classes.paper} elevation={6}>
      <form
      className={`${classes.root} ${classes.form}`}
      autoComplete="off"
      elevation={6}
      noValidate
      onSubmit={handleSubmit}
      >
        <Typography variant="h6" className={classes.formHead}>
          { currentId ? 'Edit' : 'Create' } a Memory
        </Typography>

        <TextField
        name="title"
        variant="outlined"
        label="Title"
        fullWidth
        value={postData.title}
        onChange={(e) => setPostData({ ...postData, title: e.target.value})}
        />
        <TextField
        name="message"
        variant="outlined"
        label="Message"
        fullWidth
        multiline
        maxRows={4}
        value={postData.message}
        onChange={(e) => setPostData({ ...postData, message: e.target.value})}
        />
        
        <div style={{ padding: '5px 0', width: '94%' }}>
          <ChipInput
            name="tags"
            variant="outlined"
            label="Tags"
            fullWidth
            value={postData.tags}
            onAdd={(chip) => handleAddChip(chip)}
            onDelete={(chip) => handleDeleteChip(chip)}
          />
        </div>
        
        {/* to convert the image to text we use filebase 64 */}
        <div className={classes.fileInput}>
          <FileBase 
            type="file"
            multiple={false} 
            onDone={({ base64 }) => 
            setPostData({ ...postData, selectedFile: base64 })} />
        </div>
        <Button className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >Submit</Button>

        <Button 
        variant="contained" 
        color="secondary" 
        size="medium" 
        onClick={clear} 
        fullWidth
        >Clear</Button>

      </form>

    </Paper>
  )
}

export default Form;