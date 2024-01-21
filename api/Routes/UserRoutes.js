import express from 'express';
import { UserUpdate } from '../Controllers/UserController.js';
import { VerifyToken, VerifyUser } from '../Utils/VerifyToken.js';


const router = express.Router();

router.put("/update", UserUpdate);

export default router;
