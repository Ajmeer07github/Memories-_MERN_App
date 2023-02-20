import React from 'react';
import { useState } from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
// import { GoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Input from './Input';
// import Icon from './icon';
import Styles from './Authstyle';
import { signin, signup } from '../../actions/auth';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

const Auth = () => {


    const classes = Styles();

    const [formData, setFormData ] = useState(initialState);
    
    const [ isSignup, setIsSignup ] = useState(false);
    
    const navigate = useNavigate();

    const dispatch = useDispatch();
  
    const [ showPassword, setShowPassword ] = useState(false);

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

    // handle submit function

    const handleSubmit = (e) => {
      // to prevent browser reloading the page
      e.preventDefault();

      if (isSignup){
        dispatch(signup(formData, navigate));

      } 
      else{
        dispatch(signin(formData, navigate));

      }

      // console.log(formData);
    };

    const handleChange = (e) =>{
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const switchMode = () => {
      setFormData(initialState);
      setIsSignup((prevIsSignup) => !prevIsSignup);
      setShowPassword(false);
    };


  return (
    <Container component="main" maxWidth="xs">

        <Paper className={classes.paper} elevation={3}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon/>
            </Avatar>
            <Typography variant='h5' >
              {isSignup ? "Sign Up" : 'Sign In'}
            </Typography>
        
            <form className={classes.form} onSubmit ={handleSubmit}>

              <Grid container spacing={2}>
                {
                  isSignup && (
                    <>
                      <Input name="firstName" label="First Name" handlechange={handleChange} autoFocus half/>

                      <Input name="lastName" label="Last Name" 
                      handlechange={handleChange} half/>
                    </>
                  )
                }
                
                <Input name ='email' label="Email Address" handlechange={handleChange} 
                type="email" />

                <Input name ='password' label="Password" 
                handlechange={handleChange} 
                type = {showPassword ? "text" : 'password'}
                handleShowPassword={handleShowPassword}
                />
                
                { isSignup && <Input name="confirmPassword" label="Confrim Password" handlechange={handleChange} type="password" />}

              </Grid>


              {/* signup and signin button */}
              <Grid>
                <Grid>
                  <Button className={classes.submit} type='submit' fullWidth variant='contained' color='secondary'>
                    {isSignup ? 'Sign Up' : 'Sign In'}
                  </Button>
                </Grid>

                <Grid justifyContent='flex-end'>
                  <Button className={classes.submit} fullWidth
                  onClick={switchMode} color="primary" >
                    {isSignup ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                  </Button>

                </Grid>
              </Grid>
            </form>


        </Paper>
    </Container>
  )
}

export default Auth