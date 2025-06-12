import { app } from './app.js';
import connectDB from './db/index.js'
import dotenv from 'dotenv'
import './corn/cornJob.js';

dotenv.config({
    path: './.env'
});

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