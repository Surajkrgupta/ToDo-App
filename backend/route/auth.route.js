import express, { json } from 'express';
import bcrypt from'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../model/User.model.js';
import { loginUser, registerUser } from '../controller/user.controller.js';

const router =express.Router();

router.post('/register',registerUser);

router.post('/login',loginUser);
export default router;