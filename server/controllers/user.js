import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/user.js';

export const signin = async (req, res) => {

    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        // if user doesnt exist

        if (!existingUser) return res.status(404).json({ message: "User doesn't exist" });

        // if user exist check the entered password is correct or not

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password );

        // if password is not correct
        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials"});
        //if password is correct
        const token = jwt.sign({ email: existingUser.email, id: existingUser._id}, 'test', { expiresIn: "1h"});

        res.status(200).json({ result: existingUser, token });


    } catch (error) {

        res.status(500).json({message: "Something went wrong."});
    }

};

export const signup = async (req, res) => {

    const { email, password, confirmPassword, firstName, lastName } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        // is user exist
        if (existingUser) return res.status(400).json({ message: "User already exist" });
        // if entered password is wrong
        if ( password !== confirmPassword ) return res.status(401).json({ message: "Incorrect Password" });

        const hashedPassword  =await bcrypt.hash(password,12);

        const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName }` });

        const token = jwt.sign({ email: result.email, id: result._id}, 'test', { expiresIn: "1h"});  
        
        res.status(200).json({ result, token });

    } catch (error) {
        res.status(500).json({message: "Something went wrong."});
        
        console.log(error);
    }
};