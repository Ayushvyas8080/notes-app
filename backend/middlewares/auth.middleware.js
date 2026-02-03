import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/env.js';

export default function auth(req, res, next) {
  try {
    // Read token from cookie
    let token = req.cookies?.token;

    // Fallback to Authorization header (Postman / mobile apps)
    if (!token && req.headers.authorization?.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    // If no token -> reject
    if (!token) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);

    req.userId = decoded.userId;

    if (!req.userId) {
      return res.status(401).json({ message: 'Invalid token payload' });
    }

    next();
  } catch (err) {
    console.error('Auth error:', err.message);
    return res.status(401).json({ message: 'Unauthorized' });
  }
}
