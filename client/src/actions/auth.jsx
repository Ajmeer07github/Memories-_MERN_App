import { AUTH } from '../constants/actionTypes';

import * as api from '../api/index.jsx';

export const signin = (formData, navigate) => async(dispatch) => {
    try {
        
        const { data } = await api.signIn(formData);
        
        dispatch({ type: AUTH, data });
        
        navigate('/');
    } catch (error) {
        
        if (error.response && error.response.status === 404) {
            alert("User doesn't exist");
          } 
        else if (error.response && error.response.status === 400) {
            alert('Invalid credentials');
        } 
        else {
            console.log(error, 'error in sign in actions');
            alert('Something went wrong. Please try again later.');
        }
}       
}

export const signup = (formData, navigate) => async(dispatch) => {
    try {
        
        const { data } = await api.signUp(formData);
        
        dispatch({ type: AUTH, data });

        navigate('/');

    } catch (error) {
        
        if (error.response && error.response.status === 400) {
            alert('User already exists');
        }
        else if (error.response && error.response.status === 401) {
            alert('Incorrect password');
        }
        else {
            console.log(error, 'error in sign up actions');
            alert('Something went wrong. Please try again later.');
          }    
    }
}