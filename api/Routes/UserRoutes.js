import express from 'express';
import { UserUpdate } from '../Controllers/UserController.js';


const router = express.Router();

router.put("/update", UserUpdate);

export default router;
