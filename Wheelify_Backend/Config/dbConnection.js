import mongoose from 'mongoose';
import dotenv from "dotenv";
dotenv.config();

const dbConnection  = () => {
    mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("Connection Successful");
    })
    .catch((error) => {
        console.log("DB Connection Failed");
        process.exit(1);
    });
}

export default dbConnection;