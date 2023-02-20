import { combineReducers } from "redux";

import posts from './posts.mjs';
import auth from './auth';


export default combineReducers({ posts, auth });