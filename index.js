import express from 'express';
import adminRoutes from './src/routes/admin.route.js';
import envConfig from './src/config/env.config.js';
import connectDB from './src/config/db.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();
const PORT = envConfig.port;

app.use(cors({
  origin: envConfig.frontendUrl,
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/admin', adminRoutes);

app.get('/health', (req, res) => res.status(200).json({ status: 'ok' }));


connectDB();
// createAdmin();

// seedHeroSection;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});