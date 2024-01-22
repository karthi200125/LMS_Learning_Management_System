import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import AuthRoute from './Routes/AuthRoute.js';
import UserRoute from './Routes/UserRoutes.js';
import ChapterRoute from './Routes/ChapterRoutes.js';
import CourseRoute from './Routes/CourseRoutes.js';
import { handleError } from './Utils/ErrorHandlingMidleware.js';
import cookieParser from 'cookie-parser';
import stripe from 'stripe';
const stripeSecretKey = 'sk_test_51ObDkgSFNN9FZMmYG1N9NZC0PQbfmGi03sCL9UN7flJe2cADRgQunLeKPSVnWS51rc2mmFmHwEOCMFA5Za605SD400gGAGcCuE';

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
app.use("/api/user", UserRoute);
app.use("/api/chapter", ChapterRoute);
app.use("/api/course", CourseRoute);

stripe(stripeSecretKey);

// Error handling middleware should be the last middleware
app.use(handleError);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
