import express from 'express';
import dotenv from 'dotenv'; 
import { connectionDB } from './config/model.connection.js';
import dns from 'dns';
import cros from'cors';
import todoRoute from './route/todo.route.js'
import authRoute from'./route/auth.route.js';
dotenv.config();
const app=express();

dns.setServers(["1.1.1.1", "8.8.8.8"]);

app.use(express.json())
app.use(cros());

app.use('/api/auth',authRoute);
app.use('/api/todos',todoRoute);

connectionDB();

app.listen(3000);