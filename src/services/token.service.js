import jwt from 'jsonwebtoken';
import envConfig from '../config/env.config.js';

const generateToken = (adminId, adminEmail) => {
    const token = jwt.sign({ id: adminId, email: adminEmail }, envConfig.jwtSecret, { expiresIn: '1h' });
    return token;
}

export default generateToken;