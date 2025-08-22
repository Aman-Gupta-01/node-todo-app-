import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config();

const mongodbURI = process.env.MONGODB_URI

export const connectMongoDB = async () => {
    try {
        await mongoose.connect(mongodbURI);
        console.log('✅ MongoDB connected successfully');
    } catch (error) {
        console.log('mongodb failed to connect with URI: ',mongodbURI)
        console.error('Error:', error.message);
        process.exit(1);
    }
}