import jwt from 'jsonwebtoken';
import envConfig from '../config/env.config.js';

const requireAdmin = (req, res, next) => {
    const token = req.cookies?.token || req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'Authentication required' });
    }

    try {
        req.admin = jwt.verify(token, envConfig.jwtSecret);
        return next();
    } catch (error) {
        return res.status(401).json({ message: 'Session expired. Please sign in again.' });
    }
};

export default requireAdmin;
