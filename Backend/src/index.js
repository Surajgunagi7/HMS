import dotenv from 'dotenv'
dotenv.config();

import { app } from './app.js';
import connectDB from './db/index.js'
import './corn/cornJob.js';


connectDB() 
    .then(() => {
        app.on('error',(error) => {
            console.log(`ERR: ${error}`);
            throw error;
        });

        app.listen(process.env.PORT || 5000, () => {
            console.log(`Server is listening at ${process.env.PORT}`);
        })
    })
    .catch((error) => {
        console.error("MONGO ERR: ",error);
    })