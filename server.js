import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import Routes from './api/routes.js';
import cors from 'cors';
const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

try{
    app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})
}catch(err){
    console.error('Error starting server:', err);
}

app.use("", Routes);
