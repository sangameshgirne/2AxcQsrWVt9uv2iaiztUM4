import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';  
import connectDB from './config/db.js'
import { clerkMiddleware } from '@clerk/express'
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js"

const app = express();
const PORT=3000;
dotenv.config();

await connectDB();
//Middleware
app.use(express.json());
app.use(cors());
app.use(clerkMiddleware())

app.get('/', (req, res) => { res.send('server is live');});
app.use('/api/ingest',serve({ client: inngest, functions }));
app.listen(PORT,()=>console.log(`SERVER IS LISTENING AT PORT:${PORT}`));
