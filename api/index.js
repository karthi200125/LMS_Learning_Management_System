import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import AuthRoute from './Routes/AuthRoute.js';
import { handleError } from './Utils/ErrorHandlingMidleware.js';
import cookieParser from 'cookie-parser';

const app = express();
dotenv.config();

// Middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser())

// MongoDB connection
mongoose.connect(process.env.MONGO_DB)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB failed to connect", err));

// Routes
app.use("/api/auth", AuthRoute);

// Error handling middleware should be the last middleware
app.use(handleError);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
