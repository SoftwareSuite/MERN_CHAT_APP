import express from 'express';
import dotenv from "dotenv"
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser'; 
import cors from 'cors';
import userRouter from './routes/userRoute.js';
import messageRouter from './routes/messageRoute.js';
dotenv.config();


const PORT = process.env.PORT || 3000
const app = express();

// Middlewares
app.use(express.urlencoded({extended:true}));
app.use(express.json()); 
app.use(cookieParser());
const corsOption={
    credentials:true
};
app.use(cors(corsOption)); 

// MONGO DB connection settings
mongoose.connect(process.env.MONGO).then(()=> {
    console.log("Connected to MongoDB")
}).catch(err => console.log(err))

// User Route
app.use('/api/user', userRouter)
app.use('/api/message', messageRouter)
app.get('/', (req, res)=> {
    res.json({
        success: true,
        message: "API is working"
    })
});
 
app.listen(PORT, () => {
    console.log("server is working on port " + PORT)
}) 