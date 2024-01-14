import express from 'express';
import { GoogleLogin, Login, Register } from '../Controllers/AuthController.js';

const router = express.Router();

router.post("/googlelogin", GoogleLogin);
router.post("/register", Register);
router.post("/login", Login);

export default router;
