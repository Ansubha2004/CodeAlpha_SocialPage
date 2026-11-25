import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from "./config/db.js";
import authroutes from "./routes/authroutes.js";

dotenv.config();
connectDB();

const app=express();
app.use(cors({
    origin:[
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:4173"
    ],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());


app.get('/',(req,res)=>{
    res.send('Picyfi Backend is Running');
});

app.use("/authapi",authroutes);


app.use((req,res)=>{
    res.status(404).json({
        success: false,
        message: 'Invalid Picyfi Route Accessed'
    });
});

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
});