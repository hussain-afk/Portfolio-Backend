import mongoose from 'mongoose';
import envConfig from './env.config.js';

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(envConfig.mongoUri, {
            dbName: 'official_portfolio',
        })
        // await seedHeroSection(); // Call the seedHeroSection function after successful connection
        console.log(`MongoDB connected: ${connection.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}

// connectDB();
export default connectDB;

