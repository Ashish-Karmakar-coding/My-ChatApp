import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        if(conn){
            console.log(`The data is connected successfully to the host : ${conn.connection.host} `,);
        }
    } catch (error) {
        console.error("Error while connecting database:", error);
        throw error;
    }
};

export default connectDB;