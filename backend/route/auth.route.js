import express, { json } from 'express';
import bcrypt from'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../model/User.model.js';

const router =express.Router();

router.post('/register',async(req,res)=>{
    try{
        const {email,password}=req.body;
        if(!email||!password) return res.status(400).json({message:'Email and password'})
        const existing = await User.findOne({email});
        if(existing) return res.status(400).json({message:"Alrady Registered"});
        const hashed = await bcrypt.hash(password,10);
        const user =await User.create({email,password:hashed});

        const token=jwt.sign({id:user._id},process.env.JWT_KEY,{expiresIn:'7d'});
        res.status(201).json({token})
    }catch(err){
        res.status(500).json({message:err.message});
    }
});

router.post('/login',async(req,res)=>{
    try{
        const {email,password}=req.body;
        const user=await User.findOne({email});
        if(!user) return res.status(400).json({message:"User Not Registered Yet"});
        const match=await bcrypt.compare(password,user.password);
        if(!match) return res.status(400).json({message:"Password Is Incorrect"});
        const token = jwt.sign({id:user._id},process.env.JWT_KEY,{expiresIn:'7d'});
        res.status(200).json({token});
    }catch(err){
        res.status(500).json({token});
    }
});
export default router;