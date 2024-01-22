import jwt from 'jsonwebtoken';
import { createError } from './CreateError.js';
import UserModel from '../Models/UserModel.js';

export const VerifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;    
    if (!authHeader) return next(createError(401, "You are not authenticated"));
    const token = authHeader.split(' ')[1];    
    if (!token) return next(createError(401, "Invalid token format"));
    
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) return next(createError(401, "Token is not valid"));
        req.userId = decoded;
        next();
    });
};


export const VerifyUser = async (req, res, next) => {
    try {
        const userId = req.userId.id;
        const user = await UserModel.findById(userId);
        if (!user) return next(createError(401, "User not found"));
        req.user = user;
        next();
    } catch (error) {        
        return next(createError(500, "Internal Server Error"));
    }
};
