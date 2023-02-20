import express from 'express';

import { signin, signup} from '../controllers/user.js';


const router = express.Router();

// adding the routes to signin and signup

router.post('/signin', signin);
router.post('/signup', signup);

export default router;