import dotenv from 'dotenv';
dotenv.config();

const envConfig = {
    port: process.env.PORT,
    mongoUri: process.env.MONGO_URI,
    imagekitPrivateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    jwtSecret: process.env.JWT_SECRET,
    frontendUrl: process.env.FRONTEND_URL
}

export default envConfig;